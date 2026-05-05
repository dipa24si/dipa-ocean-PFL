import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiTag, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const productIcons = {
  Coffee: '☕',
  Pastry: '🥐',
  Dessert: '🍰',
  'Cold Drinks': '🧊',
  Snack: '🥪',
  Tea: '🍵'
};

// ... (Gunakan fungsi generateInitialProducts dan defaultProduct kamu yang sudah ada)
const generateInitialProducts = () => {
  const products = [
    { name: 'Espresso', category: 'Coffee', price: 15000, description: 'Kopi espresso klasik dengan rasa kuat dan kaya' },
    { name: 'Cappuccino', category: 'Coffee', price: 25000, description: 'Espresso dengan susu steamed dan foam yang sempurna' },
    { name: 'Latte', category: 'Coffee', price: 28000, description: 'Kopi dengan susu lembut dan sedikit busa' },
    { name: 'Americano', category: 'Coffee', price: 22000, description: 'Espresso panjang dengan air panas untuk rasa ringan' },
    { name: 'Croissant', category: 'Pastry', price: 18000, description: 'Croissant butter yang renyah dan lembut' },
    { name: 'Muffin Blueberry', category: 'Pastry', price: 20000, description: 'Muffin manis dengan potongan blueberry segar' },
    { name: 'Chocolate Cake', category: 'Dessert', price: 35000, description: 'Kue coklat dengan frosting krim yang lezat' },
    { name: 'Cheesecake', category: 'Dessert', price: 37000, description: 'Cheesecake lembut dengan lapisan keju krim' },
    { name: 'Iced Latte', category: 'Cold Drinks', price: 28000, description: 'Latte dingin dengan es yang menyegarkan' },
    { name: 'Iced Tea', category: 'Cold Drinks', price: 18000, description: 'Teh dingin manis dengan aroma lemon segar' }
  ];

  return Array.from({ length: 30 }, (_, index) => {
    const base = products[index % products.length];
    const additional = Math.floor(index / products.length) * 1000;
    const price = base.price + additional;
    return {
      id: index + 1,
      name: `${base.name}${index >= products.length ? ` ${Math.floor(index / products.length)}` : ''}`,
      category: base.category,
      price: `Rp ${price.toLocaleString('id-ID')}`,
      description: base.description,
      image: productIcons[base.category] || '🍽️',
      available: index % 7 !== 0
    };
  });
};

const defaultProduct = { name: '', category: 'Coffee', price: '', description: '', available: true };

export default function Products() {
  const [products, setProducts] = useState(generateInitialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState(defaultProduct);
  const [editingProductId, setEditingProductId] = useState(null);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Logika Filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handlers (Tetap pakai logika kamu yang sudah jalan)
  const startEditProduct = (product) => {
    setEditingProductId(product.id);
    setNewProduct({ ...product });
    setShowAddForm(true);
  };

  const cancelEditProduct = () => {
    setEditingProductId(null);
    setNewProduct(defaultProduct);
    setShowAddForm(false);
  };

  const removeProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const productData = {
      ...newProduct,
      id: editingProductId || products.length + 1,
      price: newProduct.price.toString().startsWith('Rp') ? newProduct.price : `Rp ${newProduct.price}`,
      image: productIcons[newProduct.category] || '🍽️',
    };
    if (editingProductId) {
      setProducts(products.map((p) => (p.id === editingProductId ? productData : p)));
    } else {
      setProducts([productData, ...products]);
    }
    cancelEditProduct();
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <PageHeader title="Menu Kopi & Produk" breadcrumb="Products" />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-coffee-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-coffee-900/20 active:scale-95"
        >
          <FiPlus /> {showAddForm ? 'Tutup Form' : 'Tambah Menu'}
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl border border-coffee-100 p-4 mb-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari menu favorit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-coffee-50 border-none rounded-2xl focus:ring-2 focus:ring-coffee-200 outline-none text-coffee-900 font-medium transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-2xl text-sm font-bold capitalize whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                  ? 'bg-coffee-900 text-white shadow-md' 
                  : 'bg-coffee-50 text-espresso-500 hover:bg-coffee-100'
                }`}
              >
                {cat === 'all' ? 'Semua' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Add Form with BrewMaster Style */}
        {showAddForm && (
          <form onSubmit={handleSubmitProduct} className="bg-coffee-50/50 rounded-3xl p-6 border border-coffee-100 mt-4 animate-in slide-in-from-top-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Nama Produk</label>
                <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Kategori</label>
                <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm font-bold text-coffee-900">
                  {Object.keys(productIcons).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Harga (Rp)</label>
                <input type="text" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Deskripsi Produk</label>
                <input type="text" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Ketersediaan</label>
                <button 
                  type="button" 
                  onClick={() => setNewProduct({...newProduct, available: !newProduct.available})}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${newProduct.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {newProduct.available ? '🟢 Tersedia' : '🔴 Habis'}
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={cancelEditProduct} className="px-6 py-2 font-bold text-espresso-400 hover:text-red-500 transition-colors">Batal</button>
              <button type="submit" className="px-8 py-3 bg-coffee-900 text-white rounded-xl font-bold shadow-lg shadow-coffee-900/20 active:scale-95">
                {editingProductId ? 'Update Menu' : 'Simpan Menu Baru'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-[2.5rem] border border-coffee-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-coffee-50 to-white rounded-3xl flex items-center justify-center text-7xl mb-5 group-hover:scale-105 transition-transform duration-500">
              {product.image}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-espresso-400 mb-1">
                    <FiTag size={10} /> {product.category}
                  </span>
                  <h3 className="font-bold text-coffee-900 text-lg leading-tight group-hover:text-coffee-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className={`p-1 rounded-full ${product.available ? 'text-green-500' : 'text-red-400'}`}>
                  {product.available ? <FiCheckCircle size={20} /> : <FiXCircle size={20} />}
                </div>
              </div>

              <p className="text-xs text-espresso-500 font-medium line-clamp-2 min-h-[2.5rem]">
                {product.description}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-coffee-50">
                <span className="text-xl font-black text-coffee-900">{product.price}</span>
                <div className="flex gap-2">
                  <button onClick={() => startEditProduct(product)} className="p-3 bg-coffee-50 text-coffee-900 rounded-2xl hover:bg-coffee-900 hover:text-white transition-all">
                    <FiEdit size={16} />
                  </button>
                  <button onClick={() => removeProduct(product.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-coffee-200">
          <div className="text-7xl mb-4 grayscale opacity-20">☕</div>
          <h3 className="text-xl font-bold text-coffee-900">Menu tidak ditemukan</h3>
          <p className="text-espresso-400">Coba cari dengan kata kunci lain.</p>
        </div>
      )}
    </div>
  );
}