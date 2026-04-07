'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/ThemeContext';

const sectionIds = ['presentation', 'parcours', 'competences', 'projects', 'loisirs', 'contact'];

export default function Sidebar() {
  const { t }               = useTranslation();
  const { colors }          = useTheme();
  const [active, setActive] = useState('presentation');

  const links = [
    { href: '#presentation', icon: 'bi-house',        label: t('sidebar.home')        },
    { href: '#parcours',     icon: 'bi-award',         label: t('sidebar.parcours')    },
    { href: '#competences',  icon: 'bi-code-slash',    label: t('sidebar.competences') },
    { href: '#projects',     icon: 'bi-pc-display',    label: t('sidebar.projets')     },
    { href: '#loisirs',      icon: 'bi-stars',         label: t('sidebar.loisirs')     },
    { href: '#contact',      icon: 'bi-people',        label: t('sidebar.contact')     },
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Bootstrap Icons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />

      {/* Desktop sidebar */}
      <nav
        className="fixed top-0 left-0 bottom-0 w-[180px] flex flex-col pt-6 pb-8 z-50 max-md:hidden"
        style={{
          background:  `linear-gradient(180deg, ${colors.sidebarBgStart} 0%, ${colors.sidebarBgEnd} 100%)`,
          borderRight: `1px solid ${colors.accent}15`,
        }}
      >
        {/* Logo */}
        <a href="#presentation" className="flex justify-center mb-10 group">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `${colors.accent}12`,
              border:     `1px solid ${colors.accent}30`,
              boxShadow:  active === 'presentation' ? `0 0 20px ${colors.accent}40` : 'none',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/letter_p.png" alt="Portfolio" className="w-8 h-8 object-contain" />
          </div>
        </a>

        {/* Nav links */}
        <ul className="flex flex-col gap-1 px-3 flex-1">
          {links.map((link) => {
            const id       = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
                  style={{
                    background:  isActive ? `${colors.accent}18`  : 'transparent',
                    color:       isActive ? colors.accent           : '#64748b',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = `${colors.accent}08`;
                      (e.currentTarget as HTMLElement).style.color      = '#94a3b8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color      = '#64748b';
                    }
                  }}
                >
                  {/* Barre active */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                      style={{ background: colors.accent, boxShadow: `0 0 8px ${colors.accent}` }}
                    />
                  )}
                  <i className={`bi ${link.icon} text-base`} />
                  <span className="text-xs font-medium">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Version tag */}
        <p className="text-center text-[10px] text-slate-700 mt-4">Next.js · Tailwind</p>
      </nav>

      {/* Mobile bottom bar */}
      <nav
        className="fixed bottom-0 left-0 w-full h-[60px] flex items-center justify-around z-50 md:hidden"
        style={{
          background:  `linear-gradient(90deg, ${colors.sidebarBgStart}, ${colors.sidebarBgEnd})`,
          borderTop:   `1px solid ${colors.accent}15`,
        }}
      >
        {links.map((link) => {
          const id       = link.href.replace('#', '');
          const isActive = active === id;
          return (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-0.5 transition-all duration-200"
              style={{ color: isActive ? colors.accent : '#475569' }}
            >
              <i className={`bi ${link.icon} text-xl`} />
              {isActive && (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: colors.accent }}
                />
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
}
