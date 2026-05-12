import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { FiArrowLeft, FiMail, FiPhone, FiShoppingBag, FiCalendar, FiCoffee } from 'react-icons/fi';
import brewCustomers from '../data/brewCustomers.json';

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = brewCustomers.find((item) => item.id === Number(id));

  const getPhotoUrl = (customer) => {
    const photoNumber = customer.id + 20;

    return `https://randomuser.me/api/portraits/${customer.gender}/${photoNumber}.jpg`;
  };

  const getLoyaltyClass = (loyalty) => {
    if (loyalty === 'Platinum') return 'bg-purple-100 text-purple-700';
    if (loyalty === 'Silver') return 'bg-gray-100 text-gray-700';

    return 'bg-orange-100 text-orange-700';
  };

  if (!customer) {
    return (
      <div className="animate-in fade-in duration-500">
        <PageHeader title="Pelanggan Tidak Ditemukan" breadcrumb="Customers" />
        <div className="bg-white rounded-[2rem] border border-coffee-100 p-8 shadow-sm">
          <p className="text-espresso-500 mb-6">Data pelanggan yang dipilih tidak tersedia.</p>
          <Link to="/customers" className="font-bold text-coffee-900 underline underline-offset-4">
            Kembali ke Customers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Detail Pelanggan" breadcrumb="Customers / Detail" />

      <div className="max-w-3xl bg-white rounded-[2rem] border border-coffee-100 shadow-sm overflow-hidden">
        <div className="bg-coffee-50 p-8 flex flex-col sm:flex-row sm:items-center gap-6 border-b border-coffee-100">
          <img
            src={getPhotoUrl(customer)}
            alt={customer.name}
            onError={(event) => {
              event.currentTarget.src = '/avatar.svg';
            }}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${getLoyaltyClass(customer.loyalty)}`}>
              {customer.loyalty} Member
            </span>
            <h2 className="text-3xl font-black text-coffee-900 mt-3">{customer.name}</h2>
            <p className="text-espresso-500 font-medium">Customer ID: #{customer.id}</p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-center gap-3 text-espresso-600">
            <FiMail className="text-coffee-600" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-espresso-600">
            <FiPhone className="text-coffee-600" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-espresso-600">
            <FiShoppingBag className="text-coffee-600" />
            <span>{customer.totalOrders} Pesanan</span>
          </div>
          <div className="flex items-center gap-3 text-espresso-600">
            <FiCoffee className="text-coffee-600" />
            <span>Favorit: {customer.favoriteMenu}</span>
          </div>
          <div className="flex items-center gap-3 text-espresso-600">
            <FiCalendar className="text-coffee-600" />
            <span>Order terakhir: {customer.lastOrder}</span>
          </div>
          <div className="font-black text-coffee-900">
            Total Belanja: {customer.totalSpent}
          </div>
        </div>

        <div className="px-8 pb-8">
          <Link
            to="/customers"
            className="inline-flex items-center gap-2 px-5 py-3 bg-coffee-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
          >
            <FiArrowLeft /> Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
