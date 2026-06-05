import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Login V2 Page - PERTEMUAN 12 HOOKS IMPLEMENTATION
 * HOOKS YANG DIGUNAKAN:
 * - useState: Email, password, showPassword, loading state
 * - useRef: Auto-focus email input, password input reference
 * - useEffect: Auto-focus on mount, handle enter key
 */
export default function LoginV2() {
  // useState untuk form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);

  // useRef untuk DOM references
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const submitButtonRef = useRef(null);

  const navigate = useNavigate();

  // useEffect 1: Auto-focus email input saat component mount
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
      console.log('[LoginV2.jsx] useEffect #1: Email input auto-focused via useRef');
    }

    return () => {
      console.log('[LoginV2.jsx] Cleanup: Component unmounting');
    };
  }, []);

  // useEffect 2: Handle keyboard shortcuts (Enter key)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (document.activeElement === passwordInputRef.current) {
          submitButtonRef.current?.click();
          console.log('[LoginV2.jsx] useEffect #2: Enter key pressed at password field');
        } else if (document.activeElement === emailInputRef.current && email) {
          passwordInputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [email]);

  // useEffect 3: Reset error message setelah 3 detik
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Simulasi API call
    setTimeout(() => {
      // LOGIN SIMULASI
      if (email === 'admin@mail.com' && password === 'admin123') {
        console.log('[LoginV2.jsx] Login successful - storing user data');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        setLoginAttempts(prev => prev + 1);
        setErrorMessage('❌ Email atau password salah. Demo: admin@mail.com | admin123');
        setIsLoading(false);
        
        // Reset form
        emailInputRef.current?.focus();
        
        console.log(`[LoginV2.jsx] Login failed - attempt #${loginAttempts + 1}`);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] via-[#F5EFEB] to-[#E8DDD0] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#D4A574]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#8B6F47]/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-10 border border-[#D4A574]/30 text-center relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#8B6F47] to-[#6B5636] rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-lg shadow-[#8B6F47]/30 mb-4">
            ☕
          </div>
          <h2 className="text-2xl font-black text-[#3E2C1C] uppercase tracking-tight">Format Ganjil</h2>
          <p className="text-[#78675C] text-sm font-medium mt-2">Masuk untuk kelola tokomu</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-medium animate-in">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5 text-left">
          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#78675C] mb-2 ml-1">
              📧 Email Address
            </label>
            <input 
              ref={emailInputRef}
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-[#FDF8F5] border-2 border-[#D4A574]/20 rounded-2xl outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent text-[#3E2C1C] font-bold transition-all" 
              placeholder="admin@mail.com"
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#78675C] mb-2 ml-1">
              🔐 Password
            </label>
            <div className="relative">
              <input 
                ref={passwordInputRef}
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-[#FDF8F5] border-2 border-[#D4A574]/20 rounded-2xl outline-none focus:ring-2 focus:ring-[#8B6F47] focus:border-transparent text-[#3E2C1C] font-bold transition-all pr-12" 
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-[#78675C] hover:text-[#3E2C1C]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            ref={submitButtonRef}
            type="submit" 
            disabled={isLoading}
            className={`w-full py-5 bg-gradient-to-r from-[#8B6F47] to-[#6B5636] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-[#8B6F47]/30 hover:shadow-lg transition-all active:scale-95 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#6B5636] hover:to-[#5A4A2B]'
            }`}
          >
            {isLoading ? '⏳ Loading...' : 'Login'}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-4 text-center text-[#78675C] text-xs bg-[#FDF8F5] p-3 rounded-lg">
          <p className="font-bold mb-1">Demo Credentials:</p>
          <p>📧 admin@mail.com</p>
          <p>🔐 admin123</p>
        </div>
      </div>
    </div>
  );
}
