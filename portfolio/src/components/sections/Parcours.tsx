'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/ThemeContext';

const timeline = [
  { year: '2025', title: 'Epitech',                  descKey: 'parcours.entries.epitech.description',  icon: 'bi-mortarboard-fill', color: '#a78bfa' },
  { year: '2021', title: 'AFPAR',                    descKey: 'parcours.entries.afpar2021.description', icon: 'bi-code-slash',       color: '#60a5fa' },
  { year: '2019', title: 'AFPAR',                    descKey: 'parcours.entries.afpar2019.description', icon: 'bi-laptop',           color: '#818cf8' },
  { year: '2019', title: 'Simplon Réunion',          descKey: 'parcours.entries.simplon.description',   icon: 'bi-patch-check',      color: '#34d399' },
  { year: '2016', title: 'Université de la Réunion', descKey: 'parcours.entries.univ2016.description',  icon: 'bi-mortarboard',      color: '#f472b6' },
  { year: '2015', title: 'Université de la Réunion', descKey: 'parcours.entries.univ2015.description',  icon: 'bi-mortarboard',      color: '#fb923c' },
  { year: '2014', title: 'Lycée Mahatma Gandhi',     descKey: 'parcours.entries.lycee.description',     icon: 'bi-book',             color: '#facc15' },
];

type Entry = typeof timeline[0];

function TimelineItem({ item, index }: { item: Entry; index: number }) {
  const { t }   = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateX(30px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = '1';
          el.style.transform = 'translateX(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLast = index === timeline.length - 1;

  return (
    <div className="relative flex gap-6 md:gap-10">
      <div className="flex flex-col items-center">
        <div
          className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center
                     justify-center text-[11px] md:text-xs font-bold text-white z-10"
          style={{
            border:     `2px solid ${item.color}`,
            background: `${item.color}18`,
            boxShadow:  `0 0 20px ${item.color}40`,
          }}
        >
          <i className={`bi ${item.icon} text-base md:text-lg mb-0.5`} style={{ color: item.color }} />
          {item.year}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2"
            style={{ background: `linear-gradient(180deg, ${item.color}60, transparent)` }}
          />
        )}
      </div>

      <div ref={cardRef} className="flex-1 mb-10 md:mb-14 pb-2"
        style={{ transition: 'opacity 0.6s ease, transform 0.6s ease' }}
      >
        <div
          className="rounded-2xl p-5 md:p-6 border transition-all duration-300 hover:shadow-lg cursor-default"
          style={{
            background:  `linear-gradient(135deg, ${item.color}10, transparent)`,
            borderColor: `${item.color}35`,
            boxShadow:   `0 4px 24px ${item.color}10`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = `${item.color}70`;
            (e.currentTarget as HTMLElement).style.boxShadow   = `0 8px 32px ${item.color}25`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = `${item.color}35`;
            (e.currentTarget as HTMLElement).style.boxShadow   = `0 4px 24px ${item.color}10`;
          }}
        >
          <span
            className="inline-block text-xs font-semibold px-3 py-0.5 rounded-full mb-3"
            style={{ background: `${item.color}20`, color: item.color }}
          >
            {item.year}
          </span>
          <h3 className="text-white font-bold text-base md:text-lg mb-1">{item.title}</h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {t(item.descKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Parcours() {
  const { t }      = useTranslation();
  const { colors } = useTheme();

  return (
    <section
      id="parcours"
      className="relative px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${colors.bgStart} 0%, ${colors.bgMid} 60%, ${colors.bgStart} 100%)` }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] rounded-full opacity-5 blur-[150px] pointer-events-none"
        style={{ background: colors.accent }}
      />

      <div className="text-center mb-16 relative z-10">
        <p className="font-medium tracking-widest text-sm uppercase mb-3" style={{ color: colors.accent }}>
          {t('parcours.subtitle')}
        </p>
        <h2 className="text-4xl font-bold text-white">
          {t('parcours.title')}{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
          >
            {t('parcours.titleAccent')}
          </span>
        </h2>
        <div className="w-16 h-1 mx-auto mt-4 rounded-full"
          style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {timeline.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
