# 📄 PRD Lengkap (V1, V2, V3) — CRM Landing Page & Dashboard
## Product Requirement Document — Gabungan Evaluasi (Basic to Complete)

**Project**: Format Ganjil CRM — Landing Page  
**Versi**: 3.0.0 (Complete)  
**Status**: ✅ **Completed**  
**Tanggal**: 26 Juni 2026  
**Penulis**: Tim Pengembang

---

# Bagian 1: PRD V1 — CRM Landing Page (Basic)

## 1. Latar Belakang
Format Ganjil adalah coffee shop yang membutuhkan kehadiran digital untuk memperkenalkan bisnis mereka secara online. Landing Page dasar diperlukan sebagai etalase digital pertama yang informatif dan profesional.

## 2. Tujuan (Goals)
1. Menyediakan halaman landing sederhana yang responsive.
2. Menampilkan informasi dasar perusahaan (nama, deskripsi, lokasi).
3. Menampilkan daftar produk/kopi yang dijual.
4. Form kontak sederhana untuk calon pelanggan.
5. Optimasi mobile-friendly minimal.

## 3. Fitur (Scope V1)
* **Halaman Beranda**:
  * Hero section dengan tagline dan CTA "Login / Daftar"
  * Navigasi header minimal (logo + tombol login)
  * Bagian produk unggulan (grid 4 produk)
  * Informasi workspace (kecepatan WiFi, seat density)
  * Ticker/pengumuman berjalan
* **Teknis**:
  * React.js dengan Vite + Tailwind CSS + React Router + Komponen reusable.

## 4. Struktur Halaman (Wireframe)
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

## 5. Hasil Implementasi & Bukti Commit V1
* **File Utama**:
  * `src/Pertemuan7/pages/GuestHome.jsx`
  * `src/Pertemuan7/App.jsx`
  * `src/Pertemuan7/routes/AppRouter.jsx`
* **Bukti Commit**:
  * `Commit: 0a4d6d7` (pe 10 penerapan shadcnui)
  * `Commit: b82f34b` (merge shadcnui ke main)
  * `Commit: f7bac09` (Otak atik halaman guest dan halaman member loh ya)

---

# Bagian 2: PRD V2 — CRM Landing Page (Intermediate)

## 1. Latar Belakang
Setelah V1 berjalan, diperlukan peningkatan landing page dengan fitur-fitur interaktif dan informatif yang lebih mendalam. V2 fokus pada pengalaman pengguna yang lebih kaya dengan tambahan halaman menu, testimonial pelanggan, dan animasi halus.

## 2. Tujuan (Goals)
1. Landing page interaktif dengan animasi scroll (Intersection Observer).
2. Halaman menu lengkap dengan filter kategori.
3. Section testimonial pelanggan (dinamis).
4. Form kontak yang berfungsi dengan validasi input.
5. Dark mode toggle dengan persistensi localStorage.

## 3. Fitur Baru & Peningkatan (Scope V2)
* **Halaman Menu Lengkap**: Menampilkan seluruh produk dengan filter kategori.
* **Testimonial Section**: Slider/carousel testimonial pelanggan.
* **Dark Mode Toggle**: Tema terang/gelap dengan persistensi localStorage.
* **Scroll Animations**: Animasi saat scroll menggunakan Intersection Observer.
* **Kontak Form**: Form kontak dengan validasi input.

## 4. Struktur Navigasi V2
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

## 5. Hasil Implementasi & Bukti Commit V2
* **File Utama**:
  * `src/Pertemuan8/pages/GuestHomeV2.jsx`
  * `src/Pertemuan8/pages/MenuPage.jsx`
  * `src/Pertemuan8/components/TestimonialCarousel.jsx`
  * `src/Pertemuan8/components/DarkModeToggle.jsx`
  * `src/Pertemuan8/components/ScrollReveal.jsx`
  * `src/Pertemuan8/components/ContactForm.jsx`
* **Bukti Commit**:
  * `Commit: f027451` (feat: PRD V1, V2, V3 lengkap dengan landing page CRM)

---

# Bagian 3: PRD V3 — CRM Landing Page (Complete/Enterprise)

## 1. Latar Belakang
Versi komplit dari CRM Landing Page Format Ganjil. Semua fitur dari V1 dan V2 dipertahankan dan ditingkatkan. V3 menambahkan integrasi penuh dengan Supabase backend, sistem autentikasi, dashboard member, admin panel, dan sistem manajemen produk/staff/kustomer secara real-time.

## 2. Tujuan (Goals)
1. Landing page dengan autentikasi penuh (Login, Register, Logout).
2. Dashboard member dengan data real-time.
3. Admin panel dengan CRUD produk, staff, dan kustomer.
4. Integrasi Supabase backend (auth + database).
5. Laporan dan analytics (penjualan, inventori).
6. Proteksi route (public vs protected routes).
7. Fitur feedback dan komplain dari pelanggan.

## 3. Arsitektur Sistem
```
┌─────────────────────────────────────────────────────┐
│                   Client (React)                     │
├─────────────────────────────────────────────────────┤
│  Public Pages    │   Auth Pages    │  Admin Pages    │
│  ┌───────────┐  │  ┌───────────┐  │  ┌───────────┐   │
│  │ Landing   │  │  │ Login     │  │  │ Dashboard │   │
│  │ Menu      │  │  │ Register  │  │  │ Products  │   │
│  │ Contact   │  │  │           │  │  │ Customers │   │
│  └───────────┘  │  └───────────┘  │  │ Orders    │   │
│                 │                 │  │ Inventory │   │
│                 │                 │  │ Staff     │   │
│                 │                 │  │ Settings  │   │
│                 │                 │  │ Analytics │   │
│                 │                 │  └───────────┘   │
├─────────────────────────────────────────────────────┤
│              React Router (Protected Routes)         │
├─────────────────────────────────────────────────────┤
│              API Layer (Axios + Supabase)            │
├─────────────────────────────────────────────────────┤
│              Supabase Backend                        │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐        │
│  │ Auth      │  │ Database  │  │ Storage   │        │
│  │ Service   │  │ (Postgres)│  │           │        │
│  └───────────┘  └───────────┘  └───────────┘        │
└─────────────────────────────────────────────────────┘
```

## 4. Basis Data (Supabase Schema)
```sql
-- Tabel User (di-extend dari Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Produk
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  stock INT DEFAULT 0,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Pesanan
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  quantity INT,
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 5. Hasil Implementasi & Bukti Commit V3
* **File Utama**:
  * `src/Pertemuan8/pages/CRMDashboardV3.jsx`
  * `src/Pertemuan7/pages/MemberHome.jsx`
  * `src/Pertemuan7/services/supabaseApi.js`
  * `src/Pertemuan7/routes/ProtectedRoute.jsx`
* **Bukti Commit**:
  * `Commit: f027451` (feat: PRD V1, V2, V3 lengkap dengan landing page CRM)
  * `Commit: d1707d8` (P.13 integrasi Supabase auth, halaman member, dan CRUD user, DESAIN)
  * `Commit: 8542770` (P.13 integrasi Supabase auth, halaman member, dan CRUD user)
