# 📄 PRD V2 — CRM Landing Page (Intermediate)
## Product Requirement Document — Versi 2 (Intermediate)

**Project**: Format Ganjil CRM — Landing Page  
**Versi**: 2.0.0 (Intermediate)  
**Status**: ✅ **Completed**  
**Tanggal**: 26 Juni 2026  
**Penulis**: Tim Pengembang

---

## 1. Latar Belakang

Setelah V1 berjalan, diperlukan peningkatan landing page dengan fitur-fitur interaktif dan informatif yang lebih mendalam. V2 fokus pada pengalaman pengguna yang lebih kaya dengan tambahan halaman menu, testimonial pelanggan, dan animasi halus.

---

## 2. Tujuan (Goals)

| No | Tujuan |
|----|--------|
| 1 | Landing page interaktif dengan animasi scroll |
| 2 | Halaman menu lengkap dengan filter kategori |
| 3 | Section testimonial pelanggan (dinamis) |
| 4 | Form kontak yang berfungsi |
| 5 | Dark mode toggle |
| 6 | Performa tetap optimal dengan code splitting |

---

## 3. Target Audiens

- Semua target V1
- Member potensial yang ingin melihat menu lengkap
- Pelanggan yang ingin memberikan feedback
- Pengguna yang peduli dengan estetika dan UX

---

## 4. Fitur (Scope V2) — Tambahan dari V1

### 4.1 Fitur Baru
- ✅ **Halaman Menu Lengkap** — Menampilkan seluruh produk dengan filter kategori
- ✅ **Testimonial Section** — Slider/carousel testimonial pelanggan
- ✅ **Dark Mode Toggle** — Tema terang/gelap dengan persistensi localStorage
- ✅ **Scroll Animations** — Animasi saat scroll menggunakan Intersection Observer
- ✅ **Kontak Form** — Form kontak dengan validasi input
- ✅ **Loading States** — Skeleton loading untuk konten yang di-fetch

### 4.2 Peningkatan dari V1
- ✅ Ticker bar dinamis dengan context
- ✅ Hero section ditingkatkan dengan state awareness
- ✅ Product card lebih interaktif (favorite toggle)
- ✅ FAQ section lebih informatif
- ✅ Footer lebih lengkap

### 4.3 Komponen Baru V2
| Komponen | Fungsi |
|----------|--------|
| `MenuPage.jsx` | Halaman menu lengkap dengan filter |
| `TestimonialCarousel.jsx` | Slider testimonial interaktif |
| `ContactForm.jsx` | Form kontak dengan validasi |
| `DarkModeToggle.jsx` | Tombol toggle dark mode |
| `ScrollReveal.jsx` | Animasi scroll wrapper |
| `SkeletonLoader.jsx` | Loading placeholder |

---

## 5. User Story (Tambahan)

```
Sebagai calon member,
Saya ingin melihat menu lengkap dengan harga,
Sehingga saya bisa memutuskan untuk mendaftar.
```

```
Sebagai pengunjung setia,
Saya ingin membaca testimonial pelanggan lain,
Sehingga saya semakin yakin untuk menjadi member.
```

```
Sebagai pengguna malam,
Saya ingin mengaktifkan dark mode,
Sehingga mata saya tidak lelah saat browsing malam hari.
```

---

## 6. Struktur Navigasi V2

```
Landing Page (GuestHome)
├── Header (Navbar + DarkMode Toggle)
├── Hero Section (Dynamic State)
├── Product Grid (4 Produk Unggulan)
├── Testimonial Carousel (Baru!)
├── Promo Campaign
├── FAQ Accordion
├── Contact Form (Baru!)
└── Footer

Halaman Menu (/menu)
├── Filter Kategori
├── Grid Produk Lengkap
└── Pagination / Load More
```

---

## 7. Hasil Implementasi ✅

### File Utama yang Dibuat/Dimodifikasi

| File | Keterangan |
|------|------------|
| `src/Pertemuan8/pages/GuestHomeV2.jsx` | Landing page V2 dengan animasi |
| `src/Pertemuan8/pages/MenuPage.jsx` | Halaman menu lengkap |
| `src/Pertemuan8/components/TestimonialCarousel.jsx` | Carousel testimonial |
| `src/Pertemuan8/components/DarkModeToggle.jsx` | Toggle dark mode |
| `src/Pertemuan8/components/ScrollReveal.jsx` | Animasi scroll |
| `src/Pertemuan8/components/ContactForm.jsx` | Form kontak |
| `src/Pertemuan8/App.jsx` | Entry point V2 |
| `src/Pertemuan8/routes/AppRouterV2.jsx` | Routing V2 |

### Bukti Commit
```
Commit: f027451 feat: PRD V2 landing page with menu, testimonials, dark mode
```

### Hasil Akhir V2:
- ✅ Scroll animations smooth menggunakan Intersection Observer
- ✅ Dark mode dengan toggle + localStorage persistensi
- ✅ Halaman menu lengkap dengan filter kategori
- ✅ Testimonial carousel dengan auto-slide
- ✅ Form kontak dengan validasi form
- ✅ Performa tetap baik dengan code splitting
- ✅ Semua fitur V1 tetap dipertahankan

---

## 8. Metrics Kualitas

| Metrik | Target | V1 | V2 |
|--------|--------|-----|-----|
| Page Load Time | < 3 detik | ✅ | ✅ |
| Mobile Responsive | Ya | ✅ | ✅ |
| Aksesibilitas | > 80 | > 70 | ✅ |
| Dark Mode | Berfungsi | ❌ | ✅ |
| Animasi Performance | 60fps | N/A | ✅ |
| Form Validation | 100% | ❌ | ✅ |

---

## 9. Catatan untuk V3

- [ ] Integrasi dengan backend API nyata (Supabase)
- [ ] Halaman dashboard member
- [ ] Sistem autentikasi penuh
- [ ] Manajemen produk (CRUD)
- [ ] Admin panel
- [ ] Report & analytics

---

## 10. Approval

| Role | Nama | Status |
|------|------|--------|
| Product Owner | - | ✅ Approved |
| Developer | Tim Dev | ✅ Completed |
| QA | - | ✅ Passed |