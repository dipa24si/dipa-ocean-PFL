import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import {
  MdDashboard,
  MdShoppingCart,
  MdInventory2,
  MdRestaurantMenu,
  MdPeople,
  MdAnalytics,
  MdSettings,
  MdError,
} from 'react-icons/md';

/**
 * Sidebar Component dengan NavLink untuk Active State
 * Menggunakan React Router NavLink untuk active styling
 * React Icons untuk ikon yang lebih baik
 */
export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [showConfirm, setShowConfirm] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <MdDashboard className="w-5 h-5" />,
      path: '/dashboard'
    },
    {
      id: 'orders',
      label: 'Pesanan',
      icon: <MdShoppingCart className="w-5 h-5" />,
      path: '/orders'
    },
    {
      id: 'inventory',
      label: 'Inventori',
      icon: <MdInventory2 className="w-5 h-5" />,
      path: '/inventory'
    },
    {
      id: 'products',
      label: 'Menu Produk',
      icon: <MdRestaurantMenu className="w-5 h-5" />,
      path: '/products'
    },
    {
      id: 'staff',
      label: 'Staf',
      icon: <MdPeople className="w-5 h-5" />,
      path: '/staff'
    },
    {
      id: 'analytics',
      label: 'Analitik',
      icon: <MdAnalytics className="w-5 h-5" />,
      path: '/analytics'
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: <MdSettings className="w-5 h-5" />,
      path: '/settings'
    },
    // Error pages for testing
    {
      id: 'error400',
      label: 'Error 400',
      icon: <MdError className="w-5 h-5" />,
      path: '/error/400'
    },
    {
      id: 'error401',
      label: 'Error 401',
      icon: <MdError className="w-5 h-5" />,
      path: '/error/401'
    },
    {
      id: 'error403',
      label: 'Error 403',
      icon: <MdError className="w-5 h-5" />,
      path: '/error/403'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAvatarImage = (value) => {
    return typeof value === 'string' && (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:'));
  };

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-espresso-900 to-espresso-800 text-white transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-espresso-700">
        <div className="flex items-center space-x-3 justify-center">
          <span className="text-3xl">☕</span>
          {isOpen && <span className="text-lg font-bold font-display">NgopiEuy</span>}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-coffee-600 to-brew-500 text-white shadow-lg'
                  : 'text-espresso-300 hover:bg-espresso-700 hover:text-white'
              }`
            }
            title={!isOpen ? item.label : ''}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {isOpen && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-espresso-700 p-4 space-y-3">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-coffee-500 to-brew-500 rounded-full overflow-hidden flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            {isAvatarImage(user.avatar) ? (
              <img
                src={user.avatar}
                alt={user.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            ) : (
              user.avatar || 'JD'
            )}
          </div>
          {isOpen && (
            <div className="text-sm">
              <p className="font-medium text-white">{user.name || 'Dipa Tranggana'}</p>
              <p className="text-espresso-400 text-xs">{user.role || 'Manager'}</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-espresso-300 hover:bg-red-600 hover:text-white transition-all duration-200"
          title={!isOpen ? 'Logout' : ''}
        >
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>

        {/* Logout Confirmation */}
        {showConfirm && (
          <div className="p-3 bg-red-600 rounded-lg text-sm space-y-2">
            <p className="font-medium">Yakin logout?</p>
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-700 hover:bg-red-800 px-2 py-1 rounded text-xs font-bold transition-colors"
              >
                Ya
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs font-bold transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
