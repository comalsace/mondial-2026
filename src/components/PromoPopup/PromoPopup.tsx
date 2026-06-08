'use client';

import { useState, useEffect } from 'react';
import styles from './PromoPopup.module.css';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Vérifie si le popup a déjà été fermé lors de cette session
    const hasClosedPopup = sessionStorage.getItem('promo-popup-closed');
    
    if (!hasClosedPopup) {
      // Afficher le popup après 1.5 secondes
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('promo-popup-closed', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeButton} 
          onClick={handleClose}
          aria-label="Fermer la promotion"
        >
          ✕
        </button>
        <a 
          href="https://www.eneba.com/us/?af_id=comalsace5&utm_medium=infl&utm_source=comalsace5" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.imageLink}
          onClick={handleClose} // Optionnel : fermer le popup après avoir cliqué sur le lien
        >
          {/* Assure-toi que ton image s'appelle promo-eneba.png et se trouve dans le dossier public/ */}
          <img 
            src="/promo-eneba.png" 
            alt="Promotion jeux vidéo Eneba - FC 24, FIFA 21, FC 26" 
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
}
