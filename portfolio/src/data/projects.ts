export type ProjectType = 'tous' | 'epitech' | 'personnel' | 'exercice';

export interface Project {
  title: string;
  descKey: string;
  image: string;
  hoverImage?: string;
  imageStyle: 'cover' | 'contain';
  tags: string[];
  types: ProjectType[];
  link: string;
}

export const projects: Project[] = [
  {
    title: '2D GAME',
    descKey: 'projets.items.2dgame',
    image: '/img/logo.png',
    imageStyle: 'contain',
    tags: ['Java'],
    types: ['epitech'],
    link: 'https://github.com/Nicolas-974/JavaGame_YuGiOh',
  },
  {
    title: 'Job Board',
    descKey: 'projets.items.jobboard',
    image: '/img/job_board.jpg',
    imageStyle: 'cover',
    tags: ['PHP', 'SQL', 'HTML', 'CSS'],
    types: ['epitech'],
    link: 'https://github.com/Nicolas-974/Job_Board',
  },
  {
    title: 'Fate Genesis',
    descKey: 'projets.items.fategenesis',
    image: '/img/Fate_stay_night_UBW_Logo.png',
    hoverImage: '/img/File_Sonic The Hedge.png',
    imageStyle: 'contain',
    tags: ['HTML', 'CSS', 'JavaScript', 'i18next', 'JSON'],
    types: ['personnel'],
    link: 'https://nicolas-974.github.io/Fate_Genesis/',
  },
  {
    title: 'Hangman',
    descKey: 'projets.items.hangman',
    image: '/img/hangman.png',
    imageStyle: 'contain',
    tags: ['Python'],
    types: ['epitech', 'exercice'],
    link: 'https://github.com/Nicolas-974/Hangman',
  },
  {
    title: 'Verset du Jour',
    descKey: 'projets.items.versetdujour',
    image: '/img/icon.png',
    imageStyle: 'contain',
    tags: ['HTML', 'CSS', 'JavaScript', 'JSON'],
    types: ['personnel'],
    link: 'https://nicolas-974.github.io/verset-mystere/',
  },
  {
    title: 'Exercice HTML/CSS',
    descKey: 'projets.items.exercicehtml',
    image: '/img/visuel_kh.PNG',
    imageStyle: 'cover',
    tags: ['HTML', 'CSS'],
    types: ['exercice'],
    link: '/exercice-html-css/Exercice4.html',
  },
  {
    title: 'App Météo',
    descKey: 'projets.items.appmeteo',
    image: '/img/qQa5Pd7-weather-wallpapers.jpg',
    imageStyle: 'cover',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    types: ['exercice'],
    link: '/app-meteo/test3.html',
  },
  {
    title: 'PGM02',
    descKey: 'projets.items.pgm02',
    image: '/img/visuelPgm.PNG',
    imageStyle: 'cover',
    tags: ['JavaScript'],
    types: ['exercice'],
    link: '/pgm02/PGM02_v3.html',
  },
];
