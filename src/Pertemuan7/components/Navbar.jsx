import { useNavigate } from 'react-router-dom';
import { FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { MdNotifications, MdAccountCircle } from 'react-icons/md';
import { useState } from 'react';

/**
 * Navbar Component dengan React Icons
 * Header bar dengan greeting, notifications, dan user menu
 */
export default function Navbar({ onToggleSidebar, sidebarOpen }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [showMenu, setShowMenu] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat pagi';
    if (hour < 17) return 'Selamat siang';
    return 'Selamat malam';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAvatarImage = (value) => {
    return typeof value === 'string' && (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:'));
  };

  const renderAvatar = () => {
    if (isAvatarImage(user.avatar)) {
      return (
        <img
          src={user.avatar}
          alt={user.name || 'Profile'}
          className="w-full h-full object-cover rounded-full"
        />
      );
    }

    return user.avatar || 'JD';
  };

  return (
    <header className="bg-white border-b border-espresso-200 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side - Toggle & Greeting */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-espresso-100 rounded-lg transition-colors text-espresso-700"
            title={sidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="hidden md:block">
            <h1 className="text-2xl font-bold font-display text-espresso-900">
              {getGreeting()}, {user.name?.split(' ')[0] || 'Dipa'}! ☀️
            </h1>
            <p className="text-sm text-espresso-600">
              Berikut ringkasan kafe Anda hari ini
            </p>
          </div>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-espresso-100 rounded-lg transition-colors text-espresso-700" title="Notifikasi">
            <FiBell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-espresso-100 rounded-lg transition-colors text-espresso-700" 
            title="Pengaturan"
          >
            <FiSettings className="w-6 h-6" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-2 p-2 hover:bg-espresso-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-coffee-600 to-brew-500 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-white">
                {renderAvatar()}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-espresso-900">{user.name?.split(' ')[0] || 'Dipa'}</span>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-espresso-200 py-1 z-50">
                <button 
                  onClick={() => {
                    navigate('/dashboard');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-espresso-50 flex items-center gap-2 text-espresso-700"
                >
                  <MdAccountCircle className="w-5 h-5" />
                  <span>Profil</span>
                </button>
                <button 
                  onClick={() => {
                    navigate('/settings');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-espresso-50 flex items-center gap-2 text-espresso-700"
                >
                  <FiSettings className="w-5 h-5" />
                  <span>Pengaturan</span>
                </button>
                <div className="border-t border-espresso-200"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600 font-medium"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
