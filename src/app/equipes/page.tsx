import type { Metadata } from 'next';
import { TEAMS, GROUPS } from '@/lib/data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Équipes — Coupe du Monde 2026 | Les 48 Nations Qualifiées',
  description:
    'Les 48 équipes qualifiées pour la Coupe du Monde FIFA 2026. Drapeaux, groupes, classement FIFA et infos sur chaque nation participante.',
};

export default function EquipesPage() {
  const teamsByGroup = GROUPS.reduce<Record<string, typeof TEAMS>>((acc, group) => {
    acc[group] = TEAMS.filter(t => t.group === group);
    return acc;
  }, {});

  return (
    <div className="page">
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>🌍 Les 48 Équipes</h1>
          <p className={styles.subtitle}>
            Toutes les nations qualifiées pour la Coupe du Monde FIFA 2026<br />
            Réparties en 12 groupes de 4 équipes
          </p>
          <div className={styles.confBadges}>
            {['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'].map(conf => (
              <span key={conf} className={`badge badge-group`}>{conf}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="section">
        <div className="container">
          <div className={styles.groupsGrid}>
            {GROUPS.map(group => {
              const teams = teamsByGroup[group] || [];
              if (teams.length === 0) return null;
              return (
                <div key={group} className={styles.groupCard} id={`group-${group}`}>
                  <div className={styles.groupHeader}>
                    <span className={`badge badge-group`}>Groupe {group}</span>
                  </div>
                  <div className={styles.teamsList}>
                    {teams.map(team => (
                      <div key={team.id} className={styles.teamRow} id={team.id}>
                        <span className={styles.teamFlag}>{team.flag}</span>
                        <div className={styles.teamInfo}>
                          <span className={styles.teamName}>{team.name}</span>
                          <span className={styles.teamConf}>{team.confederation}</span>
                        </div>
                        {team.ranking && (
                          <span className={styles.teamRank}>
                            #{team.ranking}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Confederation breakdown */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className={styles.confTitle}>Répartition par Confédération</h2>
          <div className={styles.confGrid}>
            {[
              { name: 'UEFA (Europe)', count: 16, flag: '🇪🇺', color: '#3B82F6' },
              { name: 'CONMEBOL (Amérique du Sud)', count: 8, flag: '🌎', color: '#10B981' },
              { name: 'CONCACAF (Amérique du Nord/Centrale)', count: 6, flag: '🌎', color: '#F59E0B' },
              { name: 'CAF (Afrique)', count: 9, flag: '🌍', color: '#EF4444' },
              { name: 'AFC (Asie)', count: 8, flag: '🌏', color: '#8B5CF6' },
              { name: 'OFC (Océanie)', count: 1, flag: '🌏', color: '#06B6D4' },
            ].map(conf => (
              <div key={conf.name} className={styles.confCard} style={{ '--conf-color': conf.color } as React.CSSProperties}>
                <div className={styles.confCardHeader}>
                  <span className={styles.confFlag}>{conf.flag}</span>
                  <span className={styles.confCount}>{conf.count}</span>
                </div>
                <span className={styles.confName}>{conf.name}</span>
                <div className={styles.confBar}>
                  <div
                    className={styles.confBarFill}
                    style={{ width: `${(conf.count / 48) * 100}%`, background: conf.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
