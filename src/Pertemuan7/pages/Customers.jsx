import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { FiSearch, FiMail, FiPhone, FiShoppingBag } from 'react-icons/fi';
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
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso-400" />
          <input
            type="text"
            placeholder="Cari nama pelanggan..."
            className="w-full pl-12 pr-4 py-3 bg-coffee-50 border-none rounded-2xl outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c) => (
          <div key={c.id} className="bg-white rounded-[2rem] border border-coffee-100 p-6 shadow-sm group">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={getPhotoUrl(c)}
                alt={c.name}
                onError={(event) => {
                  event.currentTarget.src = '/avatar.svg';
                }}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <Link to={`/customers/${c.id}`} className="font-bold text-coffee-900 hover:underline">
                  {c.name}
                </Link>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase ${
                  c.loyalty === 'Platinum'
                    ? 'bg-purple-100 text-purple-700'
                    : c.loyalty === 'Silver'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-orange-100 text-orange-700'
                }`}>
                  {c.loyalty} Member
                </span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-espresso-500 gap-3"><FiMail /> {c.email}</div>
              <div className="flex items-center text-sm text-espresso-500 gap-3"><FiPhone /> {c.phone}</div>
            </div>

            <div className="pt-4 border-t border-coffee-50 flex justify-between items-center">
              <div className="flex items-center gap-2 text-coffee-600 font-bold">
                <FiShoppingBag /> <span className="text-sm">{c.totalOrders} Pesanan</span>
              </div>
              <button className="text-sm font-bold text-coffee-900 underline underline-offset-4">Riwayat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
