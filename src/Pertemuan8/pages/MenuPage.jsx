import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Coffee, LogIn, ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

/**
 * MenuPage — Halaman menu lengkap dengan filter kategori
 * Dipercantik dengan tema premium Format Ganjil (warna latar #F4F1EA)
 */

const allProducts = [
  { id: 1, name: 'Espresso Arabika', price: 25000, category: 'Kopi Klasik', rating: 4.8, badge: 'Classic', desc: 'Ekstraksi ganda biji Arabika pilihan dengan crema tebal.' },
  { id: 2, name: 'Cappuccino Vegan', price: 28000, category: 'Kopi Susu', rating: 4.9, badge: 'Healthy', desc: 'Espresso blend dipadukan dengan foam susu oat lembut.' },
  { id: 3, name: 'Iced Latte Vanilla', price: 32000, category: 'Kopi Dingin', rating: 4.7, badge: 'Sweet', desc: 'Kombinasi latte dingin dengan sirup vanilla organik premium.' },
  { id: 4, name: 'Cold Brew Nitro', price: 35000, category: 'Kopi Dingin', rating: 4.9, badge: 'Signature', desc: 'Kopi seduh dingin selama 16 jam dengan sensasi nitrogen yang creamy.' },
  { id: 5, name: 'Matcha Latte', price: 30000, category: 'Non-Kopi', rating: 4.6, badge: 'Popular', desc: 'Matcha Jepang premium diseduh dengan susu segar pilihan.' },
  { id: 6, name: 'Americano', price: 22000, category: 'Kopi Klasik', rating: 4.5, badge: 'Classic', desc: 'Espresso Arabika murni yang diencerkan dengan air panas.' },
  { id: 7, name: 'Mocha Deluxe', price: 35000, category: 'Kopi Susu', rating: 4.8, badge: 'Sweet', desc: 'Sinergi espresso, cokelat premium, dan susu steamed manis.' },
  { id: 8, name: 'Thai Tea', price: 27000, category: 'Non-Kopi', rating: 4.4, badge: 'Popular', desc: 'Seduhan teh hitam khas Thailand dipadu susu kental manis.' },
  { id: 9, name: 'Butter Croissant', price: 18000, category: 'Pastry', rating: 4.7, badge: 'Food', desc: 'Roti pastry Prancis berlapis mentega yang renyah di luar, lembut di dalam.' },
  { id: 10, name: 'Banana Bread', price: 15000, category: 'Pastry', rating: 4.5, badge: 'Food', desc: 'Roti pisang homemade bertekstur lembut dengan aroma kayu manis.' },
  { id: 11, name: 'Flat White', price: 29000, category: 'Kopi Susu', rating: 4.7, badge: 'Popular', desc: 'Double shot espresso disajikan dengan microfoam susu halus.' },
  { id: 12, name: 'Affogato', price: 33000, category: 'Kopi Klasik', rating: 4.9, badge: 'Signature', desc: 'Satu scoop gelato vanilla artisan disiram espresso Arabika panas.' },
];

const categories = ['Semua', 'Kopi Klasik', 'Kopi Susu', 'Kopi Dingin', 'Non-Kopi', 'Pastry'];

export default function MenuPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allProducts.filter((p) => {
    const matchCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0F0E0C] font-sans antialiased selection:bg-[#A88C74] selection:text-white pb-16">
      
      {/* Avant-Garde Minimalist Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center relative z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#0F0E0C]/60 hover:text-[#0F0E0C] transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Kembali
          </button>
          <div className="h-4 w-[1px] bg-[#0F0E0C]/10 hidden md:block"></div>
          <div className="group cursor-pointer hidden md:block" onClick={() => navigate('/')}>
            <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#A88C74]/70 mb-0.5">ATELIER OF COFFEE</p>
            <h1 className="text-lg font-bold tracking-widest text-[#0F0E0C]">FORMAT GANJIL</h1>
          </div>
        </div>

        <div className="md:hidden text-center cursor-pointer" onClick={() => navigate('/')}>
          <p className="text-[7px] font-bold tracking-[0.3em] uppercase text-[#A88C74]">ATELIER OF COFFEE</p>
          <h1 className="text-sm font-bold tracking-widest text-[#0F0E0C]">FORMAT GANJIL</h1>
        </div>

        <div>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 bg-[#0F0E0C] hover:bg-[#A88C74] text-[#F4F1EA] font-bold px-6 py-2 rounded-full text-[10px] tracking-widest uppercase transition-all shadow-xl shadow-black/10 active:scale-95"
          >
            <LogIn size={12} />
            Login
          </button>
        </div>
      </header>

      {/* Title Section */}
      <div className="max-w-6xl mx-auto px-6 mb-8 mt-4">
        <div className="flex items-center gap-2.5 border-b border-[#A88C74]/15 pb-4">
          <Coffee className="text-[#A88C74]" size={18} />
          <div>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A88C74]">SAJIAN LENGKAP KEDAI</p>
            <h3 className="text-2xl font-bold text-[#0F0E0C] font-display">Jelajahi Menu Kami</h3>
          </div>
        </div>
        <p className="text-xs text-[#0F0E0C]/50 font-light mt-3">
          Kami memecah batasan rasa tradisional. Silakan cari dan temukan racikan ganjil favorit Anda di bawah ini.
        </p>
      </div>

      {/* Search + Filter Section */}
      <div className="max-w-6xl mx-auto px-6 mb-8 space-y-5">
        <div className="relative w-full">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F0E0C]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari minuman atau pastry..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#A88C74]/15 bg-white text-xs text-[#0F0E0C] focus:outline-none focus:ring-2 focus:ring-[#A88C74]/20 placeholder-[#0F0E0C]/30 shadow-sm"
          />
        </div>
        
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#0F0E0C] text-[#F4F1EA] shadow-lg shadow-black/10'
                  : 'bg-white text-[#0F0E0C]/60 border border-[#A88C74]/15 hover:bg-[#F4F1EA] hover:text-[#0F0E0C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="max-w-6xl mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#A88C74]/15 rounded-[2.5rem] p-8 shadow-sm">
            <SlidersHorizontal size={36} className="mx-auto mb-3 opacity-30 text-[#0F0E0C]" />
            <p className="text-sm font-bold text-[#0F0E0C]/60">Tidak ada produk yang cocok dengan pencarian Anda</p>
            <p className="text-xs text-[#0F0E0C]/40 font-light mt-1">Coba cari kata kunci lain atau ubah kategori filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 50}>
                <div className="bg-white border border-[#A88C74]/15 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#F4F1EA] text-[#A88C74] rounded-full">
                        {product.badge}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/40">{product.category}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#0F0E0C] font-display group-hover:text-[#A88C74] transition-colors mb-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#0F0E0C]/50 leading-relaxed font-light mb-4 min-h-[48px]">
                      {product.desc}
                    </p>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-[#A88C74]/10 mt-auto">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-[#0F0E0C]">Rp {product.price.toLocaleString('id-ID')}</p>
                      <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-bold">
                        <span>★</span>
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="w-full bg-[#0F0E0C] hover:bg-[#A88C74] text-[#F4F1EA] py-2 rounded-xl transition-colors font-medium text-[9px] tracking-wider uppercase"
                    >
                      Login untuk Memesan
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}