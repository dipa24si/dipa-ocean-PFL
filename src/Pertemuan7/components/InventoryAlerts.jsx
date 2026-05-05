import React from 'react';
import { AlertTriangle } from 'lucide-react';

const InventoryAlerts = () => {
  const alerts = [
    { item: 'Biji Kopi Arabica', stock: '2 kg', status: 'Low' },
    { item: 'Susu UHT', stock: '5 Liter', status: 'Critical' },
    { item: 'Sirup Caramel', stock: '1 Botol', status: 'Low' },
  ];

  return (
    <div className="bg-white border border-[#3E2C1C]/10 shadow-sm rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold text-[#3E2C1C]">Inventory Alerts</h4>
        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-lg">3 Items</span>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-[#FDF8F5] border border-[#3E2C1C]/5">
            <div className={`p-2 rounded-lg ${alert.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
              <AlertTriangle size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#3E2C1C]">{alert.item}</p>
              <p className="text-xs text-[#78675C]">Sisa Stok: {alert.stock}</p>
            </div>
            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
              alert.status === 'Critical' ? 'bg-red-500 text-white' : 'bg-orange-400 text-white'
            }`}>
              {alert.status}
            </span>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 border border-[#3E2C1C] text-[#3E2C1C] rounded-xl font-semibold text-sm hover:bg-[#3E2C1C] hover:text-white transition-all">
        Restock Sekarang
      </button>
    </div>
  );
};

export default InventoryAlerts;