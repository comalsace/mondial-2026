// Agrégateur de flux RSS sportifs
// Fallback automatique sur contenu de démonstration si les flux échouent

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  imageUrl?: string;
  category?: string;
}

interface RSSFeed {
  name: string;
  url: string;
}

const RSS_FEEDS: RSSFeed[] = [
  { name: "L'Équipe Football", url: 'https://www.lequipe.fr/rss/actu_rss_Football.xml' },
  { name: 'BBC Sport Football', url: 'https://feeds.bbci.co.uk/sport/football/rss.xml' },
  { name: 'Goal.com', url: 'https://www.goal.com/feeds/fr/news' },
  { name: 'Eurosport', url: 'https://www.eurosport.fr/common/rss/football.xml' },
];

// Parser RSS robuste — jamais de throw, toujours un tableau
async function parseRSSFeed(feed: RSSFeed): Promise<NewsArticle[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    let res: Response | null = null;
    try {
      res = await fetch(feed.url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mondial2026/1.0' },
        next: { revalidate: 300 },
      });
    } catch {
      // Réseau indisponible (ENOTFOUND, timeout, etc.) — échec silencieux
      clearTimeout(timeoutId);
      return [];
    }
    clearTimeout(timeoutId);

    if (!res || !res.ok) return [];

    let text = '';
    try {
      text = await res.text();
    } catch {
      return [];
    }

    const items: NewsArticle[] = [];
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let match: RegExpExecArray | null;
    let count = 0;

    while ((match = itemRegex.exec(text)) !== null && count < 8) {
      const content = match[1];
      const title = cleanCDATA(extractTag(content, 'title'));
      const link = cleanCDATA(extractTag(content, 'link') || extractTag(content, 'guid'));
      const description = stripHTML(cleanCDATA(extractTag(content, 'description') || '')).slice(0, 200);
      const pubDate = extractTag(content, 'pubDate') || new Date().toISOString();
      const imageUrl = extractAttr(content, 'enclosure', 'url') || extractMediaUrl(content) || '';

      if (title && link) {
        items.push({
          id: `${feed.name}-${count}`,
          title,
          description: description + (description.length >= 200 ? '...' : ''),
          link,
          pubDate,
          source: feed.name,
          imageUrl: imageUrl || undefined,
          category: 'Coupe du Monde',
        });
        count++;
      }
    }

    return items;
  } catch {
    return [];
  }
}

// Helpers
function cleanCDATA(s: string): string {
  return s.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '').trim();
}

function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : '';
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]+${attr}=["']([^"']+)["']`, 'i'));
  return m ? m[1] : '';
}

function extractMediaUrl(xml: string): string {
  const m = xml.match(/media:(?:content|thumbnail)[^>]+url=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

function stripHTML(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ===== CONTENU DE DÉMONSTRATION =====
// Utilisé quand les flux RSS sont inaccessibles (développement local, etc.)
function buildFallbackNews(): NewsArticle[] {
  const now = Date.now();
  return [
    {
      id: 'fb-1',
      title: 'Coupe du Monde 2026 : La France vise un troisième titre mondial',
      description: "L'équipe de France, championne du monde en 1998 et 2018, se prépare pour le Mondial 2026 avec ambition. Deschamps et ses joueurs sont déterminés à conquérir une troisième étoile.",
      link: 'https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026',
      pubDate: new Date(now - 1800000).toISOString(),
      source: "L'Équipe",
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop',
      category: 'France',
    },
    {
      id: 'fb-2',
      title: "Mondial 2026 : L'Argentine défend sa couronne au sommet du monde",
      description: "L'Albiceleste, championne du monde depuis 2022, aborde le tournoi 2026 avec confiance. L'équipe de Scaloni cherche à écrire une nouvelle page de l'histoire du football argentin.",
      link: 'https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026',
      pubDate: new Date(now - 3600000).toISOString(),
      source: 'Goal.com',
      imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop',
      category: 'Argentine',
    },
    {
      id: 'fb-3',
      title: "Brésil 2026 : Le Seleção en quête d'un 6e titre historique",
      description: "Le Brésil, 5 fois champion du monde, entend bien ramener le trophée en Amérique du Sud. Vinicius Jr., Rodrygo et Endrick mènent une génération talentueuse et ambitieuse.",
      link: 'https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026',
      pubDate: new Date(now - 7200000).toISOString(),
      source: 'BBC Sport',
      imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop',
      category: 'Brésil',
    },
    {
      id: 'fb-4',
      title: 'Maroc 2026 : Les Lions de l\'Atlas veulent écrire l\'histoire africaine',
      description: "Demi-finalistes en 2022, les Marocains ont des objectifs encore plus élevés pour 2026. Devenir la première équipe africaine finaliste d'une Coupe du Monde est dans tous les esprits.",
      link: 'https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026',
      pubDate: new Date(now - 10800000).toISOString(),
      source: 'Eurosport',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
      category: 'Maroc',
    },
    {
      id: 'fb-5',
      title: 'Espagne 2026 : La Roja championne d\'Europe en chasse de la troisième étoile',
      description: "Après leur sacre à l'Euro 2024, les Espagnols arrivent en très grande forme. Yamal, Pedri et Morata forment l'une des attaques les plus redoutables du tournoi.",
      link: 'https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026',
      pubDate: new Date(now - 14400000).toISOString(),
      source: "L'Équipe",
      imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&auto=format&fit=crop',
      category: 'Espagne',
    },
    {
      id: 'fb-6',
      title: '48 équipes, 3 pays, 16 stades : le Mondial 2026 sera le plus grand de l\'histoire',
      description: "Pour la première fois, la Coupe du Monde accueille 48 équipes réparties en 12 groupes. Les stades des États-Unis, du Canada et du Mexique accueilleront 104 matchs du 11 juin au 19 juillet 2026.",
      link: 'https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026',
      pubDate: new Date(now - 18000000).toISOString(),
      source: 'FIFA',
      imageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop',
      category: 'Organisation',
    },
    {
      id: 'fb-7',
      title: 'Allemagne 2026 : La Mannschaft veut retrouver les sommets',
      description: "Eliminés prématurément en 2018 et 2022, les Allemands ont reconstruit une équipe compétitive. Nagelsmann compte sur Müller, Musiala et Wirtz pour ramener l'Allemagne au plus haut niveau.",
      link: 'https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026',
      pubDate: new Date(now - 21600000).toISOString(),
      source: 'BBC Sport',
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop',
      category: 'Allemagne',
    },
    {
      id: 'fb-8',
      title: 'Portugal 2026 : Ronaldo, dernier danseur au bal du Mondial ?',
      description: "À 41 ans, Cristiano Ronaldo pourrait disputer sa dernière Coupe du Monde. Le capitaine du Portugal reste déterminé à offrir à son pays le premier titre de son histoire.",
      link: 'https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026',
      pubDate: new Date(now - 25200000).toISOString(),
      source: 'Eurosport',
      imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop',
      category: 'Portugal',
    },
  ];
}

export async function fetchNews(limit = 12): Promise<NewsArticle[]> {
  // Tenter les flux RSS en parallèle avec un délai max global de 5s
  const rssPromise = Promise.allSettled(RSS_FEEDS.map(parseRSSFeed));
  const timeoutPromise = new Promise<PromiseSettledResult<NewsArticle[]>[]>(resolve =>
    setTimeout(() => resolve([]), 5000)
  );

  const results = await Promise.race([rssPromise, timeoutPromise]);
  const allArticles: NewsArticle[] = [];

  if (Array.isArray(results)) {
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);
      }
    }
  }

  if (allArticles.length === 0) {
    // RSS inaccessibles → contenu de démonstration riche
    return buildFallbackNews().slice(0, limit);
  }

  allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return allArticles.slice(0, limit);
}

export function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export function timeAgo(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    return formatDate(dateStr);
  } catch {
    return dateStr;
  }
}
