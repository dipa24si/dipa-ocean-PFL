import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import CategoryFilter from '../components/CategoryFilter';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import SearchInput from '../components/SearchInput';
import { FiPlus } from 'react-icons/fi';

const productImages = {
  Espresso: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80',
  Cappuccino: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80',
  Latte: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
  Americano: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  Croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
  'Muffin Blueberry': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=900&q=80',
  'Chocolate Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
  Cheesecake: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
  'Iced Latte': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
  'Iced Tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80',
};

const categoryImages = {
  Coffee: productImages.Latte,
  Pastry: productImages.Croissant,
  Dessert: productImages['Chocolate Cake'],
  'Cold Drinks': productImages['Iced Latte'],
  Snack: productImages.Croissant,
  Tea: productImages['Iced Tea'],
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
    { name: 'Iced Tea', category: 'Cold Drinks', price: 18000, description: 'Teh dingin manis dengan aroma lemon segar' },
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
      image: productImages[base.name] || categoryImages[base.category],
      available: index % 7 !== 0,
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

  const categories = ['all', ...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const productData = {
      ...newProduct,
      id: editingProductId || products.length + 1,
      price: newProduct.price.toString().startsWith('Rp') ? newProduct.price : `Rp ${newProduct.price}`,
      image: categoryImages[newProduct.category],
    };

    if (editingProductId) {
      setProducts(products.map((product) => (product.id === editingProductId ? productData : product)));
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
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-coffee-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-coffee-900/20 active:scale-95"
        >
          <FiPlus /> {showAddForm ? 'Tutup Form' : 'Tambah Menu'}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-coffee-100 p-4 mb-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Cari menu favorit..."
            className="flex-1"
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {showAddForm && (
          <ProductForm
            product={newProduct}
            productIcons={categoryImages}
            isEditing={Boolean(editingProductId)}
            onChange={setNewProduct}
            onSubmit={handleSubmitProduct}
            onCancel={cancelEditProduct}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={startEditProduct}
            onRemove={removeProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <EmptyState
          icon="Menu"
          title="Menu tidak ditemukan"
          description="Coba cari dengan kata kunci lain."
          className="py-24 rounded-[3rem]"
        />
      )}
    </div>
  );
}
