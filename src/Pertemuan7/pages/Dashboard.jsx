import React from 'react';
import StatCard from '../components/StatCard';
import RecentOrders from '../components/RecentOrders';
import InventoryAlerts from '../components/InventoryAlerts';
import SalesTrendChart from '../components/SalesTrendChart';
import PageHeader from '../components/PageHeader';

/**
 * Dashboard Page Component
 * Halaman utama yang sudah disesuaikan dengan tema Format Ganjil (Coffee)
 */
export default function Dashboard() {
  return (
    <>
      {/* Header Halaman */}
      <PageHeader 
        title="Dashboard Overview" 
        breadcrumb="Halaman Utama" 
      />

      {/* Baris Statistik (Stat Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Penjualan"
          value="Rp 1.240.000"
          change="+8.2%"
          icon="💰"
          changeType="positive"
        />
        <StatCard
          title="Pesanan Selesai"
          value="158"
          change="+12"
          icon="✅"
          changeType="positive"
        />
        <StatCard
          title="Menu Terlaris"
          value="Iced Latte"
          change="Hot"
          icon="☕"
          changeType="positive"
        />
        <StatCard
          title="Staf Aktif"
          value="5"
          change="On Shift"
          icon="👥"
          changeType="positive"
        />
      </div>

      {/* Baris Grafik & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Grafik Tren Penjualan */}
        <div className="lg:col-span-2">
          <SalesTrendChart />
        </div>

        {/* Peringatan Stok */}
        <div className="lg:col-span-1">
          <InventoryAlerts />
        </div>
      </div>

      {/* Tabel Pesanan Terbaru */}
      <RecentOrders />

      {/* AI Insights Section - Desain Format Ganjil */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insight 1: Analisis Market */}
        <div className="bg-white border border-[#3E2C1C]/10 rounded-2xl shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Market Analysis</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              </div>
              <h4 className="font-bold text-[#3E2C1C] text-lg mb-1">Cold Brew Sales Surge</h4>
              <p className="text-sm text-[#78675C]">Permintaan meningkat 35% siang ini. Pastikan stok es batu dan biji kopi dingin tersedia!</p>
            </div>
            <div className="text-4xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">
              📈
            </div>
          </div>
        </div>

        {/* Insight 2: Promo Strategis */}
        <div className="bg-[#3E2C1C] rounded-2xl shadow-lg p-6 relative overflow-hidden group border border-[#3E2C1C]">
          {/* Hiasan Ikon Kopi Background */}
          <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-500">☕</div>
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Promotion Idea</span>
              </div>
              <h4 className="font-bold text-white text-lg mb-1">Afternoon Promo</h4>
              <p className="text-sm text-white/70">Pesanan Cappuccino turun 40%. Aktifkan diskon "Happy Hour" jam 4-6 PM sekarang?</p>
            </div>
            <div className="bg-white/10 p-2 rounded-xl">
              <span className="text-2xl">📢</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between relative z-10">
            <button className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-widest">
              Terapkan Promo →
            </button>
            <span className="text-[10px] text-white/30 italic">AI Generated Insight</span>
          </div>
        </div>
      </div>

      {/* Footer Dashboard */}
      <div className="mt-12 pb-8 flex flex-col items-center border-t border-[#3E2C1C]/5 pt-6">
        <p className="text-[#78675C] text-[10px] uppercase tracking-[0.2em] font-semibold">
          Format Ganjil Management System
        </p>
        <p className="text-[#78675C]/50 text-[10px] mt-1">
          v1.0.4 • Terakhir diperbarui {new Date().toLocaleTimeString('id-ID')}
        </p>
      </div>
    </>
  );
}
