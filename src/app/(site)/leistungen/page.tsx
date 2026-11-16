import type { Metadata } from 'next';
import Link from 'next/link';
import { leistungen, orte } from '@/lib/content';
import { Breadcrumb, Section, KontaktLeiste } from '@/components/site';

export const metadata: Metadata = {
  title: 'Leistungen: Flachdach, Abdichtung, Spenglerei, Fassade',
  description: 'Leistungen der Bär + Seibl GmbH: Flachdachsanierung, Abdichtungen, Spenglerarbeiten, Fassadenverkleidungen, Industrie-, Gewerbe- und Wohnbau sowie Sonderleistungen.',
  alternates: { canonical: '/leistungen' },
};

const einstiege = [
  ['Sanierung', 'Flachdach undicht oder am Ende der Lebensdauer? Der Projekt-Check ordnet Ihr Vorhaben in drei Auswahlen ein.', '/leistungen/flachdachsanierung#check', 'Projekt-Check starten'],
  ['Neubau', 'Dach, Abdichtung, Spenglerarbeiten oder Fassade nach Plan. Senden Sie uns Pläne und Eckdaten.', '/kontakt#anfrage', 'Neubauprojekt anfragen'],
  ['Ausschreibung', 'Leistungsverzeichnis als PDF oder GAEB hochladen. Präqualifikation Bau liegt vor.', '/kontakt#anfrage', 'Leistungsverzeichnis senden'],
  ['Leckortung und Prüfung', 'Leckortung am Flachdach oder elektrische Dichtigkeitsprüfung.', '/leistungen/sonderleistungen', 'Zu den Sonderleistungen'],
];

export default function Leistungen() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumb items={[['Leistungen', '/leistungen']]} />
        <h1>Leistungen</h1>
        <p className="lead">Dachdeckerei, Spenglerei, Flachdachsanierung und Profilblechbau – für Gewerbe und Industrie, Wohnungsbau, Hausverwaltungen und öffentliche Auftraggeber.</p>
      </div>
      <Section title="Womit können wir helfen?">
        <div className="grid grid-4">
          {einstiege.map(([t, d, href, cta]) => (
            <article className="card" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
              <p><Link href={href}>{cta}</Link></p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Alle Leistungen" alt>
        <div className="grid grid-3">
          {leistungen.map((l) => (
            <article className="card" key={l.slug}>
              <h3><Link href={`/leistungen/${l.slug}`}>{l.titel}</Link></h3>
              <p>{l.kurz}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Flachdachsanierung vor Ort">
        <ul className="chips">
          {orte.map((o) => (
            <li key={o.slug}><Link href={`/flachdachsanierung/${o.slug}`}>Flachdachsanierung in {o.name}</Link></li>
          ))}
        </ul>
        <KontaktLeiste />
      </Section>
    </>
  );
}
