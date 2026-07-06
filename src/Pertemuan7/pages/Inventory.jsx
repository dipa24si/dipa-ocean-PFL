import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import InventoryCard from '../components/InventoryCard';
import SearchInput from '../components/SearchInput';
import { FiPlus } from 'react-icons/fi';
import { fetchInventory, createInventoryItem } from '../services/supabaseApi';

const fallbackInventory = [
  { id: 1, name: 'Kopi Arabica', category: 'Biji Kopi', stock: 25, unit: 'kg', minStock: 10, price: 'Rp 150.000', supplier: 'PT Kopi Nusantara' },
  { id: 2, name: 'Susu Full Cream', category: 'Susu', stock: 8, unit: 'liter', minStock: 15, price: 'Rp 25.000', supplier: 'CV Susu Sejahtera' },
  { id: 3, name: 'Gula Pasir', category: 'Pemanis', stock: 50, unit: 'kg', minStock: 20, price: 'Rp 15.000', supplier: 'Toko Grosir ABC' },
  { id: 4, name: 'Syrup Vanilla', category: 'Syrup', stock: 12, minStock: 5, unit: 'botol', price: 'Rp 45.000', supplier: 'Importir Syrup' },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState(fallbackInventory);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: '', stock: 0, minStock: 0, unit: 'kg', price: '', supplier: '' });

  useEffect(() => {
    const loadInventory = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInventory();
        setInventory(data);
      } catch (err) {
        console.warn('[Inventory.jsx] Supabase fetch failed, fallback to local inventory', err);
        setInventory(fallbackInventory);
      }
      setIsLoading(false);
    };

    loadInventory();
  }, []);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <PageHeader title="Stok Inventaris" breadcrumb="Inventory" />
        <button type="button" onClick={() => setShowAddForm((s) => !s)} className="flex items-center justify-center gap-2 px-6 py-3 bg-coffee-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-coffee-900/20 active:scale-95">
          <FiPlus className="w-5 h-5" />
          {showAddForm ? 'Tutup Form' : 'Tambah Item'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-coffee-100">
          <h3 className="text-lg font-bold mb-4">Tambah Item Inventaris</h3>
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              await createInventoryItem({
                name: newItem.name,
                category: newItem.category,
                stock: Number(newItem.stock),
                min_stock: Number(newItem.minStock),
                unit: newItem.unit,
                price: newItem.price,
                supplier: newItem.supplier,
              });
              const data = await fetchInventory();
              setInventory(data);
              setShowAddForm(false);
              setNewItem({ name: '', category: '', stock: 0, minStock: 0, unit: 'kg', price: '', supplier: '' });
            } catch (err) {
              console.error('Tambah inventaris gagal', err);
            }
          }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input required value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Nama item" className="p-3 border rounded" />
              <input required value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} placeholder="Kategori" className="p-3 border rounded" />
              <input required type="number" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })} placeholder="Stok" className="p-3 border rounded" />
              <input required type="number" value={newItem.minStock} onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })} placeholder="Min Stok" className="p-3 border rounded" />
              <input required value={newItem.unit} onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })} placeholder="Unit" className="p-3 border rounded" />
              <input required value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} placeholder="Harga (text)" className="p-3 border rounded" />
              <input value={newItem.supplier} onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })} placeholder="Supplier" className="p-3 border rounded md:col-span-3" />
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button type="button" onClick={() => { setShowAddForm(false); setNewItem({ name: '', category: '', stock: 0, minStock: 0, unit: 'kg', price: '', supplier: '' }); }} className="px-4 py-2 border rounded">Batal</button>
              <button type="submit" className="px-4 py-2 bg-coffee-900 text-white rounded">Simpan</button>
            </div>
          </form>
        </div>
      )}

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
