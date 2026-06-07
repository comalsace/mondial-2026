'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Accueil', icon: '🏠' },
  { href: '/calendrier', label: 'Calendrier', icon: '📅' },
  { href: '/resultats', label: 'Résultats', icon: '⚽' },
  { href: '/actualites', label: 'Actualités', icon: '📰' },
  { href: '/equipes', label: 'Équipes', icon: '🌍' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Mondial 2026 — Accueil">
          <span className={styles.logoIcon}>🏆</span>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Mondial</span>
            <span className={styles.logoYear}>2026</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav} role="navigation" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
              {pathname === link.href && <span className={styles.activeBar} />}
            </Link>
          ))}
        </nav>

        {/* Live badge + CTA */}
        <div className={styles.actions}>
          <span className={`badge badge-live ${styles.liveBadge}`}>
            <span className={styles.liveDot} />
            LIVE
          </span>
          <button
            className={`${styles.menuToggle} btn btn-ghost`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label="Menu mobile">
          <div className={styles.mobileMenuInner}>
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileActive : ''}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className={styles.mobileLinkIcon}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
