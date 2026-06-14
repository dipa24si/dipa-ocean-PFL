import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiLayout, 
  FiShoppingCart, 
  FiMenu, 
  FiUsers, 
  FiPackage, 
  FiUser, 
  FiSettings,
  FiLogOut,
  FiMessageSquare
} from 'react-icons/fi';
import { logoutFromSupabase } from '../services/supabaseApi';

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <FiLayout />, path: '/dashboard/dashboard' },
    { name: 'Orders', icon: <FiShoppingCart />, path: '/dashboard/orders' },
    { name: 'Menu', icon: <FiMenu />, path: '/dashboard/products' },
    { name: 'Customers', icon: <FiUsers />, path: '/dashboard/customers' },
    { name: 'Inventory', icon: <FiPackage />, path: '/dashboard/inventory' },
    { name: 'Staff', icon: <FiUser />, path: '/dashboard/staff' },
    { name: 'Users', icon: <FiUsers />, path: '/dashboard/users' },
    { name: 'Feedback', icon: <FiMessageSquare />, path: '/dashboard/feedback-complaints' },
    { name: 'Settings', icon: <FiSettings />, path: '/dashboard/settings' },
  ];

  const handleLogout = async () => {
    await logoutFromSupabase();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-coffee-100 p-6 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-coffee-900 rounded-xl flex items-center justify-center text-white shadow-lg">
          ☕
        </div>
        <div>
          <h1 className="font-bold text-coffee-900 leading-none">Format Ganjil</h1>
          <p className="text-[10px] font-bold text-espresso-400 mt-1 uppercase tracking-widest">Owner & Admin Panel</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 flex-grow">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all duration-300
              ${isActive 
                ? 'bg-coffee-900 text-white shadow-lg shadow-coffee-900/20 translate-x-2' 
                : 'text-espresso-400 hover:bg-coffee-50 hover:text-coffee-900'}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button Section */}
      <div className="mt-auto pt-6 border-t border-coffee-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
        >
          <span className="text-xl"><FiLogOut /></span>
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
