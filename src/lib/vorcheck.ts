// Gemeinsame fachliche Prüfkriterien für den Projekt-Check „Flachdachsanierung“.
// Dieselben Regeln gelten für die QR-Demo und die öffentliche Leistungsseite (Client und Server).
// Regelstand: Vorschlag aus der Referenzwebsite abgeleitet – Freigabe durch den Betrieb offen (docs/FREIGABE.md).

export type Status = 'gruen' | 'gelb' | 'rot';
export type Gebiet = 'kern' | 'rand' | 'ausserhalb';
export type Option = { id: string; label: string; hint?: string };

export const CHECK_NAME = 'Projekt-Check';
export const LEISTUNG = 'Flachdachsanierung';

export const OBJEKTE: Option[] = [
  { id: 'gewerbe', label: 'Gewerbe- oder Industriehalle', hint: 'Produktion, Lager, Handel' },
  { id: 'wohn', label: 'Wohnanlage oder Mehrfamilienhaus', hint: 'Eigentümer, WEG, Hausverwaltung' },
  { id: 'oeffentlich', label: 'Öffentliches Gebäude', hint: 'Schule, Kita, Verwaltung' },
  { id: 'tiefgarage', label: 'Tiefgarage, Terrasse oder Laubengang', hint: 'Abdichtung genutzter Flächen' },
];

export const BESTAND: Option[] = [
  { id: 'bitumen', label: 'Bitumenbahnen', hint: 'Schwarz, oft beschiefert oder bekiest' },
  { id: 'kunststoff', label: 'Kunststoffbahn (FPO/PVC)', hint: 'Helle, glatte Folie' },
  { id: 'asbest', label: 'Wellplatten / Faserzement', hint: 'Möglicherweise asbesthaltig' },
  { id: 'unbekannt', label: 'Unbekannt', hint: 'Klären wir anhand von Fotos oder vor Ort' },
];

export const ZEITRAUM: Option[] = [
  { id: 'undicht', label: 'Es ist bereits undicht', hint: 'Bitte zusätzlich anrufen' },
  { id: 'kurz', label: 'In den nächsten 3 Monaten' },
  { id: 'mittel', label: 'In 3 bis 12 Monaten' },
  { id: 'orientierung', label: 'Ich möchte mich erst orientieren' },
];

// Demo: letzte Kachel kombiniert Zeitraum und Lage, damit das Ergebnis nach drei Auswahlen erscheint.
export const DEMO_SCHRITT3: (Option & { zeitraum: string; plz: string; ort: string })[] = [
  { id: 'a', label: 'In den nächsten 3 Monaten · Poing', hint: '85586 – im Einsatzgebiet', zeitraum: 'kurz', plz: '85586', ort: 'Poing' },
  { id: 'b', label: 'Erst orientieren · Erding', hint: '85435 – im Einsatzgebiet', zeitraum: 'orientierung', plz: '85435', ort: 'Erding' },
  { id: 'c', label: 'In 3 bis 12 Monaten · Rosenheim', hint: '83022 – Randgebiet', zeitraum: 'mittel', plz: '83022', ort: 'Rosenheim' },
  { id: 'd', label: 'In den nächsten 3 Monaten · Nürnberg', hint: '90402 – außerhalb', zeitraum: 'kurz', plz: '90402', ort: 'Nürnberg' },
];

const label = (list: Option[], id: string) => list.find((o) => o.id === id)?.label ?? id;
export const labels = {
  objekt: (id: string) => label(OBJEKTE, id),
  bestand: (id: string) => label(BESTAND, id),
  zeitraum: (id: string) => label(ZEITRAUM, id),
};

export const isPlz = (plz: string) => /^\d{5}$/.test(plz);

// Einsatzgebiet nach PLZ-Bereich (Vorschlag): Kerngebiet = München sowie Landkreise Ebersberg, Erding, München.
// Randgebiet = angrenzendes Oberbayern/Niederbayern – Anfahrt wird im Einzelfall geklärt.
const KERN = ['80', '81', '85'];
const RAND = ['82', '83', '84', '86'];
export function gebietVonPlz(plz: string): Gebiet | null {
  if (!isPlz(plz)) return null;
  const p = plz.slice(0, 2);
  if (KERN.includes(p)) return 'kern';
  if (RAND.includes(p)) return 'rand';
  return 'ausserhalb';
}
export const GEBIET_TEXT: Record<Gebiet, string> = {
  kern: 'Im Einsatzgebiet',
  rand: 'Randgebiet – Anfahrt klären wir im Einzelfall',
  ausserhalb: 'Außerhalb des regulären Einsatzgebiets',
};

export const STATUS_LABEL: Record<Status, string> = {
  gruen: 'Grün – passt zur Erstprüfung',
  gelb: 'Gelb – Klärungsbedarf',
  rot: 'Rot – außerhalb des Angebots',
};

export type Eingabe = { objekt: string; bestand: string; zeitraum: string; plz: string };
export type Ergebnis = {
  status: Status;
  label: string;
  gruende: string[];
  hinweise: string[];
  kunde: string; // nächster Schritt aus Kundensicht
  buero: string; // nächster Schritt im Büro
};

export function gueltig(e: Partial<Eingabe>): e is Eingabe {
  return (
    !!e.objekt && OBJEKTE.some((o) => o.id === e.objekt) &&
    !!e.bestand && BESTAND.some((o) => o.id === e.bestand) &&
    !!e.zeitraum && ZEITRAUM.some((o) => o.id === e.zeitraum) &&
    !!e.plz && isPlz(e.plz)
  );
}

export function bewerte(e: Eingabe): Ergebnis {
  const gebiet = gebietVonPlz(e.plz) ?? 'ausserhalb';
  const hinweise: string[] = [];
  if (e.bestand === 'asbest')
    hinweise.push('Asbestverdacht: Rückbau erfolgt durch Fachkräfte nach TRGS 519. Bitte die Platten nicht selbst bearbeiten.');
  if (e.zeitraum === 'undicht')
    hinweise.push('Akuter Wassereintritt: Bitte rufen Sie zusätzlich während der Bürozeiten an, damit wir die Dringlichkeit einordnen können.');
  if (e.objekt === 'oeffentlich')
    hinweise.push('Für öffentliche Auftraggeber: Präqualifikation Bau liegt vor. Ein Leistungsverzeichnis können Sie direkt mitsenden.');

  if (gebiet === 'ausserhalb') {
    return {
      status: 'rot',
      label: STATUS_LABEL.rot,
      gruende: [`Die PLZ ${e.plz} liegt außerhalb unseres regulären Einsatzgebiets (München, Landkreise Ebersberg, Erding und München).`],
      hinweise,
      kunde:
        'Wir können dieses Vorhaben voraussichtlich nicht übernehmen. Einen Fachbetrieb in Ihrer Nähe finden Sie über die Dachdecker-Innung Ihrer Region. Bei größeren Gewerbe- oder Industrieprojekten sprechen Sie uns gern telefonisch an.',
      buero: 'Keine Terminierung. Höfliche Absage mit Verweis auf die regionale Innung; nur bei Großprojekt Rücksprache mit der Kalkulation.',
    };
  }

  const gruende: string[] = [];
  if (e.bestand === 'unbekannt') gruende.push('Der vorhandene Dachaufbau ist noch nicht bekannt. Zwei bis drei Fotos der Dachfläche und eines Randanschlusses genügen für die Einordnung.');
  if (gebiet === 'rand') gruende.push(`Die PLZ ${e.plz} liegt im Randgebiet. Ob wir anfahren, hängt von Größe und Art des Projekts ab.`);
  if (e.zeitraum === 'orientierung') gruende.push('Der Zeitrahmen ist noch offen. Sie erhalten eine Ersteinschätzung, ein Ortstermin folgt erst auf Ihren Wunsch.');

  if (gruende.length) {
    return {
      status: 'gelb',
      label: STATUS_LABEL.gelb,
      gruende,
      hinweise,
      kunde:
        e.bestand === 'unbekannt'
          ? 'Bitte laden Sie nach Möglichkeit Fotos hoch oder nennen Sie die ungefähre Dachfläche. Danach melden wir uns persönlich.'
          : 'Wir melden uns persönlich und klären die offene Angabe mit Ihnen.',
      buero: 'Gezielte Rückfrage (Foto, Fläche oder Anfahrt) stellen, danach neu einstufen. Noch kein Ortstermin.',
    };
  }

  return {
    status: 'gruen',
    label: STATUS_LABEL.gruen,
    gruende: [
      `${labels.objekt(e.objekt)} im Einsatzgebiet, Bestand „${labels.bestand(e.bestand)}“ benannt, Zeitraum „${labels.zeitraum(e.zeitraum)}“.`,
    ],
    hinweise,
    kunde: 'Ihr Vorhaben passt zu unserer Erstprüfung. Die Kalkulation meldet sich persönlich und stimmt einen Ortstermin mit Ihnen ab.',
    buero: 'Priorisiert an die Kalkulation übergeben, Ortstermin abstimmen.',
  };
}
