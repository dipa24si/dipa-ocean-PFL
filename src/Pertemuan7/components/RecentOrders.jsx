import React from 'react';

const RecentOrders = () => {
  const orders = [
    { id: '#1234', customer: 'Andi', items: 'Iced Latte', total: 'Rp 35.000', status: 'Completed' },
    { id: '#1235', customer: 'Budi', items: 'Cappuccino', total: 'Rp 30.000', status: 'Processing' },
    { id: '#1236', customer: 'Sari', items: 'Cold Brew', total: 'Rp 38.000', status: 'Completed' },
  ];

  return (
    <div className="bg-white border border-[#3E2C1C]/10 shadow-sm rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-[#3E2C1C]">Recent Orders</h4>
        <button className="text-[#3E2C1C] text-sm font-medium hover:underline">View All</button>
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
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
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