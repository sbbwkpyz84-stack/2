import Link from 'next/link';
import { company, fakten, verantwortlich } from '@/lib/company';
import { leistungen, projekte } from '@/lib/content';
import { Section, ProjektKarte, Ablauf, Foto, KontaktLeiste } from '@/components/site';
import VorCheck from '@/components/vorcheck';

export default function Start() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Dachdeckerei und Spenglerei in Anzing bei München</p>
            <h1>Flachdach, Abdichtung und Profilblech für Gewerbe, Wohnungsbau und öffentliche Bauten</h1>
            <p className="lead">
              Wir sanieren und bauen Dächer und Fassaden in {company.region} – vom 480-m²-Flachdach bis zum 15.000-m²-Hallendach.
            </p>
            <ul className="chips" aria-label="Kundengruppen">
              {company.kundengruppen.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
            <div className="actions">
              <Link href="/projekte" className="btn btn-secondary">Vergleichbare Projekte ansehen</Link>
              <Link href="/kontakt#anfrage" className="btn btn-ghost">Andere Leistung anfragen</Link>
            </div>
          </div>
          <div>
            <VorCheck />
            <p className="small" style={{ marginTop: '.5rem' }}>
              Projekt-Check für Flachdachsanierungen. Erstprüfung durch {verantwortlich.name}, {verantwortlich.rolle}.
            </p>
          </div>
        </div>
      </section>

      <Section title="Überprüfbare Fakten">
        <div className="grid grid-4">
          {fakten.map((f) => (
            <div className="card fakt" key={f.wert}>
              <strong>{f.wert}</strong>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Leistungen" alt lead="Jede Leistung hat eine eigene Seite mit Umfang, Eignung, Referenzen und direktem Anfrageweg.">
        <div className="grid grid-3">
          {leistungen.map((l) => (
            <article className="card" key={l.slug}>
              <h3><Link href={`/leistungen/${l.slug}`}>{l.titel}</Link></h3>
              <p>{l.kurz}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Ausgewählte Projekte aus der Region">
        <div className="grid grid-3">
          {projekte.slice(0, 3).map((p) => (
            <ProjektKarte key={p.id} p={p} />
          ))}
        </div>
        <div className="actions"><Link href="/projekte" className="btn btn-secondary">Alle Projekte</Link></div>
      </Section>

      <Section title="Der Betrieb" alt>
        <div className="grid grid-2">
          <Foto text="Team oder Baustelle der Bär + Seibl GmbH" hoch />
          <div>
            <p>
              Die Bär + Seibl GmbH ist ein familiengeführtes Unternehmen. Monika Rauschenbach hat den Betrieb 2025 von ihrem Vater Heinz Seibl übernommen und führt ihn in zweiter Generation als alleinige Gesellschafterin und Geschäftsführerin.
            </p>
            <p>Eigene Montageteams, eigene Spenglerwerkstatt mit CNC-Kantbänken bis 6 m und fünf vollständig eingerichtete Montagefahrzeuge.</p>
            <div className="actions">
              <Link href="/betrieb" className="btn btn-secondary">Mehr zum Betrieb</Link>
              <Link href="/karriere" className="btn btn-ghost">Im Team mitarbeiten</Link>
            </div>
          </div>
        </div>
      </Section>

      <Section title="So läuft die Zusammenarbeit">
        <Ablauf />
        <KontaktLeiste />
      </Section>
    </>
  );
}
