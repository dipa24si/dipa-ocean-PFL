import React from 'react';
import PageHeader from '../components/PageHeader';
import CustomersTable from '../components/CustomersTable';
import customers from '../data/customers.json';

export default function Customers() {
  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Pelanggan Setia" breadcrumb="Customers" />
      <CustomersTable customers={customers} />
    </div>
  );
}
