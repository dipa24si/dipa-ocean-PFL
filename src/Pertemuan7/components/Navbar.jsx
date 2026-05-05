import React from 'react';
import { Search, Bell, ChevronDown, Menu as MenuIcon } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#3E2C1C]/10 sticky top-0 z-40 px-8 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2 hover:bg-[#FDF8F5] rounded-lg text-[#3E2C1C] lg:hidden"
          >
            <MenuIcon size={20} />
          </button>
          
          <div className="relative hidden md:block w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78675C]" size={16} />
            <input 
              type="text" 
              placeholder="Cari pesanan, stok, atau pelanggan..." 
              className="w-full bg-[#FDF8F5] border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#3E2C1C]/20 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="relative p-2 text-[#78675C] hover:bg-[#FDF8F5] rounded-xl transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 border-2 border-white text-white text-[9px] flex items-center justify-center rounded-full font-bold">
              3
            </span>
          </button>

          <div className="h-8 w-[1px] bg-[#3E2C1C]/10 mx-2"></div>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2 hover:bg-[#FDF8F5] p-1.5 rounded-xl cursor-pointer transition-colors group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#3E2C1C]">John Doe</p>
              <p className="text-[10px] text-[#78675C] font-medium">Owner</p>
            </div>
            <div className="w-10 h-10 bg-[#3E2C1C] rounded-full border-2 border-[#FDF8F5] flex items-center justify-center text-white text-xs font-bold shadow-sm">
              JD
            </div>
            <ChevronDown size={14} className="text-[#78675C] group-hover:translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;