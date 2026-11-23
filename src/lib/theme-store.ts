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

declare global {
  var __fbThemeConfig: SiteThemeConfig | undefined;
}

export async function readThemeConfig(cookieHeader?: string | null): Promise<SiteThemeConfig> {
  // 1. Check cookie override first (works seamlessly on stateless Vercel serverless)
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)fb_theme_cfg=([^;]+)/);
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        if (parsed && ALLOWED_THEMES.has(parsed.activeTheme)) {
          const base = await readBaseConfig();
          return {
            ...base,
            activeTheme: parsed.activeTheme,
            colorMode: ALLOWED_MODES.has(parsed.colorMode) ? parsed.colorMode : base.colorMode,
            defaultLang: ALLOWED_LANGS.has(parsed.defaultLang) ? parsed.defaultLang : base.defaultLang,
            enable3DGithub: typeof parsed.enable3DGithub === 'boolean' ? parsed.enable3DGithub : base.enable3DGithub,
            enableAsciiArt: typeof parsed.enableAsciiArt === 'boolean' ? parsed.enableAsciiArt : base.enableAsciiArt,
            enableHeroVideo: typeof parsed.enableHeroVideo === 'boolean' ? parsed.enableHeroVideo : base.enableHeroVideo,
            enableRulerSidebar: typeof parsed.enableRulerSidebar === 'boolean' ? parsed.enableRulerSidebar : base.enableRulerSidebar,
            updatedAt: parsed.updatedAt || base.updatedAt,
          };
        }
      } catch {
        // ignore malformed cookie
      }
    }
  }
  return readBaseConfig();
}

async function readBaseConfig(): Promise<SiteThemeConfig> {
  if (globalThis.__fbThemeConfig) {
    return globalThis.__fbThemeConfig;
  }
  try {
    const raw = await fs.readFile(CONFIG_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as SiteThemeConfig;
    globalThis.__fbThemeConfig = parsed;
    return parsed;
  } catch {
    return { ...(defaultThemeConfig as SiteThemeConfig) };
  }
}

export async function writeThemeConfig(nextConfig: SiteThemeConfig): Promise<boolean> {
  globalThis.__fbThemeConfig = nextConfig;
  try {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(nextConfig, null, 2) + '\n', 'utf-8');
    return true;
  } catch {
    return false;
  }
}
