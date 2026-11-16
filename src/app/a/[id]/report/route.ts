import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { auditZugriff } from '@/lib/server';
import { BESTAND, OBJEKTE, STATUS_LABEL, ZEITRAUM } from '@/lib/vorcheck';

export const dynamic = 'force-dynamic';

// Persönlicher Audit-Report: nur mit gültigem Token, nicht indexierbar, nicht cachebar.
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const audit = auditZugriff(id, new URL(req.url).searchParams.get('k'));
  if (!audit) return new Response('Nicht gefunden', { status: 404 });

  const pdf = await PDFDocument.create();
  pdf.setTitle(`Audit-Report #${audit.id} – ${audit.firma}`);
  pdf.setLanguage('de-DE');
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let page = pdf.addPage([595, 842]);
  let y = 790;
  const zeile = (text: string, size = 11, f = font, farbe = rgb(0.11, 0.15, 0.16)) => {
    const worte = text.split(' ');
    let akt = '';
    const zeilen: string[] = [];
    for (const w of worte) {
      const test = akt ? `${akt} ${w}` : w;
      if (f.widthOfTextAtSize(test, size) > 495) {
        zeilen.push(akt);
        akt = w;
      } else akt = test;
    }
    zeilen.push(akt);
    for (const z of zeilen) {
      if (y < 60) {
        page = pdf.addPage([595, 842]);
        y = 790;
      }
      page.drawText(z, { x: 50, y, size, font: f, color: farbe });
      y -= size * 1.45;
    }
  };
  const h = (t: string) => {
    y -= 10;
    zeile(t, 14, bold, rgb(0.06, 0.35, 0.46));
    y -= 2;
  };

  zeile('ELVIANE', 10, bold);
  zeile(`Audit-Code #${audit.id} · Persönliche Auswertung für ${audit.firma}`, 10);
  zeile(`Stand: ${audit.datum}`, 10);
  y -= 8;
  zeile('Projektanfragen vorprüfen und Zeit im Betrieb sparen', 20, bold);

  h('1. Ausgangslage');
  zeile(`Grundlage ist die öffentlich einsehbare Website des Betriebs (abgerufen am ${audit.datum}). Leistungen: Abdichtungen, Dachdecker- und Spenglerarbeiten, Fassadenverkleidungen, Profilblechbau, Sonderleistungen. Referenzen in Anzing, Poing, Haar, Erding, Moosinning, Aschheim, Garching, Ottobrunn und München.`);

  h(`2. Vorgeschlagener Projekt-Check: ${audit.leistung}`);
  zeile(`Auswahl 1 – Objekt: ${OBJEKTE.map((o) => o.label).join('; ')}.`);
  zeile(`Auswahl 2 – Bestand: ${BESTAND.map((o) => o.label).join('; ')}.`);
  zeile(`Auswahl 3 – Zeitraum: ${ZEITRAUM.map((o) => o.label).join('; ')}.`);
  zeile('Danach auf der Betriebswebsite: PLZ, Name und Rückkontakt; Kommentar, Fotos, Pläne oder Leistungsverzeichnis freiwillig.');

  h('3. Einstufung (Regelvorschlag, Freigabe durch den Betrieb offen)');
  zeile(`${STATUS_LABEL.gruen}: Objekt im Einsatzgebiet, Bestand und Zeitraum benannt. Büro: priorisiert an die Kalkulation, Ortstermin abstimmen.`);
  zeile(`${STATUS_LABEL.gelb}: Bestand unbekannt, PLZ im Randgebiet oder Zeitrahmen offen. Büro: gezielte Rückfrage, noch kein Ortstermin.`);
  zeile(`${STATUS_LABEL.rot}: PLZ außerhalb des Einsatzgebiets. Büro: höfliche Absage mit Verweis auf die regionale Innung.`);

  h('4. Regionaler Vergleich');
  zeile('Messung offen. Vorgesehen sind: mobile Ladeleistung (LCP, INP, CLS am 75. Perzentil), abgedeckte Vorprüfkriterien, dokumentierter Stand der Barrierefreiheit und Suchabdeckung für Leistung und Ort – jeweils mit Methode, Quelle und Datum. Dieser Report enthält keine geschätzten Vergleichswerte.');

  h('5. Aufwand und Amortisation');
  zeile('Kalkulatorischer Zeitaufwand = vermeidbare Termine × Dauer × interner Stundensatz. Amortisation = Investition ÷ (Deckungsbeitrag zusätzlicher Aufträge pro Monat – laufende Kosten). Die Werte setzen Sie auf der persönlichen Seite mit Ihren eigenen Zahlen ein.');

  h('6. Umsetzung');
  zeile('Drei Etappen: Bestandsaufnahme, Umsetzung, Prüfung und Freigabe. Ziel: live in 21 Tagen und maximal 120 Minuten für die Geschäftsführung, sobald Umfang und Freigabetermine abgestimmt sind.');

  h('7. Offene Angaben zur Freigabe');
  zeile('Einsatzgebiet nach PLZ, Ausschlusskriterien, Rückmeldefrist, Zuständigkeit und Vertretung, Fotos und Bildrechte, Kostenspannen, Förderhinweise mit Prüfdatum, offene Stellen.');

  const bytes = await pdf.save();
  return new Response(Buffer.from(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="Audit-Report-${audit.id}.pdf"`,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
