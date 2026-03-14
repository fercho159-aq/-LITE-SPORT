import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ÉLITE SPORT | Eventos Deportivos Premium',
  description:
    'Organizador de eventos deportivos de alto rendimiento en México. Maratones, triatlones, ciclismo, natación y crossfit para atletas profesionales.',
  keywords: ['eventos deportivos', 'maratón', 'triatlón', 'ciclismo', 'crossfit', 'México', 'atletas'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${bebasNeue.variable} ${dmSans.variable} font-body antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
