'use client';

import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/ThemeContext';

type Status = 'idle' | 'loading' | 'success' | 'error';

const socials = [
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/nicolas-law-shun-567068181/',
    icon:  'bi-linkedin',
    color: '#0a66c2',
  },
  {
    label: 'GitHub',
    href:  'https://github.com/Nicolas-974',
    icon:  'bi-github',
    color: '#e6edf3',
  },
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/dyuerisutox/',
    icon:  'bi-instagram',
    color: '#e1306c',
  },
  {
    label: 'FanFiction.net',
    href:  'https://www.fanfiction.net/u/15543706/',
    icon:  'bi-pen',
    color: '#fbbf24',
  },
];

export default function Contact() {
  const { t }                   = useTranslation();
  const { colors }              = useTheme();
  const [status, setStatus]     = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(
          json?.errors
            ? json.errors.map((err: { message: string }) => err.message).join(', ')
            : t('contact.form.error_generic')
        );
        setStatus('error');
      }
    } catch {
      setErrorMsg(t('contact.form.error_connection'));
      setStatus('error');
    }
  }

  const inputBase =
    'w-full rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all duration-200 border';
  const inputStyle = {
    background:  'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.1)',
  };

  return (
    <section
      id="contact"
      className="relative px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${colors.bgStart} 0%, ${colors.bgMid} 60%, ${colors.bgStart} 100%)` }}
    >
      {/* Glow décoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] rounded-full opacity-5 blur-[150px] pointer-events-none"
        style={{ background: colors.accent }}
      />

      {/* En-tête */}
      <div className="text-center mb-14 relative z-10">
        <p className="text-blue-400 font-medium tracking-widest text-sm uppercase mb-3">
          {t('contact.subtitle')}
        </p>
        <h2 className="text-4xl font-bold text-white">
          {t('contact.title')}{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #818cf8)' }}
          >
            {t('contact.titleAccent')}
          </span>
        </h2>
        <div
          className="w-16 h-1 mx-auto mt-4 rounded-full"
          style={{ background: 'linear-gradient(90deg, #60a5fa, #818cf8)' }}
        />
      </div>

      {/* Contenu 2 colonnes */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* ── Colonne gauche : infos + réseaux ── */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-3">{t('contact.tagline')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('contact.description')}
            </p>
          </div>

          {/* Infos rapides */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20">
                <i className="bi bi-geo-alt text-blue-400 text-sm" />
              </div>
              {t('contact.location')}
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20">
                <i className="bi bi-mortarboard text-blue-400 text-sm" />
              </div>
              {t('contact.school')}
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">{t('contact.findMe')}</p>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 group"
                  style={{
                    background:  `${s.color}08`,
                    borderColor: `${s.color}25`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background   = `${s.color}18`;
                    (e.currentTarget as HTMLElement).style.borderColor  = `${s.color}55`;
                    (e.currentTarget as HTMLElement).style.transform    = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background   = `${s.color}08`;
                    (e.currentTarget as HTMLElement).style.borderColor  = `${s.color}25`;
                    (e.currentTarget as HTMLElement).style.transform    = 'translateX(0)';
                  }}
                >
                  <i className={`bi ${s.icon} text-lg`} style={{ color: s.color }} />
                  <span className="text-sm font-semibold text-slate-300">{s.label}</span>
                  <i className="bi bi-arrow-right text-xs text-slate-600 ml-auto group-hover:text-slate-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Colonne droite : formulaire ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{
            background:  'rgba(255,255,255,0.02)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <form
            action="https://formspree.io/f/mojavqkn"
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('contact.form.lastname')}</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder={t('contact.form.lastnamePlaceholder')}
                  required
                  className={inputBase}
                  style={inputStyle}
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#60a5fa'; }}
                  onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('contact.form.firstname')}</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder={t('contact.form.firstnamePlaceholder')}
                  required
                  className={inputBase}
                  style={inputStyle}
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#60a5fa'; }}
                  onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('contact.form.email')}</label>
              <input
                type="email"
                name="email"
                placeholder={t('contact.form.emailPlaceholder')}
                required
                className={inputBase}
                style={inputStyle}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#60a5fa'; }}
                onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('contact.form.subject')}</label>
              <input
                type="text"
                name="subject"
                placeholder={t('contact.form.subjectPlaceholder')}
                required
                className={inputBase}
                style={inputStyle}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#60a5fa'; }}
                onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('contact.form.message')}</label>
              <textarea
                name="message"
                rows={5}
                placeholder={t('contact.form.messagePlaceholder')}
                required
                className={inputBase}
                style={inputStyle}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#60a5fa'; }}
                onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
            </div>

            {status === 'loading' && (
              <p className="text-blue-300 text-sm">{t('contact.form.sending_status')}</p>
            )}
            {status === 'success' && (
              <p className="text-green-400 text-sm">{t('contact.form.success')}</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1';   (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <i className="bi bi-send text-sm" />
              {status === 'loading' ? t('contact.form.sending') : t('contact.form.send')}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
