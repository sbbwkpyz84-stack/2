import type { Metadata } from 'next';
import { company } from '@/lib/company';

export const metadata: Metadata = { title: 'Impressum', alternates: { canonical: '/impressum' } };

export default function Impressum() {
  return (
    <div className="wrap section">
      <h1>Impressum</h1>
      <address>{company.name}<br />Dachdeckerei-Spenglerei<br />{company.street}<br />{company.zip} {company.city}</address>
      <p>Vertreten durch die Geschäftsführerin: Monika Rauschenbach</p>
      <h2>Kontakt</h2>
      <p>Telefon: {company.tel}<br />Telefax: {company.fax}<br />E-Mail: {company.email}</p>
      <h2>Registereintrag</h2>
      <p>Eintragung im Handelsregister.<br />Registergericht und Registernummer: {company.register}</p>
      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: {company.ustId}</p>
      <h2>Zuständige Kammer und Berufsbezeichnung</h2>
      <p>{company.kammer}<br />Berufsbezeichnung: {company.beruf}</p>
      <h2>Betriebshaftpflichtversicherung</h2>
      <p>{company.versicherung}</p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <h2>Haftungsausschluss</h2>
      <p>Diese Website wurde mit größtmöglicher Sorgfalt zusammengestellt. Trotzdem kann keine Gewähr für die Fehlerfreiheit und Genauigkeit der enthaltenen Informationen übernommen werden. Sofern von dieser Website auf Internetseiten verwiesen wird, die von Dritten betrieben werden, übernimmt die {company.name} keine Verantwortung für deren Inhalte.</p>
      <h2>Bildnachweise</h2>
      <p>Die Bildnachweise werden mit den freigegebenen Fotos ergänzt.</p>
      <p className="small">Aus Gründen der besseren Lesbarkeit wird auf die gleichzeitige Verwendung der Sprachformen männlich, weiblich und divers verzichtet. Sämtliche Personenbezeichnungen gelten gleichermaßen für alle Geschlechter.</p>
    </div>
  );
}
