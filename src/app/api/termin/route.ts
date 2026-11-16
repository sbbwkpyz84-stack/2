import { NextResponse } from 'next/server';
import { auditZugriff, terminSlots, uebergebe } from '@/lib/server';

// Terminwahl auf der QR-Seite: Auswahl + Bestätigung genügen. Firma und Ansprechperson
// werden serverseitig über Audit-ID und Token zugeordnet.
export async function POST(req: Request) {
  let body: { id?: string; k?: string; tag?: string; zeit?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const audit = auditZugriff(String(body.id || ''), body.k);
  if (!audit) return NextResponse.json({ ok: false }, { status: 404 });
  const slot = terminSlots().find((s) => s.tag === body.tag);
  if (!slot || !slot.zeiten.includes(String(body.zeit))) return NextResponse.json({ ok: false, fehler: 'Dieser Termin steht nicht mehr zur Auswahl.' }, { status: 422 });
  const ok = await uebergebe('termin', { audit: audit.id, firma: audit.firma, ansprechperson: audit.anrede, tag: slot.tag, zeit: body.zeit, dauer: '25 Minuten', format: 'Live-Durchsprache am Prototyp' });
  if (!ok) return NextResponse.json({ ok: false, stoerung: true }, { status: 503 });
  return NextResponse.json({ ok: true, label: `${slot.label}, ${body.zeit} Uhr` });
}
