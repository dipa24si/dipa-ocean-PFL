import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiPlus, FiSearch, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

/**
 * Inventory Page Component
 * Halaman untuk mengelola inventori bahan baku
 */
export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample inventory data
  const inventory = [
    {
      id: 1,
      name: 'Kopi Arabica',
      category: 'Biji Kopi',
      stock: 25,
      unit: 'kg',
      minStock: 10,
      price: 'Rp 150.000',
      supplier: 'PT Kopi Nusantara'
    },
    {
      id: 2,
      name: 'Susu Full Cream',
      category: 'Susu',
      stock: 8,
      unit: 'liter',
      minStock: 15,
      price: 'Rp 25.000',
      supplier: 'CV Susu Sejahtera'
    },
    {
      id: 3,
      name: 'Gula Pasir',
      category: 'Pemanis',
      stock: 50,
      unit: 'kg',
      minStock: 20,
      price: 'Rp 15.000',
      supplier: 'Toko Grosir ABC'
    },
    {
      id: 4,
      name: 'Syrup Vanilla',
      category: 'Syrup',
      stock: 12,
      unit: 'botol',
      minStock: 5,
      price: 'Rp 45.000',
      supplier: 'Importir Syrup'
    }
  ];

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock, minStock) => {
    if (stock <= minStock) return { status: 'low', color: 'text-red-600', bg: 'bg-red-50', icon: <FiAlertTriangle className="w-4 h-4" /> };
    if (stock <= minStock * 1.5) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: <FiAlertTriangle className="w-4 h-4" /> };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-50', icon: <FiCheckCircle className="w-4 h-4" /> };
  };

  return (
    <>
      <PageHeader
        title="Inventori"
        breadcrumb={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Inventori" }
        ]}
      >
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors">
          <FiPlus className="w-4 h-4" />
          Tambah Item
        </button>
      </PageHeader>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-espresso-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari bahan baku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => {
          const stockStatus = getStockStatus(item.stock, item.minStock);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-espresso-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-espresso-600">{item.category}</p>
                </div>
                <div className={`p-2 rounded-full ${stockStatus.bg}`}>
                  <span className={stockStatus.color}>
                    {stockStatus.icon}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-espresso-600">Stok:</span>
                  <span className={`font-medium ${stockStatus.color}`}>
                    {item.stock} {item.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-espresso-600">Min. Stok:</span>
                  <span className="font-medium text-espresso-900">
                    {item.minStock} {item.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-espresso-600">Harga:</span>
                  <span className="font-medium text-espresso-900">{item.price}</span>
                </div>

                <div className="pt-2 border-t border-espresso-100">
                  <p className="text-xs text-espresso-500">Supplier: {item.supplier}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm bg-coffee-600 text-white rounded hover:bg-coffee-700 transition-colors">
                  Update Stok
                </button>
                <button className="px-3 py-2 text-sm border border-espresso-300 text-espresso-700 rounded hover:bg-espresso-50 transition-colors">
                  Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-espresso-900 mb-2">Tidak ada item ditemukan</h3>
          <p className="text-espresso-600">Coba ubah kata kunci pencarian.</p>
        </div>
      )}
    </>
  );
}