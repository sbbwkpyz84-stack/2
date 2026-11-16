import { NextResponse } from 'next/server';
import { bewerte, gueltig, isPlz, labels, gebietVonPlz, GEBIET_TEXT, LEISTUNG } from '@/lib/vorcheck';
import { istKontakt, istSpam, pruefeDateien, str, uebergebe } from '@/lib/server';
import { verantwortlich, vertretung } from '@/lib/company';

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, fehler: { form: 'Die Anfrage konnte nicht gelesen werden.' } }, { status: 400 });
  }
  // Spam: nach außen wie ein Erfolg behandeln, aber nichts übergeben.
  if (istSpam(form)) return NextResponse.json({ ok: true });

  const typ = str(form.get('typ')) === 'vorcheck' ? 'vorcheck' : 'standard';
  const name = str(form.get('name'), 100);
  const kontakt = str(form.get('kontakt'), 120);
  const plz = str(form.get('plz'), 60);
  const text = str(form.get('text'), 4000);
  const fehler: Record<string, string> = {};

  if (name.length < 2) fehler.name = 'Bitte geben Sie Ihren Namen an.';
  if (!istKontakt(kontakt)) fehler.kontakt = 'Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an, unter der wir Sie erreichen.';
  if (typ === 'vorcheck') {
    if (!isPlz(plz)) fehler.plz = 'Bitte geben Sie die fünfstellige PLZ des Objekts an.';
  } else {
    if (plz.length < 2) fehler.plz = 'Bitte nennen Sie Ort oder PLZ des Objekts.';
    if (text.length < 10) fehler.text = 'Bitte beschreiben Sie Ihr Projekt in ein bis zwei Sätzen.';
  }
  const { dateien, fehler: dateiFehler } = await pruefeDateien(form, 'dateien');
  if (dateiFehler) fehler.dateien = dateiFehler;

  const eingabe = { objekt: str(form.get('objekt')), bestand: str(form.get('bestand')), zeitraum: str(form.get('zeitraum')), plz };
  if (typ === 'vorcheck' && !fehler.plz && !gueltig(eingabe)) fehler.form = 'Bitte beantworten Sie zuerst die drei Auswahlfragen.';
  if (Object.keys(fehler).length) return NextResponse.json({ ok: false, fehler }, { status: 422 });

  const ergebnis = typ === 'vorcheck' && gueltig(eingabe) ? bewerte(eingabe) : null;
  const gebiet = gebietVonPlz(plz);
  const steckbrief = {
    typ,
    leistung: ergebnis ? LEISTUNG : str(form.get('leistung'), 80) || 'Allgemeine Projektanfrage',
    objekt: ergebnis ? labels.objekt(eingabe.objekt) : undefined,
    ausgangslage: ergebnis ? labels.bestand(eingabe.bestand) : undefined,
    zeitraum: ergebnis ? labels.zeitraum(eingabe.zeitraum) : undefined,
    ort: plz,
    einsatzgebiet: gebiet ? GEBIET_TEXT[gebiet] : undefined,
    kommentar: text || undefined,
    anhaenge: dateien.map((d) => d.name),
    status: ergebnis?.label,
    gruende: ergebnis?.gruende,
    hinweise: ergebnis?.hinweise,
    naechsterSchrittBuero: ergebnis?.buero,
    name,
    kontakt,
    zustaendig: verantwortlich.name,
    vertretung: vertretung.name,
    herkunft: str(form.get('seite'), 200),
  };

  const ok = await uebergebe('anfrage', steckbrief, dateien);
  if (!ok) return NextResponse.json({ ok: false, stoerung: true }, { status: 503 });
  return NextResponse.json({ ok: true, ergebnis });
}
