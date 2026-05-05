import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiPlus, FiSearch, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  // Data inventori kamu tetap sama
  const inventory = [
    { id: 1, name: 'Kopi Arabica', category: 'Biji Kopi', stock: 25, unit: 'kg', minStock: 10, price: 'Rp 150.000', supplier: 'PT Kopi Nusantara' },
    { id: 2, name: 'Susu Full Cream', category: 'Susu', stock: 8, unit: 'liter', minStock: 15, price: 'Rp 25.000', supplier: 'CV Susu Sejahtera' },
    { id: 3, name: 'Gula Pasir', category: 'Pemanis', stock: 50, unit: 'kg', minStock: 20, price: 'Rp 15.000', supplier: 'Toko Grosir ABC' },
    { id: 4, name: 'Syrup Vanilla', category: 'Syrup', stock: 12, unit: 'botol', minStock: 5, price: 'Rp 45.000', supplier: 'Importir Syrup' }
  ];

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock, minStock) => {
    if (stock <= minStock) return { status: 'Critical', color: 'text-red-600', bg: 'bg-red-50', icon: <FiAlertTriangle className="w-4 h-4" /> };
    if (stock <= minStock * 1.5) return { status: 'Warning', color: 'text-orange-600', bg: 'bg-orange-50', icon: <FiAlertTriangle className="w-4 h-4" /> };
    return { status: 'Safe', color: 'text-green-600', bg: 'bg-green-50', icon: <FiCheckCircle className="w-4 h-4" /> };
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header dengan Tombol Tambah yang lebih modern */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <PageHeader
          title="Stok Inventaris"
          breadcrumb="Inventory"
        />
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-coffee-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-coffee-900/20 active:scale-95">
          <FiPlus className="w-5 h-5" />
          Tambah Item
        </button>
      </div>

      {/* Search Bar - Dibuat lebih Clean */}
      <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-4 mb-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-espresso-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari bahan baku (kopi, susu, sirup...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-coffee-50 border-none rounded-xl focus:ring-2 focus:ring-coffee-200 outline-none transition-all text-coffee-900 font-medium placeholder:text-espresso-300"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => {
          const stockStatus = getStockStatus(item.stock, item.minStock);
          return (
            <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-coffee-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-2 py-1 bg-coffee-50 text-coffee-600 text-[10px] font-bold uppercase tracking-wider rounded-lg mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-coffee-900 text-xl group-hover:text-coffee-600 transition-colors">
                    {item.name}
                  </h3>
                </div>
                <div className={`p-3 rounded-2xl ${stockStatus.bg} ${stockStatus.color}`}>
                  {stockStatus.icon}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-coffee-50/50 p-3 rounded-xl">
                  <span className="text-sm text-espresso-500 font-medium">Stok Saat Ini</span>
                  <span className={`font-bold text-lg ${stockStatus.color}`}>
                    {item.stock} <span className="text-xs uppercase tracking-tighter">{item.unit}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 px-1">
                  <div>
                    <p className="text-[10px] text-espresso-400 uppercase font-bold tracking-tighter">Min. Stok</p>
                    <p className="font-semibold text-coffee-900">{item.minStock} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-espresso-400 uppercase font-bold tracking-tighter">Harga</p>
                    <p className="font-semibold text-coffee-900">{item.price}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-coffee-50">
                  <p className="text-[10px] text-espresso-400 uppercase font-bold tracking-tighter mb-1">Supplier Utama</p>
                  <p className="text-sm text-espresso-600 font-medium">{item.supplier}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-4 py-3 text-sm bg-coffee-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-md shadow-coffee-900/10 active:scale-95">
                  Update Stok
                </button>
                <button className="px-4 py-3 text-sm border border-coffee-100 text-coffee-900 rounded-xl font-bold hover:bg-coffee-50 transition-all active:scale-95">
                  Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredInventory.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-coffee-200">
          <div className="text-6xl mb-6 grayscale opacity-30">📦</div>
          <h3 className="text-xl font-bold text-coffee-900 mb-2">Item Tidak Ditemukan</h3>
          <p className="text-espresso-500 max-w-xs mx-auto">
            Maaf, kami tidak bisa menemukan bahan baku dengan kata kunci "{searchTerm}".
          </p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-6 text-coffee-600 font-bold hover:underline"
          >
            Hapus Pencarian
          </button>
        </div>
      )}
    </div>
  );
}