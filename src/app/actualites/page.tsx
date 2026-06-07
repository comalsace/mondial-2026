import type { Metadata } from 'next';
import { fetchNews } from '@/lib/fetchNews';
import NewsCard from '@/components/NewsCard/NewsCard';
import styles from './page.module.css';

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
  title: 'Actualités Coupe du Monde 2026 — Dernières Nouvelles Football',
  description:
    'Toutes les actualités de la Coupe du Monde FIFA 2026. Suivez les dernières nouvelles, analyses, interviews et résumés des matchs du Mondial 2026.',
  openGraph: {
    title: 'Actualités Mondial 2026',
    description: 'Dernières nouvelles et actualités de la Coupe du Monde 2026',
  },
};

export default async function ActualitesPage() {
  const articles = await fetchNews(24);

  const categories = ['Tout', 'France', 'Argentine', 'Brésil', 'Maroc', 'Organisation', 'Résultats'];

  return (
    <div className="page">
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>📰 Actualités</h1>
          <p className={styles.subtitle}>
            Toutes les dernières nouvelles de la Coupe du Monde FIFA 2026<br />
            Mises à jour depuis L&apos;Équipe, BBC Sport, RFI et bien plus
          </p>

          <div className={styles.categoryFilters}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}
                id={`news-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.sources}>
            <span className={styles.sourceLabel}>Sources :</span>
            {["L'Équipe", "BBC Sport", "RFI Sport", "Goal.com"].map(src => (
              <span key={src} className={styles.sourceChip}>{src}</span>
            ))}
            <span className={styles.refreshNote}>🔄 Actualisé toutes les 5 minutes</span>
          </div>

          {articles.length === 0 ? (
            <div className={styles.empty}>
              <span>📰</span>
              <h2>Chargement des actualités...</h2>
              <p>Les flux RSS sont en cours de récupération. Réessayez dans quelques instants.</p>
            </div>
          ) : (
            <div className={styles.articlesGrid}>
              {articles.map((article, i) => (
                <NewsCard key={article.id} article={article} featured={i === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO content */}
      <section className={styles.seoContent}>
        <div className="container">
          <h2>Suivez toute l&apos;actualité de la Coupe du Monde 2026</h2>
          <p>
            Notre site agrège les meilleures sources d&apos;information sportive pour vous donner
            accès aux dernières nouvelles de la Coupe du Monde FIFA 2026. Résultats des matchs,
            analyses tactiques, interviews d&apos;entraîneurs et de joueurs, statistiques et bien
            plus encore.
          </p>
        </div>
      </section>
    </div>
  );
}
