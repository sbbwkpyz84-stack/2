// Betriebsangaben. Quelle: baer-seibl-gmbh.de (abgerufen 16.11.2026).
// Alles mit `offen: true` bzw. in docs/FREIGABE.md Gelistete muss der Betrieb vor Veröffentlichung bestätigen.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://baer-seibl-gmbh.de').replace(/\/$/, '');

export const company = {
  name: 'Bär + Seibl GmbH',
  claim: 'Dachdeckerei · Spenglerei · Flachdachsanierung · Profilblechbau',
  street: 'Hirnerstr. 17',
  zip: '85646',
  city: 'Anzing',
  tel: '+49 8121 41127',
  telHref: 'tel:+49812141127',
  fax: '+49 8121 41413',
  email: 'info@bs-gmbh.biz',
  bewerbungEmail: 'monika.rauschenbach@bs-gmbh.biz',
  hours: [
    { days: 'Montag – Donnerstag', time: '6:30 – 16:15 Uhr', spec: 'Mo-Th 06:30-16:15' },
    { days: 'Freitag', time: '6:30 – 15:15 Uhr', spec: 'Fr 06:30-15:15' },
  ],
  register: 'Amtsgericht München, HRB 70661',
  ustId: 'DE131168731',
  kammer: 'Handwerkskammer für München und Oberbayern, Max-Joseph-Straße 4, 80333 München',
  beruf: 'Dachdeckerbetrieb / Spenglerei (verliehen in der Bundesrepublik Deutschland)',
  versicherung: 'ERGO Versicherung AG, ERGO-Platz 1, 40198 Düsseldorf – Geltungsraum: Bundesrepublik Deutschland',
  pq: '010.013850',
  // Vorschlag, vom Betrieb zu bestätigen:
  rueckmeldung: 'in der Regel innerhalb von zwei Werktagen',
  region: 'München und die Landkreise Ebersberg, Erding und München',
  kundengruppen: ['Gewerbe und Industrie', 'Wohnungsbau und Hausverwaltungen', 'Öffentliche Auftraggeber', 'Architektur- und Planungsbüros'],
};

export type Person = { name: string; rolle: string; email?: string; tel?: string; telHref?: string; aufgabe: string };

export const team: Person[] = [
  {
    name: 'Monika Rauschenbach',
    rolle: 'Geschäftsführerin',
    email: 'monika.rauschenbach@bs-gmbh.biz',
    tel: '+49 8121 2546855',
    telHref: 'tel:+4981212546855',
    aufgabe: 'Geschäftsführung, Bewerbungen',
  },
  {
    name: 'Franz Mayr',
    rolle: 'Technik – Auftragsbearbeitung',
    email: 'franz.mayr@bs-gmbh.biz',
    tel: '+49 8121 2546856',
    telHref: 'tel:+4981212546856',
    aufgabe: 'Auftragsbearbeitung, laufende Projekte',
  },
  {
    name: 'Enrico Skrowny',
    rolle: 'Dachdeckermeister / Kalkulation',
    email: 'enrico.skrowny@bs-gmbh.biz',
    tel: '+49 8121 2546853',
    telHref: 'tel:+4981212546853',
    aufgabe: 'Erstprüfung von Anfragen, Kalkulation und Angebot',
  },
  { name: 'Benn Heckert', rolle: 'Spenglermeister / Betriebsleiter', aufgabe: 'Ausführung, Spenglerei und Profilblechbau' },
];

// Fachlich verantwortlich für Erstprüfung und Kalkulation (Vorschlag – Zuständigkeit/Vertretung bestätigen).
export const verantwortlich = team[2];
export const vertretung = team[1];

export const fakten = [
  { wert: '2. Generation', text: 'Familiengeführt, seit 2025 von Monika Rauschenbach geleitet' },
  { wert: '14 Mitarbeiter', text: '11 gewerbliche, 2 technische und 1 kaufmännische Angestellte' },
  { wert: 'PQ Bau', text: `Präqualifiziert, Registriernummer ${company.pq}` },
  { wert: 'Innungsbetrieb', text: 'Mitglied der Dachdecker-Innung München/Oberbayern' },
];

export const qualifikationen = ['BBG-geprüfte Kranfahrer', 'TÜV-geprüfte Folienschweißer', 'Fachkräfte für Arbeiten nach TRGS 519 (Asbest)'];

export const maschinen = [
  '2 CNC-Kantbänke (4.000 mm und 6.000 mm)',
  'Elektrische Schlagschere 3.000 mm',
  'Profiliermaschine für Doppelfalzdächer',
  '4 Schweißautomaten für Kunststoffabdichtungen',
  '2 Spezialbetonfräsen zur Vorbereitung von Verbundabdichtungen',
  '2 Spezialfräsen für den fachgerechten Abriss von Flachdächern',
  '3 Schrägaufzüge bis 24 m',
  '5 vollständig eingerichtete Montagefahrzeuge',
];

export const partner = [
  { name: 'Sika (Sarnafil)', url: 'https://www.sika.de/' },
  { name: 'Soprema', url: 'https://www.soprema.de/' },
  { name: 'Kalzip', url: 'https://www.kalzip.com/' },
];

export const nav = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/projekte', label: 'Projekte' },
  { href: '/betrieb', label: 'Betrieb' },
  { href: '/karriere', label: 'Karriere' },
  { href: '/kontakt', label: 'Kontakt' },
];
