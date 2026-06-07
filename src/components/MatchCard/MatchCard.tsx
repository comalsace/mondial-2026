import Link from 'next/link';
import type { Match } from '@/lib/data';
import styles from './MatchCard.module.css';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

function formatMatchDate(dateStr: string): { date: string; time: string } {
  const d = new Date(dateStr);
  return {
    date: new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }).format(d),
    time: new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).format(d),
  };
}

export default function MatchCard({ match, compact = false }: MatchCardProps) {
  const { date, time } = formatMatchDate(match.date);
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <article className={`${styles.card} ${isLive ? styles.live : ''} ${compact ? styles.compact : ''}`}>
      {/* Status Badge */}
      <div className={styles.topRow}>
        <div className={styles.meta}>
          <span className={`badge ${isLive ? 'badge-live' : isFinished ? 'badge-finished' : 'badge-upcoming'}`}>
            {isLive && <span className={styles.dot} />}
            {isLive ? 'EN DIRECT' : isFinished ? 'Terminé' : 'À venir'}
          </span>
          {match.group && (
            <span className="badge badge-group">Groupe {match.group}</span>
          )}
        </div>
        <div className={styles.dateInfo}>
          <span className={styles.dateText}>{date}</span>
          <span className={styles.timeText}>{time}</span>
        </div>
      </div>

      {/* Teams & Score */}
      <div className={styles.matchup}>
        {/* Home Team */}
        <div className={styles.team}>
          <span className={styles.flag}>{match.homeTeam.flag || '🏳️'}</span>
          <span className={styles.teamName}>{match.homeTeam.name}</span>
        </div>

        {/* Score / VS */}
        <div className={styles.scoreBox}>
          {isFinished || isLive ? (
            <div className={styles.score}>
              <span className={styles.scoreNum}>{match.homeScore ?? 0}</span>
              <span className={styles.scoreDash}>-</span>
              <span className={styles.scoreNum}>{match.awayScore ?? 0}</span>
            </div>
          ) : (
            <div className={styles.vs}>VS</div>
          )}
        </div>

        {/* Away Team */}
        <div className={`${styles.team} ${styles.teamRight}`}>
          <span className={styles.teamName}>{match.awayTeam.name}</span>
          <span className={styles.flag}>{match.awayTeam.flag || '🏳️'}</span>
        </div>
      </div>

      {/* Venue */}
      {!compact && (
        <div className={styles.venue}>
          <span>🏟️</span>
          <span>{match.venue}, {match.city}</span>
        </div>
      )}

      {/* Live glow effect */}
      {isLive && <div className={styles.liveGlow} />}
    </article>
  );
}
