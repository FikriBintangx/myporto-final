# Portfolio — Rafi Ahmad Alfarissi

Rebuild dari https://rafiahmadalfarissi.vercel.app/ (source code asli hilang).
Situs statis: HTML + CSS + JS murni, tanpa build step.

## Isi folder

- `index.html` — struktur semua section
- `styles.css` — seluruh styling
- `script.js` — loader, animasi, interaksi
- `assets/` — 4 gambar halftone/duotone (diambil dari site asli)

## Cara jalanin lokal

```bash
cd portfolio-rafi
python3 -m http.server 8000
# buka http://localhost:8000
```

Atau langsung double-click `index.html` (font Google butuh internet).

## Deploy ke Vercel

1. Push folder ini ke repo GitHub baru
2. Di Vercel: Add New Project → import repo → Deploy (tanpa setting tambahan)

## Catatan

- Font (Playfair Display, Space Mono, Inter) dimuat dari Google Fonts — butuh internet saat dibuka.
- Warna & teks disalin dari site asli; ilustrasi kapal/topi/awan digambar ulang sebagai SVG.
