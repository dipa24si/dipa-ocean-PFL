import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from '../layouts/AuthLayout';
import { demoAPI } from '../services/api';

/**
 * Login Page dengan API Integration
 * Menggunakan Axios untuk login dan localStorage untuk token
 */
export default function LoginV2() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-fill demo credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem('demoEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Ganti dengan API real atau gunakan demoAPI untuk testing
      const response = await demoAPI.loginDemo(email, password);
      
      // Save token & user info
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('demoEmail', email);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@kafe.com');
    setPassword('demo123');
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-display text-espresso-900 mb-2">
          NgopiEuy Admin
        </h2>
        <p className="text-espresso-600">
          Masuk ke dashboard kafe Anda
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-800 text-sm font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-espresso-900 mb-2">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 w-5 h-5 text-espresso-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@kafe.com"
              disabled={loading}
              className="w-full pl-10 pr-4 py-2.5 border border-espresso-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-espresso-900 mb-2">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 w-5 h-5 text-espresso-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              className="w-full pl-10 pr-12 py-2.5 border border-espresso-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-espresso-400 hover:text-espresso-600"
            >
              {showPassword ? (
                <FiEyeOff className="w-5 h-5" />
              ) : (
                <FiEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-coffee-600 border-espresso-300 rounded focus:ring-coffee-500"
            />
            <span className="text-espresso-700">Ingat saya</span>
          </label>
          <a href="#" className="text-coffee-600 hover:text-coffee-700 font-medium">
            Lupa password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-coffee-600 to-brew-500 hover:from-coffee-700 hover:to-brew-600 disabled:from-espresso-400 disabled:to-espresso-400 text-white font-bold py-3 rounded-lg transition-all duration-200 ease-in-out transform hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Memproses...</span>
            </>
          ) : (
            'Masuk'
          )}
        </button>
      </form>

      {/* Demo Section */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs font-semibold text-blue-900 mb-3">🔐 Demo Kredensial:</p>
        <p className="text-xs text-blue-800 mb-2">Email: <code className="bg-blue-100 px-2 py-1 rounded">demo@kafe.com</code></p>
        <p className="text-xs text-blue-800 mb-3">Password: <code className="bg-blue-100 px-2 py-1 rounded">demo123</code></p>
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 py-2 rounded transition-colors disabled:opacity-50"
        >
          ⚡ Gunakan Demo Credentials
        </button>
      </div>

      {/* Footer Links */}
      <div className="text-center text-sm text-espresso-600 mt-6">
        Belum punya akun?{' '}
        <a href="#" className="text-coffee-600 hover:text-coffee-700 font-semibold">
          Hubungi admin
        </a>
      </div>
    </AuthLayout>
  );
}
