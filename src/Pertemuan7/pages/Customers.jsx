import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import CustomersTable from '../components/CustomersTable';
import customers from '../data/customers.json';
import { Search, Filter } from 'lucide-react';

/**
 * Customers Page - PERTEMUAN 12 HOOKS IMPLEMENTATION
 * HOOKS YANG DIGUNAKAN:
 * - useState: Menyimpan filtered customers, search term, loyalty filter
 * - useEffect: Fetch data customers dari JSON, auto-save preferences
 * - useRef: Input focus, table scroll reference
 */
export default function Customers() {
  // useState untuk search dan filter
  const [searchTerm, setSearchTerm] = useState('');
  const [loyaltyFilter, setLoyaltyFilter] = useState('all'); // 'all', 'gold', 'silver', 'bronze'
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);

  // useRef untuk auto-focus input dan scroll reference
  const searchInputRef = useRef(null);
  const tableContainerRef = useRef(null);

  // useEffect 1: Fetch customers data
  useEffect(() => {
    console.log('[Customers.jsx] useEffect #1: Fetch data triggered');
    
    const loadCustomers = async () => {
      setIsLoading(true);
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Calculate total spent
      const total = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
      setTotalSpent(total);
      
      setIsLoading(false);
      console.log('[Customers.jsx] Data loaded successfully');
    };

    loadCustomers();

    return () => {
      console.log('[Customers.jsx] Cleanup: useEffect #1');
    };
  }, []); // dependency array kosong = jalankan saat component mount

  // useEffect 2: Auto-focus search input
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      console.log('[Customers.jsx] useEffect #2: Search input auto-focused via useRef');
    }
  }, []);

  // useEffect 3: Filter customers berdasarkan search dan loyalty
  useEffect(() => {
    console.log('[Customers.jsx] useEffect #3: Filter triggered - search:', searchTerm, 'loyalty:', loyaltyFilter);

    let filtered = customers;

    // Filter berdasarkan search term
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter berdasarkan membership level
    if (loyaltyFilter !== 'all') {
      filtered = filtered.filter(c => c.membershipLevel?.toLowerCase() === loyaltyFilter.toLowerCase());
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, loyaltyFilter]); // dependency array dengan dependencies

  // useEffect 4: Service Automation - auto-send email campaigns
  useEffect(() => {
    if (filteredCustomers.length === 0) return;

    console.log('[Customers.jsx] useEffect #4: Service Automation triggered');

    // Simulasi automation: setiap 3 detik ada automation yang berjalan
    const automationInterval = setInterval(() => {
      console.log('[Service Automation] Sending email campaign to active customers...');
    }, 3000);

    return () => {
      clearInterval(automationInterval);
    };
  }, [filteredCustomers.length]);

  // useEffect 5: Save filter preferences ke localStorage
  useEffect(() => {
    const preferences = {
      searchTerm,
      loyaltyFilter,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('customerFilterPreferences', JSON.stringify(preferences));
    console.log('[Customers.jsx] useEffect #5: Filter preferences saved to localStorage');
  }, [searchTerm, loyaltyFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setLoyaltyFilter('all');
    searchInputRef.current?.focus();
  };

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Pelanggan Setia" breadcrumb="Customers" />

      {/* Filter & Search Section */}
      <div className="mb-6 bg-white p-5 rounded-lg shadow-sm border border-[#D4A574]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 text-[#78675C]" size={18} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Cari pelanggan (nama/email)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] transition-all"
            />
          </div>

          {/* Loyalty Tier Filter */}
          <div className="relative flex items-center gap-2">
            <Filter size={18} className="text-[#78675C]" />
            <select
              value={loyaltyFilter}
              onChange={(e) => setLoyaltyFilter(e.target.value)}
              className="flex-1 px-4 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
            >
              <option value="all">Semua Tier</option>
              <option value="gold">💎 Gold</option>
              <option value="silver">🥈 Silver</option>
              <option value="bronze">🥉 Bronze</option>
            </select>
          </div>
        </div>

        {/* Clear Button & Stats */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm bg-gray-100 text-[#3E2C1C] rounded-lg hover:bg-gray-200 transition-colors"
          >
            Reset Filter
          </button>
          <div className="text-sm text-[#78675C]">
            Menampilkan <strong>{filteredCustomers.length}</strong> dari <strong>{customers.length}</strong> pelanggan
          </div>
        </div>
      </div>


      {/* Customers Table */}
      <div ref={tableContainerRef}>
        {isLoading ? (
          <div className="text-center py-12 text-[#78675C]">
            <div className="text-4xl mb-2">⏳</div>
            Loading pelanggan...
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center py-12 text-[#78675C]">
            <div className="text-4xl mb-2">🔍</div>
            Tidak ada pelanggan yang sesuai dengan filter
          </div>
        ) : (
          <CustomersTable customers={filteredCustomers} />
        )}
      </div>
    </div>
  );
}
