# 📄 PRD V1 — CRM Landing Page (Basic)
## Product Requirement Document — Versi 1 (Basic/Foundation)

**Project**: Format Ganjil CRM — Landing Page  
**Versi**: 1.0.0 (Basic)  
**Status**: ✅ **Completed**  
**Tanggal**: 26 Juni 2026  
**Penulis**: Tim Pengembang

---

## 1. Latar Belakang

Format Ganjil adalah coffee shop yang membutuhkan kehadiran digital untuk memperkenalkan bisnis mereka secara online. Landing Page dasar diperlukan sebagai etalase digital pertama yang informatif dan profesional.

---

## 2. Tujuan (Goals)

| No | Tujuan |
|----|--------|
| 1 | Menyediakan halaman landing sederhana yang responsive |
| 2 | Menampilkan informasi dasar perusahaan (nama, deskripsi, lokasi) |
| 3 | Menampilkan daftar produk/kopi yang dijual |
| 4 | Form kontak sederhana untuk calon pelanggan |
| 5 | Optimasi mobile-friendly minimal |

---

## 3. Target Audiens

- Pengunjung baru (guest) yang mencari coffee shop
- Calon pelanggan yang ingin tahu menu yang tersedia
- Pengguna mobile yang mengakses via smartphone

---

## 4. Fitur (Scope V1)

### 4.1 Halaman Beranda
- ✅ Hero section dengan tagline dan CTA "Login / Daftar"
- ✅ Navigasi header minimal (logo + tombol login)
- ✅ Bagian produk unggulan (grid 4 produk)
- ✅ Informasi workspace (kecepatan WiFi, seat density)
- ✅ Ticker/pengumuman berjalan

### 4.2 Teknis
- ✅ React.js dengan Vite
- ✅ Styling menggunakan Tailwind CSS
- ✅ Routing menggunakan React Router
- ✅ Komponen reusable

### 4.3 Daftar Komponen V1
| Komponen | Fungsi |
|----------|--------|
| Header | Navigasi dan branding |
| Hero Section | Tagline dan CTA (Call to Action) |
| Product Grid | Menampilkan 4 produk unggulan |
| Promo Cards | 3 kartu informasi promosi |
| FAQ Acordeon | Tanya jawab umum |
| Footer | Informasi hak cipta |

---

## 5. User Story

```
Sebagai pengunjung baru,
Saya ingin melihat-lihat produk kopi yang tersedia
Sehingga saya tertarik untuk mendaftar menjadi member.
```

```
Sebagai calon pelanggan,
Saya ingin melihat informasi promo dan fasilitas
Sehingga saya bisa memutuskan untuk berkunjung.
```

---

## 6. Struktur Halaman (Wireframe)

```
┌─────────────────────────────────────┐
│          [Ticker Bar]               │
├─────────────────────────────────────┤
│ Header: Logo           [Login]      │
├─────────────────────────────────────┤
│ ┌─────────────────┐ ┌────────────┐  │
│ │   Hero Section  │ │ Workspace  │  │
│ │   (CTA)         │ │ Metrics    │  │
│ └─────────────────┘ └────────────┘  │
├─────────────────────────────────────┤
│         Produk Pilihan (Grid)       │
├─────────────────────────────────────┤
│         Campaign Promo (Grid)       │
├─────────────────────────────────────┤
│              FAQ Section            │
├─────────────────────────────────────┤
│              Footer                 │
└─────────────────────────────────────┘
```

---

## 7. Hasil Implementasi ✅

### Screenshot / Cuplikan Implementasi

**File Utama yang Dibuat/Dimodifikasi:**

| File | Keterangan |
|------|------------|
| `src/Pertemuan7/pages/GuestHome.jsx` | Halaman landing utama |
| `src/Pertemuan7/App.jsx` | Entry point aplikasi |
| `src/Pertemuan7/routes/AppRouter.jsx` | Konfigurasi routing |

**Bukti Commit:**
```
Commit: 0a4d6d7 (Pertemuan 10 - Penerapan ShadcnUI)
Commit: b82f34b (Merge shadcnui ke main)
Commit: f7bac09 (Otak atik halaman guest dan halaman member)
```

### Hasil Akhir V1:
- ✅ Landing page berfungsi dengan baik
- ✅ Desain responsive untuk mobile dan desktop
- ✅ Menampilkan 4 produk unggulan
- ✅ Menampilkan 3 promosi aktif
- ✅ FAQ interaktif dengan accordion
- ✅ Navigasi ke halaman login
- ✅ Tampilan modern dengan tema kopi

---

## 8. Metrics Kualitas

| Metrik | Target | Status |
|--------|--------|--------|
| Page Load Time | < 3 detik | ✅ |
| Mobile Responsive | Ya | ✅ |
| Aksesibilitas Dasar | Skor > 70 | ✅ |
| No Broken Links | 100% | ✅ |

---

## 9. Catatan untuk V2

- [ ] Tambahkan halaman menu lengkap
- [ ] Integrasi dengan sistem reservasi
- [ ] Tambahkan section testimonial pelanggan
- [ ] Animasi transisi yang lebih halus
- [ ] Dark mode toggle

---

## 10. Approval

| Role | Nama | Status |
|------|------|--------|
| Product Owner | - | ✅ Approved |
| Developer | Tim Dev | ✅ Completed |
| QA | - | ✅ Passed |