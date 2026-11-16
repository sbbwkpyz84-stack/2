import type { Metadata } from 'next';
import { company, team, fakten, qualifikationen, maschinen, partner } from '@/lib/company';
import { Breadcrumb, Section, Foto } from '@/components/site';
import { KontaktLink } from '@/components/track';

export const metadata: Metadata = {
  title: 'Der Betrieb: Team, Qualifikationen und Maschinenpark',
  description: 'Familiengeführte Dachdeckerei und Spenglerei in Anzing: 14 Mitarbeiter, Innungsbetrieb, Präqualifikation Bau, eigener Maschinenpark.',
  alternates: { canonical: '/betrieb' },
};

export default function Betrieb() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumb items={[['Betrieb', '/betrieb']]} />
        <h1>Der Betrieb</h1>
        <div className="grid grid-2">
          <div>
            <p className="lead">
              Die Bär + Seibl GmbH ist ein familiengeführtes Unternehmen. Monika Rauschenbach hat den Betrieb 2025 als Erbin von ihrem Vater Heinz Seibl übernommen und führt ihn in zweiter Generation als alleinige Gesellschafterin und Geschäftsführerin.
            </p>
            <p>Wir sind Mitglied der <a href="http://www.dachdeckerinnung-obb.de" rel="noopener">Dachdecker-Innung München/Oberbayern</a> und präqualifiziert (Zertifizierung Bau, Registriernummer {company.pq}).</p>
          </div>
          <Foto text="Team der Bär + Seibl GmbH" hoch />
        </div>
      </div>
      <Section title="Auf einen Blick">
        <div className="grid grid-4">
          {fakten.map((f) => (
            <div className="card fakt" key={f.wert}><strong>{f.wert}</strong><span>{f.text}</span></div>
          ))}
        </div>
      </Section>
      <Section title="Ansprechpersonen" alt>
        <div className="grid grid-2">
          {team.map((p) => (
            <article className="card" key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.rolle}<br /><span className="small">{p.aufgabe}</span></p>
              {(p.tel || p.email) && (
                <p>
                  {p.tel && <>Direktwahl <KontaktLink href={p.telHref!}>{p.tel}</KontaktLink><br /></>}
                  {p.email && <KontaktLink href={`mailto:${p.email}`}>{p.email}</KontaktLink>}
                </p>
              )}
            </article>
          ))}
        </div>
      </Section>
      <Section title="Qualifikationen und Maschinenpark">
        <div className="grid grid-2">
          <div>
            <h3>Zusatzausbildungen</h3>
            <ul className="list">{qualifikationen.map((q) => <li key={q}>{q}</li>)}</ul>
            <h3>Partner</h3>
            <ul className="list">{partner.map((p) => <li key={p.name}><a href={p.url} rel="noopener">{p.name}</a></li>)}</ul>
          </div>
          <div>
            <h3>Maschinen und Geräte</h3>
            <ul className="list">{maschinen.map((q) => <li key={q}>{q}</li>)}</ul>
          </div>
        </div>
      </Section>
    </>
  );
}
