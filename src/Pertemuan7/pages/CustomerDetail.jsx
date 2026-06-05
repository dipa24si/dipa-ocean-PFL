import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { FiArrowLeft, FiMail, FiPhone, FiShoppingBag, FiCalendar, FiCoffee, FiMapPin, FiUser, FiLink } from 'react-icons/fi';
import customers from '../data/customers.json';

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = customers.find((item) => item.id === Number(id));

  if (!customer) {
    return (
      <div className="animate-in fade-in duration-500">
        <PageHeader title="Pelanggan Tidak Ditemukan" breadcrumb="Customers" />
        <div className="bg-white rounded-[2rem] border border-gray-200 p-8 shadow-sm">
          <p className="text-gray-600 mb-6">Data pelanggan yang dipilih tidak tersedia.</p>
          <Link to="/dashboard/customers" className="font-bold text-blue-600 underline underline-offset-4">
            Kembali ke Customers
          </Link>
        </div>
      </div>
    );
  }

  const getMembershipColor = (level) => {
    if (level === 'Platinum') return 'bg-purple-100 text-purple-700';
    if (level === 'Gold') return 'bg-yellow-100 text-yellow-700';
    if (level === 'Silver') return 'bg-gray-100 text-gray-700';
    return 'bg-orange-100 text-orange-700';
  };

  const getStatusColor = (status) => {
    if (status === 'active') return 'bg-green-100 text-green-700';
    if (status === 'inactive') return 'bg-gray-100 text-gray-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Detail Pelanggan" breadcrumb="Customers / Detail" />

      <div className="max-w-5xl bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-5xl font-bold">
              {customer.avatar}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${getMembershipColor(customer.membershipLevel)}`}>
                  {customer.membershipLevel} Member
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${getStatusColor(customer.status)}`}>
                  {customer.status === 'active' ? '✓ Aktif' : customer.status === 'inactive' ? '○ Inactive' : '⚠ Suspended'}
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{customer.name}</h2>
              <p className="text-gray-600 font-medium">ID Pelanggan: #{customer.id} | Username: @{customer.username}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Identitas Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">📋 Data Identitas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <FiUser className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Jenis Kelamin</p>
                  <p className="text-gray-900 font-medium">{customer.gender}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiCalendar className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Tanggal Lahir</p>
                  <p className="text-gray-900 font-medium">{customer.dateOfBirth}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiCoffee className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Sumber User</p>
                  <p className="text-gray-900 font-medium">{customer.userSource}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiLink className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Referral Code</p>
                  <p className="text-gray-900 font-medium">{customer.referralCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kontak Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">📞 Kontak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <FiMail className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium break-all">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Nomor HP</p>
                  <p className="text-gray-900 font-medium">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <FiMapPin className="text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs uppercase font-semibold text-gray-500">Alamat</p>
                  <p className="text-gray-900 font-medium">{customer.address}</p>
                  <p className="text-gray-600 text-sm">{customer.city}, {customer.province}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">💎 Data Membership</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <FiCalendar className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Tanggal Bergabung</p>
                  <p className="text-gray-900 font-medium">{customer.joinDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiCalendar className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Login Terakhir</p>
                  <p className="text-gray-900 font-medium">{customer.lastLogin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMail className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500">Email Subscription</p>
                  <p className="text-gray-900 font-medium">{customer.emailSubscription ? '✓ Subscribed' : '○ Not Subscribed'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaksi Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">💳 Data Transaksi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs uppercase font-semibold text-blue-600">Total Pesanan</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{customer.totalOrders}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-xs uppercase font-semibold text-green-600">Total Pengeluaran</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{customer.totalSpent}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-xs uppercase font-semibold text-purple-600">Transaksi Terakhir</p>
                <p className="text-lg font-bold text-gray-900 mt-2">{customer.lastOrder}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
          <Link
            to="/dashboard/customers"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition-all"
          >
            <FiArrowLeft /> Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
