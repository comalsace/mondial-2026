import type { Metadata } from 'next';
import { fetchMatches } from '@/lib/fetchMatches';
import MatchCard from '@/components/MatchCard/MatchCard';
import styles from './page.module.css';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Résultats en Direct — Coupe du Monde 2026',
  description:
    'Scores et résultats en temps réel de la Coupe du Monde FIFA 2026. Suivez tous les matchs du Mondial 2026 avec les buts et statistiques.',
};

export default async function ResultatsPage() {
  const { upcoming, live, finished } = await fetchMatches();
  const recentFinished = [...finished].reverse();

  return (
    <div className="page">
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>⚽ Résultats & Scores</h1>
          <p className={styles.subtitle}>
            Résultats en temps réel de la Coupe du Monde FIFA 2026
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Live Matches */}
        {live.length > 0 && (
          <section className={styles.block}>
            <div className={styles.blockHeader}>
              <span className="badge badge-live">
                <span className={styles.liveDot} />
                EN DIRECT
              </span>
              <h2 className={styles.blockTitle}>Matchs en cours</h2>
            </div>
            <div className={styles.matchGrid}>
              {live.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* No live matches state */}
        {live.length === 0 && (
          <div className={styles.noLive}>
            <div className={styles.noLiveDot} />
            <p>Aucun match en cours pour le moment</p>
            {upcoming.length > 0 && (
              <p className={styles.nextMatch}>
                Prochain match :{' '}
                <strong>{upcoming[0].homeTeam.flag} {upcoming[0].homeTeam.name} vs {upcoming[0].awayTeam.name} {upcoming[0].awayTeam.flag}</strong>
              </p>
            )}
          </div>
        )}

        {/* Finished Matches */}
        {recentFinished.length > 0 ? (
          <section className={styles.block}>
            <div className={styles.blockHeader}>
              <span className="badge badge-finished">Terminés</span>
              <h2 className={styles.blockTitle}>Résultats récents</h2>
            </div>
            <div className={styles.matchGrid}>
              {recentFinished.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        ) : (
          <section className={styles.block}>
            <div className={styles.blockHeader}>
              <span className="badge badge-finished">Résultats</span>
              <h2 className={styles.blockTitle}>Résultats</h2>
            </div>
            <div className={styles.emptyResults}>
              <span>🏟️</span>
              <h3>Pas encore de résultats</h3>
              <p>Le tournoi démarre le 11 juin 2026. Revenez après le premier match !</p>
            </div>
          </section>
        )}

        {/* Top Scorers placeholder */}
        <section className={styles.block}>
          <div className={styles.blockHeader}>
            <h2 className={styles.blockTitle}>🥇 Meilleurs Buteurs</h2>
          </div>
          <div className={styles.scorersGrid}>
            {[
              { rank: 1, player: 'Kylian Mbappé', team: 'France 🇫🇷', goals: '—' },
              { rank: 2, player: 'Erling Haaland', team: 'Norvège 🇳🇴', goals: '—' },
              { rank: 3, player: 'Vinicius Jr.', team: 'Brésil 🇧🇷', goals: '—' },
              { rank: 4, player: 'Harry Kane', team: 'Angleterre 🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: '—' },
              { rank: 5, player: 'Bukayo Saka', team: 'Angleterre 🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: '—' },
            ].map(scorer => (
              <div key={scorer.rank} className={styles.scorerRow}>
                <span className={styles.scorerRank}>#{scorer.rank}</span>
                <div className={styles.scorerInfo}>
                  <span className={styles.scorerName}>{scorer.player}</span>
                  <span className={styles.scorerTeam}>{scorer.team}</span>
                </div>
                <span className={styles.scorerGoals}>{scorer.goals} but{scorer.goals !== '1' ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
