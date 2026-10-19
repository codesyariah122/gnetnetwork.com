# Status deployment — 19 Oktober 2026

Website produksi: https://gnetnetwork.vercel.app
Dashboard: https://vercel.com/puji-ermantos-projects/gnetnetwork
Domain: https://vercel.com/puji-ermantos-projects/gnetnetwork/settings/domains

Deployment awal menggunakan Vercel Drop to Deploy atas folder `dist` hasil build Astro 7.4.0. Source tetap berada di project lokal. Pada pembaruan OG/SEO tanggal 19 Oktober 2026, source sudah dihubungkan ke project yang sama melalui Vercel CLI resmi dengan persetujuan pengguna. Deployment berikutnya: `npx vercel --prod --scope puji-ermantos-projects` dari root project. Belum ada integrasi Git atau deployment otomatis dari repository. `.env*` dikecualikan dari upload melalui `.vercelignore`.

## Domain custom — aktif dan terverifikasi

`gnetnetwork.com` sudah terdaftar pada environment Production.
`www.gnetnetwork.com` sudah terdaftar dengan redirect permanen 308 ke `gnetnetwork.com`.
Keduanya sudah Valid Configuration pada panel Vercel. Record Cloudflare berhasil diterapkan 19 Oktober 2026. HTTPS domain utama merespons 200 pada kelima halaman dan www berhasil mengalihkan ke https://gnetnetwork.com/. billing.gnetnetwork.com tetap merespons 200.

Record yang ditampilkan panel Vercel project ini:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | @ | 6ebfc5fa1fe21a48.vercel-dns-017.com | DNS only |
| CNAME | www | 6ebfc5fa1fe21a48.vercel-dns-017.com | DNS only |

Nameserver authoritative yang sudah diverifikasi: `conrad.ns.cloudflare.com` dan `kimora.ns.cloudflare.com`.
DNS dikelola di Cloudflare. Exabytes tetap registrar. Record billing, verifikasi Railway, proxmox, dan email tidak diubah.

Pengguna mengonfirmasi email @gnetnetwork.com belum digunakan dan menyetujui pengarahan apex ke Vercel. Record mail/MX lama tetap tersimpan; konfigurasi penyedia email harus dilakukan sebelum email domain digunakan. Vercel merupakan hosting web, bukan mail server.

Setelah mengubah DNS, gunakan Refresh pada panel domain Vercel. Pastikan Valid Configuration, HTTPS aktif dan www redirect ke apex. Verifikasi billing.gnetnetwork.com tetap berfungsi.

## Validasi yang sudah dilakukan

- Astro check: 0 errors, 0 warnings, 0 hints.
- Build: 6 halaman berhasil (termasuk 404).
- npm audit setelah pembaruan: 0 vulnerabilities.
- Seluruh 5 halaman utama produksi merespons HTTP 200.
- Tidak ada referensi file lokal yang hilang pada hasil build.
- Layout ponsel 390px diperiksa; overflow orbit diperbaiki.
- Filter dan dialog galeri diuji di lokal dan produksi.
- Menu ponsel dan penutupan dengan Escape diuji.
- Form kontak menyiapkan pesan WhatsApp; tidak dilakukan pengiriman pesan uji ke admin.

## Pembaruan OG & SEO — 19 Oktober 2026

Deployment produksi READY: `dpl_2WaCezfTvDnEyQqdWsaMSLks8DZC`.
Inspector: https://vercel.com/puji-ermantos-projects/gnetnetwork/2WaCezfTvDnEyQqdWsaMSLks8DZC

OG image publik: https://gnetnetwork.com/images/gnet-network-og-v1.jpg (JPEG, 1200×630, 224253 bytes). Verifikasi dengan user agent crawler sosial menemukan metadata baru di kelima halaman, seluruhnya HTTP 200. Sitemap HTTP 200 dan www tetap redirect ke apex. Astro check: 0 errors/warnings/hints. Detail perubahan: docs/seo.md dan docs/og-image-brief.md.

## Kontras brand — 19 Oktober 2026

Logo header/footer diperbesar menjadi 72px pada desktop, diberi panel ivory untuk mempertahankan keterbacaan logo hijau asli, dan subjudul diberi kontras lebih tinggi. Ukuran responsif 56px/48px pada ponsel. Build berhasil dan layout 320px tidak overflow. Produksi READY: `dpl_GbCqfeCXKoKJ6ZJrifPFedFKGxJR`. Verifikasi browser produksi menunjukkan kedua logo 72px dengan background rgb(241,245,233).

## Peta Kontak & navbar sticky — 19 Oktober 2026

Produksi READY: `dpl_6HyYJzPkJJGtaBsj3rNJCWGmwPMg`. Google Maps embed menampilkan area alamat Tangu, Margahurip, Banjaran dengan tombol membuka Google Maps. Peta menandai area alamat, bukan pin kantor yang belum diverifikasi. Embed tidak memerlukan API key; API key yang diberikan pengguna tidak dimasukkan ke source. Header sticky pada desktop/ponsel, termasuk menu ponsel saat scroll. Astro check dan build lulus; browser produksi menunjukkan peta ter-render dan header top=0 saat scrollY=1125. Layout ponsel 390px tidak overflow.

## Feedback privat — 19 Oktober 2026

Produksi READY: `dpl_HfsD3ZveHcNSFWBUPYj5Z1FxBrmU`. Widget melayang di semua halaman, rating 1–5, nama opsional, kategori, dan pesan. File disimpan terpisah sebagai `.txt` di Vercel Blob private store `gnetnetwork-feedback` (`store_JK4ytjweePRBf1yy`, sin1). Cara baca/ekspor: docs/feedback.md.

Validasi: 7 tes unit/API lulus; Astro check 0 errors/warnings/hints; build produksi berhasil. Pengiriman browser produksi berhasil. Dua record bertanda GNET QA / TEST TEKNIS dibuat untuk verifikasi (bukan ulasan pelanggan): satu rating 4/Saran dan satu rating 1/Kritik membangun. Keduanya dibaca kembali dari storage; ekspor TXT berhasil. Akses file tanpa autentikasi HTTP 403, kata kasar ditolak server HTTP 400, kiriman berulang HTTP 429, GET endpoint HTTP 405. Filter berbasis daftar kata bukan jaminan menangkap seluruh konteks atau penyamaran.
