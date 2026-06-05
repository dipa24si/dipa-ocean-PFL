import React, { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';

/**
 * Promo Banner Component
 * HOOKS YANG DIGUNAKAN:
 * - useState: isVisible, promoIndex, dismissedPromos
 * - useEffect: Auto-rotate promos, persist dismissed state
 */
export default function PromoBanner({ position = 'top', autoRotate = true }) {
  const [isVisible, setIsVisible] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);
  const [dismissedPromos, setDismissedPromos] = useState(() => {
    const saved = localStorage.getItem('dismissedPromos');
    return saved ? JSON.parse(saved) : [];
  });

  const promos = [
    {
      id: 'promo-1',
      title: '🎉 Promo Spesial 50% OFF',
      description: 'Semua minuman kopi hanya Rp15.000 hari ini!',
      color: 'from-red-500 to-orange-500',
      textColor: 'text-white',
      cta: 'Belanja Sekarang'
    },
    {
      id: 'promo-2',
      title: '☕ Bundle Happy Hour',
      description: 'Beli 2 Cappuccino + 1 Pastry hanya Rp65.000',
      color: 'from-amber-500 to-yellow-500',
      textColor: 'text-white',
      cta: 'Lihat Penawaran'
    },
    {
      id: 'promo-3',
      title: '💎 Member Loyalty +50%',
      description: 'Loyalitas points berlipat ganda untuk member baru!',
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-white',
      cta: 'Daftar Sekarang'
    }
  ];

  // useEffect: Auto-rotate promos
  useEffect(() => {
    if (!autoRotate || !isVisible) return;

    const timer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promos.length);
      console.log('[PromoBanner] Auto-rotating promo');
    }, 6000);

    return () => clearInterval(timer);
  }, [autoRotate, isVisible, promos.length]);

  // useEffect: Save dismissed promos ke localStorage
  useEffect(() => {
    localStorage.setItem('dismissedPromos', JSON.stringify(dismissedPromos));
    console.log('[PromoBanner] Dismissed promos saved:', dismissedPromos);
  }, [dismissedPromos]);

  const currentPromo = promos[promoIndex];

  const handleDismiss = (promoId) => {
    setDismissedPromos((prev) => [...prev, promoId]);
    
    // Jika semua promo di-dismiss, tampilkan promo berikutnya
    if (dismissedPromos.length + 1 >= promos.length) {
      setDismissedPromos([]);
      setPromoIndex(0);
    } else {
      setPromoIndex((prev) => (prev + 1) % promos.length);
    }

    console.log('[PromoBanner] Promo dismissed:', promoId);
  };

  if (!isVisible || dismissedPromos.includes(currentPromo.id)) {
    return null;
  }

  const positionClasses = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    inline: ''
  };

  return (
    <div className={`${positionClasses[position]} ${position !== 'inline' ? 'fixed z-30' : 'relative'}`}>
      <div className={`bg-gradient-to-r ${currentPromo.color} ${currentPromo.textColor} px-6 py-4 shadow-lg transition-all duration-500`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Promo Content */}
          <div className="flex-1 flex items-center gap-4">
            <Zap className="flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-lg">{currentPromo.title}</h3>
              <p className="text-sm opacity-90">{currentPromo.description}</p>
            </div>
          </div>

          {/* CTA & Close */}
          <div className="flex items-center gap-3 ml-4">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors whitespace-nowrap">
              {currentPromo.cta}
            </button>
            <button
              onClick={() => handleDismiss(currentPromo.id)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label="Tutup promo"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Promo Indicators */}
        <div className="flex gap-2 mt-3 max-w-7xl mx-auto">
          {promos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPromoIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === promoIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Promo ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Marketing Card Component - untuk display promo di dalam halaman
 */
export function MarketingCard({ promo }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-[#D4A574]/20 overflow-hidden hover:shadow-lg transition-all">
      {/* Promo Header */}
      <div className={`bg-gradient-to-r ${promo.bgColor} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 text-6xl opacity-20">
          {promo.icon || '🎉'}
        </div>
        <div className="relative z-10">
          <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
            {promo.badge || 'PROMO'}
          </span>
          <h3 className="text-2xl font-bold">{promo.title}</h3>
          <p className="text-white/90 mt-2">{promo.description}</p>
        </div>
      </div>

      {/* Promo Details */}
      <div className="p-6">
        {/* Discount Badge */}
        {promo.discount && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-700 font-bold text-lg">{promo.discount}</span>
          </div>
        )}

        {/* Terms & Conditions */}
        {promo.terms && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Syarat:</strong> {promo.terms}
            </p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-[#8B6F47] text-white py-3 rounded-lg hover:bg-[#6B5636] transition-colors font-bold">
            {promo.cta || 'Lihat Penawaran'}
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`px-4 py-3 rounded-lg transition-colors font-bold ${
              isLiked
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
