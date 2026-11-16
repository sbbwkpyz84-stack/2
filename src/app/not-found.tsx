import Link from 'next/link';
import { company } from '@/lib/company';

export default function NotFound() {
  return (
    <main className="wrap section" id="inhalt">
      <h1>Seite nicht gefunden</h1>
      <p>Die aufgerufene Seite gibt es nicht oder nicht mehr.</p>
      <p><Link href="/">Zur Startseite</Link> · <Link href="/leistungen">Leistungen</Link> · <a href={company.telHref}>{company.tel}</a></p>
    </main>
  );
}
