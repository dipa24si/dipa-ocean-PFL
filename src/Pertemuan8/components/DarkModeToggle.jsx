import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * DarkModeToggle — Toggle dark mode dengan persistensi localStorage
 * Fitur PRD V2: Dark Mode
 */
export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}