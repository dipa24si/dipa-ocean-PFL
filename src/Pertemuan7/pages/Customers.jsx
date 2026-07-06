import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import CustomersTable from '../components/CustomersTable';
import { Search, Filter } from 'lucide-react';
import customers from '../data/customers.json';
import { fetchCustomersPage } from '../services/supabaseApi';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

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
  const [customersList, setCustomersList] = useState(customers);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalCustomers, setTotalCustomers] = useState(customers.length);

  // useRef untuk auto-focus input dan scroll reference
  const searchInputRef = useRef(null);
  const tableContainerRef = useRef(null);

  // useEffect 1: Fetch customers data
  useEffect(() => {
    console.log('[Customers.jsx] useEffect #1: Fetch data triggered');

    const loadCustomers = async () => {
      setIsLoading(true);

      try {
        const { data, count } = await fetchCustomersPage(page, pageSize);
        if (data?.length > 0) {
          setCustomersList(data);
          setFilteredCustomers(data);
          setTotalCustomers(count ?? data.length);
          setTotalSpent(data.reduce((sum, c) => sum + Number(String(c.totalSpent).replace(/\D/g, '')), 0));
        } else {
          setCustomersList(customers);
          setFilteredCustomers(customers);
          setTotalCustomers(customers.length);
          setTotalSpent(customers.reduce((sum, c) => sum + Number(String(c.totalSpent).replace(/\D/g, '')), 0));
        }
      } catch (err) {
        console.warn('[Customers.jsx] Supabase fetch failed, using local fallback', err);
        setCustomersList(customers);
        setFilteredCustomers(customers);
        setTotalCustomers(customers.length);
        setTotalSpent(customers.reduce((sum, c) => sum + Number(String(c.totalSpent).replace(/\D/g, '')), 0));
      }

      setIsLoading(false);
      console.log('[Customers.jsx] Data loaded successfully');
    };

    loadCustomers();

    return () => {
      console.log('[Customers.jsx] Cleanup: useEffect #1');
    };
  }, [page, pageSize]);

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

    let filtered = customersList;

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
  }, [searchTerm, loyaltyFilter, customersList]); // dependency array dengan dependencies

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
            Menampilkan <strong>{filteredCustomers.length}</strong> dari <strong>{totalCustomers}</strong> pelanggan
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
          <>
            <CustomersTable customers={filteredCustomers} />
            <div className="mt-4 flex items-center justify-between bg-white p-4 rounded-lg border border-[#D4A574]/20">
              <div className="text-sm text-[#78675C]">Halaman {page} dari {Math.ceil(totalCustomers / pageSize)}</div>
              <div>
                {/* Pagination using shadcn-style components */}
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
                    </PaginationItem>

                    {(() => {
                      const totalPages = Math.max(1, Math.ceil(totalCustomers / pageSize));
                      const pages = [];
                      if (totalPages <= 7) {
                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                      } else {
                        if (page <= 4) {
                          pages.push(1, 2, 3, 4, 5, '...', totalPages);
                        } else if (page >= totalPages - 3) {
                          pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                        } else {
                          pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
                        }
                      }

                      return pages.map((p, idx) => (
                        typeof p === 'string' ? (
                          <PaginationItem key={`e-${idx}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href="#"
                              isActive={p === page}
                              onClick={() => setPage(p)}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      ));
                    })()}

                    <PaginationItem>
                      <PaginationNext onClick={() => setPage((p) => Math.min(Math.ceil(totalCustomers / pageSize), p + 1))} disabled={page >= Math.ceil(totalCustomers / pageSize)} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
