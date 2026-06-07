import type { Metadata } from 'next';
import { fetchMatches } from '@/lib/fetchMatches';
import MatchCard from '@/components/MatchCard/MatchCard';
import { GROUPS } from '@/lib/data';
import styles from './page.module.css';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Calendrier des Matchs — Coupe du Monde 2026',
  description:
    'Calendrier complet de la Coupe du Monde FIFA 2026. Tous les matchs de la phase de groupes, huitièmes, quarts, demi-finales et finale avec les horaires.',
  openGraph: {
    title: 'Calendrier Coupe du Monde 2026',
    description: 'Tous les matchs du Mondial 2026 — horaires, stades, phases',
  },
};

export default async function CalendrierPage() {
  const { upcoming, live, finished } = await fetchMatches();
  const allMatches = [...live, ...upcoming, ...finished].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Grouper par date
  const matchesByDate: Record<string, typeof allMatches> = {};
  for (const match of allMatches) {
    const dateKey = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date(match.date));
    if (!matchesByDate[dateKey]) matchesByDate[dateKey] = [];
    matchesByDate[dateKey].push(match);
  }

  const dateEntries = Object.entries(matchesByDate);

  return (
    <div className="page">
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>
            📅 Calendrier des Matchs
          </h1>
          <p className={styles.subtitle}>
            Tous les matchs de la Coupe du Monde FIFA 2026<br />
            11 juin — 19 juillet 2026 · USA, Canada, Mexique
          </p>

          {/* Phase filters */}
          <div className={styles.filters}>
            {['Tous', 'Groupes', 'Huitièmes', 'Quarts', 'Demi-finales', 'Finale'].map(phase => (
              <button key={phase} className={`btn ${phase === 'Tous' ? 'btn-primary' : 'btn-ghost'}`} id={`filter-${phase}`}>
                {phase}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Matches by date */}
      <section className="section">
        <div className="container">
          {dateEntries.length === 0 ? (
            <div className={styles.empty}>
              <span>📅</span>
              <h2>Calendrier à venir</h2>
              <p>Les données seront disponibles dès le début du tournoi le 11 juin 2026.</p>
            </div>
          ) : (
            <div className={styles.timeline}>
              {dateEntries.map(([date, matches]) => (
                <div key={date} className={styles.dateGroup}>
                  <div className={styles.dateHeader}>
                    <div className={styles.dateLine} />
                    <h2 className={styles.dateLabel}>{date}</h2>
                    <div className={styles.dateLine} />
                  </div>
                  <div className={styles.matchesGrid}>
                    {matches.map(match => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tournament phases info */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className={styles.phasesTitle}>Phases du Tournoi</h2>
          <div className={styles.phasesGrid}>
            {[
              { phase: 'Phase de Groupes', dates: '11 juin — 2 juillet 2026', matches: '72 matchs', icon: '📊', detail: '12 groupes de 4 équipes' },
              { phase: 'Huitièmes de Finale', dates: '4 — 8 juillet 2026', matches: '16 matchs', icon: '⚔️', detail: '32 équipes qualifiées' },
              { phase: 'Quarts de Finale', dates: '11 — 12 juillet 2026', matches: '8 matchs', icon: '🏆', detail: '16 équipes restantes' },
              { phase: 'Demi-finales', dates: '15 — 16 juillet 2026', matches: '2 matchs', icon: '🌟', detail: 'Les 4 meilleures équipes' },
              { phase: 'Finale', dates: '19 juillet 2026', matches: '1 match', icon: '🥇', detail: 'MetLife Stadium, New York' },
            ].map(p => (
              <div key={p.phase} className={styles.phaseCard}>
                <span className={styles.phaseIcon}>{p.icon}</span>
                <h3 className={styles.phaseName}>{p.phase}</h3>
                <p className={styles.phaseDetail}>{p.detail}</p>
                <div className={styles.phaseMeta}>
                  <span>{p.dates}</span>
                  <span className="badge badge-upcoming">{p.matches}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
