import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PRD V3 — Complete CRM Landing Page Documentation
 * Halaman web yang menampilkan PRD V3 secara visual
 */

const allFeatures = {
  public: [
    { name: 'Hero Section with Dynamic State', status: '✅', desc: 'Guest vs Member state awareness' },
    { name: 'Product Grid', status: '✅', desc: '4 featured products' },
    { name: 'Promo Campaign Cards', status: '✅', desc: '3 promo cards' },
    { name: 'FAQ Accordion', status: '✅', desc: 'Interactive Q&A' },
    { name: 'Testimonial Carousel', status: '✅', desc: 'Auto-slide testimonials' },
    { name: 'Contact Form', status: '✅', desc: 'With validation' },
    { name: 'Menu Page with Filters', status: '✅', desc: 'Full menu by category' },
    { name: 'Dark Mode Toggle', status: '✅', desc: 'localStorage persistence' },
    { name: 'Scroll Animations', status: '✅', desc: 'Intersection Observer' },
  ],
  auth: [
    { name: 'Login Page', status: '✅', desc: 'Email/password + validation' },
    { name: 'Register Page', status: '✅', desc: 'Form with validasi' },
    { name: 'Auth Layout', status: '✅', desc: 'Consistent auth UI' },
    { name: 'Protected Route', status: '✅', desc: 'Redirect to login if unauthenticated' },
    { name: 'Session Management', status: '✅', desc: 'Supabase session' },
    { name: 'Logout', status: '✅', desc: 'Clear session + redirect' },
  ],
  dashboard: [
    { name: 'Home Dashboard', status: '✅', desc: 'Overview stats + recent orders' },
    { name: 'Products Page', status: '✅', desc: 'CRUD produk' },
    { name: 'Customers Page', status: '✅', desc: 'Manajemen kustomer' },
    { name: 'Orders Page', status: '✅', desc: 'Daftar pesanan' },
    { name: 'Inventory Page', status: '✅', desc: 'Stok management' },
    { name: 'Staff Page', status: '✅', desc: 'Manajemen staff' },
    { name: 'Settings Page', status: '✅', desc: 'Profil + preferences' },
    { name: 'Feedback/Complaints', status: '✅', desc: 'Komplain pelanggan' },
    { name: 'Analytics', status: '✅', desc: 'Chart + report' },
  ],
  admin: [
    { name: 'Users Admin', status: '✅', desc: 'Manage all users' },
    { name: 'CRUD Operations', status: '✅', desc: 'Create, Read, Update, Delete' },
    { name: 'Supabase Integration', status: '✅', desc: 'Real-time database' },
    { name: 'API Service', status: '✅', desc: 'Axios + Supabase client' },
    { name: 'Error Handling', status: '✅', desc: 'ErrorPage + error boundaries' },
  ],
};

const commits = [
  { hash: 'f7bac09', message: 'Otak atik halaman guest dan halaman member loh ya' },
  { hash: 'd1707d8', message: 'P.13 integrasi Supabase auth, halaman member, dan CRUD user, DESAIN' },
  { hash: '8542770', message: 'P.13 integrasi Supabase auth, halaman member, dan CRUD user' },
  { hash: '1b696d5', message: 'P.12 React Hooks pada Project CRM' },
  { hash: '311f81e', message: 'Progress Projek CRM dan dummy' },
  { hash: 'b82f34b', message: 'merge shadcnui ke main' },
  { hash: '0a4d6d7', message: 'pe 10 penerapan shadcnui' },
];

const versionComparison = [
  { metric: 'Komponen', v1: '6', v2: '12', v3: '25+' },
  { metric: 'Halaman', v1: '1', v2: '3', v3: '15+' },
  { metric: 'Integrasi API', v1: '❌', v2: '❌', v3: '✅' },
  { metric: 'Auth System', v1: '❌', v2: '❌', v3: '✅' },
  { metric: 'Dark Mode', v1: '❌', v2: '✅', v3: '✅' },
  { metric: 'Animasi', v1: '❌', v2: '✅', v3: '✅' },
  { metric: 'CRUD Operations', v1: '❌', v2: '❌', v3: '✅' },
  { metric: 'Database', v1: '❌', v2: '❌', v3: '✅ Supabase' },
];

const categoryLabels = {
  public: { icon: '🌐', label: 'Public Pages' },
  auth: { icon: '🔐', label: 'Auth System' },
  dashboard: { icon: '📊', label: 'Member Dashboard' },
  admin: { icon: '⚙️', label: 'Admin Features' },
};

export default function PRDPage3() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('public');

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 font-sans">
      {/* Header */}
      <div className="bg-stone-900 text-amber-200 text-[10px] font-bold tracking-[0.4em] py-3 text-center uppercase">
        📄 Dokumentasi PRD — Format Ganjil CRM Project
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-xs font-bold tracking-widest text-amber-700 hover:text-stone-900 transition-colors uppercase"
        >
          ← Kembali ke Landing Page
        </button>

        {/* Title Block */}
        <div className="relative bg-stone-900 text-amber-50 rounded-3xl p-10 mb-8 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-700/10 rounded-full blur-2xl" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-amber-400/5" />
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                ✅ Completed
              </span>
              <span className="bg-purple-400/10 text-purple-300 border border-purple-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Versi 3.0.0 Complete
              </span>
              <span className="bg-white/5 text-amber-200/70 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                26 Juni 2026
              </span>
              <span className="bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                🏆 Final Version
              </span>
            </div>
            <h1 className="text-5xl font-light tracking-wide mb-3">
              PRD V3 — <span className="italic text-amber-300">Complete</span>
            </h1>
            <p className="text-sm font-bold tracking-widest text-amber-400 uppercase mb-5">
              Product Requirement Document · Format Ganjil CRM · Enterprise Edition
            </p>
            <p className="text-amber-200/70 text-sm leading-relaxed max-w-2xl mb-6">
              Versi komplit dari CRM Landing Page Format Ganjil. Semua fitur dari V1 dan V2 dipertahankan dan 
              ditingkatkan dengan integrasi penuh Supabase backend, autentikasi, dashboard member, admin panel, 
              dan manajemen real-time.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { val: '25+', label: 'Komponen' },
                { val: '15+', label: 'Halaman' },
                { val: '3', label: 'API Services' },
                { val: '7', label: 'Commits' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-light text-amber-300">{s.val}</div>
                  <div className="text-[10px] text-amber-200/60 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">01 · Goals</p>
          <h2 className="text-lg font-bold mb-5">8 Tujuan Utama V3</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Landing page dengan autentikasi penuh (Login, Register, Logout)',
              'Dashboard member dengan data real-time',
              'Admin panel dengan CRUD produk, staff, dan kustomer',
              'Integrasi Supabase backend (auth + database)',
              'Laporan dan analytics (penjualan, inventori)',
              'Notifikasi dan alert sistem',
              'Proteksi route (public vs protected routes)',
              'Fitur feedback dan komplain dari pelanggan',
            ].map((g, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                <span className="w-6 h-6 bg-stone-900 text-amber-200 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-stone-700">{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Architecture */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">02 · Arsitektur</p>
          <h2 className="text-lg font-bold mb-5">Sistem Arsitektur V3</h2>
          <div className="bg-stone-900 text-amber-300 rounded-xl p-6 font-mono text-xs leading-6 overflow-x-auto">
            <pre>{`┌────────────────────────────────────────────┐
│             Client (React + Vite)           │
├──────────────┬──────────────┬──────────────┤
│ Public Pages │  Auth Pages  │  Admin Pages  │
│  Landing     │  Login       │  Dashboard    │
│  Menu        │  Register    │  Products     │
│  Contact     │              │  Customers    │
│              │              │  Orders       │
│              │              │  Inventory    │
│              │              │  Staff        │
│              │              │  Analytics    │
├──────────────┴──────────────┴──────────────┤
│          React Router (Protected Routes)    │
├────────────────────────────────────────────┤
│          API Layer (Axios + Supabase)       │
├──────────────┬──────────────┬──────────────┤
│    Auth      │   Database   │   Storage    │
│   Service    │  (Postgres)  │              │
│  (Supabase)  │  (Supabase)  │  (Supabase)  │
└──────────────┴──────────────┴──────────────┘`}</pre>
          </div>
        </div>

        {/* All Features by Category */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">03 · Fitur Lengkap</p>
          <h2 className="text-lg font-bold mb-5">Semua Fitur A–Z</h2>
          
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {Object.entries(categoryLabels).map(([key, { icon, label }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === key
                    ? 'bg-stone-900 text-amber-300'
                    : 'bg-amber-50 border border-amber-200 text-stone-500 hover:border-amber-400'
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {allFeatures[activeCategory].map((f) => (
              <div key={f.name} className="flex items-center gap-4 p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors">
                <span className="text-lg w-8 text-center flex-shrink-0">{f.status}</span>
                <div className="flex-1">
                  <div className="text-sm font-bold text-stone-800">{f.name}</div>
                  <div className="text-xs text-stone-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Schema */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">04 · Database</p>
          <h2 className="text-lg font-bold mb-5">Supabase Schema SQL</h2>
          <div className="bg-stone-900 text-amber-300 rounded-xl p-6 font-mono text-xs leading-6 overflow-x-auto">
            <pre>{`-- Tabel User (di-extend dari Supabase Auth)
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
);`}</pre>
          </div>
        </div>

        {/* Commits */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">05 · Bukti Commit</p>
          <h2 className="text-lg font-bold mb-5">Seluruh Riwayat Git</h2>
          <div className="space-y-3">
            {commits.map((c, i) => (
              <div key={c.hash} className="flex items-center gap-4 p-4 bg-stone-900 rounded-xl">
                <span className="text-[10px] text-amber-400/60 w-4 flex-shrink-0">{i + 1}.</span>
                <span className="font-mono text-amber-400 text-xs bg-amber-900/30 px-3 py-1 rounded-lg flex-shrink-0 border border-amber-700/30">
                  {c.hash}
                </span>
                <span className="text-sm text-amber-200/80">{c.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Version Comparison Table */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">06 · Perbandingan Lengkap</p>
          <h2 className="text-lg font-bold mb-5">Evolusi V1 → V2 → V3</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-200">
                  <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-amber-700">Metrik</th>
                  <th className="text-center py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-stone-400">V1</th>
                  <th className="text-center py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-stone-500">V2</th>
                  <th className="text-center py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 rounded">V3 ★</th>
                </tr>
              </thead>
              <tbody>
                {versionComparison.map((m) => (
                  <tr key={m.metric} className="border-b border-amber-50 hover:bg-amber-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-stone-800">{m.metric}</td>
                    <td className="py-3 px-4 text-center text-stone-400">{m.v1}</td>
                    <td className="py-3 px-4 text-center text-stone-600">{m.v2}</td>
                    <td className="py-3 px-4 text-center text-green-600 font-bold bg-amber-50">{m.v3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-stone-900 to-amber-900 text-white rounded-2xl p-8 mb-8">
          <p className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-2">07 · Hasil Akhir V3</p>
          <h2 className="text-xl font-bold mb-6 text-white">✅ Semua target V3 tercapai — Versi Enterprise Siap!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Landing page lengkap dari V1 + V2 + fitur baru V3',
              'Sistem autentikasi penuh (Login, Register, Session)',
              'Dashboard member dengan data real-time',
              'Admin panel dengan CRUD operations',
              'Integrasi Supabase (Auth + Database)',
              '25+ komponen reusable',
              '15+ halaman terhubung dengan routing',
              'Protected routes untuk keamanan',
              'Error handling dan notifikasi',
              'Responsive di semua device',
            ].map((r) => (
              <div key={r} className="flex items-start gap-3 text-sm text-green-200/90">
                <span className="text-green-400 text-base flex-shrink-0">✅</span>
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Future Plans */}
        <div className="bg-amber-900/20 border border-amber-300 rounded-2xl p-7 mb-8">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">08 · Rencana Selanjutnya</p>
          <h2 className="text-lg font-bold mb-4">Beyond V3</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: '📱', label: 'Progressive Web App (PWA)' },
              { icon: '📲', label: 'Mobile App (React Native)' },
              { icon: '💳', label: 'Sistem Pembayaran Online' },
              { icon: '🎁', label: 'Loyalty Program Otomatis' },
              { icon: '🤖', label: 'AI Rekomendasi Produk' },
              { icon: '🏪', label: 'Multi-branch Management' },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm text-stone-600">
                <span className="text-lg">{f.icon}</span>
                <span className="text-xs font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 justify-between items-center border-t border-amber-200 pt-8">
          <button
            onClick={() => navigate('/prd/v2')}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-stone-500 hover:text-stone-900 transition-colors uppercase"
          >
            ← PRD V2
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/prd/v1')}
              className="bg-amber-700 hover:bg-amber-800 text-white text-[10px] font-bold px-4 py-1.5 rounded-full transition-colors uppercase tracking-wider"
            >
              PRD V1
            </button>
            <button
              onClick={() => navigate('/prd/v2')}
              className="bg-amber-700 hover:bg-amber-800 text-white text-[10px] font-bold px-4 py-1.5 rounded-full transition-colors uppercase tracking-wider"
            >
              ← PRD V2
            </button>
            <span className="bg-stone-900 text-amber-300 text-[10px] font-bold px-3 py-1.5 rounded-full">PRD V3 ★</span>
          </div>
        </div>
      </div>
    </div>
  );
}
