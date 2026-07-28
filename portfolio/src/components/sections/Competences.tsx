'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/ThemeContext';
import { technologies, type Category } from '@/data/technologies';

const filterValues: { value: Category | 'tous'; color: string }[] = [
  { value: 'tous',      color: '#60a5fa' },
  { value: 'front-end', color: '#34d399' },
  { value: 'back-end',  color: '#f472b6' },
  { value: 'framework', color: '#fb923c' },
  { value: 'outil',     color: '#a78bfa' },
];

const categoryColor: Record<Category | 'tous', string> = {
  'tous':      '#60a5fa',
  'front-end': '#34d399',
  'back-end':  '#f472b6',
  'framework': '#fb923c',
  'outil':     '#a78bfa',
};

const MOBILE_BREAKPOINT = 640; // Tailwind `sm`
const MOBILE_PER_PAGE   = 12;
const DESKTOP_PER_PAGE  = 15;

export default function Competences() {
  const { t }                     = useTranslation();
  const { colors }                = useTheme();
  const [active, setActive]       = useState<Category | 'tous'>('tous');
  const [visible, setVisible]     = useState(true);
  const [displayed, setDisplayed] = useState<typeof technologies>(technologies);
  const [page, setPage]           = useState(1);
  const [perPage, setPerPage]     = useState(DESKTOP_PER_PAGE);
  const pendingRef                = useRef<Category | 'tous'>('tous');

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setPerPage(mq.matches ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  const filters = filterValues.map((f) => ({
    ...f,
    label: t(`competences.filters.${f.value === 'tous' ? 'tous' : f.value === 'front-end' ? 'frontend' : f.value === 'back-end' ? 'backend' : f.value === 'outil' ? 'outils' : 'frameworks'}`),
  }));

  const accentColor = categoryColor[active];

  function handleFilter(value: Category | 'tous') {
    if (value === active) return;
    pendingRef.current = value;
    setVisible(false);
  }

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => {
        const next = pendingRef.current;
        setDisplayed(
          next === 'tous'
            ? technologies
            : technologies.filter((t) => t.categories.includes(next as Category))
        );
        setActive(next);
        setPage(1);
        setVisible(true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  const totalPages = Math.ceil(displayed.length / perPage);
  const paginated   = displayed.slice((page - 1) * perPage, page * perPage);

  return (
    <section
      id="competences"
      className="relative px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${colors.bgStart} 0%, ${colors.bgMid} 60%, ${colors.bgStart} 100%)` }}
    >
      {/* Glow décoratif */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full opacity-5 blur-[150px] pointer-events-none"
        style={{ background: accentColor, transition: 'background 0.4s ease' }}
      />

      {/* En-tête */}
      <div className="text-center mb-12 relative z-10">
        <p className="font-medium tracking-widest text-sm uppercase mb-3" style={{ color: colors.accent }}>
          {t('competences.subtitle')}
        </p>
        <h2 className="text-4xl font-bold text-white">
          {t('competences.title')}{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
          >
            {t('competences.titleAccent')}
          </span>
        </h2>
        <div className="w-16 h-1 mx-auto mt-4 rounded-full"
          style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
        />
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilter(f.value)}
            className="px-5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer"
            style={
              active === f.value
                ? { background: f.color, color: '#0a0f1e', borderColor: f.color, boxShadow: `0 0 16px ${f.color}60` }
                : { background: 'transparent', color: f.color, borderColor: `${f.color}50` }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tech grid */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {paginated.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 cursor-default"
              style={{
                background:  `${accentColor}08`,
                borderColor: `${accentColor}25`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}60`;
                (e.currentTarget as HTMLElement).style.background   = `${accentColor}15`;
                (e.currentTarget as HTMLElement).style.boxShadow    = `0 4px 20px ${accentColor}20`;
                (e.currentTarget as HTMLElement).style.transform     = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}25`;
                (e.currentTarget as HTMLElement).style.background   = `${accentColor}08`;
                (e.currentTarget as HTMLElement).style.boxShadow    = 'none';
                (e.currentTarget as HTMLElement).style.transform     = 'translateY(0)';
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.logo}
                alt={tech.name}
                className={`w-12 h-12 object-contain ${tech.name === 'GitHub' ? 'invert' : ''}`}
              />
              <p className="text-xs font-semibold text-slate-300 text-center leading-tight">
                {tech.name}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-full border text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              style={{ borderColor: `${accentColor}50`, color: accentColor }}
              aria-label={t('competences.pagination.prev')}
            >
              <i className="bi bi-chevron-left" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="w-9 h-9 flex items-center justify-center rounded-full border text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={
                  page === n
                    ? { background: accentColor, color: '#0a0f1e', borderColor: accentColor, boxShadow: `0 0 16px ${accentColor}60` }
                    : { background: 'transparent', color: accentColor, borderColor: `${accentColor}50` }
                }
                aria-current={page === n ? 'page' : undefined}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-full border text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              style={{ borderColor: `${accentColor}50`, color: accentColor }}
              aria-label={t('competences.pagination.next')}
            >
              <i className="bi bi-chevron-right" />
            </button>
          </div>
        )}

        {/* Compteur */}
        <p className="text-center text-slate-500 text-xs mt-6">
          {displayed.length} technologie{displayed.length > 1 ? 's' : ''}
        </p>
      </div>
    </section>
  );
}
