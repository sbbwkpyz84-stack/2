import type { Metadata } from 'next';
import { company } from '@/lib/company';

export const metadata: Metadata = { title: 'Datenschutz', alternates: { canonical: '/datenschutz' } };

// Entwurf, ausgerichtet am tatsächlichen Betrieb dieser Website. Hosting-Anbieter, Empfänger der Übergabe
// und Löschfristen sind vor Veröffentlichung zu ergänzen und rechtlich zu prüfen (docs/FREIGABE.md).
export default function Datenschutz() {
  return (
    <div className="wrap section">
      <h1>Datenschutzerklärung</h1>
      <p className="offen"><strong>Entwurf zur Freigabe.</strong> Hosting-Anbieter, Auftragsverarbeiter und Löschfristen werden vor der Veröffentlichung ergänzt und rechtlich geprüft.</p>
      <h2>Verantwortlicher</h2>
      <p>{company.name}, {company.street}, {company.zip} {company.city}, Telefon {company.tel}, E-Mail {company.email}</p>
      <h2>Aufruf der Website</h2>
      <p>Beim Aufruf verarbeitet der Hosting-Anbieter technisch notwendige Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, abgerufene Seite), um die Website auszuliefern und abzusichern (Art. 6 Abs. 1 lit. f DSGVO). Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken und bindet keine Inhalte von Drittanbietern ein.</p>
      <h2>Projekt-Check und Anfrageformular</h2>
      <p>Wir verarbeiten Ihre Auswahlen, PLZ oder Ort, Namen, Rückkontakt sowie freiwillige Angaben und Dateien, um Ihre Anfrage zu prüfen und zu beantworten (Art. 6 Abs. 1 lit. b DSGVO). Die Angaben werden an unser Büro übergeben und dort von den zuständigen Mitarbeitern bearbeitet. Kommt kein Auftrag zustande, löschen wir die Anfrage nach Ablauf der intern festgelegten Frist; bei Aufträgen gelten die gesetzlichen Aufbewahrungsfristen.</p>
      <h2>Bewerbungen</h2>
      <p>Bewerbungsdaten verarbeiten wir ausschließlich für das Bewerbungsverfahren (§ 26 BDSG, Art. 6 Abs. 1 lit. b DSGVO). Zugriff hat die Geschäftsführung. Nach Abschluss des Verfahrens löschen wir die Unterlagen nach Ablauf der intern festgelegten Frist, sofern Sie keiner längeren Speicherung zugestimmt haben.</p>
      <h2>Basismessung</h2>
      <p>Wir zählen, wie oft Telefon- und E-Mail-Links angeklickt und Formulare abgesendet werden. Erfasst werden nur der Name des Ereignisses und der Seitenpfad – keine IP-Adresse, keine Cookies, keine Kennung, kein Profil.</p>
      <h2>Ihre Rechte</h2>
      <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständig ist das Bayerische Landesamt für Datenschutzaufsicht.</p>
    </div>
  );
}
