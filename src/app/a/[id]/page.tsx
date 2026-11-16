import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auditZugriff, elviane, terminSlots } from '@/lib/server';
import { bewerte } from '@/lib/vorcheck';
import { StatusBox } from '@/components/tiles';
import { Demo, AufwandRechner, AmortisationRechner, Terminwahl } from '@/components/audit';
import { Section, TelIcon } from '@/components/site';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Persönliche Auswertung | ELVIANE',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noarchive: true } },
  referrer: 'no-referrer',
};

type P = { params: Promise<{ id: string }>; searchParams: Promise<{ k?: string | string[] }> };

const faelle = [
  { titel: 'Industriehalle in Poing, Wellplatten', e: { objekt: 'gewerbe', bestand: 'asbest', zeitraum: 'kurz', plz: '85586' } },
  { titel: 'Wohnanlage in Erding, Bestand unbekannt', e: { objekt: 'wohn', bestand: 'unbekannt', zeitraum: 'mittel', plz: '85435' } },
  { titel: 'Hallendach in Nürnberg', e: { objekt: 'gewerbe', bestand: 'bitumen', zeitraum: 'kurz', plz: '90402' } },
];

export default async function AuditSeite({ params, searchParams }: P) {
  const { id } = await params;
  const kRaw = (await searchParams).k;
  const k = Array.isArray(kRaw) ? kRaw[0] : kRaw;
  const audit = auditZugriff(id, k);
  if (!audit || !k) notFound();
  const q = `?k=${encodeURIComponent(k)}`;
  const callHref = elviane.telHref || '#termin';

  return (
    <div className="qr">
      <header className="qr-header">
        <div className="wrap">
          <span className="wordmark">ELVIANE</span>
          <a className="qr-call" href={callHref} aria-label={elviane.telHref ? `ELVIANE anrufen: ${elviane.tel}` : 'Rückruf: Termin wählen'}>
            <TelIcon />
          </a>
        </div>
      </header>
      <main id="inhalt">
        <section className="qr-hero">
          <div className="wrap">
            <p className="qr-code">Audit-Code #{audit.id} · Persönliche Auswertung aus unserem Schreiben für {audit.firma}</p>
            <h1>Projektanfragen vorprüfen und Zeit im Betrieb sparen</h1>
            <p className="qr-sub">
              {audit.leistung} in {audit.region}: Projekt-Check, lokale Leistungsseiten und Übergabe als Projektsteckbrief ans Büro.
            </p>
            <p className="qr-prompt">Testen Sie den Vor-Check für Ihren Betrieb. Wählen Sie ein Szenario.</p>
            <Demo vorschau={`/flachdachsanierung/${audit.vorschauOrt}`} firma={audit.firma} />
            <div className="qr-cta">
              <a className="btn btn-primary" href="#termin">25-Min. Live-Durchsprache am Prototyp sichern</a>
              <a className="btn btn-secondary" href={`/a/${audit.id}/report${q}`}>Kompletten Audit-Report als PDF öffnen</a>
            </div>
          </div>
        </section>

        <Section title="1. So kommt die Anfrage im Büro an" alt lead="Zwei Beispiele aus der Flachdachsanierung. Beide sind gekennzeichnete Beispieldaten.">
          <div className="grid grid-2">
            <div className="mail">
              <span className="sample">Beispiel · knappe Anfrage</span>
              <blockquote>„Guten Tag, unser Hallendach ist undicht. Was kostet eine Sanierung? Bitte um Rückruf.“</blockquote>
              <p><strong>Rückfragen, die daraus entstehen:</strong></p>
              <ul className="list">
                <li>Wo steht das Gebäude – im Einsatzgebiet?</li>
                <li>Was für ein Objekt, wie groß ungefähr?</li>
                <li>Bitumen, Kunststoffbahn oder Wellasbest?</li>
                <li>Akut oder geplante Sanierung, bis wann?</li>
                <li>Gibt es Fotos, Pläne oder ein Leistungsverzeichnis?</li>
              </ul>
            </div>
            <div className="steckbrief">
              <span className="sample">Beispiel · Projektsteckbrief</span>
              <dl>
                <dt>Leistung</dt><dd>Flachdachsanierung</dd>
                <dt>Objekt</dt><dd>Gewerbe- oder Industriehalle</dd>
                <dt>Bestand</dt><dd>Wellplatten / Faserzement</dd>
                <dt>Ort</dt><dd>85586 Poing – im Einsatzgebiet</dd>
                <dt>Zeitraum</dt><dd>In den nächsten 3 Monaten</dd>
                <dt>Freiwillig</dt><dd>3 Fotos, „ca. 2.000 m², Betrieb läuft weiter“</dd>
                <dt>Einstufung</dt><dd>Grün – passt zur Erstprüfung</dd>
                <dt>Grund</dt><dd>Objekt im Einsatzgebiet, Bestand und Zeitraum benannt</dd>
                <dt>Zuständig</dt><dd>Kalkulation, Vertretung Auftragsbearbeitung</dd>
              </dl>
            </div>
          </div>
        </Section>

        <Section title="2. Regionaler Vergleich und Aufwand">
          <div className="table-wrap">
            <table>
              <caption>Vergleich mit drei regionalen Anbietern – Messplan</caption>
              <thead>
                <tr><th scope="col">Kriterium</th><th scope="col">Messmethode</th><th scope="col">Stand</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Mobile Ladeleistung</th><td>LCP, INP, CLS am 75. Perzentil (Felddaten, sonst Labormessung mobil)</td><td>Messung offen</td></tr>
                <tr><th scope="row">Vorprüfkriterien</th><td>Zählung: Objekt, Bestand, Zeitraum, Ort, Uploads online abfragbar</td><td>Messung offen</td></tr>
                <tr><th scope="row">Barrierefreiheit</th><td>Dokumentierter Stand, Stichprobe nach WCAG 2.2 AA</td><td>Messung offen</td></tr>
                <tr><th scope="row">Suchabdeckung</th><td>Sichtbarkeit für Leistung × Ort (z. B. Flachdachsanierung Poing, Erding, Haar)</td><td>Messung offen</td></tr>
              </tbody>
            </table>
          </div>
          <p className="offen">Für diesen Audit liegen noch keine Messdaten vor. Vergleichswerte, Quellen und Messdatum erscheinen hier erst nach der Messung – wir zeigen keine geschätzten Zahlen.</p>
          <h3 style={{ marginTop: '1.5rem' }}>Ihr kalkulatorischer Zeitaufwand</h3>
          <AufwandRechner />
        </Section>

        <Section title="3. Grün, Gelb und Rot im konkreten Einsatz" alt lead="Je ein Beispielfall und was das Büro als Nächstes damit macht. Die Einstufung bereitet die fachliche Entscheidung vor – sie ersetzt sie nicht.">
          <div className="grid grid-3">
            {faelle.map((f) => (
              <div key={f.titel}>
                <span className="sample">Beispielfall</span>
                <h3>{f.titel}</h3>
                <StatusBox e={bewerte(f.e)} sicht="buero" />
              </div>
            ))}
          </div>
        </Section>

        <Section title="4. Amortisation und Nachweise">
          <AmortisationRechner />
          <p className="offen" style={{ marginTop: '1rem' }}>Prüfprotokolle und freigegebene Fallstudien mit gemessenen Ergebnissen legen wir im Gespräch vor. Ohne Beleg nennen wir keine Ergebniszahlen.</p>
        </Section>

        <Section title="5. Umsetzung und Aufwand" alt>
          <ol className="steps">
            <li><strong>Bestandsaufnahme</strong><span>ELVIANE bereitet vorhandene Angebote, technische Unterlagen und Referenzen auf und klärt Leistungen, Einsatzgebiet und Ausschlüsse.</span></li>
            <li><strong>Umsetzung</strong><span>Leistungsseiten, Projekt-Check und Übergabe ans Büro werden gebaut. Sie erhalten alles gebündelt zur Freigabe.</span></li>
            <li><strong>Prüfung und Freigabe</strong><span>Sie prüfen fachliche Regeln, Texte, Fotos und Nachweise in einem Durchgang. Danach geht die Website live.</span></li>
          </ol>
          <p className="note">Ziel: live in 21 Tagen und maximal 120 Minuten für die Geschäftsführung – verbindlich, sobald Umfang und Freigabetermine gemeinsam abgestimmt sind.</p>
        </Section>

        <Section title="6. Vier Fragen und Terminwahl" id="termin">
          <div className="faq">
            <details>
              <summary>Was übernimmt ELVIANE über die Website-Gestaltung hinaus?</summary>
              <p>Die Aufbereitung Ihrer Leistungen, Referenzen und Nachweise, die Regeln des Projekt-Checks, die Übergabe der Anfragen an Ihr Büro sowie Messung, Barrierefreiheits- und Ladezeitprüfung.</p>
            </details>
            <details>
              <summary>Wer prüft die fachlichen Regeln?</summary>
              <p>Ihr Betrieb. ELVIANE schlägt Kriterien vor; Einsatzgebiet, Ausschlüsse und Einstufungen gelten erst nach Ihrer Freigabe. Fachliche Prüfung, Kalkulation und Angebot bleiben bei Ihnen.</p>
            </details>
            <details>
              <summary>Unter welchen Annahmen rechnet sich die Investition?</summary>
              <p>Wenn der Deckungsbeitrag zusätzlicher Aufträge und die eingesparte Zeit die Investition und die laufenden Kosten übersteigen. Mit dem Rechner oben setzen Sie Ihre eigenen Werte ein.</p>
            </details>
            <details>
              <summary>Wie kontrollieren wir Domain, Code und Anfragedaten?</summary>
              <p>Domain und Hosting laufen auf Ihren Betrieb. Sie erhalten Code, Zugänge und Datenexporte; Anfragen gehen direkt an Ihr Büro.</p>
            </details>
          </div>
          <h3 style={{ marginTop: '1.5rem' }}>25-Min. Live-Durchsprache am Prototyp</h3>
          <Terminwahl slots={terminSlots()} id={audit.id} k={k} telHref={elviane.telHref} />
        </Section>
      </main>
      <nav className="qr-bar" aria-label="Schnellzugriff">
        <a className="btn btn-secondary" href={callHref}>Anrufen</a>
        <a className="btn btn-primary" href="#termin">Termin wählen</a>
      </nav>
    </div>
  );
}
