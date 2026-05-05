import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiLayout, 
  FiShoppingCart, 
  FiMenu, 
  FiUsers, 
  FiPackage, 
  FiUser, 
  FiSettings,
  FiLogOut // Tambahkan icon logout
} from 'react-icons/fi';

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <FiLayout />, path: '/dashboard' },
    { name: 'Orders', icon: <FiShoppingCart />, path: '/orders' },
    { name: 'Menu', icon: <FiMenu />, path: '/products' },
    { name: 'Customers', icon: <FiUsers />, path: '/customers' },
    { name: 'Inventory', icon: <FiPackage />, path: '/inventory' },
    { name: 'Staff', icon: <FiUser />, path: '/staff' },
    { name: 'Settings', icon: <FiSettings />, path: '/settings' },
  ];

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Hapus status login
    localStorage.removeItem('userEmail');
    navigate('/login'); // Balik ke login
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-coffee-100 p-6 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-coffee-900 rounded-xl flex items-center justify-center text-white shadow-lg">
          ☕
        </div>
        <div>
          <h1 className="font-bold text-coffee-900 leading-none">BrewMaster</h1>
          <p className="text-[10px] font-bold text-espresso-400 mt-1 uppercase tracking-widest">Admin Panel</p>
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