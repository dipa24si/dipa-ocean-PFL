import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PRD V2 — Intermediate Landing Page Documentation
 * Halaman web yang menampilkan PRD V2 secara visual
 */

const goals = [
  { no: 1, goal: 'Landing page interaktif dengan animasi scroll' },
  { no: 2, goal: 'Halaman menu lengkap dengan filter kategori' },
  { no: 3, goal: 'Section testimonial pelanggan (dinamis)' },
  { no: 4, goal: 'Form kontak yang berfungsi' },
  { no: 5, goal: 'Dark mode toggle' },
  { no: 6, goal: 'Performa tetap optimal dengan code splitting' },
];

const newComponents = [
  { name: 'MenuPage.jsx', func: 'Halaman menu lengkap dengan filter', isNew: true },
  { name: 'TestimonialCarousel.jsx', func: 'Slider testimonial interaktif', isNew: true },
  { name: 'ContactForm.jsx', func: 'Form kontak dengan validasi', isNew: true },
  { name: 'DarkModeToggle.jsx', func: 'Tombol toggle dark mode', isNew: true },
  { name: 'ScrollReveal.jsx', func: 'Animasi scroll wrapper', isNew: true },
  { name: 'SkeletonLoader.jsx', func: 'Loading placeholder', isNew: true },
];

const improvements = [
  'Ticker bar dinamis dengan context',
  'Hero section ditingkatkan dengan state awareness',
  'Product card lebih interaktif (favorite toggle)',
  'FAQ section lebih informatif',
  'Footer lebih lengkap',
];

const metricsComparison = [
  { metric: 'Page Load Time', target: '< 3 detik', v1: '✅', v2: '✅' },
  { metric: 'Mobile Responsive', target: 'Ya', v1: '✅', v2: '✅' },
  { metric: 'Aksesibilitas', target: '> 80', v1: '> 70', v2: '✅' },
  { metric: 'Dark Mode', target: 'Berfungsi', v1: '❌', v2: '✅' },
  { metric: 'Animasi Performance', target: '60fps', v1: 'N/A', v2: '✅' },
  { metric: 'Form Validation', target: '100%', v1: '❌', v2: '✅' },
];

const commits = [
  { hash: 'f027451', message: 'feat: PRD V2 landing page with menu, testimonials, dark mode' },
  { hash: '14d5d8f', message: 'feat: integrasi route PRD, bypass offline, dan gabungan PRD' },
];

const userStories = [
  {
    role: 'Calon Member',
    story: 'Saya ingin melihat menu lengkap dengan harga,\nSehingga saya bisa memutuskan untuk mendaftar.',
  },
  {
    role: 'Pengunjung Setia',
    story: 'Saya ingin membaca testimonial pelanggan lain,\nSehingga saya semakin yakin untuk menjadi member.',
  },
  {
    role: 'Pengguna Malam',
    story: 'Saya ingin mengaktifkan dark mode,\nSehingga mata saya tidak lelah saat browsing malam hari.',
  },
];

export default function PRDPage2() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('goals');

  const tabs = ['goals', 'fitur', 'stories', 'commit'];

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 font-sans">
      {/* Header */}
      <div className="bg-stone-900 text-amber-200 text-[10px] font-bold tracking-[0.4em] py-3 text-center uppercase">
        📄 Dokumentasi PRD — Format Ganjil CRM Project
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Back Navigation */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-xs font-bold tracking-widest text-amber-700 hover:text-stone-900 transition-colors uppercase"
        >
          ← Kembali ke Landing Page
        </button>

        {/* Title Block */}
        <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-amber-800 text-amber-50 rounded-3xl p-10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-stone-600/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                ✅ Completed
              </span>
              <span className="bg-blue-400/10 text-blue-300 border border-blue-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Versi 2.0.0 Intermediate
              </span>
              <span className="bg-white/5 text-amber-200/70 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                26 Juni 2026
              </span>
              <span className="bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                ↑ Upgrade dari V1
              </span>
            </div>
            <h1 className="text-4xl font-light tracking-wide mb-2">
              PRD V2 — <span className="italic text-amber-300">Intermediate</span>
            </h1>
            <p className="text-sm font-bold tracking-widest text-amber-400 uppercase mb-4">
              Product Requirement Document · Format Ganjil CRM · Enhanced Landing Page
            </p>
            <p className="text-amber-200/70 text-sm leading-relaxed max-w-2xl">
              Versi kedua yang meningkatkan V1 dengan pengalaman pengguna lebih kaya: animasi scroll, dark mode, 
              testimonial carousel, form kontak, dan halaman menu lengkap.
            </p>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Komponen Baru', value: '6', sub: 'ditambahkan dari V1' },
            { label: 'Halaman', value: '3', sub: 'landing + menu + kontak' },
            { label: 'Fitur V2', value: '6', sub: 'fitur baru' },
            { label: 'Peningkatan', value: '5', sub: 'dari V1' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-amber-200 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl font-light text-amber-700 mb-1">{s.value}</div>
              <div className="text-xs font-bold text-stone-800">{s.label}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex-shrink-0 transition-all ${
                activeTab === t
                  ? 'bg-stone-900 text-amber-300'
                  : 'bg-white border border-amber-200 text-stone-500 hover:border-amber-400'
              }`}
            >
              {t === 'goals' ? '🎯 Goals' : t === 'fitur' ? '🧩 Fitur' : t === 'stories' ? '📖 User Stories' : '🔗 Commit'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'goals' && (
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-bold mb-4">Tujuan Pengembangan V2</h2>
            {goals.map((g) => (
              <div key={g.no} className="flex items-center gap-4 p-4 bg-white border border-amber-200 rounded-xl hover:shadow-md transition-all">
                <span className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {g.no}
                </span>
                <span className="text-sm text-stone-700">{g.goal}</span>
                <span className="ml-auto text-green-500 text-sm flex-shrink-0">✅</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'fitur' && (
          <div className="space-y-6 mb-8">
            {/* New Components */}
            <div className="bg-white border border-amber-200 rounded-2xl p-7">
              <h3 className="text-base font-bold mb-4">🆕 Komponen Baru di V2</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-amber-100">
                      <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">File</th>
                      <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">Fungsi</th>
                      <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newComponents.map((c) => (
                      <tr key={c.name} className="border-b border-amber-50 hover:bg-amber-50 transition-colors">
                        <td className="py-3 px-3 font-mono text-xs text-amber-800 font-bold">{c.name}</td>
                        <td className="py-3 px-3 text-stone-600">{c.func}</td>
                        <td className="py-3 px-3">
                          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">🆕 NEW</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Improvements from V1 */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
              <h3 className="text-base font-bold mb-4">🔧 Peningkatan dari V1</h3>
              <ul className="space-y-3">
                {improvements.map((imp) => (
                  <li key={imp} className="flex items-center gap-3 text-sm text-stone-700">
                    <span className="text-amber-600">↑</span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Flow */}
            <div className="bg-white border border-amber-200 rounded-2xl p-7">
              <h3 className="text-base font-bold mb-4">🗺️ Struktur Navigasi V2</h3>
              <div className="bg-stone-900 text-amber-300 rounded-xl p-6 font-mono text-xs leading-6">
                <pre>{`Landing Page (GuestHome)
├── Header (Navbar + DarkMode Toggle)  ← NEW
├── Hero Section (Dynamic State)
├── Product Grid (4 Produk Unggulan)
├── Testimonial Carousel               ← NEW!
├── Promo Campaign
├── FAQ Accordion
├── Contact Form                       ← NEW!
└── Footer

Halaman Menu (/menu)                   ← NEW!
├── Filter Kategori
├── Grid Produk Lengkap
└── Pagination / Load More`}</pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold mb-4">User Stories V2</h2>
            {userStories.map((s) => (
              <div key={s.role} className="bg-stone-900 text-amber-50 rounded-2xl p-7">
                <p className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-3">Sebagai {s.role}</p>
                <p className="text-sm leading-relaxed text-amber-200/80 whitespace-pre-line">{s.story}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'commit' && (
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold mb-4">Bukti Commit V2</h2>
            {commits.map((c) => (
              <div key={c.hash} className="flex items-center gap-4 p-5 bg-stone-900 rounded-2xl">
                <span className="font-mono text-amber-400 text-xs bg-amber-900/30 px-3 py-1 rounded-lg flex-shrink-0 border border-amber-700/30">
                  {c.hash}
                </span>
                <span className="text-sm text-amber-200/80">{c.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Metrics Comparison */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-8">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">Perbandingan Metrics</p>
          <h2 className="text-lg font-bold mb-5">V1 vs V2</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-200">
                  <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">Metrik</th>
                  <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">Target</th>
                  <th className="text-center py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-stone-400">V1</th>
                  <th className="text-center py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">V2</th>
                </tr>
              </thead>
              <tbody>
                {metricsComparison.map((m) => (
                  <tr key={m.metric} className="border-b border-amber-50 hover:bg-amber-50 transition-colors">
                    <td className="py-3 px-3 font-bold text-stone-800">{m.metric}</td>
                    <td className="py-3 px-3 text-stone-500">{m.target}</td>
                    <td className="py-3 px-3 text-center text-stone-400">{m.v1}</td>
                    <td className="py-3 px-3 text-center text-green-600 font-bold">{m.v2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 justify-between items-center border-t border-amber-200 pt-8">
          <button
            onClick={() => navigate('/prd/v1')}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-stone-500 hover:text-stone-900 transition-colors uppercase"
          >
            ← PRD V1
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/prd/v1')}
              className="bg-amber-700 hover:bg-amber-800 text-white text-[10px] font-bold px-4 py-1.5 rounded-full transition-colors uppercase tracking-wider"
            >
              ← PRD V1
            </button>
            <span className="bg-stone-900 text-amber-300 text-[10px] font-bold px-3 py-1.5 rounded-full">PRD V2 ←</span>
            <button
              onClick={() => navigate('/prd/v3')}
              className="bg-amber-700 hover:bg-amber-800 text-white text-[10px] font-bold px-4 py-1.5 rounded-full transition-colors uppercase tracking-wider"
            >
              PRD V3 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
