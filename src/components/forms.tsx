'use client';
import { useId, useRef, useState, type ReactNode } from 'react';
import { company } from '@/lib/company';
import { Ausweich } from './vorcheck';
import { track } from './track';

type Fehler = Record<string, string>;

function useSenden(url: string, ereignis: string) {
  const [fehler, setFehler] = useState<Fehler>({});
  const [senden, setSenden] = useState(false);
  const [stoerung, setStoerung] = useState(false);
  const [fertig, setFertig] = useState(false);
  const [start] = useState(() => Date.now());
  const dank = useRef<HTMLDivElement>(null);
  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formEl = ev.currentTarget;
    setSenden(true);
    setStoerung(false);
    setFehler({});
    try {
      const res = await fetch(url, { method: 'POST', body: new FormData(formEl) });
      const data = await res.json();
      if (data.ok) {
        track(ereignis);
        setFertig(true);
        setTimeout(() => dank.current?.focus());
      } else if (data.fehler) {
        setFehler(data.fehler);
        formEl.querySelector<HTMLElement>(`[name="${Object.keys(data.fehler)[0]}"]`)?.focus();
      } else setStoerung(true);
    } catch {
      setStoerung(true);
    } finally {
      setSenden(false);
    }
  }
  return { fehler, senden, stoerung, fertig, start, dank, onSubmit };
}

function Feld({ id, name, label, fehler, children }: { id: string; name: string; label: string; fehler: Fehler; children: (p: Record<string, unknown>) => ReactNode }) {
  const f = fehler[name];
  return (
    <div className="field">
      <label htmlFor={`${id}-${name}`}>{label}</label>
      {children({ id: `${id}-${name}`, name, ...(f ? { 'aria-invalid': true, 'aria-describedby': `${id}-${name}-e` } : {}) })}
      {f && (
        <p className="field-error" id={`${id}-${name}-e`}>
          {f}
        </p>
      )}
    </div>
  );
}

const Honeypot = ({ start }: { start: number }) => (
  <>
    <input type="hidden" name="t" value={start} />
    <div className="hp" aria-hidden="true">
      <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  </>
);

export function KontaktFormular({ leistung }: { leistung?: string }) {
  const s = useSenden('/api/anfrage', 'anfrage_gesendet');
  const id = useId();
  if (s.fertig)
    return (
      <div className="check" tabIndex={-1} ref={s.dank}>
        <p className="check-step">Anfrage eingegangen</p>
        <p>Vielen Dank. Ihre Anfrage liegt im Büro vor. Wir melden uns {company.rueckmeldung} persönlich bei Ihnen.</p>
      </div>
    );
  return (
    <form className="check" onSubmit={s.onSubmit} noValidate>
      <input type="hidden" name="typ" value="standard" />
      {leistung && <input type="hidden" name="leistung" value={leistung} />}
      <Honeypot start={s.start} />
      {s.fehler.form && <p className="field-error" role="alert">{s.fehler.form}</p>}
      <div className="fields">
        <Feld id={id} name="name" label="Name" fehler={s.fehler}>{(p) => <input {...p} autoComplete="name" required />}</Feld>
        <Feld id={id} name="kontakt" label="Telefon oder E-Mail" fehler={s.fehler}>{(p) => <input {...p} required />}</Feld>
        <Feld id={id} name="plz" label="Ort oder PLZ des Objekts" fehler={s.fehler}>{(p) => <input {...p} required />}</Feld>
      </div>
      <Feld id={id} name="text" label="Projektbeschreibung" fehler={s.fehler}>{(p) => <textarea {...p} rows={4} required />}</Feld>
      <Feld id={id} name="dateien" label="Freiwillig: Fotos, Pläne oder Leistungsverzeichnis (bis 5 Dateien, je max. 10 MB)" fehler={s.fehler}>
        {(p) => <input {...p} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.x83,.x81,.d83,.p83" />}
      </Feld>
      {s.stoerung && <Ausweich text="Ihre Anfrage konnte gerade nicht übermittelt werden." />}
      <div className="actions">
        <button type="submit" className="btn btn-primary" disabled={s.senden}>{s.senden ? 'Wird gesendet …' : 'Anfrage senden'}</button>
      </div>
      <p className="small">Wir verwenden Ihre Angaben nur zur Bearbeitung dieser Anfrage. <a href="/datenschutz">Datenschutzhinweise</a></p>
    </form>
  );
}

export function Schnellbewerbung({ bereiche }: { bereiche: string[] }) {
  const s = useSenden('/api/bewerbung', 'bewerbung_gesendet');
  const id = useId();
  if (s.fertig)
    return (
      <div className="check" tabIndex={-1} ref={s.dank}>
        <p className="check-step">Bewerbung eingegangen</p>
        <p>Vielen Dank. Frau Rauschenbach meldet sich persönlich bei Ihnen.</p>
      </div>
    );
  return (
    <form className="check" onSubmit={s.onSubmit} noValidate>
      <Honeypot start={s.start} />
      {s.fehler.form && <p className="field-error" role="alert">{s.fehler.form}</p>}
      <div className="fields">
        <Feld id={id} name="name" label="Name" fehler={s.fehler}>{(p) => <input {...p} autoComplete="name" required />}</Feld>
        <Feld id={id} name="kontakt" label="Telefon oder E-Mail" fehler={s.fehler}>{(p) => <input {...p} required />}</Feld>
        <Feld id={id} name="bereich" label="Ich interessiere mich für" fehler={s.fehler}>
          {(p) => (
            <select {...p}>
              {bereiche.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          )}
        </Feld>
      </div>
      <Feld id={id} name="lebenslauf" label="Freiwillig: Lebenslauf (PDF oder Foto, max. 10 MB)" fehler={s.fehler}>
        {(p) => <input {...p} type="file" accept=".pdf,.jpg,.jpeg,.png" />}
      </Feld>
      {s.stoerung && <Ausweich text="Ihre Bewerbung konnte gerade nicht übermittelt werden." />}
      <div className="actions">
        <button type="submit" className="btn btn-primary" disabled={s.senden}>{s.senden ? 'Wird gesendet …' : 'Bewerbung senden'}</button>
      </div>
      <p className="small">Wir verwenden Ihre Angaben nur für das Bewerbungsverfahren. <a href="/datenschutz">Datenschutzhinweise</a></p>
    </form>
  );
}
