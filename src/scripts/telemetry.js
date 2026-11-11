/**
 * Portfolio Visitor Telemetry & Analytics Tracker
 * Target: fikribintang.web.id
 *
 * Lightweight, non-blocking, asynchronous visitor telemetry module.
 * Collects navigation, device, viewport, session, and Geo/IP metadata
 * and dispatches telemetry beacons to Google Sheets / Apps Script Web App.
 */

(function () {
  'use strict';

  // Prevent multiple executions on the same page
  if (typeof window === 'undefined') return;
  if (window.__FB_TELEMETRY_INITIALIZED__) return;
  window.__FB_TELEMETRY_INITIALIZED__ = true;

  // Configuration - Can be overridden before or after via window.__FB_TELEMETRY_CONFIG__
  var config = Object.assign(
    {
      appsScriptUrl: window.__GOOGLE_APPS_SCRIPT_URL__ || '',
      apiEndpoint: '/api/telemetry',
      sessionCooldownMs: 180000,
      debug: false
    },
    window.__FB_TELEMETRY_CONFIG__ || {}
  );

  function log() {
    if (config.debug && window.console && console.log) {
      console.log.apply(console, ['[Telemetry]'].concat(Array.prototype.slice.call(arguments)));
    }
  }

  function getSessionId() {
    var key = 'fb_telemetry_sid';
    var sid = null;
    try {
      sid = sessionStorage.getItem(key);
      if (!sid) {
        sid = 'ses_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
        sessionStorage.setItem(key, sid);
      }
    } catch (e) {
      sid = 'ses_transient_' + Math.random().toString(36).substring(2, 9);
    }
    return sid;
  }

  function parseBrowserOs() {
    var ua = navigator.userAgent || '';
    var os = 'Unknown OS';
    var browser = 'Unknown Browser';

    if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
    else if (/Windows NT 6.3/i.test(ua)) os = 'Windows 8.1';
    else if (/Windows NT 6.1/i.test(ua)) os = 'Windows 7';
    else if (/Android/i.test(ua)) {
      var androidMatch = ua.match(/Android\s([0-9.]+)/i);
      os = androidMatch ? 'Android ' + androidMatch[1] : 'Android';
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      var iosMatch = ua.match(/OS\s([0-9_]+)/i);
      os = iosMatch ? 'iOS ' + iosMatch[1].replace(/_/g, '.') : 'iOS';
    } else if (/Macintosh|Mac OS X/i.test(ua)) {
      os = 'macOS';
    } else if (/CrOS/i.test(ua)) {
      os = 'ChromeOS';
    } else if (/Linux/i.test(ua)) {
      os = 'Linux';
    }

    if (/Edg\//i.test(ua)) {
      var edgMatch = ua.match(/Edg\/([0-9]+)/i);
      browser = 'Edge ' + (edgMatch ? edgMatch[1] : '');
    } else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) {
      var oprMatch = ua.match(/OPR\/([0-9]+)/i);
      browser = 'Opera ' + (oprMatch ? oprMatch[1] : '');
    } else if (/SamsungBrowser\//i.test(ua)) {
      var smMatch = ua.match(/SamsungBrowser\/([0-9.]+)/i);
      browser = 'Samsung Internet ' + (smMatch ? smMatch[1] : '');
    } else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) {
      var crMatch = ua.match(/Chrome\/([0-9]+)/i);
      browser = 'Chrome ' + (crMatch ? crMatch[1] : '');
    } else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) {
      var sfMatch = ua.match(/Version\/([0-9]+)/i);
      browser = 'Safari ' + (sfMatch ? sfMatch[1] : '');
    } else if (/Firefox\//i.test(ua)) {
      var ffMatch = ua.match(/Firefox\/([0-9]+)/i);
      browser = 'Firefox ' + (ffMatch ? ffMatch[1] : '');
    }

    return browser.trim() + ' / ' + os.trim();
  }

  function parseDevice() {
    var ua = navigator.userAgent || '';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet';
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)
    ) {
      return 'Mobile';
    }
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
      return 'Tablet';
    }
    return 'Desktop';
  }

  function getWibTimestamp() {
    try {
      var now = new Date();
      var options = {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      var parts = new Intl.DateTimeFormat('en-CA', options).formatToParts(now);
      var map = {};
      parts.forEach(function (p) {
        map[p.type] = p.value;
      });
      return (
        map.year + '-' + map.month + '-' + map.day + ' ' + map.hour + ':' + map.minute + ':' + map.second + ' WIB'
      );
    } catch (e) {
      var d = new Date();
      var utc = d.getTime() + d.getTimezoneOffset() * 60000;
      var wib = new Date(utc + 7 * 3600000);
      var pad = function (n) {
        return n < 10 ? '0' + n : n;
      };
      return (
        wib.getFullYear() +
        '-' +
        pad(wib.getMonth() + 1) +
        '-' +
        pad(wib.getDate()) +
        ' ' +
        pad(wib.getHours()) +
        ':' +
        pad(wib.getMinutes()) +
        ':' +
        pad(wib.getSeconds()) +
        ' WIB'
      );
    }
  }

  async function resolveGeoIp() {
    var result = {
      ip: 'Unknown',
      country: 'Unknown',
      city: 'Unknown'
    };

    var fetchWithTimeout = function (url, timeoutMs) {
      var controller = new AbortController();
      var timer = setTimeout(function () {
        controller.abort();
      }, timeoutMs);
      return fetch(url, { signal: controller.signal })
        .then(function (res) {
          clearTimeout(timer);
          return res;
        })
        .catch(function (err) {
          clearTimeout(timer);
          throw err;
        });
    };

    // Tier 1: ipapi.co
    try {
      var res1 = await fetchWithTimeout('https://ipapi.co/json/', 2200);
      if (res1.ok) {
        var d1 = await res1.json();
        if (d1 && d1.ip) {
          result.ip = d1.ip;
          result.country = d1.country_name || d1.country || 'Unknown';
          result.city = d1.city || 'Unknown';
          return result;
        }
      }
    } catch (e) {
      log('ipapi.co unavailable or timed out, trying Tier 2...');
    }

    // Tier 2: freeipapi.com
    try {
      var res2 = await fetchWithTimeout('https://freeipapi.com/api/json', 2000);
      if (res2.ok) {
        var d2 = await res2.json();
        if (d2 && d2.ipAddress) {
          result.ip = d2.ipAddress;
          result.country = d2.countryName || 'Unknown';
          result.city = d2.cityName || 'Unknown';
          return result;
        }
      }
    } catch (e) {
      log('freeipapi.com unavailable or timed out, trying Tier 3...');
    }

    // Tier 3: Cloudflare cdn-cgi/trace
    try {
      var res3 = await fetchWithTimeout('https://www.cloudflare.com/cdn-cgi/trace', 1800);
      if (res3.ok) {
        var text = await res3.text();
        var lines = text.split('\n');
        var traceData = {};
        lines.forEach(function (line) {
          var parts = line.split('=');
          if (parts.length === 2) {
            traceData[parts[0].trim()] = parts[1].trim();
          }
        });
        if (traceData.ip) {
          result.ip = traceData.ip;
          result.country = traceData.loc || 'Unknown';
          result.city = 'Cloudflare Edge (' + (traceData.colo || 'Trace') + ')';
          return result;
        }
      }
    } catch (e) {
      log('Cloudflare trace unavailable, trying Tier 4...');
    }

    // Tier 4: api.ipify.org fallback
    try {
      var res4 = await fetchWithTimeout('https://api.ipify.org?format=json', 1500);
      if (res4.ok) {
        var d4 = await res4.json();
        if (d4 && d4.ip) {
          result.ip = d4.ip;
        }
      }
    } catch (e) {
      log('All external IP resolvers timed out.');
    }

    return result;
  }

  function transmitPayload(payload) {
    var rawJson = JSON.stringify(payload);
    var targets = [];

    if (config.appsScriptUrl && config.appsScriptUrl.indexOf('http') === 0) {
      targets.push({ url: config.appsScriptUrl, directAppsScript: true });
    }

    if (config.apiEndpoint) {
      targets.push({ url: config.apiEndpoint, directAppsScript: false });
    }

    if (targets.length === 0) {
      log('No telemetry endpoint configured.');
      return;
    }

    targets.forEach(function (target) {
      var sent = false;

      if (navigator.sendBeacon) {
        try {
          var blob = new Blob([rawJson], { type: 'text/plain;charset=UTF-8' });
          sent = navigator.sendBeacon(target.url, blob);
          if (sent) {
            log('Dispatched via sendBeacon to:', target.url);
          }
        } catch (e) {
          sent = false;
        }
      }

      if (!sent && window.fetch) {
        try {
          fetch(target.url, {
            method: 'POST',
            body: rawJson,
            keepalive: true,
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=UTF-8'
            }
          })
            .then(function () {
              log('Dispatched via fetch to:', target.url);
            })
            .catch(function (err) {
              log('Fetch transmission error:', err);
            });
        } catch (err) {
          log('Fetch invocation failed:', err);
        }
      }
    });
  }

  async function trackVisit() {
    var path = window.location.pathname + window.location.search;
    var sessionKey = 'fb_telemetry_last_' + encodeURIComponent(path);

    try {
      var lastSent = sessionStorage.getItem(sessionKey);
      if (lastSent && Date.now() - parseInt(lastSent, 10) < config.sessionCooldownMs) {
        log('Visit already recorded within cooldown window for:', path);
        return;
      }
    } catch (e) {}

    var referrer = document.referrer ? document.referrer : 'Direct / Bookmark';
    var screenRes = window.screen
      ? window.screen.width + 'x' + window.screen.height + ' (' + (window.devicePixelRatio || 1) + 'x)'
      : 'Unknown';
    var browserOs = parseBrowserOs();
    var device = parseDevice();
    var sessionId = getSessionId();
    var timestampWib = getWibTimestamp();

    var geo = await resolveGeoIp();

    var payload = {
      timestamp: timestampWib,
      path: path,
      referrer: referrer,
      ip: geo.ip,
      country: geo.country,
      city: geo.city,
      browser: browserOs,
      device: device,
      screen: screenRes,
      sessionId: sessionId
    };

    log('Recording telemetry payload:', payload);

    try {
      sessionStorage.setItem(sessionKey, Date.now().toString());
    } catch (e) {}

    transmitPayload(payload);
  }

  function scheduleTracking() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(function () {
        trackVisit();
      }, { timeout: 3000 });
    } else if (document.readyState === 'complete') {
      setTimeout(trackVisit, 200);
    } else {
      window.addEventListener('load', function () {
        setTimeout(trackVisit, 200);
      });
    }
  }

  window.__FB_TELEMETRY__ = {
    track: trackVisit,
    config: config
  };

  scheduleTracking();
})();
