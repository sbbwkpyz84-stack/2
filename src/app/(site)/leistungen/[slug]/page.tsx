import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { leistung, leistungen, projekteFuer, orte } from '@/lib/content';
import { company, verantwortlich } from '@/lib/company';
import { Breadcrumb, Section, ProjektKarte, FaqListe, JsonLd, faqLd, KontaktLeiste, Ablauf } from '@/components/site';
import VorCheck from '@/components/vorcheck';
import { KontaktFormular } from '@/components/forms';

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => leistungen.map((l) => ({ slug: l.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = leistung((await params).slug);
  if (!l) return {};
  return { title: `${l.titel} im Raum München, Ebersberg und Erding`, description: l.kurz, alternates: { canonical: `/leistungen/${l.slug}` } };
}

export default async function LeistungSeite({ params }: P) {
  const l = leistung((await params).slug);
  if (!l) notFound();
  const refs = projekteFuer(l.slug);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Breadcrumb items={[['Leistungen', '/leistungen'], [l.titel, `/leistungen/${l.slug}`]]} />
          <div className="hero-grid">
            <div>
              <h1>{l.titel}</h1>
              <p className="lead">{l.intro}</p>
              <p>Einsatzgebiet: {company.region}.</p>
              {!l.check && (
                <div className="actions">
                  <a href="#anfrage" className="btn btn-primary">Projekt anfragen</a>
                  <a href="#projekte" className="btn btn-secondary">Referenzen ansehen</a>
                </div>
              )}
            </div>
            {l.check && (
              <div id="check">
                <VorCheck />
                <p className="small" style={{ marginTop: '.5rem' }}>Erstprüfung durch {verantwortlich.name}, {verantwortlich.rolle}.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Section title="Leistungsumfang">
        <ul className="list">
          {l.umfang.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </Section>

      <Section title="Für wen und wofür geeignet" alt>
        <div className="grid grid-2">
          <div>
            <h3>Eignung</h3>
            <ul className="list">
              {l.eignung.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Varianten</h3>
            <dl className="facts">
              {l.varianten.map((v) => (
                <div key={v.name}><dt>{v.name}</dt><dd>{v.text}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {l.slug === 'industrie-gewerbe-wohnbau' && (
        <Section title="Für gewerbliche und öffentliche Auftraggeber">
          <ul className="list">
            <li>Präqualifikation Bau, Registriernummer {company.pq} – Eignungsnachweise sind dort hinterlegt.</li>
            <li>Leistungsverzeichnisse nehmen wir als PDF oder GAEB-Datei entgegen.</li>
            <li>Betriebshaftpflicht: ERGO Versicherung AG, Geltungsraum Bundesrepublik Deutschland.</li>
            <li>Rahmenverträge und E-Rechnung: Bitte sprechen Sie uns an, wir stimmen Format und Ablauf mit Ihnen ab.</li>
          </ul>
        </Section>
      )}

      {refs.length > 0 && (
        <Section title="Referenzen" id="projekte">
          <div className="grid grid-3">
            {refs.map((p) => (
              <ProjektKarte key={p.id} p={p} />
            ))}
          </div>
          <div className="actions"><Link href="/projekte" className="btn btn-secondary">Alle Projekte</Link></div>
        </Section>
      )}

      {l.check && (
        <Section title="Flachdachsanierung in Ihrer Nähe" alt>
          <ul className="chips">
            {orte.map((o) => (
              <li key={o.slug}><Link href={`/flachdachsanierung/${o.slug}`}>{o.name}</Link></li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Ablauf">
        <Ablauf />
      </Section>

      <Section title="Häufige Fragen" alt>
        <FaqListe faq={l.faq} />
        <JsonLd data={faqLd(l.faq)} />
      </Section>

      <Section title={l.check ? 'Lieber frei beschreiben? Kurzes Anfrageformular' : `${l.titel} anfragen`} id="anfrage">
        <KontaktFormular leistung={l.titel} />
        <KontaktLeiste />
      </Section>
    </>
  );
}
