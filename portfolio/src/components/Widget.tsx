'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import { useTheme, THEMES } from '@/lib/ThemeContext';

const themeOptions = [
  { value: 'blue'   as const, bg: 'linear-gradient(135deg, #0a0f1e, #0d1b3e)' },
  { value: 'purple' as const, bg: 'linear-gradient(135deg, #0f0a1e, #1e0d3e)' },
  { value: 'teal'   as const, bg: 'linear-gradient(135deg, #0a1e1c, #0d3330)' },
];

export default function Widget() {
  const { t }                       = useTranslation();
  const { theme, setTheme, colors } = useTheme();
  const [open, setOpen]             = useState(false);
  const [lang, setLang]             = useState(i18n.language?.startsWith('en') ? 'en' : 'fr');
  const panelRef                    = useRef<HTMLDivElement>(null);

  // Fermer si clic hors panneau
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  function toggleLang() {
    const next = lang === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
    setLang(next);
  }

  const accent = colors.accent;

  return (
    <div
      ref={panelRef}
      className="fixed top-4 right-4 z-[100] flex items-start gap-2"
    >
      {/* Panneau */}
      <div
        className="flex flex-col gap-3 p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 origin-top-right"
        style={{
          background:   'rgba(10, 15, 30, 0.85)',
          borderColor:  `${accent}30`,
          boxShadow:    `0 8px 32px rgba(0,0,0,0.4)`,
          opacity:      open ? 1 : 0,
          transform:    open ? 'scale(1) translateX(0)' : 'scale(0.9) translateX(10px)',
          pointerEvents: open ? 'auto' : 'none',
          minWidth:     '160px',
        }}
      >
        {/* Thèmes */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
            {t('widget.theme')}
          </p>
          <div className="flex gap-2">
            {themeOptions.map((th) => {
              const thAccent = THEMES[th.value].accent;
              return (
                <button
                  key={th.value}
                  onClick={() => setTheme(th.value)}
                  title={t(`widget.theme_${th.value}`)}
                  className="w-10 h-10 rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden"
                  style={{
                    background:  th.bg,
                    borderColor: theme === th.value ? thAccent : 'rgba(255,255,255,0.1)',
                    boxShadow:   theme === th.value ? `0 0 12px ${thAccent}60` : 'none',
                  }}
                >
                  <div className="w-full h-full flex items-end justify-center pb-1">
                    <div className="w-5 h-1.5 rounded-full" style={{ background: thAccent }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Séparateur */}
        <div className="h-px" style={{ background: `${accent}20` }} />

        {/* Langue */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
            {t('widget.language')}
          </p>
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl border text-sm font-bold transition-all duration-200 cursor-pointer"
            style={{
              background:  `${accent}10`,
              borderColor: `${accent}35`,
              color:        accent,
            }}
          >
            <i className="bi bi-globe text-sm" />
            {lang === 'fr' ? 'FR → EN' : 'EN → FR'}
          </button>
        </div>
      </div>

      {/* Bouton toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-bold transition-all duration-200 cursor-pointer backdrop-blur-md"
        style={{
          background:  'rgba(10,15,30,0.85)',
          borderColor: `${accent}40`,
          color:        accent,
          boxShadow:   open ? `0 0 16px ${accent}40` : 'none',
        }}
      >
        {open ? '»' : '«'}
      </button>
    </div>
  );
}
