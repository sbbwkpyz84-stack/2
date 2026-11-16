import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ort, orte, projekte, leistung, projekteFuer } from '@/lib/content';
import { company, verantwortlich, qualifikationen } from '@/lib/company';
import { CHECK_NAME } from '@/lib/vorcheck';
import { Breadcrumb, Section, ProjektKarte, FaqListe, JsonLd, faqLd, KontaktLeiste, Ablauf, SITE_URL_LD } from '@/components/site';
import VorCheck from '@/components/vorcheck';
import { KontaktFormular } from '@/components/forms';

type P = { params: Promise<{ ort: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => orte.map((o) => ({ ort: o.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const o = ort((await params).ort);
  if (!o) return {};
  return {
    title: `Flachdachsanierung in ${o.name} (${o.landkreis})`,
    description: `Flachdachsanierung in ${o.name}: Projekt-Check in drei Auswahlen, Referenzprojekt vor Ort, persönliche Rückmeldung vom Dachdeckermeister.`,
    alternates: { canonical: `/flachdachsanierung/${o.slug}` },
  };
}

const initialen = (n: string) => n.split(' ').map((t) => t[0]).join('');

export default async function OrtSeite({ params }: P) {
  const o = ort((await params).ort);
  if (!o) notFound();
  const l = leistung('flachdachsanierung')!;
  const lokal = projekte.find((p) => p.id === o.projekt)!;
  const weitere = projekteFuer('flachdachsanierung', 6).filter((p) => p.id !== lokal.id).slice(0, 2);
  const faq = [o.frage, ...l.faq];
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Breadcrumb items={[['Leistungen', '/leistungen'], ['Flachdachsanierung', '/leistungen/flachdachsanierung'], [o.name, `/flachdachsanierung/${o.slug}`]]} />
          <div className="hero-grid">
            <div>
              <h1>Flachdachsanierung in {o.name}</h1>
              <div className="person">
                <span className="person-bild" role="img" aria-label={`Porträt ${verantwortlich.name} (Foto folgt)`}>{initialen(verantwortlich.name)}</span>
                <p>
                  <strong>{verantwortlich.name}</strong><br />
                  {verantwortlich.rolle} – prüft Ihre Anfrage persönlich
                </p>
              </div>
              <p className="lead">{o.lokal}</p>
              <ul className="chips" aria-label="Nachweise">
                <li>Innungsbetrieb München/Oberbayern</li>
                <li>Präqualifikation Bau {company.pq}</li>
                <li>Partner: Sika, Soprema, Kalzip</li>
              </ul>
            </div>
            <div id="check">
              <VorCheck ortName={o.name} />
              <p className="small" style={{ marginTop: '.5rem' }}>
                {CHECK_NAME}: drei Auswahlen, danach PLZ, Name und Rückkontakt. Rückmeldung {company.rueckmeldung}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section title="Kosten und Voraussetzungen">
        <div className="grid grid-2">
          <div>
            <h3>Was die Kosten bestimmt</h3>
            <ul className="list">
              <li>Dachfläche und Zugänglichkeit (Kran, Schrägaufzug, Gerüst)</li>
              <li>Zustand und Aufbau des Bestands: Überarbeitung oder vollständiger Rückbau</li>
              <li>Schadstoffe wie Wellasbest – Rückbau und Entsorgung nach TRGS 519</li>
              <li>Dämmstandard und Gefälledämmung</li>
              <li>Anzahl der Durchdringungen, Lichtkuppeln, RWA-Anlagen und Anschlüsse</li>
              <li>Absturzsicherung und Arbeiten im laufenden Betrieb in Bauabschnitten</li>
            </ul>
          </div>
          <div>
            <h3>Mögliche Zusatzkosten</h3>
            <ul className="list">
              <li>Leckortung oder Bestandsöffnung vor der Sanierung</li>
              <li>Statische Berechnung bei neuer Tragschale</li>
              <li>Entwässerungs- und U-Wert-Berechnung</li>
              <li>Gerüst und Entsorgung</li>
            </ul>
            <p className="note">
              Eine Preisspanne nennen wir erst, wenn Fläche und Bestand bekannt sind. Verbindlich ist ausschließlich unser Angebot nach der Besichtigung.
            </p>
            <h3>Förderung</h3>
            <p>
              Wird bei der Sanierung die Dämmung verbessert, kann eine Förderung für Maßnahmen an der Gebäudehülle in Betracht kommen. Voraussetzungen und Fördersätze ändern sich; maßgeblich sind die aktuellen Richtlinien und in der Regel ein Antrag vor Auftragsvergabe mit Energieberatung. Wir liefern die technischen Nachweise wie die U-Wert-Berechnung.
            </p>
          </div>
        </div>
      </Section>

      <Section title={`Vergleichbare Projekte in ${o.name} und Umgebung`} alt id="projekte">
        <div className="grid grid-3">
          <ProjektKarte p={lokal} />
          {weitere.map((p) => (
            <ProjektKarte key={p.id} p={p} />
          ))}
        </div>
        <div className="actions"><Link href="/projekte" className="btn btn-secondary">Alle Projekte</Link></div>
      </Section>

      <Section title={`Was wir in ${o.name} übernehmen`}>
        <div className="grid grid-2">
          <ul className="list">
            {l.umfang.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <div>
            <h3>Belegbare Merkmale</h3>
            <ul className="list">
              <li>Eigene Montageteams mit fünf vollständig eingerichteten Montagefahrzeugen</li>
              <li>Eigene Spenglerwerkstatt in Anzing mit CNC-Kantbänken bis 6 m</li>
              {qualifikationen.map((q) => (
                <li key={q}>{q}</li>
              ))}
              <li>Vier Schweißautomaten für Kunststoffabdichtungen, Spezialfräsen für den Flachdach-Rückbau</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Ablauf" alt>
        <Ablauf />
      </Section>

      <Section title="Häufige Fragen">
        <FaqListe faq={faq} />
        <JsonLd data={faqLd(faq)} />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Flachdachsanierung',
            areaServed: { '@type': 'City', name: o.name },
            provider: { '@id': SITE_URL_LD },
          }}
        />
      </Section>

      <Section title="Kurzes Anfrageformular" alt id="anfrage">
        <KontaktFormular leistung={`Flachdachsanierung in ${o.name}`} />
        <KontaktLeiste />
      </Section>
    </>
  );
}
