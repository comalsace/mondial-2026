import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/calendrier', label: 'Calendrier' },
  { href: '/resultats', label: 'Résultats' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/equipes', label: 'Équipes' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span>🏆</span>
              <div>
                <div className={styles.logoName}>Mondial</div>
                <div className={styles.logoYear}>2026</div>
              </div>
            </Link>
            <p className={styles.tagline}>
              Suivez toute l&apos;actualité de la Coupe du Monde FIFA 2026 en temps réel.<br />
              Résultats, calendrier, équipes et bien plus encore.
            </p>
          </div>

          <div className={styles.linksSection}>
            <h3 className={styles.linksTitle}>Navigation</h3>
            <nav>
              {FOOTER_LINKS.map(link => (
                <Link key={link.href} href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.infoSection}>
            <h3 className={styles.linksTitle}>Infos</h3>
            <div className={styles.infoItem}>
              <span>📅</span>
              <span>11 Juin — 19 Juillet 2026</span>
            </div>
            <div className={styles.infoItem}>
              <span>🌎</span>
              <span>USA, Canada, Mexique</span>
            </div>
            <div className={styles.infoItem}>
              <span>⚽</span>
              <span>48 équipes • 104 matchs</span>
            </div>
            <div className={styles.infoItem}>
              <span>🏟️</span>
              <span>16 stades</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 Mondial 2026. Site non officiel à but informatif.
          </p>
          <p className={styles.source}>
            Données : <a href="https://www.fifa.com/fr" target="_blank" rel="noopener noreferrer">FIFA</a> •{' '}
            <a href="https://rapidapi.com/api-sports/api/api-football" target="_blank" rel="noopener noreferrer">API-Football</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
