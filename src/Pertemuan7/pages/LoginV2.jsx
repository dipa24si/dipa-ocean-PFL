import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] via-[#F5EFEB] to-[#E8DDD0] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-[2rem] shadow-2xl p-8 border border-[#D4A574]/30">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#3E2C1C] rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg mb-4">
            <LogIn size={30} />
          </div>
          <h2 className="text-2xl font-black text-[#3E2C1C] uppercase tracking-tight">Format Ganjil</h2>
          <p className="text-[#78675C] text-sm font-medium mt-2">Masuk dengan akun Supabase</p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#78675C] mb-2 ml-1">
              Email
            </label>
            <input
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-5 py-4 bg-[#FDF8F5] border-2 border-[#D4A574]/20 rounded-2xl outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent text-[#3E2C1C] font-bold transition-all"
              placeholder="nama@email.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#78675C] mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordInputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-5 py-4 bg-[#FDF8F5] border-2 border-[#D4A574]/20 rounded-2xl outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent text-[#3E2C1C] font-bold transition-all pr-12"
                placeholder="Masukkan password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-4 text-[#78675C] hover:text-[#3E2C1C]"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            ref={submitButtonRef}
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#3E2C1C] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-black transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-[#78675C] mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="font-black text-[#3E2C1C] hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
