import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PromoPopup from '@/components/PromoPopup/PromoPopup';

export const metadata: Metadata = {
  metadataBase: new URL('https://mondial2026.fr'),
  title: {
    default: 'Mondial 2026 — Coupe du Monde FIFA | Résultats, Calendrier & Actualités',
    template: '%s | Mondial 2026',
  },
  description:
    'Suivez la Coupe du Monde FIFA 2026 en direct : résultats des matchs, calendrier complet, classement des groupes, actualités et statistiques. USA, Canada, Mexique.',
  keywords: [
    'Coupe du Monde 2026',
    'World Cup 2026',
    'FIFA 2026',
    'Mondial 2026',
    'résultats foot 2026',
    'calendrier Coupe du Monde',
    'scores en direct',
    'football international',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mondial2026.fr',
    siteName: 'Mondial 2026',
    title: 'Mondial 2026 — Coupe du Monde FIFA | Résultats & Actualités',
    description:
      'Tout sur la Coupe du Monde 2026 : résultats en temps réel, calendrier des matchs, classements et actualités.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mondial 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mondial 2026 — Coupe du Monde FIFA',
    description: 'Résultats, calendrier et actualités de la Coupe du Monde 2026',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://mondial2026.fr',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#060912" />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mondial 2026',
              url: 'https://mondial2026.fr',
              description: 'Site d\'information sur la Coupe du Monde FIFA 2026',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://mondial2026.fr/actualites?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <PromoPopup />
        <Footer />
      </body>
    </html>
  );
}
