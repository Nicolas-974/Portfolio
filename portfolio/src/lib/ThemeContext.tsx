'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeName = 'blue' | 'purple' | 'teal';

export interface ThemeColors {
  accent:          string;
  accent2:         string;
  bgStart:         string;
  bgMid:           string;
  sidebarBgStart:  string;
  sidebarBgEnd:    string;
}

export const THEMES: Record<ThemeName, ThemeColors> = {
  blue: {
    accent:         '#60a5fa',
    accent2:        '#818cf8',
    bgStart:        '#0a0f1e',
    bgMid:          '#0d1b3e',
    sidebarBgStart: '#060c1a',
    sidebarBgEnd:   '#0a1628',
  },
  purple: {
    accent:         '#a78bfa',
    accent2:        '#c084fc',
    bgStart:        '#0f0a1e',
    bgMid:          '#1e0d3e',
    sidebarBgStart: '#0c0614',
    sidebarBgEnd:   '#160a28',
  },
  teal: {
    accent:         '#2dd4bf',
    accent2:        '#34d399',
    bgStart:        '#0a1e1c',
    bgMid:          '#0d3330',
    sidebarBgStart: '#061412',
    sidebarBgEnd:   '#0a201e',
  },
};

interface ThemeCtx {
  theme:    ThemeName;
  colors:   ThemeColors;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme:    'blue',
  colors:   THEMES.blue,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('blue');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as ThemeName | null;
    if (saved && saved in THEMES) setThemeState(saved);
  }, []);

  function setTheme(t: ThemeName) {
    setThemeState(t);
    localStorage.setItem('portfolio-theme', t);
    if (t === 'blue') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', t);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, colors: THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
