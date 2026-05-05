import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginV2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // LOGIN SIMULASI
    if (email === 'admin@mail.com' && password === 'admin123') {
      // Kita simpan status login di browser
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      
      // Arahkan ke dashboard
      navigate('/dashboard');
    } else {
      alert('Email: admin@mail.com | Pass: admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-coffee-100 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-coffee-900 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-lg shadow-coffee-900/20">
            ☕
          </div>
          <h2 className="text-2xl font-black text-coffee-900 mt-6 uppercase tracking-tight">BrewMaster</h2>
          <p className="text-espresso-400 text-sm font-medium">Masuk untuk kelola tokomu</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-espresso-400 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-coffee-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200 text-coffee-900 font-bold transition-all" 
              placeholder="admin@mail.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-espresso-400 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-coffee-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200 text-coffee-900 font-bold transition-all" 
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-5 bg-coffee-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-coffee-900/30 hover:bg-black transition-all active:scale-95"
          >
            Login Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}