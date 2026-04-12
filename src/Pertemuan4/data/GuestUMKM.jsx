import { useState } from "react";
import dataJson from "./umkm.json";

export default function GuestUMKM() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const filteredData = dataJson.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category) &&
      (price === "" || item.price_range === price)
    );
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#001219] via-[#003049] to-[#005f73] overflow-hidden p-6 md:p-10 font-sans text-slate-100">
      
      {/* 🌊 ANIMATED BUBBLES BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-[-50px] bg-cyan-400/20 rounded-full blur-[1px]"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              animation: `bubble ${7 + Math.random() * 12}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER SECTION */}
        <div className="mb-16 text-center">
          <div className="inline-block animate-bounce mb-2">
             <span className="text-5xl">🔱</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-emerald-300 drop-shadow-[0_5px_15px_rgba(34,211,238,0.4)]">
           KATALOG <span className="text-white/20 font-light">|</span> UMKM
          </h1>
          <p className="text-cyan-200/60 mt-4 text-lg font-medium tracking-widest uppercase">
            Spill Hidden Gems Lokal di Bawah Laut 🌊✨
          </p>
        </div>

        {/* GLASSMORPHISM SEARCH + FILTER */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-[2.5rem] p-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search UMKM..."
              className="w-full p-4 rounded-2xl bg-slate-900/50 text-cyan-50 border border-cyan-500/30 outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-slate-500 shadow-inner"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="w-full p-4 rounded-2xl bg-slate-900/50 text-cyan-100 border border-cyan-500/30 focus:ring-2 focus:ring-cyan-400 outline-none appearance-none cursor-pointer shadow-inner"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" className="bg-slate-900">Semua Kategori...</option>
            <option value="Kuliner" className="bg-slate-900">Kuliner</option>
            <option value="Fashion" className="bg-slate-900">Fashion</option>
            <option value="Kerajinan" className="bg-slate-900">Kerajinan</option>
          </select>

          <select
            className="w-full p-4 rounded-2xl bg-slate-900/50 text-cyan-100 border border-cyan-500/30 focus:ring-2 focus:ring-cyan-400 outline-none cursor-pointer shadow-inner"
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="" className="bg-slate-900">Semua Harga...</option>
            <option value="Murah" className="bg-slate-900">Murah</option>
            <option value="Sedang" className="bg-slate-900">Sedang</option>
            <option value="Mahal" className="bg-slate-900">Mahal</option>
          </select>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-4 transition-all duration-500"
            >
              {/* IMAGE WITH CYAN GLOW OVERLAY */}
              <div className="relative overflow-hidden h-56">
                <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                />
                <div className="absolute top-5 right-5 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/30">
                  <span className="text-cyan-300 font-bold text-xs">★ {item.rating}</span>
                </div>
              </div>

              {/* CARD CONTENT */}
              <div className="p-7 relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-lg border border-cyan-400/20">
                    {item.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h2>

                <p className="text-sm text-cyan-100/60 flex items-center gap-1 font-medium italic">
                  <span>📍</span> {item.location?.city}
                </p>

                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-end">
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Price</p>
                    <p className="text-sm font-bold text-emerald-400 drop-shadow-sm">{item.price_range}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Contact</p>
                    <p className="text-xs font-semibold text-cyan-400">{item.social?.instagram}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredData.length === 0 && (
          <div className="text-center py-24 backdrop-blur-md bg-white/5 rounded-[3rem] border border-dashed border-white/10 mt-10">
            <span className="text-6xl block mb-4">⚓</span>
            <p className="text-cyan-200 text-xl font-medium italic">
              "Nothing found in this part of the ocean..."
            </p>
          </div>
        )}
      </div>

      {/* FOOTER DECORATION */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
    </div>
  );
}