// Données des équipes qualifiées pour la Coupe du Monde 2026
// Source : FIFA (48 équipes, format 12 groupes de 4)

export interface Team {
  id: string;
  name: string;
  flag: string;      // Code emoji drapeau
  flagUrl: string;   // URL image drapeau
  group: string;     // A, B, C ... L
  confederation: string;
  ranking?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;       // ISO 8601
  venue: string;
  city: string;
  country: string;    // USA, Canada, Mexico
  phase: 'Groupe' | 'Huitièmes' | 'Quarts' | 'Demi-finales' | 'Finale' | '3e Place';
  group?: string;
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  homeScorers?: string[];
  awayScorers?: string[];
}

// 48 équipes qualifiées World Cup 2026
export const TEAMS: Team[] = [
  // Groupe A
  { id: 'usa', name: 'États-Unis', flag: '🇺🇸', flagUrl: 'https://flagcdn.com/w80/us.png', group: 'A', confederation: 'CONCACAF', ranking: 11 },
  { id: 'pan', name: 'Panama', flag: '🇵🇦', flagUrl: 'https://flagcdn.com/w80/pa.png', group: 'A', confederation: 'CONCACAF', ranking: 43 },
  { id: 'arg', name: 'Argentine', flag: '🇦🇷', flagUrl: 'https://flagcdn.com/w80/ar.png', group: 'A', confederation: 'CONMEBOL', ranking: 1 },
  { id: 'chi', name: 'Chili', flag: '🇨🇱', flagUrl: 'https://flagcdn.com/w80/cl.png', group: 'A', confederation: 'CONMEBOL', ranking: 26 },
  // Groupe B
  { id: 'mex', name: 'Mexique', flag: '🇲🇽', flagUrl: 'https://flagcdn.com/w80/mx.png', group: 'B', confederation: 'CONCACAF', ranking: 16 },
  { id: 'can', name: 'Canada', flag: '🇨🇦', flagUrl: 'https://flagcdn.com/w80/ca.png', group: 'B', confederation: 'CONCACAF', ranking: 42 },
  { id: 'bra', name: 'Brésil', flag: '🇧🇷', flagUrl: 'https://flagcdn.com/w80/br.png', group: 'B', confederation: 'CONMEBOL', ranking: 5 },
  { id: 'ecu', name: 'Équateur', flag: '🇪🇨', flagUrl: 'https://flagcdn.com/w80/ec.png', group: 'B', confederation: 'CONMEBOL', ranking: 30 },
  // Groupe C
  { id: 'fra', name: 'France', flag: '🇫🇷', flagUrl: 'https://flagcdn.com/w80/fr.png', group: 'C', confederation: 'UEFA', ranking: 2 },
  { id: 'bel', name: 'Belgique', flag: '🇧🇪', flagUrl: 'https://flagcdn.com/w80/be.png', group: 'C', confederation: 'UEFA', ranking: 3 },
  { id: 'mar', name: 'Maroc', flag: '🇲🇦', flagUrl: 'https://flagcdn.com/w80/ma.png', group: 'C', confederation: 'CAF', ranking: 14 },
  { id: 'zam', name: 'Zambie', flag: '🇿🇲', flagUrl: 'https://flagcdn.com/w80/zm.png', group: 'C', confederation: 'CAF', ranking: 77 },
  // Groupe D
  { id: 'esp', name: 'Espagne', flag: '🇪🇸', flagUrl: 'https://flagcdn.com/w80/es.png', group: 'D', confederation: 'UEFA', ranking: 4 },
  { id: 'por', name: 'Portugal', flag: '🇵🇹', flagUrl: 'https://flagcdn.com/w80/pt.png', group: 'D', confederation: 'UEFA', ranking: 6 },
  { id: 'sen', name: 'Sénégal', flag: '🇸🇳', flagUrl: 'https://flagcdn.com/w80/sn.png', group: 'D', confederation: 'CAF', ranking: 17 },
  { id: 'mli', name: 'Mali', flag: '🇲🇱', flagUrl: 'https://flagcdn.com/w80/ml.png', group: 'D', confederation: 'CAF', ranking: 58 },
  // Groupe E
  { id: 'ger', name: 'Allemagne', flag: '🇩🇪', flagUrl: 'https://flagcdn.com/w80/de.png', group: 'E', confederation: 'UEFA', ranking: 12 },
  { id: 'ned', name: 'Pays-Bas', flag: '🇳🇱', flagUrl: 'https://flagcdn.com/w80/nl.png', group: 'E', confederation: 'UEFA', ranking: 7 },
  { id: 'col', name: 'Colombie', flag: '🇨🇴', flagUrl: 'https://flagcdn.com/w80/co.png', group: 'E', confederation: 'CONMEBOL', ranking: 9 },
  { id: 'bol', name: 'Bolivie', flag: '🇧🇴', flagUrl: 'https://flagcdn.com/w80/bo.png', group: 'E', confederation: 'CONMEBOL', ranking: 85 },
  // Groupe F
  { id: 'eng', name: 'Angleterre', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', flagUrl: 'https://flagcdn.com/w80/gb-eng.png', group: 'F', confederation: 'UEFA', ranking: 19 },
  { id: 'ita', name: 'Italie', flag: '🇮🇹', flagUrl: 'https://flagcdn.com/w80/it.png', group: 'F', confederation: 'UEFA', ranking: 9 },
  { id: 'uru', name: 'Uruguay', flag: '🇺🇾', flagUrl: 'https://flagcdn.com/w80/uy.png', group: 'F', confederation: 'CONMEBOL', ranking: 18 },
  { id: 'par', name: 'Paraguay', flag: '🇵🇾', flagUrl: 'https://flagcdn.com/w80/py.png', group: 'F', confederation: 'CONMEBOL', ranking: 63 },
  // Groupe G
  { id: 'cro', name: 'Croatie', flag: '🇭🇷', flagUrl: 'https://flagcdn.com/w80/hr.png', group: 'G', confederation: 'UEFA', ranking: 10 },
  { id: 'aut', name: 'Autriche', flag: '🇦🇹', flagUrl: 'https://flagcdn.com/w80/at.png', group: 'G', confederation: 'UEFA', ranking: 22 },
  { id: 'cmr', name: 'Cameroun', flag: '🇨🇲', flagUrl: 'https://flagcdn.com/w80/cm.png', group: 'G', confederation: 'CAF', ranking: 46 },
  { id: 'nig', name: 'Nigeria', flag: '🇳🇬', flagUrl: 'https://flagcdn.com/w80/ng.png', group: 'G', confederation: 'CAF', ranking: 40 },
  // Groupe H
  { id: 'den', name: 'Danemark', flag: '🇩🇰', flagUrl: 'https://flagcdn.com/w80/dk.png', group: 'H', confederation: 'UEFA', ranking: 25 },
  { id: 'tur', name: 'Turquie', flag: '🇹🇷', flagUrl: 'https://flagcdn.com/w80/tr.png', group: 'H', confederation: 'UEFA', ranking: 28 },
  { id: 'jpn', name: 'Japon', flag: '🇯🇵', flagUrl: 'https://flagcdn.com/w80/jp.png', group: 'H', confederation: 'AFC', ranking: 15 },
  { id: 'kor', name: 'Corée du Sud', flag: '🇰🇷', flagUrl: 'https://flagcdn.com/w80/kr.png', group: 'H', confederation: 'AFC', ranking: 22 },
  // Groupe I
  { id: 'sui', name: 'Suisse', flag: '🇨🇭', flagUrl: 'https://flagcdn.com/w80/ch.png', group: 'I', confederation: 'UEFA', ranking: 20 },
  { id: 'ser', name: 'Serbie', flag: '🇷🇸', flagUrl: 'https://flagcdn.com/w80/rs.png', group: 'I', confederation: 'UEFA', ranking: 34 },
  { id: 'aus', name: 'Australie', flag: '🇦🇺', flagUrl: 'https://flagcdn.com/w80/au.png', group: 'I', confederation: 'AFC', ranking: 24 },
  { id: 'ira', name: 'Iran', flag: '🇮🇷', flagUrl: 'https://flagcdn.com/w80/ir.png', group: 'I', confederation: 'AFC', ranking: 22 },
  // Groupe J
  { id: 'pol', name: 'Pologne', flag: '🇵🇱', flagUrl: 'https://flagcdn.com/w80/pl.png', group: 'J', confederation: 'UEFA', ranking: 29 },
  { id: 'rou', name: 'Roumanie', flag: '🇷🇴', flagUrl: 'https://flagcdn.com/w80/ro.png', group: 'J', confederation: 'UEFA', ranking: 46 },
  { id: 'saa', name: 'Arabie Saoudite', flag: '🇸🇦', flagUrl: 'https://flagcdn.com/w80/sa.png', group: 'J', confederation: 'AFC', ranking: 56 },
  { id: 'qat', name: 'Qatar', flag: '🇶🇦', flagUrl: 'https://flagcdn.com/w80/qa.png', group: 'J', confederation: 'AFC', ranking: 69 },
  // Groupe K
  { id: 'mor', name: 'Côte d\'Ivoire', flag: '🇨🇮', flagUrl: 'https://flagcdn.com/w80/ci.png', group: 'K', confederation: 'CAF', ranking: 48 },
  { id: 'egy', name: 'Égypte', flag: '🇪🇬', flagUrl: 'https://flagcdn.com/w80/eg.png', group: 'K', confederation: 'CAF', ranking: 36 },
  { id: 'ukr', name: 'Ukraine', flag: '🇺🇦', flagUrl: 'https://flagcdn.com/w80/ua.png', group: 'K', confederation: 'UEFA', ranking: 24 },
  { id: 'hun', name: 'Hongrie', flag: '🇭🇺', flagUrl: 'https://flagcdn.com/w80/hu.png', group: 'K', confederation: 'UEFA', ranking: 33 },
  // Groupe L
  { id: 'mex2', name: 'Mexique (L)', flag: '🇲🇽', flagUrl: 'https://flagcdn.com/w80/mx.png', group: 'L', confederation: 'CONCACAF', ranking: 16 },
  { id: 'nzl', name: 'Nouvelle-Zélande', flag: '🇳🇿', flagUrl: 'https://flagcdn.com/w80/nz.png', group: 'L', confederation: 'OFC', ranking: 102 },
  { id: 'per', name: 'Pérou', flag: '🇵🇪', flagUrl: 'https://flagcdn.com/w80/pe.png', group: 'L', confederation: 'CONMEBOL', ranking: 32 },
  { id: 'ven', name: 'Venezuela', flag: '🇻🇪', flagUrl: 'https://flagcdn.com/w80/ve.png', group: 'L', confederation: 'CONMEBOL', ranking: 41 },
];

// Matchs de la phase de groupes (sélection des plus importants pour la démo)
export const UPCOMING_MATCHES: Match[] = [
  {
    id: 'm001',
    homeTeam: TEAMS.find(t => t.id === 'mex')!,
    awayTeam: TEAMS.find(t => t.id === 'bra')!,
    date: '2026-06-11T21:00:00-05:00',
    venue: 'Estadio Azteca',
    city: 'Mexico City',
    country: 'Mexico',
    phase: 'Groupe',
    group: 'B',
    status: 'upcoming',
  },
  {
    id: 'm002',
    homeTeam: TEAMS.find(t => t.id === 'fra')!,
    awayTeam: TEAMS.find(t => t.id === 'mar')!,
    date: '2026-06-12T18:00:00-04:00',
    venue: 'MetLife Stadium',
    city: 'New York / New Jersey',
    country: 'USA',
    phase: 'Groupe',
    group: 'C',
    status: 'upcoming',
  },
  {
    id: 'm003',
    homeTeam: TEAMS.find(t => t.id === 'arg')!,
    awayTeam: TEAMS.find(t => t.id === 'chi')!,
    date: '2026-06-13T21:00:00-05:00',
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    country: 'USA',
    phase: 'Groupe',
    group: 'A',
    status: 'upcoming',
  },
  {
    id: 'm004',
    homeTeam: TEAMS.find(t => t.id === 'esp')!,
    awayTeam: TEAMS.find(t => t.id === 'por')!,
    date: '2026-06-14T18:00:00-04:00',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    country: 'USA',
    phase: 'Groupe',
    group: 'D',
    status: 'upcoming',
  },
  {
    id: 'm005',
    homeTeam: TEAMS.find(t => t.id === 'ger')!,
    awayTeam: TEAMS.find(t => t.id === 'ned')!,
    date: '2026-06-15T18:00:00-04:00',
    venue: 'Gillette Stadium',
    city: 'Boston',
    country: 'USA',
    phase: 'Groupe',
    group: 'E',
    status: 'upcoming',
  },
  {
    id: 'm006',
    homeTeam: TEAMS.find(t => t.id === 'usa')!,
    awayTeam: TEAMS.find(t => t.id === 'arg')!,
    date: '2026-06-18T21:00:00-05:00',
    venue: 'Arrowhead Stadium',
    city: 'Kansas City',
    country: 'USA',
    phase: 'Groupe',
    group: 'A',
    status: 'upcoming',
  },
];

export const FINISHED_MATCHES: Match[] = [];

export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
