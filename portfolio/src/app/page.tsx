'use client';

import { useTranslation } from 'react-i18next';
import Presentation  from '@/components/sections/Presentation';
import Parcours      from '@/components/sections/Parcours';
import Competences   from '@/components/sections/Competences';
import Projets       from '@/components/sections/Projets';
import Loisirs       from '@/components/sections/Loisirs';
import Contact       from '@/components/sections/Contact';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <main className="ml-[180px] max-md:ml-0 max-md:mb-[60px]">
        <Presentation />
        <Parcours />
        <Competences />
        <Projets />
        <Loisirs />
        <Contact />

        <footer className="bg-[#0d1b2a] text-white text-center py-4 text-sm">
          {t('footer')}
        </footer>
      </main>
    </>
  );
}
