import React from 'react';

const customerNames = [
  'Andi', 'Budi', 'Sari', 'Dewi', 'Rian', 'Maya', 'Nina', 'Ahmad', 'Lina', 'Rizki',
  'Tegar', 'Putri', 'Fajar', 'Ayu', 'Bayu',
];

const menuItems = [
  'Iced Latte', 'Cappuccino', 'Cold Brew', 'Espresso', 'Americano', 'Latte',
  'Croissant', 'Chocolate Cake', 'Cheesecake', 'Iced Tea',
];

const statuses = ['Completed', 'Processing', 'Pending', 'Cancelled'];

const statusStyles = {
  Completed: 'bg-green-100 text-green-700',
  Processing: 'bg-orange-100 text-orange-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const generateOrders = (totalOrders) => {
  return Array.from({ length: totalOrders }, (_, index) => {
    const price = 18000 + (index % 8) * 4000 + Math.floor(index / 8) * 3000;

    return {
      id: `#${1234 + index}`,
      customer: customerNames[index % customerNames.length],
      items: menuItems[index % menuItems.length],
      total: `Rp ${price.toLocaleString('id-ID')}`,
      status: statuses[index % statuses.length],
    };
  });
};

const RecentOrders = ({ totalOrders = 3, title = 'Recent Orders', showViewAll = true }) => {
  const orders = generateOrders(totalOrders);

  return (
    <div className="bg-white border border-[#3E2C1C]/10 shadow-sm rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-[#3E2C1C]">{title}</h4>
        {showViewAll && (
          <button type="button" className="text-[#3E2C1C] text-sm font-medium hover:underline">
            View All
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#FDF8F5] text-[#78675C] text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Items</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-[#3E2C1C] font-medium">{order.id}</td>
                <td className="px-6 py-4 text-[#78675C]">{order.customer}</td>
                <td className="px-6 py-4 text-[#78675C]">{order.items}</td>
                <td className="px-6 py-4 text-[#3E2C1C] font-semibold">{order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
