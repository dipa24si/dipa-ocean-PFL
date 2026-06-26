import { useNavigate } from 'react-router-dom';

/**
 * PRD V1 — Basic Landing Page Documentation
 * Halaman web yang menampilkan PRD V1 secara visual
 */

const goals = [
  { no: 1, goal: 'Menyediakan halaman landing sederhana yang responsive' },
  { no: 2, goal: 'Menampilkan informasi dasar perusahaan (nama, deskripsi, lokasi)' },
  { no: 3, goal: 'Menampilkan daftar produk/kopi yang dijual' },
  { no: 4, goal: 'Form kontak sederhana untuk calon pelanggan' },
  { no: 5, goal: 'Optimasi mobile-friendly minimal' },
];

const components = [
  { name: 'Header', func: 'Navigasi dan branding' },
  { name: 'Hero Section', func: 'Tagline dan CTA (Call to Action)' },
  { name: 'Product Grid', func: 'Menampilkan 4 produk unggulan' },
  { name: 'Promo Cards', func: '3 kartu informasi promosi' },
  { name: 'FAQ Accordion', func: 'Tanya jawab umum' },
  { name: 'Footer', func: 'Informasi hak cipta' },
];

const metrics = [
  { metric: 'Page Load Time', target: '< 3 detik', status: '✅' },
  { metric: 'Mobile Responsive', target: 'Ya', status: '✅' },
  { metric: 'Aksesibilitas Dasar', target: 'Skor > 70', status: '✅' },
  { metric: 'No Broken Links', target: '100%', status: '✅' },
];

const commits = [
  { hash: '0a4d6d7', message: 'Pertemuan 10 - Penerapan ShadcnUI' },
  { hash: 'b82f34b', message: 'Merge shadcnui ke main' },
  { hash: 'f7bac09', message: 'Otak atik halaman guest dan halaman member' },
];

const results = [
  'Landing page berfungsi dengan baik',
  'Desain responsive untuk mobile dan desktop',
  'Menampilkan 4 produk unggulan',
  'Menampilkan 3 promosi aktif',
  'FAQ interaktif dengan accordion',
  'Navigasi ke halaman login',
  'Tampilan modern dengan tema kopi',
];

export default function PRDPage1() {
  const navigate = useNavigate();

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
        <div className="bg-gradient-to-br from-stone-900 to-amber-900 text-amber-50 rounded-3xl p-10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                ✅ Completed
              </span>
              <span className="bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Versi 1.0.0 Basic
              </span>
              <span className="bg-white/5 text-amber-200/70 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                26 Juni 2026
              </span>
            </div>
            <h1 className="text-4xl font-light tracking-wide mb-2">
              PRD V1 — <span className="italic text-amber-300">Basic</span>
            </h1>
            <p className="text-sm font-bold tracking-widest text-amber-400 uppercase mb-4">
              Product Requirement Document · Format Ganjil CRM · Landing Page
            </p>
            <p className="text-amber-200/70 text-sm leading-relaxed max-w-2xl">
              Dokumentasi lengkap versi pertama landing page Format Ganjil — coffee shop dengan pendekatan digital
              pertama yang informatif, profesional, dan mobile-friendly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Latar Belakang */}
          <div className="lg:col-span-2 bg-white border border-amber-200 rounded-2xl p-7">
            <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">01 · Latar Belakang</p>
            <h2 className="text-lg font-bold mb-3">Mengapa PRD V1 dibuat?</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Format Ganjil adalah coffee shop yang membutuhkan kehadiran digital untuk memperkenalkan bisnis mereka
              secara online. Landing Page dasar diperlukan sebagai etalase digital pertama yang informatif dan
              profesional — menjangkau calon pelanggan yang mencari coffee shop berkualitas.
            </p>
          </div>

          {/* Target Audiens */}
          <div className="bg-amber-900 text-amber-50 rounded-2xl p-7">
            <p className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-2">Target Audiens</p>
            <h2 className="text-lg font-bold mb-4">Siapa yang dituju?</h2>
            <ul className="space-y-3 text-sm text-amber-200/80">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                Pengunjung baru yang mencari coffee shop
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                Calon pelanggan yang ingin tahu menu
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                Pengguna mobile via smartphone
              </li>
            </ul>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">02 · Goals</p>
          <h2 className="text-lg font-bold mb-5">Tujuan Pengembangan V1</h2>
          <div className="space-y-3">
            {goals.map((g) => (
              <div key={g.no} className="flex items-center gap-4 p-3 bg-amber-50 rounded-xl">
                <span className="w-8 h-8 bg-stone-900 text-amber-200 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {g.no}
                </span>
                <span className="text-sm text-stone-700">{g.goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-stone-900 text-amber-50 rounded-2xl p-7">
            <p className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-3">User Story 01</p>
            <p className="text-sm leading-relaxed text-amber-200/80">
              <span className="font-bold text-amber-300">Sebagai pengunjung baru,</span>
              <br />
              Saya ingin melihat-lihat produk kopi yang tersedia
              <br />
              <span className="italic">Sehingga saya tertarik untuk mendaftar menjadi member.</span>
            </p>
          </div>
          <div className="bg-stone-900 text-amber-50 rounded-2xl p-7">
            <p className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mb-3">User Story 02</p>
            <p className="text-sm leading-relaxed text-amber-200/80">
              <span className="font-bold text-amber-300">Sebagai calon pelanggan,</span>
              <br />
              Saya ingin melihat informasi promo dan fasilitas
              <br />
              <span className="italic">Sehingga saya bisa memutuskan untuk berkunjung.</span>
            </p>
          </div>
        </div>

        {/* Komponen */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">03 · Scope</p>
          <h2 className="text-lg font-bold mb-5">Komponen yang Dibangun (V1)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-200">
                  <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">Komponen</th>
                  <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">Fungsi</th>
                  <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {components.map((c) => (
                  <tr key={c.name} className="border-b border-amber-50 hover:bg-amber-50 transition-colors">
                    <td className="py-3 px-3 font-bold text-stone-900">{c.name}</td>
                    <td className="py-3 px-3 text-stone-600">{c.func}</td>
                    <td className="py-3 px-3">
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">✅ Done</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wireframe */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">04 · Wireframe</p>
          <h2 className="text-lg font-bold mb-5">Struktur Halaman V1</h2>
          <div className="bg-stone-900 text-amber-300 rounded-xl p-6 font-mono text-xs leading-6 overflow-x-auto">
            <pre>{`┌─────────────────────────────────────┐
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
└─────────────────────────────────────┘`}</pre>
          </div>
        </div>

        {/* Bukti Commit */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">05 · Bukti Commit</p>
          <h2 className="text-lg font-bold mb-5">Riwayat Git untuk V1</h2>
          <div className="space-y-3">
            {commits.map((c) => (
              <div key={c.hash} className="flex items-center gap-4 p-4 bg-stone-900 rounded-xl">
                <span className="font-mono text-amber-400 text-xs bg-amber-900/30 px-3 py-1 rounded-lg flex-shrink-0">
                  {c.hash}
                </span>
                <span className="text-sm text-amber-200/80">{c.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="bg-white border border-amber-200 rounded-2xl p-7 mb-6">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">06 · Metrics Kualitas</p>
          <h2 className="text-lg font-bold mb-5">Standar Kualitas V1</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.metric} className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{m.status}</div>
                <div className="text-xs font-bold text-stone-700 mb-1">{m.metric}</div>
                <div className="text-[10px] text-stone-400 font-medium">{m.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hasil */}
        <div className="bg-gradient-to-br from-green-900 to-stone-900 text-white rounded-2xl p-7 mb-8">
          <p className="text-[10px] font-bold tracking-widest text-green-400 uppercase mb-2">07 · Hasil Akhir V1</p>
          <h2 className="text-lg font-bold mb-5 text-white">Semua target V1 tercapai ✅</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((r) => (
              <div key={r} className="flex items-center gap-3 text-sm text-green-200/90">
                <span className="text-green-400 text-base">✅</span>
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Notes for V2 */}
        <div className="bg-amber-900/20 border border-amber-300 rounded-2xl p-7 mb-8">
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase mb-2">08 · Catatan untuk V2</p>
          <h2 className="text-lg font-bold mb-4">Yang akan ditingkatkan di V2</h2>
          <ul className="space-y-2 text-sm text-stone-600">
            <li>○ Tambahkan halaman menu lengkap</li>
            <li>○ Integrasi dengan sistem reservasi</li>
            <li>○ Tambahkan section testimonial pelanggan</li>
            <li>○ Animasi transisi yang lebih halus</li>
            <li>○ Dark mode toggle</li>
          </ul>
        </div>

        {/* Navigation to next */}
        <div className="flex flex-wrap gap-4 justify-between items-center border-t border-amber-200 pt-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-stone-500 hover:text-stone-900 transition-colors uppercase"
          >
            ← Halaman Utama
          </button>
          <div className="flex gap-3">
            <span className="bg-stone-900 text-amber-300 text-[10px] font-bold px-3 py-1.5 rounded-full">PRD V1 ←</span>
            <button
              onClick={() => navigate('/prd/v2')}
              className="bg-amber-700 hover:bg-amber-800 text-white text-[10px] font-bold px-4 py-1.5 rounded-full transition-colors uppercase tracking-wider"
            >
              PRD V2 →
            </button>
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
