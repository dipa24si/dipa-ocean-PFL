import StatCard from '../components/StatCard';
import RecentOrders from '../components/RecentOrders';
import InventoryAlerts from '../components/InventoryAlerts';
import SalesTrendChart from '../components/SalesTrendChart';
import PageHeader from '../components/PageHeader';

/**
 * Dashboard Page Component
 * Halaman utama dengan ringkasan statistik, grafik, dan data terbaru
 * Akan di-lazy load menggunakan React.lazy() + Suspense
 */
export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        breadcrumb="Dashboard"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Penjualan Hari Ini"
          value="Rp 1.240.000"
          change="+8.2% dari kemarin"
          icon="💰"
          changeType="positive"
        />
        <StatCard
          title="Pesanan Selesai"
          value="158"
          change="32 terjual"
          icon="✅"
          changeType="positive"
        />
        <StatCard
          title="Minuman Terlaris"
          value="Iced Latte"
          change="Tren hari ini"
          icon="☕"
          changeType="positive"
        />
        <StatCard
          title="Staf Aktif"
          value="5"
          change="Shift saat ini"
          icon="👥"
          changeType="positive"
        />
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Trends Chart */}
        <div className="lg:col-span-2">
          <SalesTrendChart />
        </div>

        {/* Inventory Alerts */}
        <div className="lg:col-span-1">
          <InventoryAlerts />
        </div>
      </div>

      {/* Recent Orders Table */}
      <RecentOrders />

      {/* AI Insights Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-blue-900 mb-1">Cold Brew Sales Surge</h4>
              <p className="text-sm text-blue-800">Cold brew meningkat 35% dibanding kemarin</p>
            </div>
            <span className="text-3xl">📈</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-orange-900 mb-1">Afternoon Cappuccino Promotion</h4>
              <p className="text-sm text-orange-800">Pesanan cappuccino turun 40% jam 4-6 PM</p>
            </div>
            <span className="text-3xl">📢</span>
          </div>
        </div>
      </div>
    </>
  );
}
