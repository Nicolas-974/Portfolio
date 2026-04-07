import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Sidebar      from '@/components/Sidebar';
import I18nProvider from '@/components/I18nProvider';
import Widget       from '@/components/Widget';
import { ThemeProvider } from '@/lib/ThemeContext';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nicolas Law-Shun | Développeur Web',
  description: 'Portfolio de Nicolas Law-Shun, développeur web junior inscrit à Epitech.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={openSans.className}>
      <body className="min-h-screen">
        <I18nProvider>
          <ThemeProvider>
            <Sidebar />
            <Widget />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
