import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiShoppingBag } from 'react-icons/fi';
import LoyaltyBadge from './LoyaltyBadge';

export default function CustomerCard({ customer, photoUrl }) {
  return (
    <div className="bg-white rounded-[2rem] border border-coffee-100 p-6 shadow-sm group">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={photoUrl}
          alt={customer.name}
          onError={(event) => {
            event.currentTarget.src = '/avatar.svg';
          }}
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div>
          <Link to={`/customers/${customer.id}`} className="font-bold text-coffee-900 hover:underline">
            {customer.name}
          </Link>
          <LoyaltyBadge loyalty={customer.loyalty} />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-espresso-500 gap-3">
          <FiMail /> {customer.email}
        </div>
        <div className="flex items-center text-sm text-espresso-500 gap-3">
          <FiPhone /> {customer.phone}
        </div>
      </div>

      <div className="pt-4 border-t border-coffee-50 flex justify-between items-center">
        <div className="flex items-center gap-2 text-coffee-600 font-bold">
          <FiShoppingBag /> <span className="text-sm">{customer.totalOrders} Pesanan</span>
        </div>
        <button type="button" className="text-sm font-bold text-coffee-900 underline underline-offset-4">
          Riwayat
        </button>
      </div>
    </div>
  );
}
