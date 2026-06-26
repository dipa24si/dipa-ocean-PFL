import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Coffee, LogIn } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

/**
 * MenuPage — Halaman menu lengkap dengan filter kategori
 * Fitur PRD V2: Halaman Menu Lengkap
 */

const allProducts = [
  { id: 1, name: 'Espresso Arabika', price: 25000, category: 'Kopi Klasik', rating: 4.8, badge: 'Classic', desc: 'Ekstraksi ganda biji Arabika pilihan' },
  { id: 2, name: 'Cappuccino Vegan', price: 28000, category: 'Kopi Susu', rating: 4.9, badge: 'Healthy', desc: 'Espresso blend dengan foam susu oat' },
  { id: 3, name: 'Iced Latte Vanilla', price: 32000, category: 'Kopi Dingin', rating: 4.7, badge: 'Sweet', desc: 'Latte dingin dengan sirup vanilla organik' },
  { id: 4, name: 'Cold Brew Nitro', price: 35000, category: 'Kopi Dingin', rating: 4.9, badge: 'Signature', desc: 'Kopi seduh 16 jam dengan nitrogen creamy' },
  { id: 5, name: 'Matcha Latte', price: 30000, category: 'Non-Kopi', rating: 4.6, badge: 'Popular', desc: 'Matcha premium dengan susu pilihan' },
  { id: 6, name: 'Americano', price: 22000, category: 'Kopi Klasik', rating: 4.5, badge: 'Classic', desc: 'Espresso dengan air panas' },
  { id: 7, name: 'Mocha Deluxe', price: 35000, category: 'Kopi Susu', rating: 4.8, badge: 'Sweet', desc: 'Perpaduan cokelat dan espresso creamy' },
  { id: 8, name: 'Thai Tea', price: 27000, category: 'Non-Kopi', rating: 4.4, badge: 'Popular', desc: 'Teh Thailand dengan susu kental manis' },
  { id: 9, name: 'Butter Croissant', price: 18000, category: 'Pastry', rating: 4.7, badge: 'Food', desc: 'Croissant Prancis dengan butter asli' },
  { id: 10, name: 'Banana Bread', price: 15000, category: 'Pastry', rating: 4.5, badge: 'Food', desc: 'Roti pisang homemade' },
  { id: 11, name: 'Flat White', price: 29000, category: 'Kopi Susu', rating: 4.7, badge: 'Popular', desc: 'Espresso dengan microfoam susu' },
  { id: 12, name: 'Affogato', price: 33000, category: 'Kopi Klasik', rating: 4.9, badge: 'Signature', desc: 'Espresso di atas gelato vanila' },
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
    <div className="min-h-screen bg-amber-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">Atelier of Coffee</p>
          <h1 className="text-xl font-bold tracking-wide">FORMAT GANJIL</h1>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-stone-900 dark:bg-amber-700 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider hover:bg-amber-800 transition-colors"
        >
          <LogIn size={14} />
          Login
        </button>
      </header>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Coffee size={20} className="text-amber-700 dark:text-amber-400" />
          <p className="text-[10px] font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">Menu Lengkap</p>
        </div>
        <h2 className="text-2xl font-bold">Jelajahi Menu Kami</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Temukan minuman dan makanan favorit Anda</p>
      </div>

      {/* Search + Filter */}
      <div className="max-w-6xl mx-auto px-4 mb-6 space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari menu..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-stone-900 dark:bg-amber-700 text-white'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-amber-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-500 dark:text-stone-400">
            <SlidersHorizontal size={32} className="mx-auto mb-2 opacity-50" />
            <p>Tidak ada produk yang cocok dengan pencarian Anda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 50}>
                <div className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full">
                      {product.badge}
                    </span>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500">{product.category}</span>
                  </div>
                  <h4 className="text-base font-bold">{product.name}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">{product.desc}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-amber-100 dark:border-stone-700">
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Rp {product.price.toLocaleString('id-ID')}</p>
                    <span className="text-xs text-stone-400 dark:text-stone-500">★ {product.rating}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      <footer className="text-center py-6 text-[10px] tracking-wider text-stone-400 border-t border-amber-200 dark:border-stone-700 bg-white dark:bg-stone-800">
        &copy; 2026 Format Ganjil. All rights reserved.
      </footer>
    </div>
  );
}