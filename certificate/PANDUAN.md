# PANDUAN UPLOAD SERTIFIKAT

Folder ini adalah tempat untuk sertifikat yang ingin kamu tampilkan di Globe 3D interaktif.

## Cara Menambahkan Sertifikat
1. Cukup masukkan file gambar sertifikat (format `.png`, `.jpg`, `.jpeg`, atau `.webp`) langsung ke dalam folder `certificate/`.
   Contoh:
   - `certificate/sertifikat-dicoding-web.png`
   - `certificate/google-cloud-certification.jpg`
2. Nama file akan otomatis diubah menjadi judul polaroid (misal `sertifikat-dicoding-web.png` menjadi `Sertifikat Dicoding Web`).
3. Jalankan perintah di terminal:
   ```bash
   npm run sync
   ```
4. Sertifikat akan langsung muncul sebagai foto Polaroid yang melayang di Globe 3D! Ketika diklik oleh pengunjung, akan muncul modal pop-up pratinjau sertifikat.
