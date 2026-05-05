import StatCard from '../components/StatCard';
import RecentOrders from '../components/RecentOrders';
import InventoryAlerts from '../components/InventoryAlerts';
import SalesTrendChart from '../components/SalesTrendChart';
import { useEffect, useState } from 'react';
import { demoAPI } from '../services/api';
import { MdRefresh } from 'react-icons/md';

/**
 * Dashboard Page Component - V2 dengan API Integration
 * Menggunakan Axios untuk fetch data dari API
 * Lazy loaded dengan Suspense
 */
export default function DashboardV2() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch stats saat komponen mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await demoAPI.getStatsDemo();
      setStats(response.data.stats);
    } catch (err) {
      setError('Gagal memuat data. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header dengan Refresh Button */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-espresso-900">Dashboard</h1>
          <p className="text-espresso-600">Ringkasan kinerja kafe Anda hari ini</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-coffee-600 hover:bg-coffee-700 disabled:bg-espresso-400 text-white rounded-lg transition-all"
          title="Refresh data"
        >
          <MdRefresh className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Stats Grid - Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-espresso-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-espresso-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-espresso-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        /* Stats Grid - Data Loaded */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              changeType="positive"
            />
          ))}
        </div>
      )}

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
