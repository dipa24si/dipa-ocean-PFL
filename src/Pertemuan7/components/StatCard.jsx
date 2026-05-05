import React from 'react';

const StatCard = ({ title, value, change, icon, changeType }) => {
  // Tentukan warna berdasarkan changeType (positive/negative)
  const isPositive = changeType === 'positive';
  
  return (
    <div className="bg-white border border-[#3E2C1C]/10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-[#FDF8F5] rounded-xl flex items-center justify-center text-2xl">
          {/* Kamu bisa pakai icon string atau icon lucide di sini */}
          {icon}
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {change}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-[#3E2C1C] mb-1">{value}</h3>
        <p className="text-sm font-medium text-[#3E2C1C] mb-1">{title}</p>
        <p className="text-xs text-[#78675C]">vs kemarin</p>
      </div>
    </div>
  );
};

export default StatCard;