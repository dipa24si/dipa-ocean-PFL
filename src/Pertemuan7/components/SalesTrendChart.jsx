import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Data simulasi sesuai tampilan dashboard
const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 6390 },
  { name: 'Sun', sales: 7490 },
];

const SalesTrendChart = () => {
  return (
    <div className="bg-white border border-[#3E2C1C]/10 shadow-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold text-[#3E2C1C]">Sales Trends</h4>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-[#3E2C1C] text-white rounded-lg">Daily</button>
          <button className="px-3 py-1 text-sm text-[#78675C] hover:bg-[#FDF8F5] rounded-lg transition-all">Weekly</button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3E2C1C" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3E2C1C" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#78675C', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#78675C', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 16px rgba(62, 44, 28, 0.1)' 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#3E2C1C" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesTrendChart;