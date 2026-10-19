# GNET Network — Company Profile

Website statis Astro untuk https://gnetnetwork.com. Project terpisah dari billing-wifi.

## Menjalankan

Gunakan Node.js 22 LTS atau versi yang kompatibel dengan dependency terkunci.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Halaman: `/`, `/about/`, `/products/`, `/gallery/`, `/contact/`, serta 404.
Galeri memiliki filter dan dialog pembesaran. Form kontak menyiapkan pesan WhatsApp; tidak menyimpan data di server dan pengunjung tetap menekan kirim di WhatsApp.

## Konten

Data perusahaan, nomor WhatsApp, produk, dan galeri: `src/data/site.ts`.
Konten diambil dari permintaan pemilik dan landing page billing pada repository billing-wifi. Tidak menyertakan angka pelanggan, SLA, harga, atau testimoni yang belum diverifikasi. Foto pribadi owner digunakan sebagaimana diberikan, tanpa mengasumsikan identitas pendamping. Konfirmasi kelayakan foto pribadi sebelum publikasi final bila perlu.

## Deployment Vercel (pilihan utama)

1. Push project ini ke repository Git baru.
2. Import repository di Vercel, framework Astro, build `npm run build`, output `dist`.
3. Setelah deployment berhasil, tambahkan `gnetnetwork.com` dan `www.gnetnetwork.com` pada Settings → Domains. Pilih domain utama dan redirect domain lainnya.
4. Salin record DNS yang ditampilkan oleh Vercel. Gunakan target terbaru milik project; jangan menebak IP atau target CNAME.
5. Ubah record root dan www di penyedia DNS authoritative. Nameserver terverifikasi 19 Oktober 2026: `conrad.ns.cloudflare.com` dan `kimora.ns.cloudflare.com`. Verifikasi kembali saat deployment. Exabytes tetap registrar, tetapi DNS dikelola Cloudflare bila nameserver menunjuk Cloudflare.
6. Saat validasi domain, gunakan DNS only bila instruksi Vercel memerlukannya. Tunggu validasi HTTPS dan cek kedua domain.

## Alternatif Netlify

Import repository ke Netlify, build `npm run build`, publish directory `dist`. Konfigurasi sudah ada di `netlify.toml`. Tambahkan custom domain dan ikuti record DNS yang ditampilkan Netlify untuk project tersebut.

## Catatan DNS penting

Pertahankan record `billing` ke Railway, TXT verifikasi Railway, tunnel `proxmox`, dan record email yang masih digunakan. Jangan mengganti nameserver secara sembarang. Record MX saat ini terlihat mengarah ke root domain di screenshot; sebelum mengarahkan root ke hosting web, pastikan apakah email domain digunakan dan perbaiki target MX/mail bersama penyedia email jika dibutuhkan. Root web tidak bertindak sebagai mail server.

## Verifikasi publikasi

Cek SSL, redirect www, seluruh navigasi, foto galeri, pesan WhatsApp, tampilan ponsel, metadata canonical, sitemap dan billing.gnetnetwork.com setelah DNS selesai.

Font DM Sans dan Manrope dimuat dari Google Fonts dengan fallback sistem. Semua foto lokal. `dist` merupakan hasil build dan tidak perlu dikomit.

Referensi resmi: https://vercel.com/docs/frameworks/frontend/astro dan https://vercel.com/docs/domains/working-with-domains/add-a-domain
