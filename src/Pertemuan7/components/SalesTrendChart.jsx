import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * SalesTrendChart Component
 * Menampilkan grafik tren penjualan dengan animasi
 * Class Tailwind: bg-gradient-to-t, hover:shadow-lg, h-*, min-height
 */
export default function SalesTrendChart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlRange = searchParams.get('trend');
  const [range, setRange] = useState(() => {
    return ['daily', 'weekly', 'monthly'].includes(urlRange) ? urlRange : 'daily';
  });

  useEffect(() => {
    if (urlRange && urlRange !== range && ['daily', 'weekly', 'monthly'].includes(urlRange)) {
      setRange(urlRange);
    }
  }, [urlRange, range]);

  const updateRange = (key) => {
    setRange(key);
    setSearchParams({ trend: key }, { replace: true });
  };

  const chartData = {
    daily: [
      { label: 'Mon', value: 2400 },
      { label: 'Tue', value: 12000 },
      { label: 'Wed', value: 6500 },
      { label: 'Thu', value: 18000 },
      { label: 'Fri', value: 9500 },
      { label: 'Sat', value: 20500 },
      { label: 'Sun', value: 8300 }
    ],
    weekly: [
      { label: 'Week 1', value: 29000 },
      { label: 'Week 2', value: 72000 },
      { label: 'Week 3', value: 45000 },
      { label: 'Week 4', value: 93000 }
    ],
    monthly: [
      { label: 'Jan', value: 90000 },
      { label: 'Feb', value: 140000 },
      { label: 'Mar', value: 100000 },
      { label: 'Apr', value: 170000 },
      { label: 'May', value: 135000 },
      { label: 'Jun', value: 220000 }
    ]
  };

  const data = chartData[range];
  const minValue = Math.min(...data.map((item) => item.value));
  const maxValue = Math.max(...data.map((item) => item.value));
  const valueRange = maxValue - minValue || 1;
  const chartHeight = 180;
  const tickValues = [0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round(minValue + valueRange * ratio));
  const formatCurrency = (value) => {
    if (range === 'daily') return `Rp ${(value / 1000).toFixed(1)}K`;
    if (range === 'weekly') return `Rp ${(value / 1000).toFixed(0)}K`;
    return `Rp ${(value / 1000).toFixed(0)}K`;
  };
  const getBarHeight = (value) => {
    const rawHeight = ((value - minValue) / valueRange) * chartHeight;
    return Math.max(rawHeight, 28);
  };

  const tabs = [
    { key: 'daily', label: 'Harian' },
    { key: 'weekly', label: 'Mingguan' },
    { key: 'monthly', label: 'Bulanan' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900">📈 Tren Penjualan</h3>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => updateRange(tab.key)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                range === tab.key
                  ? 'bg-amber-100 text-amber-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 px-4 py-8 rounded bg-gradient-to-t from-amber-50 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-1/4 border-b border-amber-100" />
          ))}
        </div>

        <div className="relative flex items-end justify-around h-full gap-2">
          {data.map((item) => {
            const barHeight = getBarHeight(item.value);
            return (
              <div key={item.label} className="flex flex-col items-center flex-1 group">
                <div className="mb-2 text-[10px] text-amber-700 font-semibold text-center">
                  {formatCurrency(item.value)}
                </div>
                <div
                  className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t transition-all duration-500 ease-out hover:shadow-lg hover:from-amber-600 hover:to-amber-500 group-hover:scale-105 origin-bottom"
                  style={{
                    height: `${barHeight}px`,
                    minHeight: '28px'
                  }}
                >
                  <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity px-1 text-center">
                    <span className="text-white text-xs font-bold">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2 font-medium text-center">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between mt-6 text-sm text-gray-600 font-medium">
        {tickValues.map((tick) => (
          <span key={tick}>{formatCurrency(tick)}</span>
        ))}
      </div>
    </div>
  );
}
