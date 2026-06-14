import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { registerWithSupabase } from '../services/supabaseApi';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!form.name || !form.email || !form.password) {
      setError('Nama, email, dan password wajib diisi.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi password belum sama.');
      return;
    }

    setIsLoading(true);

    try {
      const user = await registerWithSupabase(form);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('user', JSON.stringify(user));
      setMessage('Pendaftaran berhasil. Kamu akan diarahkan ke halaman member.');
      setTimeout(() => navigate('/member'), 600);
    } catch (registrationError) {
      setError(registrationError.message || 'Pendaftaran gagal. Coba lagi sebentar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-xl border border-[#D4A574]/25 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#8B6F47] text-white flex items-center justify-center mx-auto mb-4">
            <UserPlus size={30} />
          </div>
          <h1 className="text-2xl font-black text-[#3E2C1C]">Daftar Member</h1>
          <p className="text-sm text-[#78675C] mt-2">Buat akun agar bisa melihat promo dan mengirim feedback.</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-bold">{error}</div>}
        {message && <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm font-bold">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#78675C] mb-2">Nama</label>
            <input
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className="w-full px-5 py-4 bg-[#FDF8F5] rounded-2xl border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
              placeholder="Nama lengkap"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#78675C] mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="w-full px-5 py-4 bg-[#FDF8F5] rounded-2xl border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#78675C] mb-2">No. HP</label>
              <input
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                className="w-full px-5 py-4 bg-[#FDF8F5] rounded-2xl border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
                placeholder="08?"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#78675C] mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                className="w-full px-5 py-4 bg-[#FDF8F5] rounded-2xl border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
                placeholder="Minimal 6 karakter"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#78675C] mb-2">Konfirmasi</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) => updateField('confirmPassword', event.target.value)}
                className="w-full px-5 py-4 bg-[#FDF8F5] rounded-2xl border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
                placeholder="Ulangi password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#3E2C1C] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black disabled:opacity-70"
          >
            {isLoading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>

        <p className="text-center text-sm text-[#78675C] mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-black text-[#3E2C1C] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
