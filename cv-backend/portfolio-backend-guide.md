# Portofolio → Backend Engineer: panduan pangkas

Target: recruiter paham lo backend dalam 10 detik, tanpa scroll animasi.

## 1. Hero copy baru

**Headline:**
> Backend Engineer. I build APIs that stay fast under load.

**Sub (1 kalimat):**
> Go, Python, and PostgreSQL services: cut P99 latency 71.6% at 10k+ req/sec, semantic search on pgvector, Redis rate limiting.

**CTA (2 tombol aja):** `GitHub` · `Download CV (PDF)`

Hapus: tagline "Mobile & Web UI/UX Engineer", typing effect, counter animasi, foto dengan efek parallax.

## 2. Format kartu proyek backend

Satu kartu = satu layar. Urutan field tetap, sama di semua kartu:

```
┌───────────────────────────────────────────────────────────┐
│ SmartOps Dual-Engine                      [GitHub repo →] │
│ gRPC vs REST benchmark for internal ops services          │
│                                                           │
│ RESULT   P99 −71.6% · 10,000+ req/sec · 0 errors @ peak   │
│ STACK    Go · Node.js · gRPC/Protobuf · Docker · k6       │
│                                                           │
│ [Architecture diagram — static SVG]                       │
│  client → LB → REST svc ┐                                 │
│               → gRPC svc ┴→ PostgreSQL / Redis            │
│                                                           │
│ BENCHMARK (table, bukan chart animasi)                    │
│  engine | P50  | P95  | P99  | req/s                      │
│  REST   | ...  | ...  | ...  | ...                        │
│  gRPC   | ...  | ...  | ...  | ...                        │
│                                                           │
│ SCHEMA   ▸ expandable: CREATE TABLE ... / ERD gambar      │
│ DECISION 2–3 baris: kenapa gRPC, trade-off yang diterima  │
└───────────────────────────────────────────────────────────┘
```

Aturan kartu:
- **RESULT di atas.** Angka dulu, cerita belakangan.
- **Diagram statis** (SVG/PNG dari Excalidraw atau Mermaid). Ga ada rotasi, hover-tilt, atau 3D folder.
- **Tabel benchmark asli** dengan tanggal run dan command-nya (`k6 run load.js`). Kalau angkanya ga bisa direproduksi dari repo, jangan dipajang.
- **Schema** bisa dilipat (`<details>`), isinya DDL atau ERD.
- **Link repo** langsung ke folder yang relevan, dan README repo-nya harus punya: cara jalanin, diagram yang sama, hasil benchmark.
- Mockup iPhone/Android: buang dari kartu backend. Kalau perlu screenshot, satu gambar kecil di bawah, bukan hero kartu.

Urutan proyek: SmartOps → JurnalKu/NotesBrain → Gatekeeper → Wahana API. Proyek murni UI (Kiise Coffee, Marimatcha, Mobilku) pindah ke satu baris "Other work" berisi link aja, atau hapus.

## 3. Yang di-cut / di-hide

Hapus total dari halaman utama:
- Ruler scroll di rail kanan + menu nama ruler
- Swarm rebuild / build mode header trigger
- Footer crowd animation
- Kartu 3D paper folder dan preview tilt
- Telemetry hub yang tampil ke pengunjung (simpan di belakang, jangan dipamerin)
- Section About panjang; ganti 2 kalimat
- Galeri sertifikat; cukup daftar teks 3 sertifikat paling relevan backend/cloud, sisanya hapus
- Skill bar / persentase skill

Struktur final (4 section, satu halaman):
1. Hero (headline + sub + 2 tombol)
2. Projects (4 kartu backend)
3. Stack (satu baris teks, sama dengan CV)
4. Contact (email + GitHub + LinkedIn)

Cek akhir: buka di HP, hitung scroll sampai proyek pertama. Kalau lebih dari satu layar, potong lagi.
