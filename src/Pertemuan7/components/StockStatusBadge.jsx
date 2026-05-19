import { getStockStatus } from '../utils/stockStatus';

export default function StockStatusBadge({ stock, minStock }) {
  const stockStatus = getStockStatus(stock, minStock);
  const Icon = stockStatus.icon;

  return (
    <div className={`p-3 rounded-2xl ${stockStatus.bg} ${stockStatus.color}`} title={stockStatus.status}>
      <Icon className="w-4 h-4" />
    </div>
  );
}
