import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * ContactForm — Form kontak dengan validasi
 * Fitur PRD V2: Contact Form
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nama harus diisi';
    if (!form.email.trim()) errs.email = 'Email harus diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email tidak valid';
    if (!form.message.trim()) errs.message = 'Pesan harus diisi';
    else if (form.message.trim().length < 10) errs.message = 'Pesan minimal 10 karakter';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-white dark:bg-stone-800 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-400'
        : 'border-amber-200 dark:border-stone-600 focus:ring-amber-500'
    } focus:outline-none focus:ring-2 text-stone-900 dark:text-stone-100`;

  return (
    <div className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-2xl p-6 md:p-8">
      <p className="text-[10px] font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-1">Ada Pertanyaan?</p>
      <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Hubungi Kami</h3>

      {submitted ? (
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 p-4 rounded-xl">
          <CheckCircle size={20} />
          <div>
            <p className="font-bold text-sm">Pesan Terkirim!</p>
            <p className="text-xs">Tim kami akan menghubungi Anda dalam 1x24 jam.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 tracking-wider uppercase mb-1 block">Nama</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={inputClass('name')}
              placeholder="Masukkan nama Anda"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 tracking-wider uppercase mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputClass('email')}
              placeholder="contoh@email.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 tracking-wider uppercase mb-1 block">Pesan</label>
            <textarea
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={inputClass('message')}
              rows={3}
              placeholder="Tulis pesan Anda di sini..."
            />
            {errors.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-stone-900 dark:bg-amber-700 hover:bg-amber-800 text-white py-2.5 rounded-xl text-xs font-bold tracking-wider transition-colors"
          >
            <Send size={14} />
            Kirim Pesan
          </button>
        </form>
      )}
    </div>
  );
}