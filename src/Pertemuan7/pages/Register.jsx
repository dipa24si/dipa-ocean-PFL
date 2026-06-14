import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F4F1EA] text-[#0F0E0C] font-sans antialiased flex flex-col justify-between relative overflow-hidden selection:bg-[#A88C74] selection:text-white">
      
      {/* Seni Dekoratif Latar Belakang (Soft Blob Blur) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#A88C74]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0F0E0C]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Navigasi Atas */}
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

      {/* Container Utama Form Register */}
      <main className="flex-1 flex items-center justify-center px-6 relative z-10 my-8">
        <div className="w-full max-w-lg bg-white border border-[#A88C74]/15 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/[0.03] transition-all hover:shadow-black/[0.05]">
          
          {/* Identitas Pendaftaran / Header Card */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#0F0E0C] flex items-center justify-center mb-4 shadow-xl shadow-black/10 text-[#EAD3B3]">
              <UserPlus size={22} />
            </div>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#A88C74] mb-1">ENROLLMENT INTERFACE</p>
            <h2 className="text-2xl font-bold tracking-wider text-[#0F0E0C] font-display uppercase">DAFTAR MEMBER</h2>
            <p className="text-xs text-[#0F0E0C]/50 font-light mt-1.5">Bergabung dengan ekosistem digital ganjil</p>
          </div>

          {/* Notifikasi Responsif */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-800 text-xs font-medium tracking-wide">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-5 p-3.5 rounded-xl bg-green-50 border border-green-100 text-green-800 text-xs font-medium tracking-wide">
              {message}
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60 block pl-1">
                Identitas Nama
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Nama lengkap Anda"
                disabled={isLoading}
                className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20 text-[#0F0E0C]"
              />
            </div>

            {/* Baris Grid 1: Email & No HP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60 block pl-1">
                  Alamat Korespondensi
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="nama@email.com"
                  disabled={isLoading}
                  className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20 text-[#0F0E0C]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60 block pl-1">
                  Kontak (No. HP)
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  placeholder="0812xxxxxxxx"
                  disabled={isLoading}
                  className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20 text-[#0F0E0C]"
                />
              </div>
            </div>

            {/* Baris Grid 2: Password & Konfirmasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60 block pl-1">
                  Kunci Sandi
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => updateField('password', event.target.value)}
                  placeholder="Minimal 6 karakter"
                  disabled={isLoading}
                  className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20 text-[#0F0E0C]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[#0F0E0C]/60 block pl-1">
                  Konfirmasi Sandi
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) => updateField('confirmPassword', event.target.value)}
                  placeholder="Ulangi sandi"
                  disabled={isLoading}
                  className="w-full bg-[#F4F1EA]/40 border border-[#A88C74]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F0E0C] focus:bg-white transition-all placeholder:text-[#0F0E0C]/20 text-[#0F0E0C]"
                />
              </div>
            </div>

            {/* Tombol Eksekusi Submit */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0F0E0C] hover:bg-[#A88C74] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? 'Memproses Enkripsi...' : 'Daftarkan Akun'}</span>
              </button>
            </div>
          </form>

          {/* Pengalih Balik ke Login */}
          <div className="mt-8 pt-6 border-t border-[#A88C74]/10 text-center">
            <p className="text-xs text-[#0F0E0C]/50 font-light">
              Sudah memiliki akun terdaftar?{' '}
              <Link 
                to="/login" 
                className="text-[#A88C74] font-bold hover:underline tracking-wide uppercase text-[11px] ml-1"
              >
                Masuk Sesi (Login)
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