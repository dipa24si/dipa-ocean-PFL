# 📄 PRD V3 — CRM Landing Page (Complete)
## Product Requirement Document — Versi 3 (Complete/Enterprise)

**Project**: Format Ganjil CRM — Landing Page  
**Versi**: 3.0.0 (Complete)  
**Status**: ✅ **Completed**  
**Tanggal**: 26 Juni 2026  
**Penulis**: Tim Pengembang

---

## 1. Latar Belakang

Versi komplit dari CRM Landing Page Format Ganjil. Semua fitur dari V1 dan V2 dipertahankan dan ditingkatkan. V3 menambahkan integrasi penuh dengan Supabase backend, sistem autentikasi, dashboard member, admin panel, dan sistem manajemen produk/staff/kustomer secara real-time.

---

## 2. Tujuan (Goals)

| No | Tujuan |
|----|--------|
| 1 | Landing page dengan autentikasi penuh (Login, Register, Logout) |
| 2 | Dashboard member dengan data real-time |
| 3 | Admin panel dengan CRUD produk, staff, dan kustomer |
| 4 | Integrasi Supabase backend (auth + database) |
| 5 | Laporan dan analytics (penjualan, inventori) |
| 6 | Notifikasi dan alert sistem |
| 7 | Proteksi route (public vs protected routes) |
| 8 | Fitur feedback dan komplain dari pelanggan |

---

## 3. Fitur Lengkap (All Features A-Z)

### 3.1 Public Pages (Tamu/Non-Auth)
| Fitur | Status | Keterangan |
|-------|--------|------------|
| Hero Section with Dynamic State | ✅ | Guest vs Member state awareness |
| Product Grid | ✅ | 4 featured products |
| Promo Campaign Cards | ✅ | 3 promo cards |
| FAQ Accordion | ✅ | Interactive Q&A |
| Testimonial Carousel | ✅ | Auto-slide testimonials |
| Contact Form | ✅ | With validation |
| Menu Page with Filters | ✅ | Full menu by category |
| Dark Mode Toggle | ✅ | localStorage persistence |
| Scroll Animations | ✅ | Intersection Observer |
| Footer | ✅ | Complete info |

### 3.2 Auth System
| Fitur | Status | Keterangan |
|-------|--------|------------|
| Login Page | ✅ | Email/password + validation |
| Register Page | ✅ | Form with validasi |
| Auth Layout | ✅ | Consistent auth UI |
| Protected Route | ✅ | Redirect to login if unauthenticated |
| Session Management | ✅ | Supabase session |
| Logout | ✅ | Clear session + redirect |

### 3.3 Member Dashboard
| Fitur | Status | Keterangan |
|-------|--------|------------|
| Home Dashboard | ✅ | Overview stats + recent orders |
| Products Page | ✅ | CRUD produk |
| Customers Page | ✅ | Manajemen kustomer |
| Orders Page | ✅ | Daftar pesanan |
| Inventory Page | ✅ | Stok management |
| Staff Page | ✅ | Manajemen staff |
| Settings Page | ✅ | Profil + preferences |
| Feedback/Complaints | ✅ | Komplain pelanggan |
| Analytics | ✅ | Chart + report |

### 3.4 Admin Features
| Fitur | Status | Keterangan |
|-------|--------|------------|
| Users Admin | ✅ | Manage all users |
| CRUD Operations | ✅ | Create, Read, Update, Delete |
| Supabase Integration | ✅ | Real-time database |
| API Service | ✅ | Axios + Supabase client |
| Error Handling | ✅ | ErrorPage + error boundaries |

---

## 4. Arsitektur Sistem

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

---

## 5. Struktur File Lengkap

```
src/
├── Pertemuan7/                    # V1 + V2 + V3 Complete
│   ├── components/                # 25+ komponen reusable
│   │   ├── CustomersTable.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── InventoryCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── OrdersTable.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductForm.jsx
│   │   ├── RecentOrders.jsx
│   │   ├── SalesTrendChart.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StaffCard.jsx
│   │   ├── StaffForm.jsx
│   │   ├── StatCard.jsx
│   │   └── ... (15+ komponen lainnya)
│   ├── data/                      # Data dummy + JSON
│   │   ├── customers.json
│   │   ├── staff.json
│   │   └── brewCustomers.json
│   ├── layouts/                   # Layout system
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/                     # 15+ halaman
│   │   ├── GuestHome.jsx          # Landing V1
│   │   ├── MemberHome.jsx         # Dashboard member
│   │   ├── DashboardV2.jsx        # Dashboard V2
│   │   ├── Analytics.jsx
│   │   ├── Customers.jsx
│   │   ├── Inventory.jsx
│   │   ├── Login.jsx / LoginV2.jsx
│   │   ├── Register.jsx
│   │   ├── Orders.jsx
│   │   ├── Products.jsx
│   │   ├── Staff.jsx
│   │   ├── Settings.jsx
│   │   ├── FeedbackComplaints.jsx
│   │   ├── UsersAdmin.jsx
│   │   ├── ComponentDemo.jsx
│   │   └── NotFound.jsx
│   ├── routes/                    # Routing + protection
│   │   ├── AppRouter.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/                  # Backend integration
│   │   ├── api.js
│   │   ├── supabaseClient.js
│   │   └── supabaseApi.js
│   ├── utils/                     # Utilities
│   │   └── stockStatus.js
│   └── App.jsx                    # Entry point
├── Pertemuan8/
│   └── PRD/                       # Dokumentasi PRD
│       ├── PRD_V1_Basic.md
│       ├── PRD_V2_Intermediate.md
│       └── PRD_V3_Complete.md
```

---

## 6. Basis Data (Supabase Schema)

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

-- Tabel Staff
CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active',
  shift TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 7. User Stories Lengkap

```
Sebagai pengunjung,
Saya ingin melihat landing page yang menarik,
Sehingga saya tertarik untuk mendaftar menjadi member.

Sebagai member,
Saya ingin login dan melihat dashboard pribadi saya,
Sehingga saya bisa melihat riwayat pesanan dan poin saya.

Sebagai admin,
Saya ingin mengelola produk, staff, dan kustomer,
Sehingga bisnis berjalan dengan lancar.

Sebagai staff,
Saya ingin melihat inventori dan pesanan masuk,
Sehingga saya bisa memproses pesanan dengan cepat.
```

---

## 8. Hasil Implementasi ✅

### Komponen Lengkap (25+)
| Kategori | Jumlah | Contoh |
|----------|--------|--------|
| Layout | 2 | MainLayout, AuthLayout |
| Pages | 15+ | GuestHome, Dashboard, Analytics, dll |
| Components | 25+ | StatCard, ProductCard, Sidebar, dll |
| Services | 3 | api.js, supabaseClient.js, supabaseApi.js |
| Routes | 2 | AppRouter, ProtectedRoute |
| Data | 3 | JSON files |
| Utilities | 1 | stockStatus.js |

### Integrasi Backend
- ✅ Supabase Authentication (Login, Register, Session)
- ✅ Supabase Database (CRUD operations)
- ✅ Protected Routes (Authorization)
- ✅ Real-time data updates

### Bukti Commit (Riwayat Git)
```
1. f7bac09 - Otak atik halaman guest dan halaman member loh ya
2. d1707d8 - P.13 integrasi Supabase auth, halaman member, dan CRUD user, DESAIN
3. 8542770 - P.13 integrasi Supabase auth, halaman member, dan CRUD user
4. 1b696d5 - P.12 React Hooks pada Project CRM
5. 311f81e - Progress Projek CRM dan dummy
6. b82f34b - merge shadcnui ke main
7. 0a4d6d7 - pe 10 penerapan shadcnui
```

### Hasil Akhir V3:
- ✅ Landing page lengkap dari V1 + V2 + fitur baru V3
- ✅ Sistem autentikasi penuh (Login, Register, Session)
- ✅ Dashboard member dengan data real-time
- ✅ Admin panel dengan CRUD operations
- ✅ Integrasi Supabase (Auth + Database)
- ✅ 25+ komponen reusable
- ✅ 15+ halaman terhubung dengan routing
- ✅ Protected routes untuk keamanan
- ✅ Error handling dan notifikasi
- ✅ Responsive di semua device

---

## 9. Metrics dan Performa

| Metrik | V1 | V2 | V3 |
|--------|-----|-----|-----|
| Komponen | 6 | 12 | 25+ |
| Halaman | 1 | 3 | 15+ |
| Integrasi API | ❌ | ❌ | ✅ |
| Auth System | ❌ | ❌ | ✅ |
| Dark Mode | ❌ | ✅ | ✅ |
| Animasi | ❌ | ✅ | ✅ |
| CRUD Operations | ❌ | ❌ | ✅ |
| Database | ❌ | ❌ | ✅ (Supabase) |

---

## 10. Rencana Pengembangan Selanjutnya

- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)
- [ ] Sistem pembayaran online
- [ ] Loyalty program otomatis
- [ ] AI rekomendasi produk
- [ ] Multi-branch management

---

## 11. Approval

| Role | Nama | Status |
|------|------|--------|
| Product Owner | - | ✅ Approved |
| Developer Lead | - | ✅ Completed |
| QA Lead | - | ✅ Passed |
| Stakeholder | - | ✅ Signed Off |