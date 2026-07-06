import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import OrdersTable from '../components/OrdersTable';
import { Search } from 'lucide-react';
import { fetchOrders } from '../services/supabaseApi';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.warn('[Orders.jsx] Supabase fetch failed, fallback to generated order list', err);
        setOrders([]);
      }
      setIsLoading(false);
    };

    loadOrders();
  }, []);

  // useEffect untuk auto-focus search input
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <>
      <PageHeader title="Management Pesanan" breadcrumb="Orders" />
      
      {/* Search & Filter Section */}
      <div className="mb-6 flex gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-[#78675C]" size={18} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Cari pesanan... (Order ID, Nama Pelanggan, atau Barang)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
        >
          <option value="all">Semua Status</option>
          <option value="Completed">✓ Selesai</option>
          <option value="Processing">⏳ Diproses</option>
          <option value="Pending">⏸ Menunggu</option>
          <option value="Cancelled">✗ Dibatalkan</option>
        </select>
      </div>

      <OrdersTable orders={orders} totalOrders={30} searchTerm={searchTerm} filterStatus={filterStatus} isLoading={isLoading} />
    </>
  );
}
