import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import CustomerCard from '../components/CustomerCard';
import SearchInput from '../components/SearchInput';
import brewCustomers from '../data/brewCustomers.json';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = brewCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPhotoUrl = (customer) => {
    return `https://randomuser.me/api/portraits/${customer.gender}/${customer.id + 20}.jpg`;
  };

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Pelanggan Setia" breadcrumb="Customers" />

      <div className="bg-white rounded-3xl border border-coffee-100 p-4 mb-8 shadow-sm">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Cari nama pelanggan..."
          inputClassName="outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c) => (
          <CustomerCard key={c.id} customer={c} photoUrl={getPhotoUrl(c)} />
        ))}
      </div>
    </div>
  );
}
