import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, LogIn, LogOut, MessageSquare, Megaphone, Send, Star, User, Compass, Award } from 'lucide-react';
import { getCurrentSession, getUserProfile, logoutFromSupabase, submitFeedbackComplaint } from '../services/supabaseApi';

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

export default function MemberHome() {
  const navigate = useNavigate();
  
  const savedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  }, []);

  const [form, setForm] = useState({
    name: savedUser.name || '',
    email: savedUser.email || '',
    type: 'feedback',
    subject: '',
    message: '',
  });
  
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(savedUser?.id ? savedUser : null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoggedIn = Boolean(currentUser?.id);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const session = await getCurrentSession();
        if (!session?.user) {
          localStorage.removeItem('isLoggedIn');
          if (isMounted) {
            setCurrentUser(null);
            setForm((current) => ({
              ...current,
              name: '',
              email: '',
            }));
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
        if (isMounted) setCurrentUser(null);
      } finally {
        if (isMounted) setCheckingSession(false);
      }
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

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
      setStatus('Pesan berhasil dikirim. Tim admin akan menindaklanjuti.');
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
    setForm({
      name: '',
      email: '',
      type: 'feedback',
      subject: '',
      message: '',
    });
    navigate('/member');
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
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-[#0F0E0C] hover:bg-[#A88C74] text-[#F4F1EA] font-bold px-6 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all shadow-xl shadow-black/10 active:scale-95"
              >
                <LogOut size={14} />
                Logout
              </button>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 bg-[#0F0E0C] hover:bg-[#A88C74] text-[#F4F1EA] font-bold px-6 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all shadow-xl shadow-black/10 active:scale-95"
              >
                <LogIn size={14} />
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-16 space-y-12 relative z-30">
        
        {/* Dynamic State Hero Section */}
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
                {isLoggedIn ? `Ambient Access: Permanent ${currentUser.role || 'Tenant'}` : 'Ambient Access: Unregistered'}
              </span>
            </div>

            {/* Main Content Area - Beautifully Styled for Guest vs Member */}
            {isLoggedIn ? (
              /* MEMBER STATE (Tampilan Cantik Terpersonalisasi) */
              <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full relative z-10 animate-fadeIn">
                <div className="md:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880]">DECK ARCHITECT PROFILE</p>
                    <h2 className="text-3xl font-light tracking-wide text-white font-display">
                      Selamat Datang, <span className="font-normal italic font-sans text-[#EAD3B3]">{currentUser.name || 'Member'}</span>
                    </h2>
                  </div>
                  <p className="text-[#F4F1EA]/60 text-xs font-light leading-relaxed max-w-md">
                    Sesi Anda telah terenkripsi penuh ke dalam ekosistem kerja ganjil. Nikmati jalur distribusi menu khusus dan loop feedback instan di bawah ini.
                  </p>
                  
                  {/* Quick Action Badges */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#bba086] text-[#0F0E0C] text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-xl transition-all shadow-lg shadow-black/20">
                      Claim Welcome Token
                    </button>
                  </div>
                </div>          
              </div>
            ) : (
              /* GUEST STATE (Tampilan Klasik Misterius) */
              <div className="my-6 space-y-3 max-w-2xl relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880]">Selamat Datang, Pengunjung</p>
                <h2 className="text-3xl md:text-4xl font-light leading-[1.2] tracking-wide text-white font-display">
                  Where Logic Fails, <br/><span className="italic font-sans text-[#EAD3B3] font-normal">Great Coffee Speaks.</span>
                </h2>
                <p className="text-[#F4F1EA]/60 text-xs font-light leading-relaxed max-w-lg">
                  Kami memecah aturan ekstraksi tradisional untuk menciptakan rasa ganjil yang tidak akan Anda temukan di Coffee Shop biasa.
                </p>
              </div>
            )}
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

        {/* Dynamic Promos Section mapping from array */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 border-b border-[#A88C74]/15 pb-4">
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

        {/* Feedback & Complain Deck Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#A88C74]/15 rounded-[2.5rem] p-8 md:p-12 shadow-xl items-start">
          
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-[#A88C74]">
              <MessageSquare size={18} />
              <p className="text-[9px] font-bold tracking-widest uppercase">FEEDBACK LOOP</p>
            </div>
            <h3 className="text-2xl font-bold text-[#0F0E0C] font-display">Feedback dan Complain</h3>
            <p className="text-xs text-[#0F0E0C]/50 font-light leading-relaxed">
              Gagasan presisi, kritik seduhan, atau sekadar saran ruang—sampaikan semuanya lewat enkripsi transmisi pesan instan ini.
            </p>
            
            {/* Guard Alert box if logged out */}
            {!isLoggedIn && (
              <div id="guard-alert" className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/40 text-amber-900 flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mt-0.5 flex-shrink-0 text-amber-700"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <p className="text-[10px] font-medium leading-relaxed">Fungsionalitas pengiriman pesan dinonaktifkan sementara hingga Anda mengakses akun member.</p>
              </div>
            )}
          </div>

          {/* Form Processing */}
          <div className="lg:col-span-8 w-full space-y-4">
            {status && <div className="p-3.5 rounded-xl bg-green-50 text-green-800 text-xs font-bold tracking-wide border border-green-100">{status}</div>}
            {error && <div className="p-3.5 rounded-xl bg-red-50 text-red-800 text-xs font-bold tracking-wide border border-red-100">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60">Identitas Nama</label>
                  <input
                    type="text"
                    placeholder="Nama"
                    disabled={!isLoggedIn}
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white disabled:opacity-50 transition-all placeholder:text-[#0F0E0C]/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60">Alamat Korespondensi</label>
                  <input
                    type="email"
                    placeholder="Email"
                    disabled={!isLoggedIn}
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white disabled:opacity-50 transition-all placeholder:text-[#0F0E0C]/20"
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
                      disabled={!isLoggedIn}
                      className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white disabled:opacity-50 transition-all text-[#0F0E0C]/70 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%20%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230F0E0C%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_1.2rem_center] bg-no-repeat"
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
                    disabled={!isLoggedIn}
                    value={form.subject}
                    onChange={(event) => updateField('subject', event.target.value)}
                    className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white disabled:opacity-50 transition-all placeholder:text-[#0F0E0C]/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60">Narasi Pesan</label>
                <textarea
                  rows={4}
                  placeholder="Tulis pesan kamu"
                  disabled={!isLoggedIn}
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white disabled:opacity-50 transition-all placeholder:text-[#0F0E0C]/20 resize-none"
                ></textarea>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting || checkingSession}
                  className="w-full bg-[#0F0E0C] hover:bg-[#A88C74] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send size={13} className="text-[#EAD3B3]" />
                  <span>
                    {isSubmitting ? 'Mengirim...' : isLoggedIn ? 'Kirim Pesan' : 'Login untuk Kirim Pesan'}
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