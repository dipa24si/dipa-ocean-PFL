import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingCart, ClipboardList, Settings, LogIn, ArrowRight, CheckCircle, Database, Shield, BarChart3, Smartphone } from 'lucide-react';

/**
 * PRD V3 — Complete CRM Landing Page
 * Menunjuk ke sistem CRM yang sudah ada di Pertemuan7
 * Fitur lengkap: Auth, Dashboard, CRUD, Supabase Integration
 */

const features = [
  { icon: LayoutDashboard, name: 'Dashboard Member', desc: 'Overview stats, recent orders, dan aktivitas member' },
  { icon: Package, name: 'Manajemen Produk', desc: 'CRUD produk dengan kategori, harga, dan stok' },
  { icon: Users, name: 'Manajemen Customer', desc: 'Data pelanggan dengan riwayat transaksi' },
  { icon: ShoppingCart, name: 'Manajemen Pesanan', desc: 'Tracking pesanan dari masuk hingga selesai' },
  { icon: ClipboardList, name: 'Inventori & Staff', desc: 'Stok barang dan manajemen karyawan' },
  { icon: BarChart3, name: 'Analytics & Report', desc: 'Grafik penjualan dan laporan bisnis' },
  { icon: Shield, name: 'Auth & Proteksi', desc: 'Login, Register, dan Protected Routes' },
  { icon: Database, name: 'Supabase Integration', desc: 'Backend database real-time dan autentikasi' },
];

const techStack = [
  { name: 'React 18', desc: 'UI Library dengan Vite bundler' },
  { name: 'React Router', desc: 'Routing dengan protected routes' },
  { name: 'Tailwind CSS', desc: 'Utility-first CSS framework' },
  { name: 'Supabase', desc: 'Backend as a Service (Auth + Database)' },
  { name: 'Axios', desc: 'HTTP client untuk API calls' },
  { name: 'Lucide Icons', desc: 'Icon library modern' },
];

export default function CRMDashboardV3() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 dark:from-stone-900 dark:via-stone-800 dark:to-amber-950 text-stone-900 dark:text-stone-100">
      {/* Premium Header */}
      <header className="border-b border-amber-200 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-amber-700 dark:text-amber-400">Enterprise CRM System</p>
            <h1 className="text-xl font-bold tracking-wide">FORMAT GANJIL <span className="text-amber-700 dark:text-amber-400 text-sm font-normal">v3.0</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Supabase Connected
            </div>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 bg-stone-900 dark:bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all"
            >
              <LogIn size={14} />
              Masuk ke CRM
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-16 space-y-16">
        {/* Hero V3 */}
        <section className="pt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
              <CheckCircle size={12} />
              Complete CRM Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Kelola Bisnis Kopi Anda{' '}
              <span className="text-amber-700 dark:text-amber-400 italic font-light">dalam Satu Platform</span>
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed max-w-lg">
              Dari landing page hingga dashboard admin — sistem CRM terintegrasi penuh dengan 
              autentikasi, manajemen produk, staff, kustomer, dan analytics real-time.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-stone-900 dark:bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-xl text-xs font-bold tracking-wider transition-all"
              >
                Mulai Sekarang <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="flex items-center gap-2 border border-amber-300 dark:border-stone-600 hover:bg-amber-50 dark:hover:bg-stone-800 px-6 py-3 rounded-xl text-xs font-bold tracking-wider transition-all"
              >
                Daftar Member Baru
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '25+', sub: 'Komponen UI' },
              { label: '15+', sub: 'Halaman Aktif' },
              { label: '100%', sub: 'Responsive' },
              { label: 'Real-time', sub: 'Supabase DB' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{stat.label}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid — 8 Fitur Utama */}
        <section className="space-y-6">
          <div className="text-center">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400">Enterprise Features</p>
            <h3 className="text-2xl font-bold mt-1">Semua yang Anda Butuhkan untuk Mengelola Bisnis</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 group">
                <feature.icon size={24} className="text-amber-700 dark:text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm mb-1">{feature.name}</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <div className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-[2.5rem] p-8 md:p-12">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 text-center mb-6">Technology Stack</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {techStack.map((tech) => (
                <div key={tech.name} className="text-center p-3">
                  <p className="font-bold text-sm">{tech.name}</p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table V1 vs V2 vs V3 */}
        <section>
          <div className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-[2.5rem] p-8 md:p-12">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 text-center mb-6">Evolusi Produk</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-amber-200 dark:border-stone-700">
                    <th className="text-left py-3 font-bold">Fitur</th>
                    <th className="text-center py-3 font-bold text-stone-500">V1 Basic</th>
                    <th className="text-center py-3 font-bold text-amber-700 dark:text-amber-400">V2 Intermediate</th>
                    <th className="text-center py-3 font-bold text-emerald-600">V3 Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Landing Page', v1: '✅', v2: '✅', v3: '✅' },
                    { name: 'Product Grid', v1: '✅', v2: '✅', v3: '✅' },
                    { name: 'Promo Cards', v1: '✅', v2: '✅', v3: '✅' },
                    { name: 'FAQ Accordion', v1: '✅', v2: '✅', v3: '✅' },
                    { name: 'Scroll Animations', v1: '❌', v2: '✅', v3: '✅' },
                    { name: 'Dark Mode', v1: '❌', v2: '✅', v3: '✅' },
                    { name: 'Testimonial Carousel', v1: '❌', v2: '✅', v3: '✅' },
                    { name: 'Contact Form', v1: '❌', v2: '✅', v3: '✅' },
                    { name: 'Menu Page', v1: '❌', v2: '✅', v3: '✅' },
                    { name: 'Auth System', v1: '❌', v2: '❌', v3: '✅' },
                    { name: 'Member Dashboard', v1: '❌', v2: '❌', v3: '✅' },
                    { name: 'CRUD Operations', v1: '❌', v2: '❌', v3: '✅' },
                    { name: 'Supabase Integration', v1: '❌', v2: '❌', v3: '✅' },
                    { name: 'Admin Panel', v1: '❌', v2: '❌', v3: '✅' },
                    { name: 'Protected Routes', v1: '❌', v2: '❌', v3: '✅' },
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-amber-100 dark:border-stone-700/50">
                      <td className="py-2.5 font-medium">{row.name}</td>
                      <td className="text-center py-2.5">{row.v1}</td>
                      <td className="text-center py-2.5">{row.v2}</td>
                      <td className="text-center py-2.5">{row.v3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Akhir */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-stone-900 via-amber-900 to-stone-900 text-amber-50 rounded-[2.5rem] p-12">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400 mb-2">Siap Mengelola Bisnis?</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Bergabung dengan Format Ganjil CRM</h3>
            <p className="text-amber-200/70 text-sm mb-6 max-w-md mx-auto">
              Dari pengunjung hingga admin — semua dalam satu platform terintegrasi.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all"
            >
              Daftar Gratis <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      <footer className="text-center py-8 text-[10px] tracking-[0.2em] uppercase text-stone-400 border-t border-amber-200 dark:border-stone-700 bg-white dark:bg-stone-800">
        &copy; 2026 Format Ganjil CRM v3.0 — Enterprise Coffee Management System
      </footer>
    </div>
  );
}