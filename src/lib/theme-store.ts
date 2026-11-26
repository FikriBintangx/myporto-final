import fs from 'node:fs/promises';
import path from 'node:path';
import defaultThemeConfig from '../data/site-theme.json';

export interface SiteThemeConfig {
  activeTheme: 'celestial-blue' | 'midnight-portal';
  colorMode: 'dark' | 'light' | 'system';
  defaultLang: 'id' | 'en';
  enable3DGithub: boolean;
  enableAsciiArt: boolean;
  enableHeroVideo: boolean;
  enableRulerSidebar: boolean;
  updatedAt: string;
}

export const ALLOWED_THEMES = new Set(['celestial-blue', 'midnight-portal']);
export const ALLOWED_MODES = new Set(['dark', 'light', 'system']);
export const ALLOWED_LANGS = new Set(['id', 'en']);

const CONFIG_PATH = path.resolve(process.cwd(), 'src/data/site-theme.json');
const REDIS_KEY = 'fb:site-theme:v1';
const CACHE_TTL_MS = 5000;

declare global {
  var __fbThemeConfig: SiteThemeConfig | undefined;
  var __fbThemeFetchedAt: number | undefined;
}

function getRedisCreds() {
  const url = (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '').trim().replace(/\/$/, '');
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '').trim();
  return url && token ? { url, token } : null;
}

function sanitizeConfig(raw: any, fallback: SiteThemeConfig): SiteThemeConfig {
  if (!raw || typeof raw !== 'object') return fallback;
  return {
    activeTheme: ALLOWED_THEMES.has(raw.activeTheme) ? raw.activeTheme : fallback.activeTheme,
    colorMode: ALLOWED_MODES.has(raw.colorMode) ? raw.colorMode : fallback.colorMode,
    defaultLang: ALLOWED_LANGS.has(raw.defaultLang) ? raw.defaultLang : fallback.defaultLang,
    enable3DGithub: typeof raw.enable3DGithub === 'boolean' ? raw.enable3DGithub : fallback.enable3DGithub,
    enableAsciiArt: typeof raw.enableAsciiArt === 'boolean' ? raw.enableAsciiArt : fallback.enableAsciiArt,
    enableHeroVideo: typeof raw.enableHeroVideo === 'boolean' ? raw.enableHeroVideo : fallback.enableHeroVideo,
    enableRulerSidebar: typeof raw.enableRulerSidebar === 'boolean' ? raw.enableRulerSidebar : fallback.enableRulerSidebar,
    updatedAt: typeof raw.updatedAt === 'string' && raw.updatedAt ? raw.updatedAt : fallback.updatedAt,
  };
}

async function readFromRedis(): Promise<SiteThemeConfig | null> {
  const creds = getRedisCreds();
  if (!creds) return null;
  try {
    const res = await fetch(`${creds.url}/get/${encodeURIComponent(REDIS_KEY)}`, {
      headers: { Authorization: `Bearer ${creds.token}` },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.result) return null;
    const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
    return sanitizeConfig(parsed, defaultThemeConfig as SiteThemeConfig);
  } catch {
    return null;
  }
}

async function writeToRedis(cfg: SiteThemeConfig): Promise<boolean> {
  const creds = getRedisCreds();
  if (!creds) return false;
  try {
    const res = await fetch(`${creds.url}/set/${encodeURIComponent(REDIS_KEY)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cfg),
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function writeToGitHub(cfg: SiteThemeConfig): Promise<boolean> {
  const token = (process.env.GITHUB_TOKEN || '').trim();
  const repo = (process.env.GITHUB_REPO || 'FikriBintangx/myporto-final').trim();
  if (!token) return false;
  try {
    const apiUrl = `https://api.github.com/repos/${repo}/contents/src/data/site-theme.json`;
    const getRes = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(3000),
    });
    const sha = getRes.ok ? (await getRes.json())?.sha : undefined;
    const content = Buffer.from(JSON.stringify(cfg, null, 2) + '\n', 'utf-8').toString('base64');
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `chore(theme): switch active theme to ${cfg.activeTheme}`,
        content,
        sha,
      }),
      signal: AbortSignal.timeout(4000),
    });
    return putRes.ok;
  } catch {
    return false;
  }
}

async function readBaseConfig(): Promise<SiteThemeConfig> {
  const now = Date.now();
  if (globalThis.__fbThemeConfig && globalThis.__fbThemeFetchedAt && now - globalThis.__fbThemeFetchedAt < CACHE_TTL_MS) {
    return globalThis.__fbThemeConfig;
  }

  // 1. Global Redis / Vercel KV (source of truth across all serverless cold starts)
  const redisCfg = await readFromRedis();
  if (redisCfg) {
    globalThis.__fbThemeConfig = redisCfg;
    globalThis.__fbThemeFetchedAt = now;
    return redisCfg;
  }

  // 2. Local disk (dev) or warm memory fallback
  if (globalThis.__fbThemeConfig) {
    return globalThis.__fbThemeConfig;
  }
  try {
    const raw = await fs.readFile(CONFIG_PATH, 'utf-8');
    const parsed = sanitizeConfig(JSON.parse(raw), defaultThemeConfig as SiteThemeConfig);
    globalThis.__fbThemeConfig = parsed;
    globalThis.__fbThemeFetchedAt = now;
    return parsed;
  } catch {
    return { ...(defaultThemeConfig as SiteThemeConfig) };
  }
}

export async function readThemeConfig(cookieHeader?: string | null): Promise<SiteThemeConfig> {
  const base = await readBaseConfig();

  // If Redis is NOT configured, honor fb_theme_cfg cookie so operator changes stick across cold starts
  if (!getRedisCreds() && cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)fb_theme_cfg=([^;]+)/);
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        if (parsed && ALLOWED_THEMES.has(parsed.activeTheme)) {
          return sanitizeConfig(parsed, base);
        }
      } catch {
        // ignore malformed cookie
      }
    }
  }
  return base;
}

export async function writeThemeConfig(nextConfig: SiteThemeConfig): Promise<boolean> {
  globalThis.__fbThemeConfig = nextConfig;
  globalThis.__fbThemeFetchedAt = Date.now();

  const [redisOk, ghOk] = await Promise.all([
    writeToRedis(nextConfig),
    writeToGitHub(nextConfig),
  ]);

  let diskOk = false;
  try {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(nextConfig, null, 2) + '\n', 'utf-8');
    diskOk = true;
  } catch {
    diskOk = false;
  }

  return redisOk || ghOk || diskOk;
}
