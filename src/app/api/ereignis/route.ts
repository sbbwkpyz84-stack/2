import { NextResponse } from 'next/server';
import { uebergebe } from '@/lib/server';

// Datensparsame Basismessung: nur Ereignisname und Seitenpfad, keine Cookies, keine IP, keine Kennung.
const ERLAUBT = ['telefon_klick', 'email_klick', 'check_start', 'check_abschluss', 'anfrage_gesendet', 'bewerbung_gesendet', 'demo_start', 'demo_ergebnis', 'termin_gebucht'];

export async function POST(req: Request) {
  try {
    const { name, pfad } = (await req.json()) as { name?: string; pfad?: string };
    if (name && ERLAUBT.includes(name)) await uebergebe('ereignis', { name, pfad: String(pfad || '').split('?')[0].slice(0, 120) });
  } catch {
    /* Messung darf nie stören */
  }
  return new NextResponse(null, { status: 204 });
}
