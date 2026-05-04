export type Category = 'tous' | 'front-end' | 'back-end' | 'framework' | 'outil';

export interface Technology {
  name: string;
  logo: string;
  categories: Category[];
}

export const technologies: Technology[] = [
  { name: 'HTML5',      logo: '/img/HTML5_logo_and_wordmark.svg',    categories: ['front-end'] },
  { name: 'CSS3',       logo: '/img/CSS3_logo_and_wordmark.svg',     categories: ['front-end'] },
  { name: 'JavaScript', logo: '/img/JavaScript-logo.png',            categories: ['front-end'] },
  { name: 'Bootstrap',  logo: '/img/Bootstrap_logo.svg',             categories: ['front-end', 'framework'] },
  { name: 'React',      logo: '/img/React-icon.svg',                 categories: ['front-end', 'framework'] },
  { name: 'PHP',        logo: '/img/PHP-logo.svg',                   categories: ['back-end'] },
  { name: 'SQL',        logo: '/img/Sql_data_base_with_logo.svg',    categories: ['back-end'] },
  { name: 'Python',     logo: '/img/Python-logo-notext.svg',         categories: ['back-end'] },
  { name: 'Java',       logo: '/img/Java_Logo.svg',                  categories: ['back-end'] },
  { name: 'Node.js',    logo: '/img/Node.js_logo.svg',               categories: ['back-end', 'framework'] },
  { name: 'Next.js',    logo: '/img/nextjs-original.svg',            categories: ['framework'] },
  { name: 'i18next',    logo: '/img/inext_logo_icon_170002.svg',     categories: ['framework'] },
  { name: 'Linux',      logo: '/img/Tux.svg',                        categories: ['outil'] },
  { name: 'GitHub',     logo: '/img/Octicons-mark-github.svg',       categories: ['outil'] },
  { name: 'Docker',     logo: '/img/docker-svgrepo-com.svg',         categories: ['outil'] },
];
