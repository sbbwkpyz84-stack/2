import type { Metadata } from 'next';
import { projekte } from '@/lib/content';
import { Breadcrumb, Section, ProjektKarte, KontaktLeiste } from '@/components/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projekte und Referenzen im Raum München',
  description: 'Referenzprojekte der Bär + Seibl GmbH: Flachdachsanierung, Abdichtung, Spenglerarbeiten und Fassaden in Poing, Haar, Erding, Anzing, Garching, Ottobrunn und München.',
  alternates: { canonical: '/projekte' },
};

export default function Projekte() {
  const neu = projekte.filter((p) => p.aktuell);
  const alt = projekte.filter((p) => !p.aktuell);
  return (
    <>
      <div className="wrap" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumb items={[['Projekte', '/projekte']]} />
        <h1>Projekte</h1>
        <p className="lead">Finden Sie ein Projekt, das Ihrem Vorhaben ähnelt – mit Ort, Objekt und ausgeführter Leistung.</p>
      </div>
      <Section title="Neueste Bauprojekte">
        <div className="grid grid-3">{neu.map((p) => <ProjektKarte key={p.id} p={p} />)}</div>
      </Section>
      <Section title="Auszug bisheriger Bauprojekte" alt>
        <div className="grid grid-3">{alt.map((p) => <ProjektKarte key={p.id} p={p} />)}</div>
      </Section>
      <Section title="Ähnliches Vorhaben?">
        <div className="actions">
          <Link href="/leistungen/flachdachsanierung#check" className="btn btn-primary">Projekt-Check starten</Link>
          <Link href="/kontakt#anfrage" className="btn btn-secondary">Projekt anfragen</Link>
        </div>
        <KontaktLeiste />
      </Section>
    </>
  );
}
