import { NextResponse } from 'next/server';
import { istKontakt, istSpam, pruefeDateien, str, uebergebe } from '@/lib/server';

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, fehler: { form: 'Die Bewerbung konnte nicht gelesen werden.' } }, { status: 400 });
  }
  if (istSpam(form)) return NextResponse.json({ ok: true });
  const name = str(form.get('name'), 100);
  const kontakt = str(form.get('kontakt'), 120);
  const fehler: Record<string, string> = {};
  if (name.length < 2) fehler.name = 'Bitte geben Sie Ihren Namen an.';
  if (!istKontakt(kontakt)) fehler.kontakt = 'Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.';
  const { dateien, fehler: dateiFehler } = await pruefeDateien(form, 'lebenslauf', ['pdf', 'jpg', 'jpeg', 'png']);
  if (dateiFehler) fehler.lebenslauf = dateiFehler;
  if (Object.keys(fehler).length) return NextResponse.json({ ok: false, fehler }, { status: 422 });

  const ok = await uebergebe('bewerbung', { name, kontakt, bereich: str(form.get('bereich'), 60), nachricht: str(form.get('text'), 2000) || undefined, anhaenge: dateien.map((d) => d.name) }, dateien);
  if (!ok) return NextResponse.json({ ok: false, stoerung: true }, { status: 503 });
  return NextResponse.json({ ok: true });
}
