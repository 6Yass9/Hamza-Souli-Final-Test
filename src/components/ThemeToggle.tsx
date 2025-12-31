import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

const applyThemeToDocument = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
};

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) || null;
    const initial: Theme = saved === 'dark' || saved === 'light' ? saved : 'light';
    setTheme(initial);
    applyThemeToDocument(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyThemeToDocument(next);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      className={
        className ||
        'inline-flex items-center gap-2 text-xs uppercase tracking-widest px-3 py-2 rounded border border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-colors'
      }
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden md:inline">{isDark ? 'Clair' : 'Sombre'}</span>
    </button>
  );
};
