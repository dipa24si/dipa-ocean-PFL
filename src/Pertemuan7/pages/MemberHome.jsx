import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, MessageSquare, Megaphone, Send, Star } from 'lucide-react';
import { logoutFromSupabase, submitFeedbackComplaint } from '../services/supabaseApi';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');

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
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <header className="bg-white border-b border-[#3E2C1C]/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B6F47]">Member Area</p>
            <h1 className="text-2xl font-black text-[#3E2C1C]">Format Ganjil</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-3 rounded-xl bg-[#3E2C1C] text-white text-sm font-bold hover:bg-black"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section className="bg-[#3E2C1C] text-white rounded-[2rem] p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-sm text-white/70 font-bold">Halo, {savedUser.name || 'Member'}</p>
              <h2 className="text-3xl font-black mt-2">Promo khusus dan kanal feedback kamu sudah siap.</h2>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4">
              <Star className="text-[#D4A574]" />
              <span className="font-black">Member Aktif</span>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-5">
            <Gift className="text-[#8B6F47]" />
            <h2 className="text-xl font-black text-[#3E2C1C]">Campaign Promo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {promos.map((promo) => (
              <article key={promo.title} className="bg-white rounded-2xl border border-[#D4A574]/20 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[#8B6F47] text-xs font-black uppercase tracking-widest mb-4">
                  <Megaphone size={16} />
                  {promo.tag}
                </div>
                <h3 className="font-black text-[#3E2C1C] text-lg mb-2">{promo.title}</h3>
                <p className="text-sm text-[#78675C] leading-6">{promo.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[2rem] border border-[#D4A574]/20 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-[#8B6F47]" />
            <h2 className="text-xl font-black text-[#3E2C1C]">Feedback dan Complain</h2>
          </div>

          {status && <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm font-bold">{status}</div>}
          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className="px-5 py-4 rounded-2xl bg-[#FDF8F5] border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
              placeholder="Nama"
            />
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              className="px-5 py-4 rounded-2xl bg-[#FDF8F5] border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
              placeholder="Email"
            />
            <select
              value={form.type}
              onChange={(event) => updateField('type', event.target.value)}
              className="px-5 py-4 rounded-2xl bg-[#FDF8F5] border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
            >
              <option value="feedback">Feedback</option>
              <option value="complaint">Complain</option>
            </select>
            <input
              value={form.subject}
              onChange={(event) => updateField('subject', event.target.value)}
              className="px-5 py-4 rounded-2xl bg-[#FDF8F5] border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
              placeholder="Subjek"
            />
            <textarea
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              className="md:col-span-2 px-5 py-4 rounded-2xl bg-[#FDF8F5] border border-[#D4A574]/20 outline-none focus:ring-2 focus:ring-[#8B6F47]"
              rows={5}
              placeholder="Tulis pesan kamu"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 inline-flex items-center justify-center gap-2 py-4 bg-[#3E2C1C] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black disabled:opacity-70"
            >
              <Send size={18} />
              {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
