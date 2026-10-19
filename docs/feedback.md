# Feedback GNET Network

## Untuk pemilik website

Tombol **Feedback** melayang di kanan bawah semua halaman. Pengunjung memilih rating 1–5, nama opsional, kategori, dan masukan 10–1.500 karakter. Rating ini untuk pengalaman menjelajahi website, bukan klaim penilaian layanan internet. Masukan bersifat privat untuk tim GNET; tidak ada daftar ulasan publik atau agregasi rating SEO.

Data disimpan di **Vercel Blob private**, store `gnetnetwork-feedback` (`store_JK4ytjweePRBf1yy`, Singapore/sin1), terhubung ke environment Production project `gnetnetwork`. Buka dashboard Vercel, cari store tersebut pada Storage, lalu pilih file di folder `feedback/YYYY-MM-DD/`. Setiap kiriman menjadi satu file `.txt` berisi record JSON yang mudah dibaca. File tidak dapat dibaca publik melalui URL tanpa autentikasi.

Satu file per kiriman menghindari risiko dua pengunjung menimpa satu shared log. File lokal di filesystem Vercel Function tidak digunakan untuk penyimpanan permanen.

### Ekspor semua feedback menjadi satu log TXT

Dari root project, setelah login Vercel CLI:

```sh
npx vercel env pull .env.feedback.local --environment production --scope puji-ermantos-projects
node --env-file=.env.feedback.local scripts/export-feedback.mjs /private/tmp/gnet-feedback-export.txt
```

Gunakan Node 22.19+ / 24. Jangan bagikan file `.env*` atau commit file log yang berisi masukan pengunjung. `.env*`, docs, tests, dan feedback-export*.txt dikecualikan dari upload deployment sesuai konfigurasi. Hasil ekspor hanya dibuat lokal dengan permission 0600. Ekspor tidak menghapus data asli.

## Validasi & anti-spam

- Rating harus integer 1–5. Nama opsional maksimal 80 karakter. Kategori harus dari daftar yang tersedia.
- Daftar kata kasar Bahasa Indonesia/Inggris diperiksa di browser dan **di server**. Normalisasi mencakup huruf besar, sebagian substitusi angka, karakter tak terlihat, pemisah, dan pengulangan huruf. Daftar dapat diedit di `lib/feedback-policy.mjs`; deklarasi tipe ada di `.d.mts`.
- Filter berbasis daftar kata tidak dapat menjamin semua bahasa/konteks/penyamaran akan tertangkap. Kritik sopan dan rating rendah diperbolehkan. Perbarui daftar jika muncul false positive atau kata yang terlewat.
- Kiriman hanya melalui POST JSON dari origin GNET yang diizinkan. Ada batas payload dan kolom honeypot.
- Maksimal satu file per identitas jaringan pada satu bucket menit UTC. Ini pembatasan per jaringan bersama, bukan per orang. Pergantian bucket dapat mengizinkan dua kiriman dekat batas menit. Pengguna jaringan sama mungkin diminta menunggu.
- Identitas jaringan dipseudonimkan dengan HMAC server (`FEEDBACK_HASH_SECRET`); IP mentah tidak ditulis dalam record atau nama file. Nama file mengandung digest pendek untuk pembatasan kiriman.
- Penulisan memakai `allowOverwrite:false`, sehingga kiriman bersamaan tidak saling menggantikan dan batas tidak bergantung pada memori satu instance server.
- Error penyimpanan tidak pernah menampilkan pesan sukses. Pesan baru dianggap diterima setelah storage berhasil menulis file.

## Implementasi

- Widget: `src/components/Feedback.astro`, dipasang di layout semua halaman.
- API: `api/feedback.mjs` (Vercel Node Function).
- Filter/validasi bersama: `lib/feedback-policy.mjs`.
- Secret storage disediakan otomatis oleh koneksi Blob; HMAC secret tersimpan sebagai secret environment Production. Tidak ada credential di bundle browser.
- API hanya menerima tulisan; tidak menyediakan pembacaan file feedback publik.
- Tes: `npm run test:feedback`. Preview Astro lokal menampilkan UI; pengiriman API membutuhkan Vercel Functions dan konfigurasi storage, bukan hanya `astro dev`.

Referensi: https://vercel.com/docs/vercel-blob/private-storage dan https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions

## Verifikasi produksi

Terdapat dua entri berlabel **GNET QA — TEST TEKNIS** dan **GNET QA — TEST RATE LIMIT** sebagai bukti uji penyimpanan; keduanya bukan feedback pelanggan. Kiriman 4 bintang dan 1 bintang berhasil disimpan dan dibaca kembali. Akses URL file tanpa autentikasi menghasilkan 403; pembatasan kiriman menghasilkan 429; kata kasar ditolak server dengan 400. Ekspor TXT berhasil diuji.
