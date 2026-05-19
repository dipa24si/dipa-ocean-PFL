import React from 'react';
import PageHeader from '../components/PageHeader';
import RecentOrders from '../components/RecentOrders';

export default function Orders() {
  return (
    <>
      <PageHeader title="Management Pesanan" breadcrumb="Orders" />
      <div className="bg-white p-6 rounded-2xl border border-[#3E2C1C]/10 mb-8">
        <p className="text-[#78675C]">Filter tanggal dan status pesanan di sini...</p>
      </div>
      <RecentOrders
        totalOrders={30}
        title="Daftar Pesanan"
        showViewAll={false}
      />
    </>
  );
}
