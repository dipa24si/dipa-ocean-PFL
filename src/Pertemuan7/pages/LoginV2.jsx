import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import { loginWithSupabase } from '../services/supabaseApi';

const adminRoles = ['admin', 'owner', 'Manager', 'Owner'];

export default function LoginV2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && document.activeElement === emailInputRef.current && email) {
        passwordInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [email]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    try {
      const user = await loginWithSupabase(email, password);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('loginTime', new Date().toISOString());
      localStorage.setItem('user', JSON.stringify(user));

      navigate(adminRoles.includes(user.role) ? '/dashboard' : '/member');
    } catch (error) {
      setErrorMessage(error.message || 'Login gagal. Periksa email dan password.');
      passwordInputRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0F0E0C] font-sans antialiased flex flex-col justify-between relative overflow-hidden selection:bg-[#A88C74] selection:text-white">
      
      {/* Elemen Dekoratif Seni - Blob Blur Halus Latar Belakang */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#A88C74]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0F0E0C]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Transparan Atas */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#0F0E0C]/60 hover:text-[#0F0E0C] transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Kembali
        </button>
        <div className="text-right cursor-pointer" onClick={() => navigate('/')}>
          <p className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#A88C74]">ATELIER OF COFFEE</p>
          <h1 className="text-sm font-bold tracking-widest text-[#0F0E0C]">FORMAT GANJIL</h1>
        </div>
      </header>

      {/* Kotak Card Utama (Tampilan Mewah Geometris) */}
      <main className="flex-1 flex items-center justify-center px-6 relative z-10 my-8">
        <div className="w-full max-w-md bg-white border border-[#A88C74]/15 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/[0.03] transition-all hover:shadow-black/[0.05]">
          
          {/* Sesi Identitas / Judul Utama */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#0F0E0C] flex items-center justify-center mb-4 shadow-xl shadow-black/10 text-[#EAD3B3]">
              <LogIn size={22} />
            </div>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#A88C74] mb-1">ACCESS INTERFACE</p>
            <h2 className="text-2xl font-bold tracking-wider text-[#0F0E0C] font-display uppercase">FORMAT GANJIL</h2>
            <p className="text-xs text-[#0F0E0C]/50 font-light mt-1.5">Masuk ke enkripsi sesi Anda via akun Supabase</p>
          </div>

          {/* Banner Error Minimalis */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-800 text-xs font-medium tracking-wide">
              {errorMessage}
            </div>
          )}

          {/* Form Interaktif */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60 block pl-1">
                Alamat Korespondensi (Email)
              </label>
              <input
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@email.com"
                disabled={isLoading}
                className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20 text-[#0F0E0C]"
              />
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60 block">
                  Kunci Sandi (Password)
                </label>
                <a href="#forgot" className="text-[9px] font-bold tracking-wide text-[#A88C74] hover:underline uppercase">
                  Lupa?
                </a>
              </div>
              <div className="relative">
                <input
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password"
                  disabled={isLoading}
                  className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl pl-4 pr-11 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20 text-[#0F0E0C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0F0E0C]/30 hover:text-[#0F0E0C]/60 transition-colors"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Tombol Akses Utama (Hitam Pekat Ganjil) */}
            <div className="pt-2">
              <button
                ref={submitButtonRef}
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0F0E0C] hover:bg-[#A88C74] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? 'Mengautentikasi...' : 'Masuk'}</span>
              </button>
            </div>
          </form>

          {/* Tautan Pendaftaran Sampingan */}
          <div className="mt-8 pt-6 border-t border-[#A88C74]/10 text-center">
            <p className="text-xs text-[#0F0E0C]/50 font-light">
              Belum memiliki akun terdaftar?{' '}
              <Link 
                to="/register" 
                className="text-[#A88C74] font-bold hover:underline tracking-wide uppercase text-[11px] ml-1"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>

        </div>
      </main>

      {/* Footer Legal Mikro */}
      <footer className="text-center py-6 text-[9px] tracking-[0.2em] uppercase text-[#0F0E0C]/30 relative z-10">
        &copy; 2026 Format Ganjil Architecture of Coffee.
      </footer>
    </div>
  );
}