import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchMatches } from '@/lib/fetchMatches';
import { fetchNews } from '@/lib/fetchNews';
import { TEAMS } from '@/lib/data';
import MatchCard from '@/components/MatchCard/MatchCard';
import NewsCard from '@/components/NewsCard/NewsCard';
import Countdown from '@/components/Countdown/Countdown';
import styles from './page.module.css';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Mondial 2026 — Coupe du Monde FIFA | Résultats, Calendrier & Actualités',
  description:
    'Suivez la Coupe du Monde 2026 en direct : scores en temps réel, calendrier complet, classements et toutes les actualités du Mondial FIFA 2026 (USA, Canada, Mexique).',
};

const TOURNAMENT_START = '2026-06-11T21:00:00-05:00';
const TOURNAMENT_END = '2026-07-19T21:00:00-05:00';

export default async function HomePage() {
  const [matchData, news] = await Promise.all([
    fetchMatches(),
    fetchNews(6),
  ]);

  const { upcoming, finished, live, season } = matchData;
  const nextMatches = upcoming.slice(0, 6);
  const recentResults = finished.slice(0, 4);
  const showing2022 = season === 2022;

  // Stats du tournoi
  const totalTeams = 48;
  const totalMatches = 104;
  const groupsCount = 12;

  return (
    <div className={`page ${styles.home}`}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span>🏆</span>
            <span>FIFA World Cup™ 2026</span>
          </div>

          <h1 className={styles.heroTitle}>
            La Coupe du Monde<br />
            <span className="text-gold">2026</span> est en marche
          </h1>

          <p className={styles.heroSubtitle}>
            Résultats en temps réel · Calendrier complet · Actualités fraîches<br />
            48 équipes · USA · Canada · Mexique
          </p>

          {/* Countdown */}
          <Countdown targetDate={TOURNAMENT_START} />

          <div className={styles.heroActions}>
            <Link href="/calendrier" className="btn btn-primary" id="hero-cta-calendar">
              📅 Voir le Calendrier
            </Link>
            <Link href="/resultats" className="btn btn-ghost" id="hero-cta-results">
              ⚽ Résultats
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BANDEAU SAISON 2022 ===== */}
      {showing2022 && (
        <div className={styles.seasonBanner}>
          <div className="container">
            <span>📅</span>
            <span>
              Données de la <strong>Coupe du Monde 2022</strong> affichées — 
              Le plan gratuit API-Football débloquera automatiquement les matchs 2026 dès le début du tournoi (11 juin 2026).
            </span>
          </div>
        </div>
      )}

      {/* ===== STATS ===== */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { value: totalTeams, label: 'Équipes', icon: '🌍' },
              { value: totalMatches, label: 'Matchs', icon: '⚽' },
              { value: groupsCount, label: 'Groupes', icon: '📊' },
              { value: 16, label: 'Stades', icon: '🏟️' },
              { value: 3, label: 'Pays hôtes', icon: '🌎' },
              { value: 39, label: 'Jours', icon: '📅' },
            ].map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIVE MATCHES ===== */}
      {live.length > 0 && (
        <section className={`section ${styles.liveSection}`}>
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <span className="badge badge-live" style={{ marginRight: '0.75rem', verticalAlign: 'middle' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-red)', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
                    LIVE
                  </span>
                  Matchs en cours
                </h2>
              </div>
            </div>
            <div className={styles.matchGrid}>
              {live.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== PROCHAINS MATCHS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Prochains Matchs</h2>
              <div className="section-line" />
            </div>
            <Link href="/calendrier" className="btn btn-ghost" id="home-more-matches">
              Tout voir →
            </Link>
          </div>
          {nextMatches.length > 0 ? (
            <div className={styles.matchGrid}>
              {nextMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span>📅</span>
              <p>Aucun match à venir pour le moment</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== RÉSULTATS RÉCENTS ===== */}
      {recentResults.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">Résultats Récents</h2>
                <div className="section-line" />
              </div>
              <Link href="/resultats" className="btn btn-ghost" id="home-more-results">
                Tout voir →
              </Link>
            </div>
            <div className={styles.matchGrid}>
              {recentResults.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ACTUALITÉS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Dernières Actualités</h2>
              <div className="section-line" />
            </div>
            <Link href="/actualites" className="btn btn-ghost" id="home-more-news">
              Tout voir →
            </Link>
          </div>
          <div className={styles.newsGrid}>
            {news.map((article, i) => (
              <NewsCard key={article.id} article={article} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ÉQUIPES À SUIVRE ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Équipes Favorites</h2>
              <div className="section-line" />
            </div>
            <Link href="/equipes" className="btn btn-ghost" id="home-more-teams">
              Les 48 équipes →
            </Link>
          </div>
          <div className={styles.teamsScroll}>
            {TEAMS.filter(t => [1, 2, 4, 5, 6, 7, 9, 10, 14, 15, 17].includes(t.ranking || 99)).slice(0, 10).map(team => (
              <Link key={team.id} href={`/equipes#${team.id}`} className={styles.teamChip}>
                <span className={styles.chipFlag}>{team.flag}</span>
                <span className={styles.chipName}>{team.name}</span>
                {team.ranking && <span className={styles.chipRank}>#{team.ranking}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>Ne ratez aucun match !</h2>
            <p className={styles.ctaText}>
              Toute l&apos;actualité de la Coupe du Monde 2026 mise à jour en temps réel.
              Résultats, buts, classements — tout est ici.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/calendrier" className="btn btn-primary" id="cta-calendar">
                📅 Calendrier Complet
              </Link>
              <Link href="/equipes" className="btn btn-ghost" id="cta-teams">
                🌍 Explorer les équipes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
