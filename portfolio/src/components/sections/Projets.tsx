'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/ThemeContext';
import { projects, type ProjectType } from '@/data/projects';

const filters: { label: string; value: ProjectType; color: string }[] = [
  { label: 'Tous',      value: 'tous',      color: '#60a5fa' },
  { label: 'Epitech',   value: 'epitech',   color: '#34d399' },
  { label: 'Personnel', value: 'personnel', color: '#a78bfa' },
  { label: 'Exercice',  value: 'exercice',  color: '#fb923c' },
];

const typeColor: Record<ProjectType, string> = {
  tous:      '#60a5fa',
  epitech:   '#34d399',
  personnel: '#a78bfa',
  exercice:  '#fb923c',
};

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const { t }                 = useTranslation();
  const [hovered, setHovered] = useState(false);
  const color                 = typeColor[project.types[0]];

  return (
    <div
      className="flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background:   `${color}08`,
        borderColor:  `${color}30`,
      }}
      onMouseEnter={(e) => {
        setHovered(true);
        (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
        (e.currentTarget as HTMLElement).style.boxShadow   = `0 8px 32px ${color}20`;
        (e.currentTarget as HTMLElement).style.transform   = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
        (e.currentTarget as HTMLElement).style.boxShadow   = 'none';
        (e.currentTarget as HTMLElement).style.transform   = 'translateY(0)';
      }}
    >
      {/* Image */}
      <div
        className="relative w-full h-44 overflow-hidden"
        style={{
          background: project.imageStyle === 'contain'
            ? `linear-gradient(135deg, ${color}15, #0a0f1e)`
            : undefined,
        }}
      >
        {/* Image principale */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full transition-opacity duration-500"
          style={{
            objectFit:    project.imageStyle,
            objectPosition: 'center',
            padding:      project.imageStyle === 'contain' ? '16px' : '0',
            opacity:      project.hoverImage && hovered ? 0 : 1,
          }}
        />

        {/* Image hover (crossfade) */}
        {project.hoverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.hoverImage}
            alt={`${project.title} hover`}
            className="absolute inset-0 w-full h-full transition-opacity duration-500"
            style={{
              objectFit:      project.imageStyle,
              objectPosition: 'center',
              padding:        project.imageStyle === 'contain' ? '16px' : '0',
              opacity:        hovered ? 1 : 0,
            }}
          />
        )}

        {/* Badges type */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {project.types.map((t) => (
            <span
              key={t}
              className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full"
              style={{ background: `${typeColor[t]}25`, color: typeColor[t], border: `1px solid ${typeColor[t]}50` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-bold text-white text-base leading-tight">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed flex-1">
          {t(project.descKey)}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${color}15`, color, border: `1px solid ${color}35` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Lien */}
        {project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: `${color}15`,
              color,
              border:     `1px solid ${color}35`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${color}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${color}15`;
            }}
          >
            <i className={`bi ${project.link.startsWith('http') ? 'bi-github' : 'bi-eye'} text-base`} />
            {t('projets.seeProject')}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projets() {
  const { t }                     = useTranslation();
  const { colors }                = useTheme();
  const [active, setActive]       = useState<ProjectType>('tous');
  const [visible, setVisible]     = useState(true);
  const [displayed, setDisplayed] = useState(projects);
  const pendingRef                = useRef<ProjectType>('tous');

  const filters = [
    { value: 'tous'      as ProjectType, color: '#60a5fa', label: t('projets.filters.tous')      },
    { value: 'epitech'   as ProjectType, color: '#34d399', label: t('projets.filters.epitech')   },
    { value: 'personnel' as ProjectType, color: '#a78bfa', label: t('projets.filters.personnel') },
    { value: 'exercice'  as ProjectType, color: '#fb923c', label: t('projets.filters.exercice')  },
  ];

  function handleFilter(value: ProjectType) {
    if (value === active) return;
    pendingRef.current = value;
    setVisible(false);
  }

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => {
        const next = pendingRef.current;
        setDisplayed(next === 'tous' ? projects : projects.filter((p) => p.types.includes(next)));
        setActive(next);
        setVisible(true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  // Couleur dominante : premier type non-'tous' du premier projet affiché, sinon filtre actif
  const accentColor = typeColor[active];

  return (
    <section
      id="projects"
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
          {t('projets.subtitle')}
        </p>
        <h2 className="text-4xl font-bold text-white">
          {t('projets.title')}{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})` }}
          >
            {t('projets.titleAccent')}
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

      {/* Project grid */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {displayed.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          {t('projets.count', { count: displayed.length })}
        </p>
      </div>
    </section>
  );
}
