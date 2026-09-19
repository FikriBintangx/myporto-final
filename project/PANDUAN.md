# PANDUAN PENGELOLAAN PROYEK

Folder ini adalah tempat terpusat untuk semua foto, screenshot, dan deskripsi proyek kamu.

## Struktur Folder Proyek
Setiap proyek memiliki folder tersendiri:
```
project/
├── 01-jurnal-ku/
│   ├── cover.png           <- Foto utama / thumbnail (tampil di Globe & Card)
│   ├── info.json           <- Judul, deskripsi (ID/EN), tag, dan link
│   └── screenshots/        <- Screenshot tambahan (opsional, untuk galeri modal)
│       ├── screen1.png
│       └── screen2.png
├── 02-kiise-coffee/
│   ├── cover.png
│   └── info.json
└── ...
```

## Cara Edit Deskripsi & Link Proyek
Buka file `info.json` di dalam folder proyek yang bersangkutan:
```json
{
  "id": "jurnal-ku",
  "title": "JURNAL KU",
  "tags": ["React", "Node.js", "Vercel"],
  "link": "https://dejurnal.vercel.app/",
  "shortDescId": "Deskripsi singkat untuk kartu proyek di halaman depan (Bahasa Indonesia).",
  "shortDescEn": "Short description for project card (English).",
  "descriptionId": "<p>Deskripsi lengkap untuk modal pop-up...</p>",
  "descriptionEn": "<p>Full detailed description for modal pop-up...</p>"
}
```

## Cara Tambah Proyek Baru
1. Buat folder baru, contoh `project/07-nama-proyek/`.
2. Taruh foto utama sebagai `cover.png` (bisa juga JPG, WebP).
3. Buat file `info.json` sesuai template di atas.
4. Jika ada screenshot tambahan, buat sub-folder `screenshots/` dan masukkan foto-fotonya.
5. Jalankan perintah di terminal:
   ```bash
   npm run sync
   ```
   (Catatan: saat menjalankan `npm run dev` atau `npm run build`, sinkronisasi ini juga otomatis berjalan).
