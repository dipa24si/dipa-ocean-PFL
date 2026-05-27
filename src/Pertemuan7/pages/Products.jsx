import React from 'react';
import PageHeader from '../components/PageHeader';
import ProductsTable from '../components/ProductsTable';

export default function Products() {
  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Menu Kopi & Produk" breadcrumb="Products" />
      <ProductsTable />
    </div>
  );
}
