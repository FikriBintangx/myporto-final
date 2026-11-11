import type { APIRoute } from 'astro';

// Fallback Google Apps Script Web App URL if not defined in process.env
const APPS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL ||
  process.env.TELEMETRY_WEBHOOK_URL ||
  '';

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      status: 'active',
      service: 'fikribintang.web.id Visitor Telemetry Hub',
      appsScriptConfigured: Boolean(APPS_SCRIPT_URL),
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    let payload: Record<string, any> = {};

    try {
      const rawBody = await request.text();
      if (rawBody && rawBody.trim().length > 0) {
        payload = JSON.parse(rawBody);
      }
    } catch {
      payload = {};
    }

    // Server-side enrichment via Vercel & edge headers
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      payload.ip ||
      'Unknown';

    const clientCountry =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      payload.country ||
      'Unknown';

    const clientCity =
      request.headers.get('x-vercel-ip-city') ||
      payload.city ||
      'Unknown';

    // Enrich payload if client was unresolved
    if (!payload.ip || payload.ip === 'Unknown') {
      payload.ip = clientIp;
    }
    if (!payload.country || payload.country === 'Unknown') {
      payload.country = clientCountry;
    }
    if (!payload.city || payload.city === 'Unknown') {
      payload.city = clientCity;
    }
    if (!payload.referrer) {
      payload.referrer = request.headers.get('referer') || 'Direct';
    }

    // Forward to Google Apps Script Web App if configured
    if (APPS_SCRIPT_URL && APPS_SCRIPT_URL.startsWith('http')) {
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
          },
          body: JSON.stringify(payload)
        });
      } catch (upstreamErr) {
        console.error('[Telemetry] Upstream Apps Script forward error:', upstreamErr);
      }
    }

    return new Response(JSON.stringify({ success: true, timestamp: payload.timestamp }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 200, // keep 200 to not fail client telemetry
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
