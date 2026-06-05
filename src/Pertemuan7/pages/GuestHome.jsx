import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react';

/**
 * Guest Home Page - Landing Page untuk user yang belum login
 * HOOKS YANG DIGUNAKAN:
 * - useState: Menyimpan favorites, active promo, cart items
 * - useEffect: Simulasi fetch promo dari API
 */
export default function GuestHome() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const [featuredProducts] = useState([
    { id: 1, name: 'Espresso Arabika', price: 25000, rating: 4.8, reviews: 234, image: '☕' },
    { id: 2, name: 'Cappuccino Vegan', price: 28000, rating: 4.9, reviews: 189, image: '🥛' },
    { id: 3, name: 'Iced Latte Vanilla', price: 32000, rating: 4.7, reviews: 256, image: '🧊' },
    { id: 4, name: 'Cold Brew Nitro', price: 35000, rating: 4.9, reviews: 145, image: '💨' },
  ]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId) => {
    setCartCount((prev) => prev + 1);
    console.log(`[GuestHome] Produk ${productId} ditambahkan ke cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F5] to-white">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#3E2C1C]/10 sticky top-0 z-40 pt-2">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">☕</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="text-[#3E2C1C] cursor-pointer" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-[#8B6F47] text-white rounded-lg hover:bg-[#6B5636] transition-colors font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Service Automation - Info Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-[#D4A574]/20 shadow-sm hover:shadow-md transition-shadow">
            <Zap className="text-[#D4A574] mb-3" size={32} />
            <h3 className="font-bold text-[#3E2C1C] mb-2">Pesan Otomatis</h3>
            <p className="text-[#78675C] text-sm">Sistem otomatis memproses pesanan Anda dalam hitungan detik</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-[#D4A574]/20 shadow-sm hover:shadow-md transition-shadow">
            <Heart className="text-[#D4A574] mb-3" size={32} />
            <h3 className="font-bold text-[#3E2C1C] mb-2">Rekomendasikan</h3>
            <p className="text-[#78675C] text-sm">Dapatkan rekomendasi produk favorit berdasarkan preferensi Anda</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-[#D4A574]/20 shadow-sm hover:shadow-md transition-shadow">
            <Star className="text-[#D4A574] mb-3" size={32} />
            <h3 className="font-bold text-[#3E2C1C] mb-2">Rating Terbaik</h3>
            <p className="text-[#78675C] text-sm">Lihat rating & ulasan dari pelanggan setia Format Ganjil</p>
          </div>
        </div>
      </section>

      {/* Featured Products - useState untuk favorites */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#3E2C1C] mb-8">Produk Pilihan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-[#D4A574]/20 overflow-hidden hover:shadow-lg transition-all">
              {/* Gambar/Icon */}
              <div className="bg-gradient-to-br from-[#FDF8F5] to-[#E8DDD0] h-40 flex items-center justify-center text-6xl">
                {product.image}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#3E2C1C] mb-2">{product.name}</h3>
                <p className="text-[#D4A574] font-bold text-lg mb-3">Rp {product.price.toLocaleString('id-ID')}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-sm text-[#78675C]">({product.reviews})</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex-1 bg-[#8B6F47] text-white py-2 rounded-lg hover:bg-[#6B5636] transition-colors font-medium"
                  >
                    + Keranjang
                  </button>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      favorites.includes(product.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3E2C1C] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2026 Format Ganjil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
