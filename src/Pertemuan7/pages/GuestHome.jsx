import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, LogIn, MessageSquare, Megaphone, Coffee, Star, ShieldAlert, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const promos = [
  {
    title: 'Happy Hour Kopi Susu',
    description: 'Diskon 25% untuk Kopi Susu Ganjil setiap Senin sampai Jumat pukul 14.00-17.00.',
    tag: 'Member Deal',
  },
  {
    title: 'Bundling Pastry',
    description: 'Beli minuman signature apa pun dan dapatkan potongan Rp 10.000 untuk butter croissant.',
    tag: 'Food Pairing',
  },
  {
    title: 'Stamp Reward',
    description: 'Kumpulkan 5 transaksi member, transaksi berikutnya gratis upgrade ukuran.',
    tag: 'Loyalty',
  },
];

const featuredProducts = [
  { id: 1, name: 'Espresso Arabika', price: 25000, rating: 4.8, reviews: 234, badge: 'Classic', desc: 'Ekstraksi ganda biji Arabika pilihan dengan crema tebal.' },
  { id: 2, name: 'Cappuccino Vegan', price: 28000, rating: 4.9, reviews: 189, badge: 'Healthy', desc: 'Espresso blend dipadukan dengan foam susu oat lembut.' },
  { id: 3, name: 'Iced Latte Vanilla', price: 32000, rating: 4.7, reviews: 256, badge: 'Sweet', desc: 'Kombinasi latte dingin dengan sirup vanilla organik premium.' },
  { id: 4, name: 'Cold Brew Nitro', price: 35000, rating: 4.9, reviews: 145, badge: 'Signature', desc: 'Kopi seduh dingin selama 16 jam dengan sensasi nitrogen yang creamy.' },
];

export default function GuestHome() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Bagaimana cara bergabung menjadi member Format Ganjil?',
      a: 'Sangat mudah! Anda hanya perlu mengeklik tombol "Login" di bagian pojok kanan atas, lalu klik tautan "Daftar Sekarang". Isi formulir dengan nama, email, dan kata sandi Anda. Pendaftaran instan dan akun Anda akan langsung aktif.'
    },
    {
      q: 'Bagaimana sistem perolehan poin dan stempel (stamps) bekerja?',
      a: 'Sebagai member, setiap Anda datang dan melakukan transaksi kopi di kedai kami, Anda akan mendapatkan poin (+10 hingga +20 poin) dan 1 stempel digital. Kumpulkan 5 stempel untuk menikmati gratis upgrade ukuran minuman pada kunjungan berikutnya.'
    },
    {
      q: 'Apa saja keuntungan eksklusif yang didapatkan oleh member?',
      a: 'Member mendapatkan akses ke Menu Rahasia kami (seperti Midnight Cold Brew atau Lavender Honey Latte) yang tidak dijual untuk umum. Poin yang Anda kumpulkan dapat digunakan untuk menukarkan minuman-minuman eksklusif ini secara gratis.'
    },
    {
      q: 'Apakah fasilitas area kerja (Digital Workspace) terbuka untuk umum?',
      a: 'Ya, area kerja kami terbuka untuk pengunjung umum (guest) maupun member. Kami menyediakan WiFi berkecepatan tinggi 148 Mbps dan area meja komunal dengan colokan listrik lengkap di area AC indoor maupun semi-outdoor.'
    }
  ];

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="bg-[#F4F1EA] text-[#0F0E0C] font-sans antialiased selection:bg-[#A88C74] selection:text-white overflow-x-hidden min-h-screen">
      
      {/* Dynamic Cinematic Top Ticker Bar */}
      <div className="bg-[#0F0E0C] text-[#EAD3B3] text-[10px] font-bold tracking-[0.4em] py-3 text-center sticky top-0 z-50 border-b border-[#A88C74]/10 flex items-center justify-center gap-4 px-4">
        <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse"></span>
        <span>THE ODDITY SEDUHAN: KLAIM WELCOME TOKEN UNTUK VISITOR BARU</span>
        <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse hidden md:inline"></span>
      </div>

      {/* Avant-Garde Minimalist Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-40">
        <div className="group cursor-pointer" onClick={() => navigate('/')}>
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#A88C74]/70 mb-0.5 transition-all duration-300 group-hover:tracking-[0.5em]">ATELIER OF COFFEE</p>
          <h1 className="text-2xl font-bold tracking-widest text-[#0F0E0C] font-display">FORMAT GANJIL</h1>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-[#0F0E0C]/60">
          <span className="cursor-default hover:text-[#0F0E0C] transition-colors">CONCEPT EXPERIENCE DECK</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase">Current Ambient</p>
            <p className="text-xs text-[#0F0E0C]/50 font-light">Chilled Jazz • Open until 11 PM</p>
          </div>
          
          <div>
            <button 
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-[#0F0E0C] hover:bg-[#A88C74] text-[#F4F1EA] font-bold px-6 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all shadow-xl shadow-black/10 active:scale-95"
            >
              <LogIn size={14} />
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-16 space-y-16 relative z-30">
        
        {/* Dynamic State Hero Section (Guest Unregistered) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          <div className="lg:col-span-8 bg-gradient-to-br from-[#0F0E0C] via-[#1A1815] to-[#24211D] text-[#F4F1EA] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group min-h-[340px]">
            
            {/* Background Decorative Element */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#A88C74]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#A88C74]/10 transition-all duration-700"></div>

            {/* Pill Badge Status */}
            <div className="self-start inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-medium tracking-wide">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A880] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A880]"></span>
              </span>
              <span className="tracking-wider text-[#EAD3B3]/90">
                Ambient Access: Unregistered
              </span>
            </div>

            {/* Guest State Hero Content */}
            <div className="my-6 space-y-3 max-w-2xl relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880]">Selamat Datang, Pengunjung</p>
              <h2 className="text-3xl md:text-4xl font-light leading-[1.2] tracking-wide text-white font-display">
                Where Logic Fails, <br/><span className="italic font-sans text-[#EAD3B3] font-normal">Great Coffee Speaks.</span>
              </h2>
              <p className="text-[#F4F1EA]/60 text-xs font-light leading-relaxed max-w-lg">
                Kami memecah aturan ekstraksi tradisional untuk menciptakan rasa ganjil yang tidak akan Anda temukan di Coffee Shop biasa.
              </p>
            </div>
            
            {/* Call to action to login/join */}
            <div className="pt-2">
              <button 
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#EAD3B3] hover:text-white transition-colors group/btn"
              >
                <span>Daftar Member Untuk Akses Penuh</span>
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Quick Informative Workspace Metrics */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="bg-white rounded-[2rem] p-6 border border-[#A88C74]/15 shadow-sm flex flex-col justify-between flex-1 group hover:shadow-xl transition-all">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold tracking-widest text-[#A88C74] uppercase">Digital Workspace</span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="my-2">
                <h3 className="text-3xl font-light tracking-tight text-[#0F0E0C]">148 <span className="text-xs font-bold text-[#A88C74] uppercase tracking-widest">Mbps</span></h3>
                <p className="text-xs text-[#0F0E0C]/50 mt-0.5 font-light">Koneksi serat optik simetris di setiap sudut meja komunal.</p>
              </div>
              <div className="w-full bg-[#F4F1EA] h-[3px] rounded-full overflow-hidden">
                <div className="bg-[#0F0E0C] h-full w-[88%]"></div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 border border-[#A88C74]/15 shadow-sm flex flex-col justify-between flex-1 group hover:shadow-xl transition-all">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold tracking-widest text-[#A88C74] uppercase">Seat Density</span>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">OPTIMAL</span>
              </div>
              <div className="my-2">
                <h3 className="text-3xl font-light tracking-tight text-[#0F0E0C]">42% <span className="text-xs font-bold text-[#A88C74] uppercase tracking-widest">Occupied</span></h3>
                <p className="text-xs text-[#0F0E0C]/50 mt-0.5 font-light">Suasana kondusif, area indoor AC & semi-outdoor masih tersedia.</p>
              </div>
              <div className="w-full bg-[#F4F1EA] h-[3px] rounded-full overflow-hidden">
                <div className="bg-[#A88C74] h-full w-[42%]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Coffee Selections (Sajian Pilihan) */}
        <section className="space-y-6">
          <div className="border-b border-[#A88C74]/15 pb-4">
            <div className="flex items-center gap-2.5">
              <Coffee className="text-[#A88C74]" size={18} />
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A88C74]">SAJIAN SENI PRESTISIUS</p>
                <h3 className="text-xl font-bold text-[#0F0E0C] font-display">Produk Pilihan Kami</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <article 
                key={product.id} 
                className="bg-white border border-[#A88C74]/15 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#F4F1EA] text-[#A88C74] rounded-full">
                      {product.badge}
                    </span>
                    <button 
                      onClick={() => toggleFavorite(product.id)}
                      className={`text-sm transition-colors ${favorites.includes(product.id) ? 'text-red-500 animate-pulse' : 'text-gray-300 hover:text-red-400'}`}
                    >
                      ★
                    </button>
                  </div>
                  
                  <h4 className="text-lg font-bold text-[#0F0E0C] font-display group-hover:text-[#A88C74] transition-colors mb-1">{product.name}</h4>
                  <p className="text-xs text-[#0F0E0C]/50 leading-relaxed font-light mb-4 min-h-[48px]">{product.desc}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#A88C74]/10">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-[#0F0E0C]">Rp {product.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center gap-1 text-[10px] text-[#0F0E0C]/40">
                      <span className="text-yellow-500">★</span>
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full bg-[#0F0E0C] hover:bg-[#A88C74] text-white py-2 rounded-xl transition-colors font-medium text-[10px] tracking-wider uppercase"
                  >
                    Daftar / Login untuk Memesan
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Dynamic Promos Section */}
        <section className="space-y-6">
          <div className="border-b border-[#A88C74]/15 pb-4">
            <div className="flex items-center gap-2.5">
              <Gift className="text-[#A88C74]" size={18} />
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A88C74]">THE VANGUARD EXPERIENCES</p>
                <h3 className="text-xl font-bold text-[#0F0E0C] font-display">Campaign Promo</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {promos.map((promo, idx) => (
              <article key={promo.title} className="bg-white border border-[#A88C74]/15 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group hover:-translate-y-0.5">
                <div className="absolute -right-4 -bottom-6 text-[100px] opacity-[0.02] font-bold group-hover:scale-110 select-none transition-transform font-display">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="space-y-4 relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#A88C74] border border-[#A88C74]/30 px-2.5 py-0.5 rounded-full">
                    <Megaphone size={10} />
                    {promo.tag}
                  </span>
                  <h4 className="text-lg font-bold text-[#0F0E0C] group-hover:text-[#A88C74] transition-colors font-display">{promo.title}</h4>
                  <p className="text-xs text-[#0F0E0C]/60 leading-relaxed font-light">{promo.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white border border-[#A88C74]/15 rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-[#A88C74]/15 pb-4">
            <HelpCircle className="text-[#A88C74]" size={18} />
            <div>
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A88C74]">INFORMASI PENDUKUNG</p>
              <h3 className="text-xl font-bold text-[#0F0E0C] font-display">Tanya Jawab Umum (FAQ)</h3>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border-b border-[#A88C74]/10 pb-4 last:border-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2 text-[#0F0E0C] font-bold font-display hover:text-[#A88C74] transition-colors focus:outline-none"
                  >
                    <span className="text-sm md:text-base pr-4">{faq.q}</span>
                    <span className="text-[#A88C74] flex-shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  <div
                    className={`text-xs md:text-sm text-[#0F0E0C]/60 leading-relaxed font-light transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                    }`}
                  >
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <footer className="text-center py-8 text-[10px] tracking-[0.2em] uppercase text-[#0F0E0C]/40 border-t border-[#A88C74]/10 bg-white space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-[9px] font-bold text-[#A88C74]">
          <button onClick={() => navigate('/v1')} className="hover:text-[#0F0E0C] transition-colors">Landing V1</button>
          <span>•</span>
          <button onClick={() => navigate('/v2')} className="hover:text-[#0F0E0C] transition-colors">Landing V2</button>
          <span>•</span>
          <button onClick={() => navigate('/v3')} className="hover:text-[#0F0E0C] transition-colors">CRM V3</button>
          <span>•</span>
          <button onClick={() => navigate('/menu')} className="hover:text-[#0F0E0C] transition-colors">Menu Page</button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-[9px] font-bold text-stone-400">
          <span className="text-[#A88C74]/50">📄 Dokumentasi PRD:</span>
          <button onClick={() => navigate('/prd/v1')} className="hover:text-[#A88C74] transition-colors underline underline-offset-2">PRD V1 Basic</button>
          <span>•</span>
          <button onClick={() => navigate('/prd/v2')} className="hover:text-[#A88C74] transition-colors underline underline-offset-2">PRD V2 Intermediate</button>
          <span>•</span>
          <button onClick={() => navigate('/prd/v3')} className="hover:text-[#A88C74] transition-colors underline underline-offset-2">PRD V3 Complete</button>
        </div>
        <p>&copy; 2026 Format Ganjil Architecture of Coffee. Built to Redefine the Norm.</p>
      </footer>
    </div>
  );
}
