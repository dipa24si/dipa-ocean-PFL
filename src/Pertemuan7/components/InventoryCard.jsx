import StockStatusBadge from './StockStatusBadge';
import { getStockStatus } from '../utils/stockStatus';

export default function InventoryCard({ item }) {
  const stockStatus = getStockStatus(item.stock, item.minStock);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-coffee-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="inline-block px-2 py-1 bg-coffee-50 text-coffee-600 text-[10px] font-bold uppercase tracking-wider rounded-lg mb-2">
            {item.category}
          </span>
          <h3 className="font-bold text-coffee-900 text-xl group-hover:text-coffee-600 transition-colors">
            {item.name}
          </h3>
        </div>
        <StockStatusBadge stock={item.stock} minStock={item.minStock} />
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
        <button type="button" className="flex-1 px-4 py-3 text-sm bg-coffee-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-md shadow-coffee-900/10 active:scale-95">
          Update Stok
        </button>
        <button type="button" className="px-4 py-3 text-sm border border-coffee-100 text-coffee-900 rounded-xl font-bold hover:bg-coffee-50 transition-all active:scale-95">
          Detail
        </button>
      </div>
    </div>
  );
}
