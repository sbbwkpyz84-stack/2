import type { Metadata } from 'next';
import Link from 'next/link';
import { company, team, verantwortlich, vertretung } from '@/lib/company';
import { Breadcrumb, Section } from '@/components/site';
import { KontaktFormular } from '@/components/forms';
import { KontaktLink } from '@/components/track';

export const metadata: Metadata = {
  title: 'Kontakt und Projektanfrage',
  description: 'Kontakt zur Bär + Seibl GmbH in Anzing: Telefon +49 8121 41127, Anfrageformular, Bürozeiten und Ansprechpersonen.',
  alternates: { canonical: '/kontakt' },
};

export default function Kontakt() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumb items={[['Kontakt', '/kontakt']]} />
        <h1>Kontakt</h1>
        <div className="grid grid-3">
          <div className="card">
            <h2>Anrufen</h2>
            <p><KontaktLink href={company.telHref} className="btn btn-primary">{company.tel}</KontaktLink></p>
            <ul className="plain">{company.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}</ul>
          </div>
          <div className="card">
            <h2>Schreiben</h2>
            <p><KontaktLink href={`mailto:${company.email}`}>{company.email}</KontaktLink><br />Fax {company.fax}</p>
            <p>Flachdach sanieren? <Link href="/leistungen/flachdachsanierung#check">Zum Projekt-Check</Link></p>
          </div>
          <div className="card">
            <h2>Anschrift</h2>
            <address>{company.name}<br />Dachdeckerei – Spenglerei<br />{company.street}<br />{company.zip} {company.city}</address>
          </div>
        </div>
      </div>
      <Section title="Projekt anfragen" id="anfrage" lead={`Kurz beschreiben genügt. Wir melden uns ${company.rueckmeldung}. Anfragen prüft ${verantwortlich.name} (${verantwortlich.rolle}), in Vertretung ${vertretung.name}.`}>
        <KontaktFormular />
      </Section>
      <Section title="Ansprechpersonen" alt>
        <div className="grid grid-2">
          {team.map((p) => (
            <article className="card" key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.rolle}</p>
              <p>
                {p.tel && <>Direktwahl <KontaktLink href={p.telHref!}>{p.tel}</KontaktLink><br /></>}
                {p.email && <KontaktLink href={`mailto:${p.email}`}>{p.email}</KontaktLink>}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
