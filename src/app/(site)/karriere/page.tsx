import type { Metadata } from 'next';
import { company } from '@/lib/company';
import { Breadcrumb, Section } from '@/components/site';
import { Schnellbewerbung } from '@/components/forms';
import { KontaktLink } from '@/components/track';

export const metadata: Metadata = {
  title: 'Karriere: Dachdecker und Spengler in Anzing',
  description: 'Arbeiten bei der Bär + Seibl GmbH in Anzing: Schnellbewerbung in einer Minute, Lebenslauf freiwillig.',
  alternates: { canonical: '/karriere' },
};

// Konkrete offene Stellen sind vom Betrieb zu bestätigen (docs/FREIGABE.md). Bis dahin: Initiativbewerbung.
const bereiche = ['Dachdecker', 'Spengler', 'Helfer / Quereinstieg', 'Ausbildung', 'Büro / Technik'];

export default function Karriere() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumb items={[['Karriere', '/karriere']]} />
        <h1>Arbeiten bei Bär + Seibl</h1>
        <p className="lead">Familiengeführter Betrieb mit 14 Mitarbeitern, eigenem Maschinenpark und Baustellen im Raum München. Bewerben Sie sich in einer Minute – der Lebenslauf ist freiwillig.</p>
        <div className="actions"><a href="#bewerbung" className="btn btn-primary">Zur Schnellbewerbung</a></div>
      </div>
      <Section title="Was Sie erwartet">
        <div className="grid grid-2">
          <dl className="facts card">
            <div><dt>Aufgaben</dt><dd>Flachdachabdichtung mit Bitumen- und Kunststoffbahnen, Spenglerarbeiten, Profilblech- und Fassadenmontage, Dachdeckerarbeiten.</dd></div>
            <div><dt>Arbeitsort</dt><dd>Betrieb in {company.zip} {company.city}, Baustellen in München und den Landkreisen Ebersberg, Erding und München.</dd></div>
            <div><dt>Bürozeiten des Betriebs</dt><dd>{company.hours.map((h) => `${h.days} ${h.time}`).join(', ')}. Die Arbeitszeiten je Stelle besprechen wir im Gespräch.</dd></div>
            <div><dt>Voraussetzungen</dt><dd>Abgeschlossene Ausbildung als Dachdecker oder Spengler oder Erfahrung am Bau. Für Quereinsteiger und Ausbildung: Sprechen Sie uns an.</dd></div>
          </dl>
          <div className="card">
            <h3>Weiterbildung im Betrieb</h3>
            <p>Unsere Mitarbeiter verfügen über Zusatzausbildungen als BBG-geprüfte Kranfahrer, TÜV-geprüfte Folienschweißer und Fachkräfte für Arbeiten nach TRGS 519.</p>
            <h3>Bewerbungsablauf</h3>
            <ol className="list">
              <li>Schnellbewerbung senden oder anrufen.</li>
              <li>Frau Rauschenbach meldet sich persönlich bei Ihnen.</li>
              <li>Kennenlernen im Betrieb in Anzing.</li>
            </ol>
          </div>
        </div>
      </Section>
      <Section title="Schnellbewerbung" alt id="bewerbung">
        <Schnellbewerbung bereiche={bereiche} />
        <p className="kontaktzeile">
          Oder direkt an Monika Rauschenbach: <KontaktLink href={`mailto:${company.bewerbungEmail}`}>{company.bewerbungEmail}</KontaktLink> · <KontaktLink href={company.telHref}>{company.tel}</KontaktLink>
        </p>
      </Section>
    </>
  );
}
