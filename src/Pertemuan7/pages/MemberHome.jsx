import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, LogOut, MessageSquare, Megaphone, Send, Star, Coffee, Award, CheckCircle2, History } from 'lucide-react';
import { getCurrentSession, getUserProfile, logoutFromSupabase, submitFeedbackComplaint } from '../services/supabaseApi';

const memberPromos = [
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

const initialExclusiveMenu = [
  { id: 'ex-1', name: 'Midnight Cold Brew (Secret Recipe)', pointsRequired: 80, desc: 'Racikan cold brew rahasia dengan sentuhan mint dan sirup maple gelap.', icon: '🌙' },
  { id: 'ex-2', name: 'Lavender Honey Latte', pointsRequired: 100, desc: 'Espresso premium dipadu dengan susu oat, madu organik, dan bunga lavender.', icon: '🪻' },
  { id: 'ex-3', name: 'Matcha Espresso Fusion', pointsRequired: 90, desc: 'Layering estetik antara matcha premium Jepang dan espresso arabika ganda.', icon: '🍵' },
];

export default function MemberHome() {
  const navigate = useNavigate();
  
  const savedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  }, []);

  const [currentUser, setCurrentUser] = useState(savedUser?.id ? savedUser : null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Interactive member states
  const [memberPoints, setMemberPoints] = useState(240);
  const [stamps, setStamps] = useState([true, true, true, false, false]); // 3 stamps out of 5
  const [claimedCode, setClaimedCode] = useState('');
  const [claimedProduct, setClaimedProduct] = useState('');

  const [form, setForm] = useState({
    name: savedUser.name || '',
    email: savedUser.email || '',
    type: 'feedback',
    subject: '',
    message: '',
  });

  const isLoggedIn = Boolean(currentUser?.id);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const session = await getCurrentSession();
        if (!session?.user) {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('user');
          if (isMounted) {
            setCurrentUser(null);
            navigate('/');
          }
          return;
        }

        const profile = await getUserProfile(session.user.id);
        const user = {
          id: session.user.id,
          email: session.user.email,
          name: profile?.name || session.user.user_metadata?.name || session.user.email,
          role: profile?.role || session.user.user_metadata?.role || 'member',
          status: profile?.status || 'active',
          avatar: profile?.avatar || '',
        };

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email || '');
        localStorage.setItem('user', JSON.stringify(user));

        if (isMounted) {
          setCurrentUser(user);
          setForm((current) => ({
            ...current,
            name: user.name || '',
            email: user.email || '',
          }));
        }
      } catch (sessionError) {
        console.error('[MemberHome] Gagal memeriksa sesi:', sessionError);
        if (isMounted) {
          setCurrentUser(null);
          navigate('/');
        }
      } finally {
        if (isMounted) setCheckingSession(false);
      }
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');

    if (!isLoggedIn) {
      setError('Silakan login terlebih dahulu untuk mengirim feedback atau complain.');
      return;
    }

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Lengkapi nama, email, subjek, dan pesan.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitFeedbackComplaint(form);
      setStatus('Pesan berhasil dikirim. Tim admin akan segera menindaklanjuti.');
      setForm((current) => ({ ...current, subject: '', message: '' }));
    } catch (submitError) {
      setError(submitError.message || 'Pesan gagal dikirim.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logoutFromSupabase();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/');
  };

  // Simulation: Add a stamp to card
  const handleSimulateVisit = () => {
    const nextStampIndex = stamps.findIndex((s) => !s);
    if (nextStampIndex !== -1) {
      const newStamps = [...stamps];
      newStamps[nextStampIndex] = true;
      setStamps(newStamps);
      setMemberPoints((prev) => prev + 25);
      
      // If it's the 5th stamp, trigger reward notice
      if (nextStampIndex === 4) {
        setStatus('Selamat! Anda telah mengumpulkan 5 Stamp. Nikmati gratis upgrade ukuran pada kunjungan Anda berikutnya!');
      } else {
        setStatus(`Kunjungan disimulasikan! +1 Stamp terkumpul dan +25 Points ditambahkan.`);
      }
    } else {
      // Reset stamps if all were full
      setStamps([true, false, false, false, false]);
      setMemberPoints((prev) => prev + 25);
      setStatus('Stamp Card baru dimulai! +1 Stamp terkumpul.');
    }
  };

  // Simulation: Redeem exclusive drink with points
  const handleRedeemProduct = (menuItem) => {
    if (memberPoints >= menuItem.pointsRequired) {
      setMemberPoints((prev) => prev - menuItem.pointsRequired);
      const code = `FG-MBR-${Math.floor(1000 + Math.random() * 9000)}`;
      setClaimedCode(code);
      setClaimedProduct(menuItem.name);
      setStatus(`Berhasil menukar ${menuItem.pointsRequired} poin untuk ${menuItem.name}! Tunjukkan kode klaim Anda ke barista.`);
    } else {
      setError(`Poin tidak cukup untuk menukarkan ${menuItem.name}. Dibutuhkan ${menuItem.pointsRequired} poin.`);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#A88C74] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F1EA] text-[#0F0E0C] font-sans antialiased selection:bg-[#A88C74] selection:text-white overflow-x-hidden min-h-screen">
      
      {/* Top Ticker Bar */}
      <div className="bg-[#0F0E0C] text-[#EAD3B3] text-[10px] font-bold tracking-[0.4em] py-3 text-center sticky top-0 z-50 border-b border-[#A88C74]/10 flex items-center justify-center gap-4 px-4">
        <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse"></span>
        <span>EXCLUSIVE MEMBER SPACE • NIKMATI MENU DAN PROMO KHUSUS ANDA</span>
        <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse hidden md:inline"></span>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-40">
        <div>
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#A88C74]/70 mb-0.5">ATELIER OF COFFEE</p>
          <h1 className="text-2xl font-bold tracking-widest text-[#0F0E0C] font-display">FORMAT GANJIL</h1>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-[#0F0E0C]/60">
          <span className="cursor-default">MEMBER DASHBOARD</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase">Tier: Gold Brewer</p>
            <p className="text-xs text-[#0F0E0C]/50 font-light">{currentUser?.email}</p>
          </div>
          
          <div>
            <button 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-[#0F0E0C] hover:bg-[#A88C74] text-[#F4F1EA] font-bold px-6 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all shadow-xl shadow-black/10 active:scale-95"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-16 space-y-12 relative z-30">
        {/* Personalized Welcome, Virtual Card, and Loyalty Stamp Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          
          {/* Left Side: Personalized Greeting & Info */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0F0E0C] via-[#1A1815] to-[#24211D] text-[#F4F1EA] rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group min-h-[360px]">
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#A88C74]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="self-start inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-medium tracking-wide">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A880] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A880]"></span>
              </span>
              <span className="tracking-wider text-[#EAD3B3]/90">
                Ambient Access: Permanent {currentUser?.role || 'Member'}
              </span>
            </div>

            <div className="my-6 space-y-3 relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880]">MEMBER ARCHITECT PROFILE</p>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white font-display">
                Selamat Datang kembali, <br />
                <span className="font-normal italic font-sans text-[#EAD3B3]">{currentUser?.name || 'Kawan Ganjil'}</span>
              </h2>
              <p className="text-[#F4F1EA]/60 text-[11px] font-light leading-relaxed">
                Sesi Anda aktif. Anda memiliki akses penuh ke katalog menu rahasia kami, pengumpulan stempel loyalitas otomatis, dan form masukan langsung ke sistem admin.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3 items-center relative z-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-2">
                <p className="text-[8px] uppercase tracking-widest text-[#C5A880] font-bold">Poin Saldo</p>
                <p className="text-xl font-bold text-white">{memberPoints} <span className="text-[10px] font-medium text-[#EAD3B3]">Pts</span></p>
              </div>
              <button 
                onClick={handleSimulateVisit}
                className="bg-[#C5A880] hover:bg-[#bba086] text-[#0F0E0C] text-[9px] font-bold tracking-widest uppercase px-4 py-3 rounded-2xl transition-all shadow-lg active:scale-95"
              >
                Simulasi Kunjungan
              </button>
            </div>
          </div>

          {/* Middle: Virtual Member Card */}
          <div className="lg:col-span-4 bg-gradient-to-tr from-[#1A1815] via-[#2D251D] to-[#0F0E0C] text-[#F4F1EA] rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:scale-[1.03] hover:rotate-1 transition-all duration-300 min-h-[360px] border border-[#A88C74]/20">
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-60 pointer-events-none"></div>
            
            {/* Card Header */}
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-[7px] font-bold tracking-[0.3em] text-[#C5A880] uppercase">MEMBER PASS</p>
                <h3 className="text-base font-bold tracking-widest font-display text-[#EAD3B3]">FORMAT GANJIL</h3>
              </div>
              <div className="w-10 h-8 bg-gradient-to-br from-[#C5A880] to-[#8A6E45] rounded-lg opacity-85 flex items-center justify-center shadow-inner">
                {/* Micro NFC Chip simulation */}
                <div className="w-6 h-5 border border-white/20 rounded flex items-center justify-center gap-0.5">
                  <div className="w-1 h-3 bg-white/20 rounded-full"></div>
                  <div className="w-1.5 h-3.5 bg-white/40 rounded"></div>
                  <div className="w-1 h-3 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="my-auto pt-6 pb-4 relative z-10">
              <p className="text-[8px] font-bold tracking-widest text-[#A88C74] uppercase">HOLDER</p>
              <p className="text-lg font-medium text-white truncate">{currentUser?.name || 'Kawan Ganjil'}</p>
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-[7px] font-bold tracking-widest text-[#A88C74] uppercase">TIER LEVEL</p>
                  <p className="text-xs font-bold text-[#EAD3B3] tracking-wider">GOLD BREWER</p>
                </div>
                <div className="text-right">
                  <p className="text-[7px] font-bold tracking-widest text-[#A88C74] uppercase">JOINED</p>
                  <p className="text-xs font-light text-white/80">06 / 2026</p>
                </div>
              </div>
            </div>

            {/* Card Footer: Simulated Barcode */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2 relative z-10">
              <div className="h-7 w-full flex items-center justify-between gap-[2px] opacity-75 group-hover:opacity-100 transition-opacity">
                {/* Generate simulated barcode bars */}
                {[2, 4, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 4, 2, 1, 2, 3, 1, 4, 2, 1].map((w, i) => (
                  <div 
                    key={i} 
                    className="bg-[#EAD3B3] h-full" 
                    style={{ width: `${w}px` }}
                  ></div>
                ))}
              </div>
              <p className="text-[7px] font-mono text-center tracking-[0.4em] text-[#EAD3B3]/60 uppercase">
                {currentUser?.id ? `MEMBER-${currentUser.id.substring(0, 8)}` : 'MEMBER-UNKNOWN'}
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Stamp Progress Card */}
          <div className="lg:col-span-4 bg-white border border-[#A88C74]/15 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all min-h-[360px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Award className="text-[#A88C74]" size={18} />
                  <span className="text-[11px] font-bold tracking-widest text-[#A88C74] uppercase">Coffee Stamp Card</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">ACTIVE</span>
              </div>

              <p className="text-xs text-[#0F0E0C]/60 mb-6 font-light">
                Dapatkan 1 stempel transaksi stiap beli kopi. Kumpulkan 5 stempel untuk menikmati gratis upgrade ukuran gelas minuman Anda.
              </p>

              {/* Visual Stamp Slots */}
              <div className="grid grid-cols-5 gap-2.5 mb-6">
                {stamps.map((isStamped, idx) => (
                  <div 
                    key={idx} 
                    className={`aspect-square rounded-2xl border-2 flex items-center justify-center transition-all ${
                      isStamped 
                        ? 'bg-[#0F0E0C] border-[#0F0E0C] text-[#EAD3B3] shadow-lg scale-105' 
                        : 'border-[#A88C74]/20 border-dashed text-gray-300'
                    }`}
                  >
                    {isStamped ? (
                      <div className="flex flex-col items-center">
                        <Coffee size={18} />
                        <span className="text-[7px] font-bold tracking-tighter mt-0.5">OK</span>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold">{idx + 1}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#A88C74]/10 pt-4 flex justify-between items-center">
              <p className="text-[10px] text-[#0F0E0C]/50 font-light">
                {stamps.filter(Boolean).length === 5 
                  ? 'Stamp card penuh! Silakan tukar di barista.' 
                  : `${5 - stamps.filter(Boolean).length} stamp lagi menuju reward gratis.`}
              </p>
              <div className="w-20 bg-[#F4F1EA] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#A88C74] h-full transition-all duration-500" style={{ width: `${(stamps.filter(Boolean).length / 5) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Claimed Code Banner */}
        {claimedCode && (
          <section className="bg-emerald-50 border border-emerald-200 rounded-[2rem] p-6 text-emerald-950 flex flex-col md:flex-row justify-between items-center gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-sm">Penukaran Berhasil!</h4>
                <p className="text-xs text-emerald-800 font-light">Kupon untuk <strong className="font-medium text-emerald-950">{claimedProduct}</strong> siap digunakan.</p>
              </div>
            </div>
            <div className="bg-white border border-emerald-300 px-5 py-2.5 rounded-xl font-mono text-sm font-bold tracking-widest text-emerald-900 shadow-inner select-all">
              {claimedCode}
            </div>
          </section>
        )}

        {/* Member Exclusive Products */}
        <section className="space-y-6">
          <div className="border-b border-[#A88C74]/15 pb-4">
            <div className="flex items-center gap-2.5">
              <Star className="text-[#A88C74]" size={18} />
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A88C74]">SAJIAN KHUSUS KOLEKTIF MEMBER</p>
                <h3 className="text-xl font-bold text-[#0F0E0C] font-display">Menu Eksklusif Member</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialExclusiveMenu.map((menuItem) => (
              <article 
                key={menuItem.id} 
                className="bg-white border border-[#A88C74]/15 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl">{menuItem.icon}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200/50">
                      Secret Menu
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-[#0F0E0C] font-display group-hover:text-[#A88C74] transition-colors mb-1">{menuItem.name}</h4>
                  <p className="text-xs text-[#0F0E0C]/50 leading-relaxed font-light mb-6 min-h-[48px]">{menuItem.desc}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#A88C74]/10">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#0F0E0C]/60 font-light">Biaya Penukaran</p>
                    <p className="text-sm font-bold text-[#A88C74]">{menuItem.pointsRequired} Pts</p>
                  </div>

                  <button 
                    onClick={() => handleRedeemProduct(menuItem)}
                    className="w-full bg-[#0F0E0C] hover:bg-[#A88C74] text-white py-2.5 rounded-xl transition-colors font-medium text-[10px] tracking-wider uppercase active:scale-[0.98]"
                  >
                    Tukarkan dengan Poin
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Member Order & Visit History */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#A88C74]/15 pb-4">
            <History className="text-[#A88C74]" size={18} />
            <div>
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A88C74]">DATA KUNJUNGAN HISTORIS</p>
              <h3 className="text-xl font-bold text-[#0F0E0C] font-display">Riwayat Transaksi</h3>
            </div>
          </div>

          <div className="bg-white border border-[#A88C74]/15 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0F0E0C] text-[#EAD3B3] uppercase tracking-wider text-[9px] font-bold">
                    <th className="px-6 py-4">Tanggal Kunjungan</th>
                    <th className="px-6 py-4">Sajian yang Dipesan</th>
                    <th className="px-6 py-4">Total Biaya</th>
                    <th className="px-6 py-4">Poin Diperoleh</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#A88C74]/10 text-[#0F0E0C]/80 font-light">
                  <tr className="hover:bg-[#F4F1EA]/25">
                    <td className="px-6 py-4">19 Juni 2026</td>
                    <td className="px-6 py-4 font-normal text-[#0F0E0C]">Iced Latte Vanilla</td>
                    <td className="px-6 py-4">Rp 32.000</td>
                    <td className="px-6 py-4 text-emerald-700 font-medium">+15 Pts</td>
                    <td className="px-6 py-4 text-right"><span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[9px] tracking-wide uppercase">Selesai</span></td>
                  </tr>
                  <tr className="hover:bg-[#F4F1EA]/25">
                    <td className="px-6 py-4">15 Juni 2026</td>
                    <td className="px-6 py-4 font-normal text-[#0F0E0C]">Espresso Arabika + Croissant</td>
                    <td className="px-6 py-4">Rp 43.000</td>
                    <td className="px-6 py-4 text-emerald-700 font-medium">+20 Pts</td>
                    <td className="px-6 py-4 text-right"><span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[9px] tracking-wide uppercase">Selesai</span></td>
                  </tr>
                  <tr className="hover:bg-[#F4F1EA]/25">
                    <td className="px-6 py-4">10 Juni 2026</td>
                    <td className="px-6 py-4 font-normal text-[#0F0E0C]">Cappuccino Vegan</td>
                    <td className="px-6 py-4">Rp 28.000</td>
                    <td className="px-6 py-4 text-emerald-700 font-medium">+10 Pts</td>
                    <td className="px-6 py-4 text-right"><span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[9px] tracking-wide uppercase">Selesai</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Feedback & Complain Deck Section (Active for Member) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#A88C74]/15 rounded-[2.5rem] p-8 md:p-12 shadow-xl items-start">
          
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-[#A88C74]">
              <MessageSquare size={18} />
              <p className="text-[9px] font-bold tracking-widest uppercase">FEEDBACK LOOP</p>
            </div>
            <h3 className="text-2xl font-bold text-[#0F0E0C] font-display">Feedback dan Complain</h3>
            <p className="text-xs text-[#0F0E0C]/50 font-light leading-relaxed">
              Gagasan presisi, kritik seduhan, atau sekadar saran ruang—sampaikan semuanya lewat enkripsi transmisi pesan instan ini. Form ini aktif karena Anda masuk sebagai member resmi.
            </p>
          </div>

          {/* Form Processing */}
          <div className="lg:col-span-8 w-full space-y-4">
            {status && <div className="p-3.5 rounded-xl bg-green-50 text-green-800 text-xs font-bold tracking-wide border border-green-100 shadow-sm">{status}</div>}
            {error && <div className="p-3.5 rounded-xl bg-red-50 text-red-800 text-xs font-bold tracking-wide border border-red-100 shadow-sm">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60">Identitas Nama</label>
                  <input
                    type="text"
                    placeholder="Nama"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60">Alamat Korespondensi</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60">Klasifikasi Pesan</label>
                  <div className="relative">
                    <select
                      value={form.type}
                      onChange={(event) => updateField('type', event.target.value)}
                      className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all text-[#0F0E0C]/70 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%20%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230F0E0C%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.2rem_center] bg-no-repeat"
                    >
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complain</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60">Poin Subjek</label>
                  <input
                    type="text"
                    placeholder="Subjek"
                    value={form.subject}
                    onChange={(event) => updateField('subject', event.target.value)}
                    className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60">Narasi Pesan</label>
                <textarea
                  rows={4}
                  placeholder="Tulis pesan kamu"
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20 resize-none"
                ></textarea>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0F0E0C] hover:bg-[#A88C74] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send size={13} className="text-[#EAD3B3]" />
                  <span>
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>

      <footer className="text-center py-8 text-[10px] tracking-[0.2em] uppercase text-[#0F0E0C]/30 border-t border-[#A88C74]/10 bg-white">
        &copy; 2026 Format Ganjil Architecture of Coffee. Built to Redefine the Norm.
      </footer>
    </div>
  );
}