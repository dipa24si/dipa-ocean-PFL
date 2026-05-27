import React from 'react';
import PageHeader from '../components/PageHeader';
import OrdersTable from '../components/OrdersTable';

export default function Orders() {
  return (
    <>
      <PageHeader title="Management Pesanan" breadcrumb="Orders" />
      <OrdersTable totalOrders={30} />
    </>
  );
}
