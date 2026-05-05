/**
 * RecentOrders Component
 * Tabel menampilkan pesanan terbaru dengan status
 * Class Tailwind: table, tr, td, badge colors (bg-green-*, bg-blue-*, bg-yellow-*)
 */
export default function RecentOrders() {
  const orders = [
    {
      id: 1,
      customer: 'Alice Johnson',
      product: 'Cappuccino',
      size: 'Large',
      time: '2:45 PM',
      status: 'Completed',
      amount: 'Rp 35.000'
    },
    {
      id: 2,
      customer: 'Bob Smith',
      product: 'Iced Latte',
      size: 'Medium',
      time: '2:42 PM',
      status: 'Ready',
      amount: 'Rp 28.000'
    },
    {
      id: 3,
      customer: 'Carol Davis',
      product: 'Espresso',
      size: 'Small',
      time: '2:40 PM',
      status: 'Preparing',
      amount: 'Rp 15.000'
    },
    {
      id: 4,
      customer: 'David Wilson',
      product: 'Cold Brew',
      size: 'Large',
      time: '2:38 PM',
      status: 'Pending',
      amount: 'Rp 32.000'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-800',
      Ready: 'bg-blue-100 text-blue-800',
      Preparing: 'bg-yellow-100 text-yellow-800',
      Pending: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Pesanan Terbaru</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Pelanggan</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Produk</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Ukuran</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Waktu</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-900 font-medium">{order.customer}</td>
                <td className="py-3 px-4 text-gray-700">{order.product}</td>
                <td className="py-3 px-4 text-gray-700">{order.size}</td>
                <td className="py-3 px-4 text-gray-700">{order.time}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-gray-900 font-semibold">
                  {order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-4 text-amber-600 hover:text-amber-700 font-medium text-sm">
        Lihat Semua Pesanan →
      </button>
    </div>
  );
}
