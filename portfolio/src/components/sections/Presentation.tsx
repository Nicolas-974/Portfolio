'use client';

import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/ThemeContext';

export default function Presentation() {
  const { t }      = useTranslation();
  const { colors } = useTheme();

  return (
    <section
      id="presentation"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 py-20"
      style={{
        background: `linear-gradient(135deg, ${colors.bgStart} 0%, ${colors.bgMid} 50%, ${colors.bgStart} 100%)`,
      }}
    >
      {/* Background grid subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${colors.accent} 1px, transparent 1px), linear-gradient(90deg, ${colors.accent} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow blob top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: colors.accent }}
      />
      {/* Glow blob bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: colors.accent2 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-16 max-w-5xl w-full mx-auto">

        {/* ── Left : Photo ── */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">

          {/* Photo + rings */}
          <div className="relative">
            {/* Outer animated ring */}
            <div
              className="absolute inset-0 rounded-full border-2 animate-ping"
              style={{ borderColor: `${colors.accent}60`, animationDuration: '3s' }}
            />
            {/* Static ring */}
            <div
              className="absolute -inset-2 rounded-full border"
              style={{ borderColor: `${colors.accent}30` }}
            />

            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/DSC07233.jpg"
              alt="Nicolas Law-Shun"
              className="w-52 h-52 object-cover object-top rounded-full border-4"
              style={{
                borderColor: `${colors.accent}80`,
                boxShadow:   `0 0 40px ${colors.accent}50`,
              }}
            />

            {/* Online dot */}
            <span
              className="absolute bottom-3 right-3 w-4 h-4 bg-green-400 rounded-full border-2"
              style={{ borderColor: colors.bgStart }}
            />
          </div>

          {/* Badges */}
          <div className="flex flex-col items-center gap-1.5 mt-2">
            <div className="flex gap-2">
              {['Epitech', 'Master of Science', 'Développeur Web'].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 text-xs font-semibold rounded-full"
                  style={{
                    background:  `${colors.accent}18`,
                    border:      `1px solid ${colors.accent}35`,
                    color:       colors.accent,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                background:  `${colors.accent}18`,
                border:      `1px solid ${colors.accent}35`,
                color:       colors.accent,
              }}
            >
              Développeur Fullstack
            </span>
          </div>
        </div>

        {/* ── Right : Text ── */}
        <div className="flex flex-col gap-6 text-center md:text-left">

          {/* Greeting */}
          <p className="font-medium tracking-widest text-sm uppercase" style={{ color: colors.accent }}>
            {t('presentation.greeting')}
          </p>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Nicolas{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
            >
              LAW-SHUN
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-base leading-relaxed max-w-xl"
            dangerouslySetInnerHTML={{ __html: t('presentation.description1') }}
          />
          <p className="text-slate-300 text-base leading-relaxed max-w-xl">
            {t('presentation.description2')}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="/doc/CV_Nicolas_LAW-SHUN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full font-semibold text-base text-white transition-all hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent2})`,
                padding:    '14px 36px',
                minWidth:   '220px',
                justifyContent: 'center',
                boxShadow:  `0 4px 20px ${colors.accent}40`,
              }}
            >
              <i className="bi bi-person-vcard-fill text-lg" />
              {t('presentation.downloadCV')}
            </a>
            <a
              href="#contact"
              className="flex items-center gap-3 rounded-full font-semibold text-base transition-all"
              style={{
                padding:     '14px 36px',
                minWidth:    '200px',
                justifyContent: 'center',
                color:       colors.accent,
                border:      `1px solid ${colors.accent}50`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background   = `${colors.accent}15`;
                (e.currentTarget as HTMLElement).style.borderColor  = colors.accent;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background   = 'transparent';
                (e.currentTarget as HTMLElement).style.borderColor  = `${colors.accent}50`;
              }}
            >
              {t('presentation.contactMe')}
              <i className="bi bi-arrow-right text-lg" />
            </a>
          </div>

          {/* Social quick links */}
          <div className="flex gap-4 justify-center md:justify-start mt-2">
            {[
              { href: 'https://www.linkedin.com/in/nicolas-law-shun-567068181/', icon: 'bi-linkedin' },
              { href: 'https://github.com/Nicolas-974',                           icon: 'bi-github'   },
              { href: 'https://www.instagram.com/dyuerisutox/',                  icon: 'bi-instagram' },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
                style={{
                  background:  'rgba(255,255,255,0.05)',
                  border:      '1px solid rgba(255,255,255,0.1)',
                  color:       '#94a3b8',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color       = colors.accent;
                  (e.currentTarget as HTMLElement).style.borderColor = `${colors.accent}50`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color       = '#94a3b8';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <i className={`bi ${s.icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce">
        <span>{t('presentation.scroll')}</span>
        <i className="bi bi-chevron-down" />
      </div>
    </section>
  );
}
