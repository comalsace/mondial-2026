// Fetch des matchs via api-sports.io (API Football v3 — direct)
// Fallback automatique sur données mock si la clé API est absente

import { UPCOMING_MATCHES, FINISHED_MATCHES, type Match } from './data';

const API_KEY = process.env.API_FOOTBALL_KEY;
const API_HOST = process.env.API_FOOTBALL_HOST || 'v3.football.api-sports.io';

// FIFA World Cup = league 1 sur api-sports.io
const WC_LEAGUE_ID = 1;
// Plan gratuit : accès 2022-2024. Saison 2026 sera débloquée dès le début du tournoi
const WC_SEASON_PRIMARY = 2026;
const WC_SEASON_FALLBACK = 2022;

function isApiConfigured(): boolean {
  return Boolean(
    API_KEY &&
    API_KEY.trim() !== '' &&
    API_KEY !== 'colle_ta_cle_api_ici' &&
    API_KEY !== 'votre_cle_api_ici'
  );
}

interface APIFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string; elapsed: number | null };
    venue: { name: string; city: string };
  };
  league: { round: string; group: string };
  teams: {
    home: { id: number; name: string; logo: string; winner: boolean | null };
    away: { id: number; name: string; logo: string; winner: boolean | null };
  };
  goals: { home: number | null; away: number | null };
  score: {
    fulltime: { home: number | null; away: number | null };
  };
}

function mapStatus(short: string): Match['status'] {
  const liveStatuses = ['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE', 'INT'];
  const finishedStatuses = ['FT', 'AET', 'PEN'];
  if (liveStatuses.includes(short)) return 'live';
  if (finishedStatuses.includes(short)) return 'finished';
  return 'upcoming';
}

function fixtureToMatch(item: APIFixture): Match {
  const status = mapStatus(item.fixture.status.short);
  return {
    id: String(item.fixture.id),
    homeTeam: {
      id: String(item.teams.home.id),
      name: item.teams.home.name,
      flag: '',
      flagUrl: item.teams.home.logo,
      group: item.league.group || '',
      confederation: '',
    },
    awayTeam: {
      id: String(item.teams.away.id),
      name: item.teams.away.name,
      flag: '',
      flagUrl: item.teams.away.logo,
      group: item.league.group || '',
      confederation: '',
    },
    date: item.fixture.date,
    venue: item.fixture.venue.name || '',
    city: item.fixture.venue.city || '',
    country: '',
    phase: 'Groupe',
    group: item.league.group?.replace('Group ', '') || undefined,
    status,
    homeScore: status !== 'upcoming' ? (item.goals.home ?? undefined) : undefined,
    awayScore: status !== 'upcoming' ? (item.goals.away ?? undefined) : undefined,
  };
}

async function apiFetch(path: string): Promise<{ response: APIFixture[] } | null> {
  if (!isApiConfigured()) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const url = `https://${API_HOST}${path}`;
    console.info(`📡 API-Football → ${url}`);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'x-apisports-key': API_KEY!,   // api-sports.io direct
        'x-rapidapi-key': API_KEY!,    // compatibilité RapidAPI aussi
        'x-rapidapi-host': API_HOST,
      },
      next: { revalidate: 60 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`⚠️ API-Football erreur HTTP ${res.status}`);
      return null;
    }

    const data = await res.json();

    // Vérifier les erreurs API
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.warn('⚠️ API-Football erreurs :', data.errors);
      return null;
    }

    console.info(`✅ API-Football : ${data.response?.length ?? 0} résultats`);
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('⚠️ API-Football indisponible :', err instanceof Error ? err.message : err);
    return null;
  }
}

export async function fetchMatches(): Promise<{
  upcoming: Match[];
  finished: Match[];
  live: Match[];
  season: number;
}> {
  if (!isApiConfigured()) {
    console.info('ℹ️ Clé API absente — données de démonstration');
    return { upcoming: UPCOMING_MATCHES, finished: FINISHED_MATCHES, live: [], season: 2026 };
  }

  // Essayer 2026 en premier, fallback sur 2022 si plan gratuit
  let data = await apiFetch(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON_PRIMARY}`);
  let season = WC_SEASON_PRIMARY;

  if (!data || !data.response?.length) {
    console.info('ℹ️ Saison 2026 non disponible — chargement des données 2022');
    data = await apiFetch(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON_FALLBACK}`);
    season = WC_SEASON_FALLBACK;
  }

  if (!data || !data.response?.length) {
    console.info('ℹ️ Aucune donnée API — fallback données mock');
    return { upcoming: UPCOMING_MATCHES, finished: FINISHED_MATCHES, live: [], season: 2026 };
  }

  const upcoming: Match[] = [];
  const finished: Match[] = [];
  const live: Match[] = [];

  for (const item of data.response) {
    const match = fixtureToMatch(item);
    if (match.status === 'finished') finished.push(match);
    else if (match.status === 'live') live.push(match);
    else upcoming.push(match);
  }

  upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  finished.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  console.info(`✅ Saison ${season} : ${upcoming.length} à venir, ${finished.length} terminés, ${live.length} en direct`);
  return { upcoming, finished, live, season };
}

export async function fetchLiveMatches(): Promise<Match[]> {
  if (!isApiConfigured()) return [];

  const data = await apiFetch(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON_PRIMARY}&live=all`);
  if (!data?.response?.length) return [];

  return data.response
    .map(fixtureToMatch)
    .filter((m: Match) => m.status === 'live');
}
