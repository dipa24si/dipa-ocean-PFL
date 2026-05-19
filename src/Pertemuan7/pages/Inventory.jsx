import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import InventoryCard from '../components/InventoryCard';
import SearchInput from '../components/SearchInput';
import { FiPlus } from 'react-icons/fi';

const inventory = [
  { id: 1, name: 'Kopi Arabica', category: 'Biji Kopi', stock: 25, unit: 'kg', minStock: 10, price: 'Rp 150.000', supplier: 'PT Kopi Nusantara' },
  { id: 2, name: 'Susu Full Cream', category: 'Susu', stock: 8, unit: 'liter', minStock: 15, price: 'Rp 25.000', supplier: 'CV Susu Sejahtera' },
  { id: 3, name: 'Gula Pasir', category: 'Pemanis', stock: 50, unit: 'kg', minStock: 20, price: 'Rp 15.000', supplier: 'Toko Grosir ABC' },
  { id: 4, name: 'Syrup Vanilla', category: 'Syrup', stock: 12, unit: 'botol', minStock: 5, price: 'Rp 45.000', supplier: 'Importir Syrup' },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <PageHeader title="Stok Inventaris" breadcrumb="Inventory" />
        <button type="button" className="flex items-center justify-center gap-2 px-6 py-3 bg-coffee-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-coffee-900/20 active:scale-95">
          <FiPlus className="w-5 h-5" />
          Tambah Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-4 mb-8">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Cari bahan baku (kopi, susu, sirup...)"
          inputClassName="rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </div>

      {filteredInventory.length === 0 && (
        <EmptyState
          icon="Box"
          title="Item Tidak Ditemukan"
          description={`Maaf, kami tidak bisa menemukan bahan baku dengan kata kunci "${searchTerm}".`}
          actionLabel="Hapus Pencarian"
          onAction={() => setSearchTerm('')}
        />
      )}
    </div>
  );
}
