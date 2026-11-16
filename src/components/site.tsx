import Link from 'next/link';
import type { ReactNode } from 'react';
import { company, nav, SITE_URL } from '@/lib/company';
import { KontaktLink } from './track';
import type { Projekt, Faq } from '@/lib/content';

export const TelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export function Header() {
  return (
    <header className="site-header">
      <a className="skip" href="#inhalt">Zum Inhalt springen</a>
      <div className="wrap header-row">
        <Link href="/" className="logo" aria-label={`${company.name} – Startseite`}>
          <span className="logo-mark" aria-hidden="true">B+S</span>
          <span className="logo-text">
            <strong>{company.name}</strong>
            <span>Dachdeckerei · Spenglerei</span>
          </span>
        </Link>
        <nav className="nav-desktop" aria-label="Hauptnavigation">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <KontaktLink href={company.telHref} className="header-tel" label={`Anrufen: ${company.tel}`}>
            <TelIcon />
            <span>{company.tel}</span>
          </KontaktLink>
          <Link href="/kontakt#anfrage" className="btn btn-primary btn-s">Projekt anfragen</Link>
        </div>
      </div>
      <nav className="nav-mobile" aria-label="Hauptnavigation mobil">
        <div className="wrap nav-mobile-row">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h2>{company.name}</h2>
          <address>
            Dachdeckerei – Spenglerei<br />
            {company.street}<br />
            {company.zip} {company.city}
          </address>
          <p>
            Tel. <KontaktLink href={company.telHref}>{company.tel}</KontaktLink><br />
            Fax {company.fax}<br />
            <KontaktLink href={`mailto:${company.email}`}>{company.email}</KontaktLink>
          </p>
        </div>
        <div>
          <h2>Bürozeiten</h2>
          <ul className="plain">
            {company.hours.map((h) => (
              <li key={h.days}>{h.days}: {h.time}</li>
            ))}
          </ul>
          <h2>Einsatzgebiet</h2>
          <p>{company.region}. Größere Projekte auf Anfrage auch darüber hinaus.</p>
        </div>
        <div>
          <h2>Seiten</h2>
          <ul className="plain">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
            ))}
            <li><Link href="/leistungen/flachdachsanierung">Flachdachsanierung</Link></li>
          </ul>
        </div>
        <div>
          <h2>Rechtliches</h2>
          <ul className="plain">
            <li><Link href="/impressum">Impressum</Link></li>
            <li><Link href="/datenschutz">Datenschutz</Link></li>
            <li><Link href="/barrierefreiheit">Barrierefreiheit</Link></li>
          </ul>
          <p className="small">Präqualifikation Bau, Registriernummer {company.pq}<br />Mitglied der Dachdecker-Innung München/Oberbayern</p>
        </div>
      </div>
      <div className="wrap footer-end">
        <p className="small">© {new Date().getFullYear()} {company.name}. Personenbezeichnungen gelten für alle Geschlechter.</p>
      </div>
    </footer>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const betriebLd = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  '@id': `${SITE_URL}/#betrieb`,
  name: company.name,
  url: SITE_URL,
  telephone: company.tel,
  faxNumber: company.fax,
  email: company.email,
  address: { '@type': 'PostalAddress', streetAddress: company.street, postalCode: company.zip, addressLocality: company.city, addressRegion: 'BY', addressCountry: 'DE' },
  openingHours: company.hours.map((h) => h.spec),
  areaServed: ['München', 'Landkreis Ebersberg', 'Landkreis Erding', 'Landkreis München'],
  vatID: company.ustId,
};

export const faqLd = (faq: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const breadcrumbLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}${path}` })),
});

export function Breadcrumb({ items }: { items: [string, string][] }) {
  return (
    <nav aria-label="Brotkrumen" className="crumbs">
      <ol>
        <li><Link href="/">Start</Link></li>
        {items.map(([name, path], i) => (
          <li key={path}>{i === items.length - 1 ? <span aria-current="page">{name}</span> : <Link href={path}>{name}</Link>}</li>
        ))}
      </ol>
      <JsonLd data={breadcrumbLd([['Start', '/'], ...items])} />
    </nav>
  );
}

export function Section({ title, id, children, alt, lead }: { title: string; id?: string; children: ReactNode; alt?: boolean; lead?: string }) {
  return (
    <section className={`section${alt ? ' section-alt' : ''}`} id={id}>
      <div className="wrap">
        <h2>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

// Platzhalter, bis der Betrieb freigegebene Fotos liefert (Bildrechte: siehe docs/FREIGABE.md).
export function Foto({ text, hoch }: { text: string; hoch?: boolean }) {
  return (
    <div className={`foto${hoch ? ' foto-hoch' : ''}`} role="img" aria-label={`Platzhalter: ${text}`}>
      <span>Foto zur Freigabe: {text}</span>
    </div>
  );
}

export function ProjektKarte({ p }: { p: Projekt }) {
  return (
    <article className="card projekt" id={p.id}>
      <Foto text={`${p.titel}, ${p.ort}`} />
      <p className="eyebrow">{p.ort} · {p.objekt}</p>
      <h3>{p.titel}</h3>
      {p.auszeichnung && <p className="badge">{p.auszeichnung}</p>}
      <dl className="facts">
        {p.ausgangslage && (
          <div><dt>Ausgangslage</dt><dd>{p.ausgangslage}</dd></div>
        )}
        <div>
          <dt>Ausgeführte Leistung</dt>
          <dd>
            <ul>
              {p.leistung.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function FaqListe({ faq }: { faq: Faq[] }) {
  return (
    <div className="faq">
      {faq.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Ablauf() {
  const schritte = [
    ['Projekt-Check oder Anfrage', 'Drei Auswahlen und Ihr Rückkontakt – oder das kurze Formular mit Ihrer Projektbeschreibung.'],
    ['Fachliche Prüfung', 'Die Kalkulation sichtet Ihre Angaben, stellt gezielte Rückfragen und stimmt bei Bedarf einen Ortstermin ab.'],
    ['Angebot', 'Sie erhalten ein Angebot mit Leistungsbeschreibung. Verbindlich ist ausschließlich dieses Angebot.'],
    ['Ausführung', 'Eigene Montageteams führen die Arbeiten aus, abgestimmt auf die Nutzung Ihres Gebäudes.'],
    ['Abnahme', 'Gemeinsame Abnahme, auf Wunsch mit elektrischer Dichtigkeitsprüfung.'],
  ];
  return (
    <ol className="steps">
      {schritte.map(([t, d]) => (
        <li key={t}>
          <strong>{t}</strong>
          <span>{d}</span>
        </li>
      ))}
    </ol>
  );
}

export function KontaktLeiste() {
  return (
    <p className="kontaktzeile">
      Lieber direkt? <KontaktLink href={company.telHref}>{company.tel}</KontaktLink> · <KontaktLink href={`mailto:${company.email}`}>{company.email}</KontaktLink>
    </p>
  );
}

export const SITE_URL_LD = `${SITE_URL}/#betrieb`;
