'use client';

import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className={styles.countdown} aria-label="Compte à rebours">
        {['Jours', 'Heures', 'Min', 'Sec'].map(label => (
          <div key={label} className={styles.unit}>
            <span className={styles.value}>--</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className={styles.started}>
        <span>🏆</span>
        <span>La Coupe du Monde 2026 est en cours !</span>
      </div>
    );
  }

  const units = [
    { value: pad(timeLeft.days), label: 'Jours' },
    { value: pad(timeLeft.hours), label: 'Heures' },
    { value: pad(timeLeft.minutes), label: 'Min' },
    { value: pad(timeLeft.seconds), label: 'Sec' },
  ];

  return (
    <div className={styles.wrapper} role="timer" aria-label="Temps avant le coup d'envoi">
      <p className={styles.caption}>⏳ Coup d&apos;envoi dans</p>
      <div className={styles.countdown}>
        {units.map((unit, i) => (
          <div key={unit.label}>
            <div className={styles.unit}>
              <span className={styles.value}>{unit.value}</span>
              <span className={styles.label}>{unit.label}</span>
            </div>
            {i < units.length - 1 && <span className={styles.sep}>:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
