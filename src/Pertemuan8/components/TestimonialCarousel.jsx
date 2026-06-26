import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

/**
 * TestimonialCarousel — Slider testimonial pelanggan dengan auto-slide
 * Fitur PRD V2: Testimonial Section
 */
const testimonials = [
  {
    id: 1,
    name: 'Sarah Wijaya',
    role: 'Regular Customer',
    avatar: 'SW',
    text: 'Suasananya benar-benar beda! Cold Brew Nitro-nya jadi favorit saya. Tempatnya nyaman buat kerja, WiFi kenceng banget.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dimas Prasetyo',
    role: 'Member sejak 2025',
    avatar: 'DP',
    text: 'Program stamp reward-nya worth it banget. Udah 3 kali gratis upgrade ukuran. Kopinya konsisten enak!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Rina Amalia',
    role: 'Digital Nomad',
    avatar: 'RA',
    text: 'Tempat favorit buat WFH. Colokan listrik banyak, WiFi 148 Mbps, dan kopi enak. What else do you need?',
    rating: 5,
  },
  {
    id: 4,
    name: 'Budi Hartono',
    role: 'Coffee Enthusiast',
    avatar: 'BH',
    text: 'Espresso Arabikanya juara! Barista-nya ramah dan tahu banget soal kopi. Recommended banget!',
    rating: 4,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-2xl p-6 md:p-8 relative">
      <div className="flex items-center gap-2 mb-4">
        <Quote size={20} className="text-amber-600" />
        <p className="text-[10px] font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">Testimonial</p>
      </div>

      <div className="min-h-[140px] flex flex-col justify-center">
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300 dark:text-stone-600'}
            />
          ))}
        </div>
        <p className="text-sm md:text-base text-stone-700 dark:text-stone-300 italic leading-relaxed mb-4">
          "{t.text}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-sm font-bold text-amber-800 dark:text-amber-200">
            {t.avatar}
          </div>
          <div>
            <p className="text-sm font-bold text-stone-900 dark:text-white">{t.name}</p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 tracking-wider uppercase">{t.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-amber-100 dark:border-stone-700">
        <div className="flex gap-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-amber-700 dark:bg-amber-400 w-5' : 'bg-stone-300 dark:bg-stone-600'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="p-1.5 rounded-full bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors">
            <ChevronLeft size={14} className="text-stone-600 dark:text-stone-400" />
          </button>
          <button onClick={next} className="p-1.5 rounded-full bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors">
            <ChevronRight size={14} className="text-stone-600 dark:text-stone-400" />
          </button>
        </div>
      </div>
    </div>
  );
}