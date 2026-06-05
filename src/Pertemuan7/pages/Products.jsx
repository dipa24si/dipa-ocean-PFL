import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import ProductsTable from '../components/ProductsTable';
import { Search } from 'lucide-react';

/**
 * HOOKS YANG DIGUNAKAN:
 * - useState: Menyimpan search term, filter category, dan products
 * - useEffect: Simulasi fetch data produk dari server
 * - useRef: Focus otomatis di search input
 */
export default function Products() {
  // useState untuk menyimpan state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useRef untuk fokus otomatis input search
  const searchInputRef = useRef(null);

  // useEffect untuk simulasi fetch data
  useEffect(() => {
    // Simulasi fetch data dari server/API
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulasi delay API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadProducts();

    // Log lifecycle untuk debugging
    console.log('[Products.jsx] Component mounted - useEffect dijalankan');

    return () => {
      console.log('[Products.jsx] Component will unmount - cleanup effect');
    };
  }, []); // dependency array kosong = jalankan hanya saat mount

  // useEffect untuk fokus otomatis di search input
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      console.log('[Products.jsx] Search input auto-focused - useRef working');
    }
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Menu Kopi & Produk" breadcrumb="Products" />
      
      {/* Search & Filter Section - useState untuk input kontrol */}
      <div className="mb-6 flex gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-[#78675C]" size={18} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Cari produk... (contoh: Espresso, Cappuccino)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
        >
          <option value="all">Semua Kategori</option>
          <option value="coffee">Kopi</option>
          <option value="dessert">Dessert</option>
          <option value="cold">Minuman Dingin</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading produk...</div>
      ) : (
        <ProductsTable searchTerm={searchTerm} selectedCategory={selectedCategory} />
      )}
    </div>
  );
}
