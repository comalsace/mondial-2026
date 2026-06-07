'use client';

import Link from 'next/link';
import type { NewsArticle } from '@/lib/fetchNews';
import { timeAgo } from '@/lib/fetchNews';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format',
  'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&auto=format',
  'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format',
];

function getPlaceholder(id: string): string {
  const index = id.charCodeAt(id.length - 1) % PLACEHOLDER_IMAGES.length;
  return PLACEHOLDER_IMAGES[index];
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const imgUrl = article.imageUrl || getPlaceholder(article.id);

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      aria-label={`Lire l'article: ${article.title}`}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        <img
          src={imgUrl}
          alt={article.title}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGES[0];
          }}
        />
        <div className={styles.imageOverlay} />
        {article.category && (
          <span className={`badge badge-upcoming ${styles.categoryBadge}`}>
            {article.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.sourceMeta}>
          <span className={styles.source}>{article.source}</span>
          <span className={styles.dot}>•</span>
          <time className={styles.time} dateTime={article.pubDate}>
            {timeAgo(article.pubDate)}
          </time>
        </div>

        <h3 className={styles.title}>{article.title}</h3>

        {!featured && (
          <p className={styles.description}>{article.description}</p>
        )}

        <span className={styles.readMore}>
          Lire la suite →
        </span>
      </div>
    </a>
  );
}
