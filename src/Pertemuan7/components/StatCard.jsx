/**
 * StatCard Component
 * Kartu statistik untuk menampilkan metrik penjualan
 * Class Tailwind: bg-gradient-to-br, rounded-lg, shadow, p-*
 */
export default function StatCard({ title, value, change, icon, changeType = 'positive' }) {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-full bg-amber-100 shadow-sm text-2xl text-amber-700">
        {icon}
      </div>
      <div className="pr-16">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2 whitespace-nowrap">{value}</p>
        <p
          className={`text-sm mt-2 ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {changeType === 'positive' ? '↑' : '↓'} {change}
        </p>
      </div>
    </div>
  );
}
