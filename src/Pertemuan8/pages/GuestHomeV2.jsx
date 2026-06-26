import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Gift, Megaphone, LogIn, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import DarkModeToggle from '../components/DarkModeToggle';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ContactForm from '../components/ContactForm';

/**
 * PRD V2 — Intermediate Landing Page
 * Fitur tambahan dari V1:
 * - Scroll Animations (Intersection Observer)
 * - Dark Mode Toggle (localStorage)
 * - Testimonial Carousel
 * - Contact Form with validation
 * - Halaman Menu (link)
 */

const promos = [
  { title: 'Happy Hour Kopi Susu', description: 'Diskon 25% untuk Kopi Susu setiap Senin-Jumat pukul 14.00-17.00.', tag: 'Member Deal' },
  { title: 'Bundling Pastry', description: 'Beli minuman signature, dapatkan potongan Rp 10.000 untuk butter croissant.', tag: 'Food Pairing' },
  { title: 'Stamp Reward', description: 'Kumpulkan 5 transaksi, transaksi berikutnya gratis upgrade ukuran.', tag: 'Loyalty' },
];

const featuredProducts = [
  { id: 1, name: 'Espresso Arabika', price: 25000, rating: 4.8, badge: 'Classic', desc: 'Ekstraksi ganda biji Arabika pilihan.' },
  { id: 2, name: 'Cappuccino Vegan', price: 28000, rating: 4.9, badge: 'Healthy', desc: 'Espresso blend dengan foam susu oat lembut.' },
  { id: 3, name: 'Iced Latte Vanilla', price: 32000, rating: 4.7, badge: 'Sweet', desc: 'Latte dingin dengan sirup vanilla organik.' },
  { id: 4, name: 'Cold Brew Nitro', price: 35000, rating: 4.9, badge: 'Signature', desc: 'Kopi seduh 16 jam dengan sensasi nitrogen creamy.' },
];

const faqs = [
  { q: 'Bagaimana cara bergabung menjadi member Format Ganjil?', a: 'Klik tombol Login di pojok kanan atas, lalu klik "Daftar Sekarang". Isi formulir dengan nama, email, dan kata sandi.' },
  { q: 'Bagaimana sistem perolehan poin bekerja?', a: 'Setiap transaksi memberi +10 hingga +20 poin dan 1 stempel digital. Kumpulkan 5 stempel untuk gratis upgrade ukuran.' },
  { q: 'Apa keuntungan eksklusif yang didapatkan member?', a: 'Member mendapat akses Menu Rahasia seperti Midnight Cold Brew atau Lavender Honey Latte.' },
  { q: 'Apakah fasilitas area kerja terbuka untuk umum?', a: 'Ya, area kerja kami dengan WiFi 148 Mbps terbuka untuk semua pengunjung.' },
];

export default function GuestHomeV2() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => setFavorites((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <div className="bg-amber-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-sans antialiased min-h-screen transition-colors duration-300">
      {/* Ticker */}
      <div className="bg-stone-900 dark:bg-amber-900 text-amber-200 dark:text-amber-100 text-[10px] font-bold tracking-[0.4em] py-3 text-center">
        ⚡ THE ODDITY SEDUHAN: KLAIM WELCOME TOKEN UNTUK VISITOR BARU
      </div>

      {/* Header dengan Dark Mode Toggle */}
      <ScrollReveal>
        <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-amber-700 dark:text-amber-400">Atelier of Coffee</p>
            <h1 className="text-2xl font-bold tracking-widest">FORMAT GANJIL</h1>
          </div>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 bg-stone-900 dark:bg-amber-700 hover:bg-amber-800 text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all active:scale-95"
            >
              <LogIn size={14} />
              Login
            </button>
          </div>
        </header>
      </ScrollReveal>

      <main className="max-w-7xl mx-auto px-6 pb-16 space-y-16">
        {/* Hero Section dengan animasi */}
        <ScrollReveal direction="up">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-8 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-amber-50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[300px]">
              <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="self-start inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <span className="tracking-wider text-amber-200/90">Ambient Access: Unregistered</span>
              </div>
              <div className="my-6 space-y-3 max-w-2xl relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Selamat Datang, Pengunjung</p>
                <h2 className="text-3xl md:text-4xl font-light leading-[1.2] tracking-wide">
                  Where Logic Fails, <br /><span className="italic text-amber-300 font-normal">Great Coffee Speaks.</span>
                </h2>
                <p className="text-amber-200/60 text-xs font-light leading-relaxed max-w-lg">
                  Kami memecah aturan ekstraksi tradisional untuk menciptakan rasa ganjil yang unik.
                </p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 hover:text-white transition-colors group/btn"
              >
                <span>Daftar Member Untuk Akses Penuh</span>
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-stone-800 rounded-[2rem] p-6 border border-amber-200 dark:border-stone-700 shadow-sm flex-1">
                <span className="text-[11px] font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">Digital Workspace</span>
                <h3 className="text-3xl font-light mt-2">148 <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">Mbps</span></h3>
                <p className="text-xs text-stone-400 mt-1">Koneksi serat optik di setiap sudut meja.</p>
              </div>
              <div className="bg-white dark:bg-stone-800 rounded-[2rem] p-6 border border-amber-200 dark:border-stone-700 shadow-sm flex-1">
                <span className="text-[11px] font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">Seat Density</span>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded ml-2">OPTIMAL</span>
                <h3 className="text-3xl font-light mt-2">42% <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">Occupied</span></h3>
                <p className="text-xs text-stone-400 mt-1">Suasana kondusif, area indoor & outdoor tersedia.</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Produk Pilihan */}
        <section className="space-y-6">
          <ScrollReveal>
            <div className="border-b border-amber-200 dark:border-stone-700 pb-4">
              <div className="flex items-center gap-2.5">
                <Coffee className="text-amber-700 dark:text-amber-400" size={18} />
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400">Sajian Seni Prestisius</p>
                  <h3 className="text-xl font-bold">Produk Pilihan Kami</h3>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 100} direction="up">
                <div className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full">
                        {product.badge}
                      </span>
                      <button onClick={() => toggleFavorite(product.id)} className={`text-sm transition-colors ${favorites.includes(product.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}>★</button>
                    </div>
                    <h4 className="text-lg font-bold group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors mb-1">{product.name}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light mb-4 min-h-[48px]">{product.desc}</p>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-amber-100 dark:border-stone-700">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                      <span className="text-xs text-stone-400">★ {product.rating}</span>
                    </div>
                    <button onClick={() => navigate('/login')} className="w-full bg-stone-900 dark:bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-xl text-[10px] tracking-wider uppercase font-medium transition-colors">
                      Login untuk Memesan
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center">
              <button
                onClick={() => navigate('/menu')}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-amber-700 dark:text-amber-400 hover:text-amber-800 transition-colors underline underline-offset-4"
              >
                Lihat Menu Lengkap <ArrowRight size={14} />
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* Testimonial Carousel (Fitur V2) */}
        <section>
          <ScrollReveal direction="left">
            <TestimonialCarousel />
          </ScrollReveal>
        </section>

        {/* Promo Campaign */}
        <section className="space-y-6">
          <ScrollReveal>
            <div className="border-b border-amber-200 dark:border-stone-700 pb-4">
              <div className="flex items-center gap-2.5">
                <Gift className="text-amber-700 dark:text-amber-400" size={18} />
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400">The Vanguard Experiences</p>
                  <h3 className="text-xl font-bold">Campaign Promo</h3>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {promos.map((promo, idx) => (
              <ScrollReveal key={promo.title} delay={idx * 100}>
                <div className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group hover:-translate-y-0.5">
                  <div className="absolute -right-4 -bottom-6 text-[100px] opacity-[0.02] font-bold select-none">0{idx + 1}</div>
                  <div className="space-y-4 relative z-10">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 px-2.5 py-0.5 rounded-full">
                      <Megaphone size={10} />
                      {promo.tag}
                    </span>
                    <h4 className="text-lg font-bold group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">{promo.title}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">{promo.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FAQ Accordion (ditingkatkan untuk V2) */}
        <section>
          <ScrollReveal direction="up">
            <div className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-6">
              <div className="flex items-center gap-2.5 border-b border-amber-200 dark:border-stone-700 pb-4">
                <HelpCircle className="text-amber-700 dark:text-amber-400" size={18} />
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400">Informasi Pendukung</p>
                  <h3 className="text-xl font-bold">Tanya Jawab Umum (FAQ)</h3>
                </div>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border-b border-amber-100 dark:border-stone-700 pb-4 last:border-0 last:pb-0">
                      <button type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex justify-between items-center text-left py-2 font-bold hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                        <span className="text-sm md:text-base pr-4">{faq.q}</span>
                        <span className="text-amber-700 dark:text-amber-400 flex-shrink-0">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
                      </button>
                      <div className={`text-xs md:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-light transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0 pointer-events-none'}`}>
                        {faq.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Contact Form (Fitur V2) */}
        <section>
          <ScrollReveal direction="right">
            <ContactForm />
          </ScrollReveal>
        </section>
      </main>

      <footer className="text-center py-8 text-[10px] tracking-[0.2em] uppercase text-stone-400 border-t border-amber-200 dark:border-stone-700 bg-white dark:bg-stone-800">
        &copy; 2026 Format Ganjil Architecture of Coffee. Built to Redefine the Norm.
      </footer>
    </div>
  );
}