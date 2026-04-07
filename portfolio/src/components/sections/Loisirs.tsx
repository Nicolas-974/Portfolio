'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/ThemeContext';

const hobbies = [
  { labelKey: 'loisirs.hobbies.anime',   src: '/img/manga.jpg',   icon: 'bi-stars',             color: '#a78bfa' },
  { labelKey: 'loisirs.hobbies.gaming',  src: '/img/gaming.jpg',  icon: 'bi-controller',        color: '#60a5fa' },
  { labelKey: 'loisirs.hobbies.film',    src: '/img/movie.jpg',   icon: 'bi-camera-reels',      color: '#fb923c' },
  { labelKey: 'loisirs.hobbies.musique', src: '/img/music.jpg',   icon: 'bi-music-note-beamed', color: '#34d399' },
  { labelKey: 'loisirs.hobbies.lecture', src: '/img/lecture.jpg', icon: 'bi-book-half',         color: '#f472b6' },
];

const writing = {
  labelKey:    'loisirs.hobbies.ecriture',
  descKey:     'loisirs.writing.description',
  seeKey:      'loisirs.writing.seeProfile',
  src:         '/img/061824-Fanfiction-FB-Blog.png',
  icon:        'bi-pen',
  color:       '#fbbf24',
  link:        'https://www.fanfiction.net/u/15543706/',
};

function HobbyCard({ hobby }: { hobby: typeof hobbies[0] }) {
  const { t } = useTranslation();
  return (
    <div
      className="group overflow-hidden rounded-2xl border transition-all duration-300 cursor-default"
      style={{ borderColor: `${hobby.color}30`, background: `${hobby.color}08` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${hobby.color}60`;
        (e.currentTarget as HTMLElement).style.boxShadow   = `0 8px 32px ${hobby.color}25`;
        (e.currentTarget as HTMLElement).style.transform   = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${hobby.color}30`;
        (e.currentTarget as HTMLElement).style.boxShadow   = 'none';
        (e.currentTarget as HTMLElement).style.transform   = 'translateY(0)';
      }}
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hobby.src}
          alt={hobby.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      {/* Label */}
      <div className="flex items-center justify-center gap-2 py-3 px-2">
        <i className={`bi ${hobby.icon}`} style={{ color: hobby.color }} />
        <span className="text-sm font-semibold text-slate-200">{t(hobby.labelKey)}</span>
      </div>
    </div>
  );
}

function WritingCard() {
  const { t }                                     = useTranslation();
  const { labelKey, descKey, seeKey, src, icon, color, link } = writing;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border transition-all duration-300"
      style={{ borderColor: `${color}30`, background: `${color}08` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
        (e.currentTarget as HTMLElement).style.boxShadow   = `0 8px 32px ${color}25`;
        (e.currentTarget as HTMLElement).style.transform   = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
        (e.currentTarget as HTMLElement).style.boxShadow   = 'none';
        (e.currentTarget as HTMLElement).style.transform   = 'translateY(0)';
      }}
    >
      {/* Image */}
      <div
        className="sm:w-72 sm:shrink-0 h-48 sm:h-auto overflow-hidden flex items-center justify-center p-4"
        style={{ background: `linear-gradient(135deg, ${color}15, #0a0f1e)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={t(labelKey)}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-col justify-center gap-3 p-6 flex-1">
        <div className="flex items-center gap-2">
          <i className={`bi ${icon} text-lg`} style={{ color }} />
          <span className="font-bold text-white text-lg">{t(labelKey)}</span>
          <span
            className="ml-auto text-[11px] font-semibold px-3 py-0.5 rounded-full"
            style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
          >
            FanFiction.net
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed">{t(descKey)}</p>

        <div
          className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{ background: `${color}15`, color, border: `1px solid ${color}35` }}
        >
          <i className="bi bi-box-arrow-up-right text-sm" />
          {t(seeKey)}
        </div>
      </div>
    </a>
  );
}

function ImageSlider() {
  const { t }      = useTranslation();
  const { colors } = useTheme();
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const handleRef   = useRef<HTMLDivElement>(null);
  const isDragging  = useRef(false);
  const [position, setPosition] = useState(0); // % de la largeur (0 = photo seule visible)

  const move = useCallback((clientX: number) => {
    if (!isDragging.current || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x    = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct  = (x / rect.width) * 100;
    setPosition(pct);
  }, []);

  useEffect(() => {
    const onUp        = () => { isDragging.current = false; };
    const onMouseMove = (e: MouseEvent) => move(e.clientX);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('touchend',   onUp);
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('touchmove',  onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('touchend',   onUp);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('touchmove',  onTouchMove);
    };
  }, [move]);

  return (
    <div className="mt-12 relative z-10">
      {/* Titre */}
      <div className="text-center mb-6">
        <p className="font-medium tracking-widest text-sm uppercase mb-1" style={{ color: colors.accent }}>
          {t('loisirs.slider.subtitle')}
        </p>
        <h3 className="text-xl font-bold text-white">
          {t('loisirs.slider.title')}{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
          >
            {t('loisirs.slider.titleAccent')}
          </span>
        </h3>
        <p className="text-slate-500 text-xs mt-2">{t('loisirs.slider.hint')}</p>
      </div>

      <div className="max-w-[600px] mx-auto">
        <div
          ref={wrapperRef}
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl select-none cursor-ew-resize"
          style={{ aspectRatio: '4/3' }}
          onMouseDown={() => { isDragging.current = true; }}
          onTouchStart={() => { isDragging.current = true; }}
        >
          {/* Image réelle (fond) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/DSC07233.jpg"
            alt="Photo originale"
            className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
          />

          {/* Image IA (overlay clipé à gauche) */}
          <div
            ref={overlayRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${position}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/00064-3653781684.png"
              alt="Version IA"
              className="absolute inset-0 h-full object-cover object-top"
              style={{ width: wrapperRef.current?.offsetWidth ?? '100%' }}
            />
          </div>

          {/* Handle */}
          <div
            ref={handleRef}
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            {/* Ligne verticale */}
            <div className="absolute inset-0 w-[2px] mx-auto bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            {/* Rond central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-9 h-9 rounded-full bg-white shadow-lg
                            flex items-center justify-center gap-0.5">
              <i className="bi bi-chevron-left text-[10px] text-slate-700" />
              <i className="bi bi-chevron-right text-[10px] text-slate-700" />
            </div>
          </div>

          {/* Labels */}
          <span className="absolute top-3 left-3 text-xs font-bold text-white bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            {t('loisirs.slider.labelAI')}
          </span>
          <span className="absolute top-3 right-3 text-xs font-bold text-white bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            {t('loisirs.slider.labelPhoto')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Loisirs() {
  const { t }      = useTranslation();
  const { colors } = useTheme();

  return (
    <section
      id="loisirs"
      className="relative px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${colors.bgStart} 0%, ${colors.bgMid} 60%, ${colors.bgStart} 100%)` }}
    >
      {/* Glow décoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] rounded-full opacity-5 blur-[150px] pointer-events-none"
        style={{ background: colors.accent }}
      />

      {/* En-tête */}
      <div className="text-center mb-12 relative z-10">
        <p className="font-medium tracking-widest text-sm uppercase mb-3" style={{ color: colors.accent }}>
          {t('loisirs.subtitle')}
        </p>
        <h2 className="text-4xl font-bold text-white">
          {t('loisirs.title')}{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
          >
            {t('loisirs.titleAccent')}
          </span>
        </h2>
        <div className="w-16 h-1 mx-auto mt-4 rounded-full"
          style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
        />
      </div>

      {/* Hobbies grid */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {hobbies.map((h) => (
            <HobbyCard key={h.labelKey} hobby={h} />
          ))}
        </div>

        {/* Carte Écriture — rectangle pleine largeur */}
        <WritingCard />
      </div>

      {/* Slider IA */}
      <ImageSlider />
    </section>
  );
}
