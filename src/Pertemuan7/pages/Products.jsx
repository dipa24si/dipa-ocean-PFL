import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';

const productIcons = {
  Coffee: '☕',
  Pastry: '🥐',
  Dessert: '🍰',
  'Cold Drinks': '🧊',
  Snack: '🥪',
  Tea: '🍵'
};

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

const defaultProduct = {
  name: '',
  category: 'Coffee',
  price: '',
  description: '',
  available: true
};

/**
 * Products Page Component
 * Halaman untuk mengelola menu produk
 */
export default function Products() {
  const [products, setProducts] = useState(generateInitialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState(defaultProduct);
  const [editingProductId, setEditingProductId] = useState(null);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const startEditProduct = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      available: product.available
    });
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
      id: editingProductId || products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price.trim().startsWith('Rp') ? newProduct.price.trim() : `Rp ${newProduct.price.trim()}`,
      description: newProduct.description,
      image: productIcons[newProduct.category] || '🍽️',
      available: newProduct.available
    };

    if (editingProductId) {
      setProducts(products.map((product) =>
        product.id === editingProductId ? productData : product
      ));
      cancelEditProduct();
      return;
    }

    setProducts([productData, ...products]);
    setShowAddForm(false);
    setNewProduct(defaultProduct);
  };

  return (
    <>
      <PageHeader
        title="Menu Produk"
        breadcrumb={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Menu Produk' }
        ]}
      >
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Tambah Produk
        </button>
      </PageHeader>

      <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6 mb-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-espresso-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
          >
            <option value="all">Semua Kategori</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmitProduct} className="bg-espresso-50 rounded-xl border border-espresso-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Nama Produk</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="Contoh: Espresso"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Kategori</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option value="Coffee">Coffee</option>
                  <option value="Pastry">Pastry</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Cold Drinks">Cold Drinks</option>
                  <option value="Snack">Snack</option>
                  <option value="Tea">Tea</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Harga</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="Rp 28.000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Status Ketersediaan</label>
                <select
                  value={newProduct.available ? 'available' : 'unavailable'}
                  onChange={(e) => setNewProduct({ ...newProduct, available: e.target.value === 'available' })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option value="available">Tersedia</option>
                  <option value="unavailable">Habis</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-espresso-700 mb-2">Deskripsi</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="Contoh: Latte dingin dengan rasa lembut"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
              <button
                type="button"
                onClick={cancelEditProduct}
                className="px-4 py-2 rounded-lg border border-espresso-300 text-espresso-800 hover:bg-espresso-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-coffee-600 text-white hover:bg-coffee-700 transition-colors"
              >
                {editingProductId ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-espresso-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gradient-to-br from-coffee-50 to-brew-50 flex items-center justify-center text-6xl">
              {product.image}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-espresso-900">{product.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  product.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.available ? 'Tersedia' : 'Habis'}
                </span>
              </div>
              <p className="text-sm text-espresso-600 mb-2">{product.category}</p>
              <p className="text-sm text-espresso-700 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-coffee-600">{product.price}</span>
                <div className="flex gap-1">
                  <button
                  type="button"
                  onClick={() => startEditProduct(product)}
                  className="p-2 text-espresso-600 hover:text-coffee-600 hover:bg-coffee-50 rounded transition-colors"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  className="p-2 text-espresso-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-lg font-medium text-espresso-900 mb-2">Tidak ada produk ditemukan</h3>
          <p className="text-espresso-600">Coba ubah kata kunci pencarian atau kategori.</p>
        </div>
      )}
    </>
  );
}