import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import {
  ALLOWED_LANGS,
  ALLOWED_MODES,
  ALLOWED_THEMES,
  readThemeConfig,
  writeThemeConfig,
  type SiteThemeConfig,
} from '../../../lib/theme-store';

const WEAK_SECRETS = new Set(['', '1234', '123456', 'admin', 'password', 'root', '000000']);
const FALLBACK_KEY_SHA256 = '3460252381bbd3eacc55daa78e3525de6ad25ec107330a1bc4792f6e6cc60d59';

function resolveMasterDigest(): Buffer {
  const envKey = (process.env.ADMIN_ACCESS_KEY || '').trim();
  if (envKey && !WEAK_SECRETS.has(envKey.toLowerCase())) {
    return crypto.createHash('sha256').update(envKey).digest();
  }
  return Buffer.from(FALLBACK_KEY_SHA256, 'hex');
}

function verifyKeyTimingSafe(supplied: string): boolean {
  const clean = (supplied || '').trim();
  if (!clean || WEAK_SECRETS.has(clean.toLowerCase())) return false;
  const hSupplied = crypto.createHash('sha256').update(clean).digest();
  const hMaster = resolveMasterDigest();
  if (hSupplied.length !== hMaster.length) return false;
  return crypto.timingSafeEqual(hSupplied, hMaster);
}

export const GET: APIRoute = async ({ request }) => {
  const cfg = await readThemeConfig(request.headers.get('cookie'));
  return new Response(JSON.stringify({ ok: true, config: cfg }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  let body: any = null;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const suppliedKey = request.headers.get('x-admin-key') || body?.key || '';
  if (!verifyKeyTimingSafe(suppliedKey)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  const cookieHeader = request.headers.get('cookie');
  const action = body?.action || 'verify';

  if (action === 'verify') {
    const current = await readThemeConfig(cookieHeader);
    return new Response(JSON.stringify({ ok: true, authenticated: true, config: current }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  if (action === 'update') {
    const incoming = body?.config || {};
    const current = await readThemeConfig(cookieHeader);

    const nextConfig: SiteThemeConfig = {
      activeTheme: ALLOWED_THEMES.has(incoming.activeTheme) ? incoming.activeTheme : current.activeTheme,
      colorMode: ALLOWED_MODES.has(incoming.colorMode) ? incoming.colorMode : current.colorMode,
      defaultLang: ALLOWED_LANGS.has(incoming.defaultLang) ? incoming.defaultLang : current.defaultLang,
      enable3DGithub: typeof incoming.enable3DGithub === 'boolean' ? incoming.enable3DGithub : current.enable3DGithub,
      enableAsciiArt: typeof incoming.enableAsciiArt === 'boolean' ? incoming.enableAsciiArt : current.enableAsciiArt,
      enableHeroVideo: typeof incoming.enableHeroVideo === 'boolean' ? incoming.enableHeroVideo : current.enableHeroVideo,
      enableRulerSidebar: typeof incoming.enableRulerSidebar === 'boolean' ? incoming.enableRulerSidebar : current.enableRulerSidebar,
      updatedAt: new Date().toISOString(),
    };

    const persistedToDisk = await writeThemeConfig(nextConfig);
    const cookieVal = encodeURIComponent(JSON.stringify(nextConfig));

    return new Response(
      JSON.stringify({ ok: true, persistedToDisk, config: nextConfig }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'Set-Cookie': `fb_theme_cfg=${cookieVal}; Path=/; Max-Age=2592000; SameSite=Lax`,
        },
      }
    );
  }

  return new Response(JSON.stringify({ error: 'Unknown action' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
};
