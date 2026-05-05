import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2 } from 'react-icons/fi';

const generateInitialOrders = () => {
  const customers = [
    'John Doe', 'Jane Smith', 'Bob Johnson', 'Siti Nurhaliza', 'Ahmad Rahman',
    'Maya Sari', 'Rizki Pratama', 'Lina Wibowo', 'Andi Saputra', 'Dewi Anggraini'
  ];
  const itemsOptions = [
    'Cappuccino', 'Croissant', 'Latte', 'Muffin', 'Espresso', 'Sandwich',
    'Cold Brew', 'Brownie', 'Americano', 'Iced Tea', 'Tiramisu', 'Chocolate Cake'
  ];
  const statuses = ['completed', 'pending', 'preparing'];
  const dates = ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19'];

  return Array.from({ length: 30 }, (_, index) => {
    const base = index + 1;
    const customer = customers[index % customers.length];
    const items = [
      itemsOptions[index % itemsOptions.length],
      itemsOptions[(index + 4) % itemsOptions.length]
    ];
    const totalValue = 30 + (index % 12) * 2;
    const hour = 10 + (index % 8);
    const minute = ['00', '10', '20', '30', '40', '50'][index % 6];

    return {
      id: `#${String(base).padStart(3, '0')}`,
      customer,
      items,
      total: `Rp ${totalValue.toLocaleString('id-ID')}.000`,
      status: statuses[index % statuses.length],
      date: dates[index % dates.length],
      time: `${String(hour).padStart(2, '0')}:${minute}`
    };
  });
};

const defaultOrder = {
  customer: '',
  items: '',
  total: '',
  status: 'pending',
  date: new Date().toISOString().slice(0, 10),
  time: '12:00'
};

/**
 * Orders Page Component
 * Halaman untuk mengelola pesanan
 */
export default function Orders() {
  const [orders, setOrders] = useState(generateInitialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOrder, setNewOrder] = useState(defaultOrder);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const startEditOrder = (order) => {
    setEditingOrderId(order.id);
    setNewOrder({
      customer: order.customer,
      items: order.items.join(', '),
      total: order.total,
      status: order.status,
      date: order.date,
      time: order.time
    });
    setShowAddForm(true);
  };

  const cancelEditOrder = () => {
    setEditingOrderId(null);
    setNewOrder(defaultOrder);
    setShowAddForm(false);
  };

  const removeOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const items = newOrder.items
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!newOrder.customer || !items.length || !newOrder.total) {
      return;
    }

    if (editingOrderId) {
      setOrders(orders.map((order) =>
        order.id === editingOrderId
          ? {
              ...order,
              customer: newOrder.customer,
              items,
              total: newOrder.total.trim().startsWith('Rp')
                ? newOrder.total.trim()
                : `Rp ${newOrder.total.trim()}`,
              status: newOrder.status,
              date: newOrder.date,
              time: newOrder.time
            }
          : order
      ));
      cancelEditOrder();
      return;
    }

    const nextOrder = {
      id: `#${String(orders.length + 1).padStart(3, '0')}`,
      customer: newOrder.customer,
      items,
      total: newOrder.total.trim().startsWith('Rp')
        ? newOrder.total.trim()
        : `Rp ${newOrder.total.trim()}`,
      status: newOrder.status,
      date: newOrder.date,
      time: newOrder.time
    };

    setOrders([nextOrder, ...orders]);
    setNewOrder(defaultOrder);
    setShowAddForm(false);
  };

  return (
    <>
      <PageHeader
        title="Pesanan"
        breadcrumb={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Pesanan' }
        ]}
      >
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Pesanan Baru
        </button>
      </PageHeader>

      <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6 mb-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-espresso-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari pesanan atau pelanggan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <FiFilter className="text-espresso-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="preparing">Sedang Dibuat</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmitOrder} className="bg-espresso-50 rounded-xl border border-espresso-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Nama Pelanggan</label>
                <input
                  type="text"
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Item Pesanan</label>
                <input
                  type="text"
                  value={newOrder.items}
                  onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
                  placeholder="Contoh: Espresso, Sandwich"
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Total</label>
                <input
                  type="text"
                  value={newOrder.total}
                  onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
                  placeholder="Rp 45.000"
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Status</label>
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option value="pending">Menunggu</option>
                  <option value="preparing">Sedang Dibuat</option>
                  <option value="completed">Selesai</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Tanggal</label>
                <input
                  type="date"
                  value={newOrder.date}
                  onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Waktu</label>
                <input
                  type="time"
                  value={newOrder.time}
                  onChange={(e) => setNewOrder({ ...newOrder, time: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
              <button
                type="button"
                onClick={cancelEditOrder}
                className="px-4 py-2 rounded-lg border border-espresso-300 text-espresso-800 hover:bg-espresso-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-coffee-600 text-white hover:bg-coffee-700 transition-colors"
              >
                {editingOrderId ? 'Simpan Perubahan' : 'Tambah Pesanan'}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-espresso-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-espresso-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-espresso-700 uppercase tracking-wider">
                  ID Pesanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-espresso-700 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-espresso-700 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-espresso-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-espresso-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-espresso-700 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-espresso-700 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-espresso-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-espresso-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-espresso-700">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-espresso-700">
                    {order.items.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-espresso-900">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status === 'completed' ? 'Selesai' :
                       order.status === 'pending' ? 'Menunggu' :
                       order.status === 'preparing' ? 'Sedang Dibuat' : order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-espresso-700">
                    {order.date} {order.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-espresso-700">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEditOrder(order)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-lg border border-espresso-300 text-espresso-700 hover:bg-espresso-50 transition-colors"
                      >
                        <FiEdit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeOrder(order.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-espresso-900 mb-2">Tidak ada pesanan ditemukan</h3>
            <p className="text-espresso-600">Coba ubah kata kunci pencarian atau filter status.</p>
          </div>
        )}
      </div>
    </>
  );
}