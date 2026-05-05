import PageHeader from '../components/PageHeader';
import { FiDownload, FiTrendingUp, FiUsers, FiDollarSign } from 'react-icons/fi';

/**
 * Analytics Page Component
 * Halaman untuk menampilkan analitik dan laporan
 */
export default function Analytics() {
  // Sample analytics data
  const analyticsData = {
    totalRevenue: 'Rp 2.450.000',
    totalOrders: 145,
    totalCustomers: 89,
    avgOrderValue: 'Rp 16.897',
    topProducts: [
      { name: 'Cappuccino', sales: 45, revenue: 'Rp 1.125.000' },
      { name: 'Espresso', sales: 38, revenue: 'Rp 570.000' },
      { name: 'Croissant', sales: 32, revenue: 'Rp 576.000' },
      { name: 'Latte', sales: 28, revenue: 'Rp 700.000' }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 1850000 },
      { month: 'Feb', revenue: 2100000 },
      { month: 'Mar', revenue: 2450000 },
      { month: 'Apr', revenue: 2200000 },
      { month: 'May', revenue: 2800000 }
    ]
  };

  return (
    <>
      <PageHeader
        title="Analitik"
        breadcrumb={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Analitik" }
        ]}
      >
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors">
          <FiDownload className="w-4 h-4" />
          Export Laporan
        </button>
      </PageHeader>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-espresso-600">Total Pendapatan</p>
              <p className="text-2xl font-bold text-espresso-900">{analyticsData.totalRevenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-espresso-600">Total Pesanan</p>
              <p className="text-2xl font-bold text-espresso-900">{analyticsData.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-espresso-600">Total Pelanggan</p>
              <p className="text-2xl font-bold text-espresso-900">{analyticsData.totalCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-espresso-600">Rata-rata Pesanan</p>
              <p className="text-2xl font-bold text-espresso-900">{analyticsData.avgOrderValue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart (Mock) */}
        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <h3 className="text-lg font-semibold text-espresso-900 mb-4">Pendapatan Bulanan</h3>
          <div className="space-y-4">
            {analyticsData.monthlyRevenue.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-espresso-700">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-espresso-200 rounded-full h-2">
                    <div
                      className="bg-coffee-600 h-2 rounded-full"
                      style={{ width: `${(data.revenue / 3000000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-espresso-900">
                  Rp {(data.revenue / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <h3 className="text-lg font-semibold text-espresso-900 mb-4">Produk Terlaris</h3>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-coffee-100 rounded-full flex items-center justify-center text-sm font-bold text-coffee-600 mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-espresso-900">{product.name}</p>
                    <p className="text-sm text-espresso-600">{product.sales} terjual</p>
                  </div>
                </div>
                <span className="font-medium text-espresso-900">{product.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-blue-900 mb-1">Peak Hours</h4>
              <p className="text-sm text-blue-800">Jam sibuk: 7-9 AM & 4-6 PM</p>
            </div>
            <span className="text-3xl">📊</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-green-900 mb-1">Customer Satisfaction</h4>
              <p className="text-sm text-green-800">Rating rata-rata: 4.8/5</p>
            </div>
            <span className="text-3xl">⭐</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-purple-900 mb-1">Loyal Customers</h4>
              <p className="text-sm text-purple-800">45 pelanggan repeat</p>
            </div>
            <span className="text-3xl">💎</span>
          </div>
        </div>
      </div>
    </>
  );
}