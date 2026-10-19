# SEO & social preview

- Shared OG image: `/images/gnet-network-og-v1.jpg`, 1200 × 630, JPEG, approximately 219 KiB. Generated with built-in image_gen. Brief in `og-image-brief.md`.
- Unique search title and description for Beranda, Tentang, Produk, Galeri and Kontak, configured centrally in `src/layouts/Layout.astro`.
- Canonical paths match Vercel clean URLs without trailing slash, except `/`.
- Open Graph includes site name, locale, page URL, title, description, image, secure image URL, MIME type, dimensions and alt text.
- Twitter uses `summary_large_image`, title, description, image and alt text.
- JSON-LD graph: Organization, WebSite, page-specific WebPage/AboutPage/ContactPage/CollectionPage, plus BreadcrumbList on inner pages.
- Noindex for the 404 page. No fabricated ratings, customer statistics, service areas or pricing.
- Sitemap lists five canonical page URLs; robots.txt references the sitemap.

## Verification

Astro check and build pass. Built HTML checked for unique descriptions, one canonical per page, absolute OG URLs, image dimensions, Twitter large card, parseable JSON-LD and noindex on 404.

## Share preview cache

Platforms can cache previous cards. A new versioned image filename avoids reusing the old image URL. Cached page previews may still require a platform re-scrape or time to refresh. Search indexing and ranking are decided by search engines; metadata does not guarantee rankings.
