// Leistungen, Projekte und lokale Seiten. Inhalte aus der Referenzwebsite abgeleitet;
// Ergänzungen (FAQ, Eignung) sind Formulierungsvorschläge zur Freigabe durch den Betrieb.

export type Projekt = {
  id: string;
  ort: string;
  titel: string;
  objekt: string;
  leistung: string[];
  tags: string[]; // Leistungs-Slugs
  auszeichnung?: string;
  aktuell?: boolean;
  // Ausgangslage, Dauer, Ergebnis und Fotos liefert der Betrieb zur Freigabe nach.
  ausgangslage?: string;
};

export const projekte: Projekt[] = [
  {
    id: 'poing-industriehalle',
    ort: 'Poing',
    titel: 'Sanierung eines Wellasbest-Dachs, Industriehalle',
    objekt: 'Industriehalle',
    ausgangslage: 'Dach und Fassade aus Wellasbestplatten',
    leistung: ['9.300 m² Wellasbest abgebaut und entsorgt', '9.300 m² Profilblechdach', '2.500 m² Wellasbest-Fassadenplatten abgebaut, Polycarbonat-Fassade eingebaut', '410 m First- und Rinnenausbildung'],
    tags: ['flachdachsanierung', 'industrie-gewerbe-wohnbau', 'fassadenverkleidungen'],
    aktuell: true,
  },
  {
    id: 'grafing-schule',
    ort: 'Nähe Grafing',
    titel: 'Bitumenflachdach einer Schule',
    objekt: 'Schule',
    leistung: ['1.350 m² Bitumenflachdach', '195 m Schutzbleche und Attikaabdeckung aus Aluminium', '175 m Oberlichtanschlüsse', 'Umlaufende Absturzsicherung'],
    tags: ['flachdachsanierung', 'abdichtungen', 'spenglerarbeiten'],
    aktuell: true,
  },
  {
    id: 'haar-hochhaeuser',
    ort: 'Haar',
    titel: 'Sanierung von zwei Hochhäusern',
    objekt: 'Wohnhochhäuser',
    ausgangslage: 'Altes Dach einschließlich Dachstuhl',
    leistung: ['Altes Dach einschließlich Dachstuhl abgebaut', 'Neue Abdichtung mit Schaumglas und Bitumenabdichtung', 'Alle Spenglerarbeiten erneuert'],
    tags: ['flachdachsanierung', 'abdichtungen', 'spenglerarbeiten'],
    aktuell: true,
  },
  {
    id: 'moosinning-flachdach',
    ort: 'Moosinning',
    titel: 'Bitumenabdichtung mit Gefälledämmung',
    objekt: 'Flachdach',
    leistung: ['480 m² Bitumenabdichtung mit Gefälledämmung', 'Absturzsicherung', 'Attikaausbildung'],
    tags: ['flachdachsanierung', 'abdichtungen'],
    aktuell: true,
  },
  {
    id: 'erding-doppelfalz',
    ort: 'Erding',
    titel: 'Doppelfalzdach aus Titanzink, Flachdach und Tiefgarage',
    objekt: 'Wohn- und Geschäftsgebäude',
    leistung: ['160 m² Doppelfalzdach aus Titanzink einschließlich Rinnen und Attikaabdeckungen', 'ca. 860 m² Bitumenabdichtung für Tiefgarage und Flachdach'],
    tags: ['spenglerarbeiten', 'abdichtungen', 'flachdachsanierung'],
    aktuell: true,
  },
  {
    id: 'aschheim-trapezblech',
    ort: 'Aschheim',
    titel: 'Flachdach auf Trapezblech und Tiefgaragenabdichtung',
    objekt: 'Gewerbebau',
    leistung: ['1.350 m² Flachdachabdichtung auf Trapezblech als Bitumendach mit PIR-Dämmung', '500 m² Tiefgaragenabdichtung mit dem Duoflex-System'],
    tags: ['abdichtungen', 'industrie-gewerbe-wohnbau', 'flachdachsanierung'],
    aktuell: true,
  },
  {
    id: 'anzing-gruendach',
    ort: 'Anzing',
    titel: 'Flachdach mit Bitumenabdichtung und Gründach',
    objekt: 'Wohnungsbau',
    leistung: ['1.480 m² Flachdach mit Bitumenabdichtung und Gründach', '640 m² Tiefgaragenabdichtung mit dem Duoflex-System', 'Attikaabdeckung und Absturzsicherungen'],
    tags: ['abdichtungen', 'flachdachsanierung'],
    aktuell: true,
  },
  {
    id: 'garching-gewerbehalle',
    ort: 'Garching',
    titel: 'Industriebausanierung einer Gewerbehalle',
    objekt: 'Gewerbehalle',
    leistung: ['ca. 15.000 m² Tragschale mit Stahl-Trapezprofilen und Wärmedämmung', '13.500 m² Kalzip-Profile', 'Rinnenausbildung mit Sarnafil-Folienverbundblech', 'ca. 1.500 m² Abdichtung des Rinnenbereichs mit Sarnafil TS 77-20'],
    tags: ['industrie-gewerbe-wohnbau', 'spenglerarbeiten'],
  },
  {
    id: 'ottobrunn-wohngebaeude',
    ort: 'Ottobrunn',
    titel: 'Neubau von 13 Wohngebäuden',
    objekt: 'Wohnanlage',
    leistung: ['5.200 m² Pultdächer mit Kalzip-Deckung und Seilsystem', '600 m Dachrinnen und Traufbleche', 'ca. 4.000 m² Duoflex-Tiefgaragenabdichtung (Bitumen)'],
    tags: ['spenglerarbeiten', 'abdichtungen', 'industrie-gewerbe-wohnbau'],
  },
  {
    id: 'altenerding-edelstahlfassade',
    ort: 'Altenerding',
    titel: 'Flachdach mit Gründach und Blechfassade aus Edelstahl',
    objekt: 'Gewerbe-/Verwaltungsbau',
    leistung: ['500 m² FPO-Abdichtung Sarnafil TG 66-20 mit Gründach', '550 m² Fassadenprofile aus walzmattiertem Edelstahl, im eigenen Haus hergestellt und montiert'],
    tags: ['fassadenverkleidungen', 'abdichtungen'],
    auszeichnung: '1. Architekten-Preis für Fassadengestaltung',
  },
  {
    id: 'muenchen-prinz-eugen-park',
    ort: 'München, Prinz-Eugen-Park',
    titel: 'FPO-Abdichtung mit Gründach',
    objekt: 'Wohnungsbau',
    leistung: ['ca. 2.000 m² FPO-Abdichtung mit Gründach'],
    tags: ['abdichtungen'],
  },
  {
    id: 'brunnthal-doppelstehfalz',
    ort: 'Brunnthal',
    titel: 'Titanzink-Doppelstehfalzdach und Ziegeldach',
    objekt: 'Steildach',
    leistung: ['ca. 1.000 m² Titanzink-Doppelstehfalzdach', '630 m² Ziegeldach'],
    tags: ['spenglerarbeiten', 'industrie-gewerbe-wohnbau'],
  },
  {
    id: 'hoehenkirchen-kalzip',
    ort: 'Höhenkirchen-Siegertsbrunn',
    titel: 'Kalzip-Dach und Flachdach mit Bitumenabdichtung',
    objekt: 'Gewerbebau',
    leistung: ['Kalzip-Dach', 'Flachdach mit Bitumenabdichtung'],
    tags: ['spenglerarbeiten', 'abdichtungen'],
  },
  {
    id: 'muenchen-holzbau',
    ort: 'München',
    titel: 'Abdichtung eines Gebäudes in Holzbauweise',
    objekt: 'Wohnungsbau in Holzbauweise',
    leistung: ['ca. 2.300 m² Sarnafil-FPO-Abdichtung an Hauptdach, Terrassen und Laubengängen', '1.500 m Roofinox-Abdeckungen'],
    tags: ['abdichtungen', 'spenglerarbeiten'],
  },
];

export const projekteFuer = (slug: string, max = 3) => projekte.filter((p) => p.tags.includes(slug)).slice(0, max);

export type Faq = { q: string; a: string };
export type Leistung = {
  slug: string;
  titel: string;
  kurz: string;
  intro: string;
  umfang: string[];
  eignung: string[];
  varianten: { name: string; text: string }[];
  faq: Faq[];
  check?: boolean; // eigener Projekt-Check vorhanden
  altUrl?: string;
};

export const leistungen: Leistung[] = [
  {
    slug: 'flachdachsanierung',
    titel: 'Flachdachsanierung',
    kurz: 'Sanierung von Flachdächern vom Wohnhaus bis zum großen Industriedach – mit Bitumen- oder Kunststoffbahnen.',
    intro:
      'Wir sanieren Flachdächer im Raum München vom Wohnhaus bis zur Industriehalle: Rückbau des alten Aufbaus, neue Dämmung und Abdichtung, Anschlüsse, Entwässerung und Absturzsicherung aus einer Hand.',
    umfang: [
      'Fachgerechter Rückbau alter Flachdächer mit eigenen Spezialfräsen',
      'Abbau und Entsorgung von Wellasbest durch Fachkräfte nach TRGS 519',
      'Abdichtungen nach DIN 18531 mit Bitumen-, FPO- oder PVC-Bahnen sowie Flüssigkunststoff',
      'Gefälledämmung planen und verlegen, U-Wert- und Entwässerungsberechnung',
      'Attikaabdeckungen, Anschlüsse und Schutzbleche aus der eigenen Spenglerei',
      'Lichtkuppeln, Lichtbänder, RWA-Anlagen und Absturzsicherungen',
      'Elektrische Dichtigkeitsprüfung nach Fertigstellung',
    ],
    eignung: [
      'Gewerbe- und Industriehallen, auch mit großen Flächen',
      'Wohnanlagen, Mehrfamilienhäuser und Hochhäuser',
      'Schulen und andere öffentliche Gebäude',
      'Dächer mit Wellasbest- oder Faserzementdeckung, die ersetzt werden sollen',
    ],
    varianten: [
      { name: 'Bitumenabdichtung', text: 'Mehrlagiger Aufbau, bewährt bei Wohn- und Schulgebäuden, auch mit Schaumglas- oder Gefälledämmung.' },
      { name: 'Kunststoffbahn (FPO/PVC)', text: 'Einlagige, verschweißte Abdichtung, z. B. mit Sarnafil-FPO-Bahnen, auch unter Gründach.' },
      { name: 'Profilblechdach', text: 'Ersatz von Wellasbest durch ein Profilblechdach, bei Bedarf mit neuer Tragschale aus Trapezblech.' },
    ],
    faq: [
      { q: 'Woran erkenne ich, welche Abdichtung auf meinem Dach liegt?', a: 'Bitumenbahnen sind schwarz und oft beschiefert oder bekiest, Kunststoffbahnen hell und glatt. Wenn Sie unsicher sind, wählen Sie im Projekt-Check „Unbekannt“ und senden zwei bis drei Fotos mit – das genügt für die erste Einordnung.' },
      { q: 'Übernehmen Sie auch den Rückbau von Wellasbest?', a: 'Ja. Der Abbau und die Entsorgung erfolgen durch unsere Fachkräfte für Arbeiten nach TRGS 519. In Poing haben wir so 9.300 m² Industriedach saniert.' },
      { q: 'Kann die Sanierung im laufenden Betrieb erfolgen?', a: 'Bei Hallen und Wohnanlagen wird in der Regel in Bauabschnitten gearbeitet. Ob und wie das bei Ihrem Gebäude möglich ist, klären wir bei der Besichtigung.' },
      { q: 'Wie wird geprüft, ob das neue Dach dicht ist?', a: 'Nach Fertigstellung bieten wir eine elektrische Dichtigkeitsprüfung an. Bei Bestandsdächern orten wir Leckagen vor der Sanierung.' },
      { q: 'Erhalte ich im Projekt-Check einen Preis?', a: 'Nein. Der Projekt-Check ordnet Ihr Vorhaben ein. Die fachliche Prüfung, die verbindliche Kalkulation und das Angebot erstellt unsere Kalkulation nach der Besichtigung.' },
    ],
    check: true,
  },
  {
    slug: 'abdichtungen',
    titel: 'Abdichtungen',
    kurz: 'Flachdach-, Tiefgaragen- und Terrassenabdichtungen mit Bitumen, FPO, PVC und Flüssigkunststoff.',
    intro:
      'Abdichtungen nach DIN 18531 bis 18535 für Dächer, Tiefgaragen, Terrassen und Laubengänge – im Neubau wie im Bestand.',
    umfang: [
      'Flachdachabdichtungen vom Wohnhaus bis zum großen Industriedach (Bitumen- und Kunststoffbahnen)',
      'Tiefgaragenabdichtungen mit dem Soprema-Duoflex-System',
      'Folienabdichtung mit Sarnafil-FPO-Dachbahnen',
      'Abdichtungen mit Flüssigkunststoff für Anschlüsse und Details',
      'Verlegen von Terrassenplatten',
      'Dachbegrünung (über Subunternehmer)',
    ],
    eignung: ['Neubau von Wohnanlagen und Gewerbebauten', 'Tiefgaragen und befahrene Flächen', 'Terrassen, Laubengänge und Gründächer', 'Gebäude in Holzbauweise'],
    varianten: [
      { name: 'Bitumen', text: 'Mehrlagig, auch als Verbundabdichtung auf vorbereitetem Beton.' },
      { name: 'FPO / PVC', text: 'Mit Schweißautomaten verlegt, durch TÜV-geprüfte Folienschweißer.' },
      { name: 'Duoflex', text: 'Soprema-System für Tiefgaragen und genutzte Flächen.' },
    ],
    faq: [
      { q: 'Welche Unterlagen helfen für eine Ersteinschätzung?', a: 'Pläne oder ein Leistungsverzeichnis, die ungefähre Fläche und – im Bestand – Fotos der Fläche und der Anschlüsse.' },
      { q: 'Führen Sie die Dachbegrünung selbst aus?', a: 'Die Abdichtung unter dem Gründach führen wir selbst aus, die Begrünung übernimmt ein Subunternehmer.' },
    ],
  },
  {
    slug: 'spenglerarbeiten',
    titel: 'Spenglerarbeiten',
    kurz: 'Bauspenglerei in allen gängigen Materialien – von der Attikaabdeckung bis zum Doppelfalzdach.',
    intro:
      'Unsere Spenglerei fertigt auf eigenen CNC-Kantbänken bis 6 m Länge und montiert mit eigenen Teams: Doppelfalzdächer, Profilblecharbeiten, Rinnen, Abdeckungen und Anschlüsse.',
    umfang: [
      'Herstellen von Doppelfalzdächern, z. B. aus Titanzink',
      'Profilblecharbeiten mit Kalzip, Hoesch und weiteren Systemen',
      'Verlegen von Trapezblechen',
      'Alu-Schutzgasschweißung',
      'Dachrinnen, Traufbleche, Attika- und Mauerabdeckungen, Schutzbleche',
    ],
    eignung: ['Wohn- und Gewerbeneubau', 'Sanierung von Hochhäusern und Wohnanlagen', 'Architektonisch anspruchsvolle Dach- und Fassadenflächen'],
    varianten: [
      { name: 'Titanzink', text: 'Doppelstehfalzdächer und Entwässerung.' },
      { name: 'Aluminium', text: 'Kalzip-Profile, Abdeckungen, geschweißte Sonderteile.' },
      { name: 'Edelstahl', text: 'Abdeckungen (z. B. Roofinox) und Fassadenprofile.' },
    ],
    faq: [
      { q: 'Fertigen Sie Profile selbst?', a: 'Ja. Kantteile bis 6 m Länge und Doppelfalzprofile entstehen auf eigenen Maschinen im Betrieb in Anzing.' },
      { q: 'Übernehmen Sie auch einzelne Spenglerleistungen im Rahmen einer Ausschreibung?', a: 'Ja. Senden Sie uns das Leistungsverzeichnis über das Anfrageformular oder per E-Mail.' },
    ],
  },
  {
    slug: 'fassadenverkleidungen',
    titel: 'Fassadenverkleidungen',
    kurz: 'Metallfassaden aus Trapezblechen, Sandwichprofilen und Kalzip-Fassadenprofilen.',
    intro:
      'Wir planen, fertigen und montieren Metallfassaden für Hallen und Gewerbebauten – einschließlich statischer Berechnung der Fassadenelemente.',
    umfang: ['Fassaden aus Trapezblechen', 'Fassaden aus Sandwichprofilen', 'Kalzip-Fassadenprofile', 'Fassadenprofile aus Edelstahl aus eigener Fertigung', 'Rückbau von Wellasbest-Fassadenplatten und Ersatz, z. B. durch Polycarbonat'],
    eignung: ['Industrie- und Gewerbehallen', 'Verwaltungs- und Geschäftsgebäude', 'Sanierung asbesthaltiger Fassaden'],
    varianten: [
      { name: 'Trapezblech', text: 'Wirtschaftliche Hallenfassade.' },
      { name: 'Sandwichprofil', text: 'Wand und Dämmung in einem Element.' },
      { name: 'Sonderprofile', text: 'Individuell gekantete Profile, z. B. aus walzmattiertem Edelstahl.' },
    ],
    faq: [{ q: 'Gibt es ein Referenzprojekt?', a: 'In Altenerding haben wir 550 m² Fassadenprofile aus Edelstahl im eigenen Haus hergestellt und montiert. Das Projekt erhielt den 1. Architekten-Preis für Fassadengestaltung.' }],
  },
  {
    slug: 'industrie-gewerbe-wohnbau',
    titel: 'Industrie-, Gewerbe- und Wohnbau',
    kurz: 'Dächer für große Bauvorhaben: Tragschalen aus Trapezblech, Abdichtung, Ziegeldach, Lichtkuppeln und Absturzsicherung.',
    intro:
      'Für Bauunternehmen, Planungsbüros und Bauherren führen wir das komplette Dach aus – von der Tragschale einschließlich Statik bis zur Absturzsicherung.',
    umfang: [
      'Verlegen von Tragschalen aus Trapezblechen einschließlich Statik',
      'Abdichtungen nach DIN 18531–18535',
      'Flachdachabdichtungen mit Bitumen- und Kunststoffbahnen',
      'Ziegeldächer und Altbausanierung',
      'Einbau von Lichtkuppeln, Lichtbändern, RWA-Anlagen und Velux-Fenstern',
      'Absturzsicherungen und Gerüstbau',
    ],
    eignung: ['Hallenneubau und Hallensanierung', 'Wohnanlagen mit mehreren Gebäuden', 'Öffentliche Bauvorhaben mit Ausschreibung'],
    varianten: [
      { name: 'Neubau', text: 'Ausführung nach Plan und Leistungsverzeichnis.' },
      { name: 'Sanierung', text: 'In Bauabschnitten, abgestimmt auf die Nutzung des Gebäudes.' },
    ],
    faq: [
      { q: 'Wie reiche ich eine Ausschreibung ein?', a: 'Laden Sie das Leistungsverzeichnis (PDF oder GAEB) im Anfrageformular hoch oder senden Sie es per E-Mail. Nennen Sie bitte Abgabefrist und Ausführungszeitraum.' },
      { q: 'Welche Nachweise liegen vor?', a: 'Präqualifikation Bau (Registriernummer 010.013850), Mitgliedschaft in der Dachdecker-Innung München/Oberbayern und Betriebshaftpflicht. Weitere Nachweise stellen wir auf Anfrage bereit.' },
    ],
  },
  {
    slug: 'sonderleistungen',
    titel: 'Sonderleistungen',
    kurz: 'Leckortung, Dichtigkeitsprüfung, Berechnungen und Planung rund um das Dach.',
    intro: 'Berechnungen, Prüfungen und ergänzende Arbeiten, die ein Dachprojekt absichern.',
    umfang: [
      'Leckortung bei Flachdächern',
      'Elektrische Dichtigkeitsprüfung nach Fertigstellung der Arbeiten',
      'Entwässerungsberechnungen',
      'U-Wert-Berechnungen',
      'Planen von Gefälledämmung',
      'Statische Berechnung für Trapezbleche und Fassadenelemente',
      'Zimmerarbeiten',
      'Dachbegrünung (über Subunternehmer)',
    ],
    eignung: ['Eigentümer und Verwaltungen mit undichtem Flachdach', 'Planungsbüros, die Berechnungen und Ausführung aus einer Hand wünschen'],
    varianten: [
      { name: 'Vor der Sanierung', text: 'Leckortung und Bestandsaufnahme.' },
      { name: 'Planung', text: 'Entwässerung, U-Wert, Gefälle, Statik.' },
      { name: 'Nach Fertigstellung', text: 'Elektrische Dichtigkeitsprüfung.' },
    ],
    faq: [{ q: 'Kann ich nur eine Leckortung beauftragen?', a: 'Sprechen Sie uns an. Wir klären, ob eine Leckortung als Einzelleistung an Ihrem Standort möglich ist.' }],
  },
];

export const leistung = (slug: string) => leistungen.find((l) => l.slug === slug);

// Alte URLs der bisherigen Website -> neue Seiten (301)
export const weiterleitungen: [string, string][] = [
  ['/leistung', '/leistungen'],
  ['/referenzen', '/projekte'],
  ['/abdichtungen', '/leistungen/abdichtungen'],
  ['/bauspengler-arbeiten', '/leistungen/spenglerarbeiten'],
  ['/fassadenverkleidungen', '/leistungen/fassadenverkleidungen'],
  ['/industrie-gewerbe-und-wohnbau', '/leistungen/industrie-gewerbe-wohnbau'],
  ['/sonderleistungen', '/leistungen/sonderleistungen'],
  ['/privacy-policy', '/datenschutz'],
];

// Lokale Leistungsseiten: nur Orte mit eigenem Referenzprojekt.
export type Ort = { slug: string; name: string; landkreis: string; plz: string; projekt: string; lokal: string; frage: Faq };
export const orte: Ort[] = [
  {
    slug: 'poing',
    name: 'Poing',
    landkreis: 'Landkreis Ebersberg',
    plz: '85586',
    projekt: 'poing-industriehalle',
    lokal: 'Poing liegt nur wenige Kilometer von unserem Betrieb in Anzing entfernt. Für Hallen und Gewerbebauten im Ort sind wir entsprechend schnell auf der Baustelle.',
    frage: { q: 'Sanieren Sie in Poing auch Hallendächer mit Asbest?', a: 'Ja. In Poing haben wir 9.300 m² Wellasbest abgebaut, entsorgt und durch ein Profilblechdach ersetzt – ausgeführt von Fachkräften nach TRGS 519.' },
  },
  {
    slug: 'haar',
    name: 'Haar',
    landkreis: 'Landkreis München',
    plz: '85540',
    projekt: 'haar-hochhaeuser',
    lokal: 'In Haar betreuen wir vor allem Wohnanlagen und Hochhäuser, bei denen Dach und Spenglerarbeiten gemeinsam erneuert werden.',
    frage: { q: 'Arbeiten Sie in Haar auch für Hausverwaltungen und Eigentümergemeinschaften?', a: 'Ja. In Haar haben wir zwei Hochhäuser saniert: alter Dachaufbau abgebaut, neue Abdichtung mit Schaumglas und Bitumen, alle Spenglerarbeiten erneuert.' },
  },
  {
    slug: 'moosinning',
    name: 'Moosinning',
    landkreis: 'Landkreis Erding',
    plz: '85452',
    projekt: 'moosinning-flachdach',
    lokal: 'Im Landkreis Erding sind wir regelmäßig tätig – von Moosinning über Erding bis Altenerding.',
    frage: { q: 'Planen Sie bei der Sanierung auch die Entwässerung neu?', a: 'Ja. In Moosinning haben wir 480 m² Bitumenabdichtung mit Gefälledämmung ausgeführt. Gefälle- und Entwässerungsberechnung erstellen wir selbst.' },
  },
  {
    slug: 'anzing',
    name: 'Anzing',
    landkreis: 'Landkreis Ebersberg',
    plz: '85646',
    projekt: 'anzing-gruendach',
    lokal: 'Anzing ist unser Firmensitz. Werkstatt, Kantbänke und Montagefahrzeuge stehen in der Hirnerstraße.',
    frage: { q: 'Kann ich mit Unterlagen direkt im Betrieb vorbeikommen?', a: 'Gern während der Bürozeiten nach kurzer telefonischer Abstimmung, damit die Kalkulation Zeit für Sie hat.' },
  },
];
export const ort = (slug: string) => orte.find((o) => o.slug === slug);
