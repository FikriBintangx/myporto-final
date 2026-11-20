# SOUL.MD — DOKTRIN PENGENDALIAN DIRI & ANTI-KECEROBOHAN AI

═══════════════════════════════════════════════════════════════════════════════
[ATURAN BESI: JANGAN SOK TAU, JANGAN SEMBARANGAN EDIT / COPY FILE]
═══════════════════════════════════════════════════════════════════════════════

Doktrin ini lahir dari kesalahan fatal di mana AI sok berinisiatif menimpa file (`cp public/... root/...`) dan mengutak-atik kode yang sudah selesai dikerjakan secara presisi oleh Claude/Biru:

---

## 1. DILARANG KERAS SOK TAU MENYINKRONKAN / MENIMPA FILE (ZERO ARBITRARY TOUCH)
- **HUKUM MUTLAK:** DILARANG melakukan `cp`, menimpa, merestore, atau "membersihkan" file antar folder tanpa perintah eksplisit satu kata pun dari Biru!
- Jika Claude atau Biru sudah bekerja di file tertentu (contoh: `public/portfolio-assets/` dan `src/pages/portfolio.astro`), maka file-file lain (seperti copy-an root `portfolio-assets/`) **DILARANG DISENTUH**.
- Tugas AI saat disuruh build & push adalah **HANYA** memvalidasi build (`npm run build`) dan melakukan commit/push apa yang ada. Tidak boleh sok inisiatif menambah "perbaikan kecil" atau copy file cadangan.

---

## 2. JANGAN NGEJAR "BUG PALSU" TANPA RISET REFERENSI NYATA
- Jangan pernah mengira suatu perilaku visual di layar adalah bug sebelum melihat referensi aslinya.
- Contoh kasus ArtCraft:
  - Tumpukan horizontal di kanan bawah (`queue`) dan kanan atas (`piled`) adalah **fitur desain sistem antrean resmi** dari `getartcraft.com`, BUKAN layout rusak.
  - Jangan panik lalu membongkar CSS/JS hanya karena berasumsi sendiri. Riset polanya, pahami filosofi interaksinya, baru bertindak.

---

## 3. HARAM MEMBACA DOM DI DALAM LOOP ANIMASI (LAYOUT THRASHING BAN)
- **Haram hukumnya** memanggil `getBoundingClientRect()`, `offsetWidth`, `offsetHeight`, atau query selector DOM di dalam loop `requestAnimationFrame` atau `gsap.ticker`.
- **Pola Wajib:**
  - `measure()`: Baca seluruh geometri DOM **hanya satu kali** saat event `load`, `resize`, `ResizeObserver`, atau font ready.
  - `frame()`: Murni operasi aritmatika (pure math) dan menulis nilai ke GPU via `translate3d(x, y, 0) rotate(deg)`. Nol DOM reads per frame.

---

## 4. JANGAN CAMPUR CSS TRANSITION DENGAN ANIMASI JAVASCRIPT (rAF)
- Jika sebuah elemen CSS propertinya (`transform`, `opacity`, koordinat) di-update setiap frame oleh script JavaScript, **DILARANG MEMASANG CSS `transition`**.
- CSS transition memaksa browser melakukan interpolasi lambat antar-frame, yang menyebabkan elemen visual tertinggal 1–2 langkah di belakang gerakan kursor atau scroll pengguna (menghasilkan efek stuttering / rubber-banding).

---

## 5. PAHAMI LIFECYCLE BUNDLER (ASTRO `is:inline` & GLOBAL SCOPE)
- Di Astro, script CDN library (Lenis, GSAP, dsb) **wajib** menggunakan atribut `is:inline` jika harus dievaluasi sinkron sebelum script client lain dieksekusi.
- Instance library penting wajib diekspos ke objek `window` (`window.lenis = lenis`) agar tidak terkunci di local ESM scope dan menyebabkan script eksternal jatuh ke native fallback.

---

## 6. SADAR ENVIRONMENT (PORT & TAB CHECK)
- Jangan berhalusinasi mengklaim situs berbeda tanpa memeriksa port mana yang sedang dibuka Biru:
  - Port `4321`: Server Astro Dev aktif.
  - Port `3088`: Server static preview lama.
  - Production: Web Vercel dengan cache Cloudflare yang butuh hard refresh (`Cmd + Shift + R`).
