import type { Metadata } from 'next';
import { company } from '@/lib/company';

export const metadata: Metadata = { title: 'Barrierefreiheit', alternates: { canonical: '/barrierefreiheit' } };

export default function Barrierefreiheit() {
  return (
    <div className="wrap section">
      <h1>Barrierefreiheit</h1>
      <p>Diese Website soll für alle Menschen nutzbar sein. Unser Ziel ist die Konformität mit WCAG 2.2, Stufe AA.</p>
      <h2>Stand der Prüfung</h2>
      <p>Die Website wurde mit semantischem HTML, sichtbarem Tastaturfokus, beschrifteten Formularfeldern, Fehlermeldungen in Textform und ausreichenden Kontrasten umgesetzt. Die abschließende Prüfung mit Tastatur, Screenreader und auf Mobilgeräten wird vor der Veröffentlichung dokumentiert und hier mit Datum ergänzt.</p>
      <h2>Barriere melden</h2>
      <p>Wenn Sie auf ein Hindernis stoßen, erreichen Sie uns unter {company.tel} oder {company.email}. Wir helfen Ihnen auf dem für Sie passenden Weg weiter.</p>
    </div>
  );
}
