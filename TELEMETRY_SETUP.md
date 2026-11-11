# 📡 Portfolio Visitor Telemetry & Analytics Hub
**Target Website:** [fikribintang.web.id](https://fikribintang.web.id)  
**Repository:** [https://github.com/FikriBintangx/myporto-final](https://github.com/FikriBintangx/myporto-final)  
**Google Sheet Analytics Hub:** [1POl1a7TytH3tBr3ihWZHZwCK6-AEeYilR_TmyNQYsK4](https://docs.google.com/spreadsheets/d/1POl1a7TytH3tBr3ihWZHZwCK6-AEeYilR_TmyNQYsK4/edit) (Tab: `Visitors`)

---

## 1. Arsitektur Sistem Telemetri

Sistem telemetri ini dirancang dengan prinsip **Zero Render Blocking**, **Privacy-Safe**, dan **High Availability** menggunakan dual-layer delivery:

```
[ Visitor Browser ] 
        │
        ├─► Non-blocking beacon (navigator.sendBeacon / fetch keepalive)
        │
   ┌────┴──────────────────────────────┐
   ▼                                   ▼
[ Tier A: First-Party Astro API ]    [ Tier B: Direct Apps Script ]
(https://fikribintang.web.id/api/telemetry)  (https://script.google.com/macros/s/.../exec)
   │  - Enriches IP/Country/City        │
   │    via Vercel Edge Headers         │
   │  - Bypass AdBlocker                │
   └───────────────┬───────────────────┘
                   ▼
     [ Google Apps Script Web App ]
                   │ LockService (Concurrency Safe)
                   ▼
     [ Google Sheet: "Visitors" Tab ]
```

---

## 2. Struktur Data Tabel Google Sheet ("Visitors")

Header telah dibuat dan diformat dengan Dark Slate background (`#1E293B`), white text (`#FFFFFF`), bold, dan auto-centered:

| Index | Header Kolom | Deskripsi | Contoh Data |
|---|---|---|---|
| A (1) | **No** | Auto-incrementing row ID | `1` |
| B (2) | **Timestamp (WIB)** | Waktu kunjungan dalam format GMT+7 | `2026-11-11 09:50:00 WIB` |
| C (3) | **Path** | Halaman/URL yang dikunjungi | `/portfolio`, `/` |
| D (4) | **Referrer** | Sumber asal pengunjung | `https://google.com`, `Direct` |
| E (5) | **IP** | IP Publik pengunjung | `182.253.160.1` |
| F (6) | **Country** | Negara asal pengunjung | `Indonesia` |
| G (7) | **City** | Kota asal pengunjung | `Tangerang`, `Jakarta` |
| H (8) | **Browser/OS** | User-agent yang telah diparsing bersih | `Chrome 134 / macOS` |
| I (9) | **Device** | Klasifikasi tipe perangkat | `Desktop`, `Mobile`, `Tablet` |
| J (10) | **Screen** | Resolusi layar & device pixel ratio | `1920x1080 (2x)` |
| K (11) | **Session ID** | Token sesi unik per browser session | `ses_m3a9x1_8k2p` |

---

## 3. Komponen Implementasi

### A. Client-Side Telemetry Engine (`public/telemetry.js` & `src/scripts/telemetry.js`)
* **Ukuran:** < 3 KB (Zero dependency).
* **Eksekusi:** Ditunda via `requestIdleCallback` (fallback `load` event) sehingga FCP (First Contentful Paint) dan LCP (Largest Contentful Paint) tidak terpengaruh 0ms.
* **Geo & IP Resolution:** Multi-tier fallback resilience:
  1. `https://ipapi.co/json/` (Primary)
  2. `https://freeipapi.com/api/json` (Secondary)
  3. `https://www.cloudflare.com/cdn-cgi/trace` (Tertiary)
  4. `https://api.ipify.org?format=json` (Fallback)
* **Deduplikasi & Cooldown:** Cooldown 3 menit per URL path via `sessionStorage` untuk mencegah spam saat visitor me-refresh halaman berulang kali.
* **Transmisi:** `navigator.sendBeacon` menggunakan format `text/plain` (preflight-free / tanpa hambatan CORS) dengan fallback `fetch(..., { keepalive: true, mode: 'no-cors' })`.

### B. Server-Side Proxy Endpoint (`src/pages/api/telemetry.ts`)
* Endpoint Astro SSR yang berjalan di Vercel Edge/Serverless.
* Membaca langsung header `x-forwarded-for`, `x-vercel-ip-country`, `x-vercel-ip-city`.
* Meneruskan payload ke Google Apps Script tanpa mengekspos API key atau sheet URL di client.

### C. Google Apps Script Web App Handler (`scripts/telemetry_receiver.gs`)
* Berisi fungsi `doPost(e)` dan `doGet(e)` dengan `LockService` 10 detik untuk menangani traffic bersamaan tanpa duplikasi atau tabrakan nomor baris.
* Secara otomatis mengalkulasi nomor urut (`No`), memformat timestamp WIB, dan meng-append baris baru.

---

## 4. Panduan Deployment Google Apps Script

Untuk mengaktifkan penerimaan data langsung ke Google Sheet:

1. Buka [Google Apps Script](https://script.google.com/).
2. Buat project baru dengan judul: **`Portfolio-Visitor-Telemetry`**.
3. Buka file `scripts/telemetry_receiver.gs` di repo ini, lalu copy seluruh isinya ke editor `Code.gs` di Google Apps Script.
4. Klik tombol **Deploy** di pojok kanan atas ➜ **New deployment**.
5. Klik ikon gear di samping "Select type", pilih **Web app**.
6. Atur konfigurasi berikut:
   * **Description:** `Production Visitor Telemetry Webhook`
   * **Execute as:** `Me (akun Google Anda)`
   * **Who has access:** `Anyone` *(WAJIB 'Anyone' agar webhook dapat menerima data dari browser visitor tanpa otentikasi login)*
7. Klik **Deploy**.
8. Setujui izin akses akun Google jika diminta (Authorize Access).
9. Salin URL Web App yang dihasilkan. Format URL:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## 5. Menghubungkan Web App ke Portfolio (Vercel)

Terdapat 2 opsi konfigurasi (pilih salah satu atau keduanya):

### Opsi 1: Melalui Environment Variable Vercel (Direkomendasikan)
Di dashboard Vercel pada project `myporto-final`:
1. Masuk ke **Settings** ➜ **Environment Variables**.
2. Tambahkan variabel baru:
   * **Key:** `GOOGLE_APPS_SCRIPT_URL`
   * **Value:** `<URL_WEB_APP_APPS_SCRIPT>`
3. Redeploy project. Endpoint `/api/telemetry` akan otomatis meneruskan semua telemetri ke Google Sheet.

### Opsi 2: Konfigurasi Client Langsung
Tambahkan script konfigurasi sebelum pemanggilan `telemetry.js` pada halaman HTML:
```html
<script>
  window.__GOOGLE_APPS_SCRIPT_URL__ = "https://script.google.com/macros/s/AKfycb.../exec";
</script>
<script is:inline src="/telemetry.js"></script>
```

---

## 6. Verifikasi & Pengujian

### Uji Coba Manual via CLI
Jalankan perintah berikut untuk menguji append baris ke Google Sheet melalui `gsheets` CLI:
```bash
gsheets mutate append 1POl1a7TytH3tBr3ihWZHZwCK6-AEeYilR_TmyNQYsK4 "Visitors" "2,2026-11-11 10:00:00 WIB,/portfolio,https://github.com,182.253.160.1,Indonesia,Jakarta,Chrome 134 / macOS,Desktop,1920x1080 (2x),ses_test_cli"
```

### Uji Coba Webhook via cURL
Setelah mendeploy Google Apps Script Web App:
```bash
curl -X POST "https://script.google.com/macros/s/AKfycb.../exec" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/portfolio",
    "referrer": "https://linkedin.com",
    "ip": "180.252.100.5",
    "country": "Indonesia",
    "city": "Tangerang",
    "browser": "Safari 18 / iOS 18",
    "device": "Mobile",
    "screen": "393x852 (3x)",
    "sessionId": "ses_manual_curl"
  }'
```

Output yang diharapkan:
```json
{"status":"success","no":2,"path":"/portfolio"}
```
Row baru akan langsung muncul di tab `Visitors` pada Google Sheet Anda.
