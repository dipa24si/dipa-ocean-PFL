import { useNavigate } from 'react-router-dom';
import { Coffee, Gift, Megaphone, LogIn } from 'lucide-react';

/**
 * PRD V1 — Basic Landing Page
 * Fitur:
 * - Hero section dengan CTA
 * - 4 produk unggulan
 * - 3 promo cards
 * - FAQ sederhana
 * - Footer
 */

const promos = [
  {
    title: 'Happy Hour Kopi Susu',
    description: 'Diskon 25% untuk Kopi Susu setiap Senin-Jumat pukul 14.00-17.00.',
    tag: 'Member Deal',
  },
  {
    title: 'Bundling Pastry',
    description: 'Beli minuman signature, dapatkan potongan Rp 10.000 untuk butter croissant.',
    tag: 'Food Pairing',
  },
  {
    title: 'Stamp Reward',
    description: 'Kumpulkan 5 transaksi, transaksi berikutnya gratis upgrade ukuran.',
    tag: 'Loyalty',
  },
];

const featuredProducts = [
  { id: 1, name: 'Espresso Arabika', price: 25000, rating: 4.8, badge: 'Classic', desc: 'Ekstraksi ganda biji Arabika pilihan.' },
  { id: 2, name: 'Cappuccino Vegan', price: 28000, rating: 4.9, badge: 'Healthy', desc: 'Espresso blend dengan foam susu oat lembut.' },
  { id: 3, name: 'Iced Latte Vanilla', price: 32000, rating: 4.7, badge: 'Sweet', desc: 'Latte dingin dengan sirup vanilla organik.' },
  { id: 4, name: 'Cold Brew Nitro', price: 35000, rating: 4.9, badge: 'Signature', desc: 'Kopi seduh 16 jam dengan sensasi nitrogen creamy.' },
];

export default function GuestHomeV1() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 font-sans">
      {/* Ticker */}
      <div className="bg-stone-900 text-amber-200 text-xs font-semibold tracking-widest py-2 text-center">
        ⚡ THE ODDITY SEDUHAN: KLAIM WELCOME TOKEN UNTUK VISITOR BARU
      </div>

      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-amber-700 uppercase">Atelier of Coffee</p>
          <h1 className="text-xl font-bold tracking-wide">FORMAT GANJIL</h1>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider hover:bg-amber-800 transition-colors"
        >
          <LogIn size={14} />
          Login
        </button>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
        <div className="lg:col-span-2 bg-stone-900 text-amber-50 rounded-2xl p-8">
          <p className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-2">Selamat Datang</p>
          <h2 className="text-3xl font-light leading-tight mb-2">
            Where Logic Fails, <span className="italic text-amber-300">Great Coffee Speaks.</span>
          </h2>
          <p className="text-amber-200/70 text-sm mb-4">Kami memecah aturan ekstraksi untuk rasa yang tidak biasa.</p>
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-bold tracking-widest text-amber-300 hover:text-white transition-colors underline underline-offset-4"
          >
            Daftar Member Untuk Akses Penuh →
          </button>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-amber-200 flex flex-col justify-center">
          <p className="text-xs font-bold tracking-widest text-amber-700 uppercase">Digital Workspace</p>
          <p className="text-2xl font-light mt-1">148 <span className="text-xs font-bold text-amber-700">Mbps</span></p>
          <p className="text-xs text-stone-400">Koneksi serat optik di setiap sudut meja.</p>
        </div>
      </section>

      {/* Produk */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex items-center gap-2 mb-4 border-b border-amber-200 pb-3">
          <Coffee size={18} className="text-amber-700" />
          <h3 className="text-lg font-bold">Produk Pilihan Kami</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-amber-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-amber-50 text-amber-700 rounded-full">
                {product.badge}
              </span>
              <h4 className="text-base font-bold mt-2 mb-1">{product.name}</h4>
              <p className="text-xs text-stone-500 mb-3">{product.desc}</p>
              <div className="flex justify-between items-center pt-2 border-t border-amber-100">
                <p className="text-sm font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                <span className="text-xs text-stone-400">★ {product.rating}</span>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="w-full mt-3 bg-stone-900 text-white py-2 rounded-xl text-[10px] font-bold tracking-wider hover:bg-amber-800 transition-colors"
              >
                Login untuk Memesan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Promo */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex items-center gap-2 mb-4 border-b border-amber-200 pb-3">
          <Gift size={18} className="text-amber-700" />
          <h3 className="text-lg font-bold">Campaign Promo</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promos.map((promo) => (
            <div key={promo.title} className="bg-white border border-amber-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 border border-amber-300 px-2 py-0.5 rounded-full">
                <Megaphone size={10} />
                {promo.tag}
              </span>
              <h4 className="text-base font-bold mt-3 mb-1">{promo.title}</h4>
              <p className="text-xs text-stone-500">{promo.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-[10px] tracking-wider text-stone-400 border-t border-amber-200 bg-white">
        &copy; 2026 Format Ganjil. All rights reserved.
      </footer>
    </div>
  );
}