export default function ProductForm({
  product,
  productIcons,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}) {
  const updateProduct = (field, value) => {
    onChange({ ...product, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="bg-coffee-50/50 rounded-3xl p-6 border border-coffee-100 mt-4 animate-in slide-in-from-top-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Nama Produk</label>
          <input type="text" value={product.name} onChange={(event) => updateProduct('name', event.target.value)} className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Kategori</label>
          <select value={product.category} onChange={(event) => updateProduct('category', event.target.value)} className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm font-bold text-coffee-900">
            {Object.keys(productIcons).map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Harga (Rp)</label>
          <input type="text" value={product.price} onChange={(event) => updateProduct('price', event.target.value)} className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Deskripsi Produk</label>
          <input type="text" value={product.description} onChange={(event) => updateProduct('description', event.target.value)} className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-espresso-400 uppercase tracking-widest ml-1">Ketersediaan</label>
          <button
            type="button"
            onClick={() => updateProduct('available', !product.available)}
            className={`w-full py-3 rounded-xl font-bold transition-all ${product.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {product.available ? 'Tersedia' : 'Habis'}
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-6 py-2 font-bold text-espresso-400 hover:text-red-500 transition-colors">Batal</button>
        <button type="submit" className="px-8 py-3 bg-coffee-900 text-white rounded-xl font-bold shadow-lg shadow-coffee-900/20 active:scale-95">
          {isEditing ? 'Update Menu' : 'Simpan Menu Baru'}
        </button>
      </div>
    </form>
  );
}
