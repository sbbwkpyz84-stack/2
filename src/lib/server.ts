import 'server-only';
import { timingSafeEqual, createHash } from 'node:crypto';

// ---------- Validierung ----------
export const str = (v: FormDataEntryValue | null | undefined, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
export const istEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
export const istTelefon = (s: string) => /^[+\d][\d\s()/.-]{5,24}$/.test(s) && s.replace(/\D/g, '').length >= 6;
export const istKontakt = (s: string) => istEmail(s) || istTelefon(s);

// Unauffälliger Spam-Schutz: Honeypot-Feld + Mindestzeit zwischen Anzeige und Absenden.
export function istSpam(form: FormData) {
  if (str(form.get('website'))) return true;
  const t = Number(str(form.get('t')));
  return !Number.isFinite(t) || t <= 0 || Date.now() - t < 2500;
}

const MAX_DATEI = 10 * 1024 * 1024;
const MAX_ANZAHL = 5;
const ERLAUBT: Record<string, (b: Uint8Array) => boolean> = {
  pdf: (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46,
  jpg: (b) => b[0] === 0xff && b[1] === 0xd8,
  jpeg: (b) => b[0] === 0xff && b[1] === 0xd8,
  png: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  webp: (b) => b[0] === 0x52 && b[1] === 0x49 && b[8] === 0x57 && b[9] === 0x45,
  heic: (b) => b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70,
  // GAEB-Leistungsverzeichnisse (Text/XML)
  x83: () => true, x81: () => true, d83: () => true, p83: () => true,
};
export const DATEI_HINWEIS = 'Erlaubt sind bis zu 5 Dateien mit je höchstens 10 MB (PDF, JPG, PNG, WEBP, HEIC, GAEB).';

export async function pruefeDateien(form: FormData, feld: string, erlaubt = Object.keys(ERLAUBT)): Promise<{ dateien: File[]; fehler?: string }> {
  const dateien = form.getAll(feld).filter((f): f is File => typeof f !== 'string' && f.size > 0);
  if (dateien.length > MAX_ANZAHL) return { dateien: [], fehler: DATEI_HINWEIS };
  for (const f of dateien) {
    const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
    if (!erlaubt.includes(ext) || !ERLAUBT[ext]) return { dateien: [], fehler: `„${f.name}“: Dateityp nicht erlaubt. ${DATEI_HINWEIS}` };
    if (f.size > MAX_DATEI) return { dateien: [], fehler: `„${f.name}“ ist größer als 10 MB.` };
    const kopf = new Uint8Array(await f.slice(0, 12).arrayBuffer());
    if (!ERLAUBT[ext](kopf)) return { dateien: [], fehler: `„${f.name}“ konnte nicht als ${ext.toUpperCase()}-Datei gelesen werden.` };
  }
  return { dateien };
}

// ---------- Übergabe an CRM / Büroprozess ----------
// Ziel wird über LEAD_WEBHOOK_URL festgelegt (CRM, Ticket-Postfach o. Ä.). Schlägt die Übergabe fehl,
// meldet die API eine Störung und die Oberfläche zeigt Telefon und E-Mail als Ausweichweg.
export async function uebergebe(art: 'anfrage' | 'bewerbung' | 'termin' | 'ereignis', daten: Record<string, unknown>, dateien: File[] = []): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  const eintrag = { art, eingang: new Date().toISOString(), ...daten };
  if (!url) {
    if (process.env.NODE_ENV === 'production') {
      if (art === 'ereignis') return true;
      console.error('[uebergabe] LEAD_WEBHOOK_URL fehlt – Übergabe nicht möglich');
      return false;
    }
    console.info('[uebergabe:dev]', JSON.stringify(eintrag), dateien.map((d) => `${d.name} (${d.size} B)`));
    return true;
  }
  try {
    const body = new FormData();
    body.set('payload', JSON.stringify(eintrag));
    dateien.forEach((d) => body.append('dateien', d, d.name));
    const res = await fetch(url, {
      method: 'POST',
      body,
      headers: process.env.LEAD_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : undefined,
      signal: AbortSignal.timeout(15000),
    });
    return res.ok;
  } catch (e) {
    console.error('[uebergabe] fehlgeschlagen', e);
    return false;
  }
}

// ---------- Personalisierter Zugriff auf die ELVIANE-QR-Seite ----------
export type Audit = { id: string; firma: string; anrede: string; leistung: string; region: string; vorschauOrt: string; datum: string };
// Firmendaten werden serverseitig der Audit-ID zugeordnet; der Zugriff erfolgt nur mit gültigem Token.
const AUDITS: Audit[] = [
  { id: 'BS-2611', firma: 'Bär + Seibl GmbH', anrede: 'Frau Rauschenbach', leistung: 'Flachdachsanierung', region: 'München, Ebersberg und Erding', vorschauOrt: 'poing', datum: '16.11.2026' },
];

const hash = (s: string) => createHash('sha256').update(s).digest();
export function auditZugriff(id: string, token: string | undefined | null): Audit | null {
  const audit = AUDITS.find((a) => a.id === id);
  if (!audit || !token) return null;
  const env = process.env[`AUDIT_TOKEN_${id.replace(/-/g, '_')}`];
  // Nur in der lokalen Entwicklung gibt es ein Ersatz-Token; in Produktion ist ohne gesetztes Token kein Zugriff möglich.
  const soll = env || (process.env.NODE_ENV !== 'production' ? 'demo' : '');
  if (!soll) return null;
  return timingSafeEqual(hash(token), hash(soll)) ? audit : null;
}

export const elviane = {
  tel: process.env.ELVIANE_TEL || '',
  telHref: process.env.ELVIANE_TEL ? `tel:${process.env.ELVIANE_TEL.replace(/[^+\d]/g, '')}` : '',
};

// Terminvorschläge: nächste Werktage, feste Zeitfenster (Verfügbarkeit von ELVIANE zu bestätigen).
export function terminSlots(tage = 6): { tag: string; label: string; zeiten: string[] }[] {
  const out: { tag: string; label: string; zeiten: string[] }[] = [];
  const d = new Date();
  d.setUTCHours(12, 0, 0, 0);
  while (out.length < tage) {
    d.setUTCDate(d.getUTCDate() + 1);
    const wd = d.getUTCDay();
    if (wd === 0 || wd === 6) continue;
    out.push({
      tag: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', timeZone: 'UTC' }),
      zeiten: ['07:30', '12:30', '16:30'],
    });
  }
  return out;
}
