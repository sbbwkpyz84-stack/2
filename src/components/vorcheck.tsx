'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { BESTAND, CHECK_NAME, GEBIET_TEXT, OBJEKTE, ZEITRAUM, gebietVonPlz, isPlz, labels, type Ergebnis } from '@/lib/vorcheck';
import { Tiles, StatusBox } from './tiles';
import { KontaktLink, track } from './track';
import { company } from '@/lib/company';

type Sel = { objekt?: string; bestand?: string; zeitraum?: string };
type Fehler = Record<string, string>;

export function Ausweich({ text }: { text: string }) {
  return (
    <div className="alert" role="alert">
      <p>
        <strong>{text}</strong>
      </p>
      <p>
        Bitte erreichen Sie uns direkt: <KontaktLink href={company.telHref}>{company.tel}</KontaktLink> oder{' '}
        <KontaktLink href={`mailto:${company.email}`}>{company.email}</KontaktLink>.
      </p>
    </div>
  );
}

export default function VorCheck({ ortName }: { ortName?: string }) {
  const [sel, setSel] = useState<Sel>({});
  const [step, setStep] = useState(0);
  const [plz, setPlz] = useState('');
  const [fehler, setFehler] = useState<Fehler>({});
  const [senden, setSenden] = useState(false);
  const [stoerung, setStoerung] = useState(false);
  const [fertig, setFertig] = useState<{ ergebnis: Ergebnis | null } | null>(null);
  const [start] = useState(() => Date.now());
  const kopf = useRef<HTMLParagraphElement>(null);
  const moved = useRef(false);
  const id = useId();

  useEffect(() => {
    if (moved.current) kopf.current?.focus();
  }, [step, fertig]);

  const waehle = (k: keyof Sel, v: string) => {
    if (step === 0) track('check_start');
    moved.current = true;
    setSel((s) => ({ ...s, [k]: v }));
    setStep((s) => s + 1);
  };
  const zurueck = () => {
    moved.current = true;
    setStep((s) => Math.max(0, s - 1));
  };

  async function absenden(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    setSenden(true);
    setStoerung(false);
    setFehler({});
    try {
      const res = await fetch('/api/anfrage', { method: 'POST', body: form });
      const data = await res.json();
      if (data.ok) {
        track('check_abschluss');
        moved.current = true;
        setFertig({ ergebnis: data.ergebnis ?? null });
      } else if (data.fehler) {
        setFehler(data.fehler);
        const erstes = Object.keys(data.fehler)[0];
        (ev.target as HTMLFormElement).querySelector<HTMLElement>(`[name="${erstes}"]`)?.focus();
      } else setStoerung(true);
    } catch {
      setStoerung(true);
    } finally {
      setSenden(false);
    }
  }

  const gebiet = gebietVonPlz(plz);
  const err = (f: string) => (fehler[f] ? { 'aria-invalid': true as const, 'aria-describedby': `${id}-${f}-e` } : {});
  const errText = (f: string) =>
    fehler[f] && (
      <p className="field-error" id={`${id}-${f}-e`}>
        {fehler[f]}
      </p>
    );

  if (fertig) {
    return (
      <div className="check" aria-live="polite">
        <p className="check-step" tabIndex={-1} ref={kopf}>
          Anfrage eingegangen
        </p>
        <p>
          Vielen Dank. Ihre Angaben liegen im Büro vor. Wir melden uns {company.rueckmeldung} persönlich bei Ihnen.
        </p>
        {fertig.ergebnis && <StatusBox e={fertig.ergebnis} sicht="kunde" />}
        <p className="small">
          Der {CHECK_NAME} ist eine erste Einordnung. Fachliche Prüfung, verbindliche Kalkulation und Angebot erstellt unser Betrieb.
        </p>
      </div>
    );
  }

  return (
    <div className="check">
      <p className="check-step" tabIndex={-1} ref={kopf} aria-live="polite">
        {CHECK_NAME} · {step < 3 ? `Schritt ${step + 1} von 4` : 'Schritt 4 von 4: Persönliche Rückmeldung'}
      </p>
      {step === 0 && <Tiles name="objekt" legend={`Um welches Objekt${ortName ? ` in ${ortName}` : ''} geht es?`} options={OBJEKTE} value={sel.objekt} onSelect={(v) => waehle('objekt', v)} />}
      {step === 1 && <Tiles name="bestand" legend="Was liegt aktuell auf dem Dach?" options={BESTAND} value={sel.bestand} onSelect={(v) => waehle('bestand', v)} />}
      {step === 2 && <Tiles name="zeitraum" legend="Wann soll saniert werden?" options={ZEITRAUM} value={sel.zeitraum} onSelect={(v) => waehle('zeitraum', v)} />}
      {step === 3 && (
        <form onSubmit={absenden} noValidate>
          <dl className="summary">
            <div><dt>Leistung</dt><dd>Flachdachsanierung</dd></div>
            <div><dt>Objekt</dt><dd>{labels.objekt(sel.objekt!)}</dd></div>
            <div><dt>Bestand</dt><dd>{labels.bestand(sel.bestand!)}</dd></div>
            <div><dt>Zeitraum</dt><dd>{labels.zeitraum(sel.zeitraum!)}</dd></div>
          </dl>
          <input type="hidden" name="typ" value="vorcheck" />
          <input type="hidden" name="objekt" value={sel.objekt} />
          <input type="hidden" name="bestand" value={sel.bestand} />
          <input type="hidden" name="zeitraum" value={sel.zeitraum} />
          <input type="hidden" name="t" value={start} />
          <input type="hidden" name="seite" value={typeof location !== 'undefined' ? location.pathname : ''} />
          <div className="hp" aria-hidden="true">
            <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          {fehler.form && <p className="field-error" role="alert">{fehler.form}</p>}
          <div className="fields">
            <div className="field field-s">
              <label htmlFor={`${id}-plz`}>PLZ des Objekts</label>
              <input id={`${id}-plz`} name="plz" inputMode="numeric" autoComplete="postal-code" maxLength={5} required value={plz} onChange={(e) => setPlz(e.target.value.replace(/\D/g, ''))} {...err('plz')} />
              {errText('plz')}
              {isPlz(plz) && gebiet && (
                <p className={`gebiet gebiet-${gebiet}`} role="status">
                  {GEBIET_TEXT[gebiet]}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor={`${id}-name`}>Name</label>
              <input id={`${id}-name`} name="name" autoComplete="name" required {...err('name')} />
              {errText('name')}
            </div>
            <div className="field">
              <label htmlFor={`${id}-kontakt`}>Telefon oder E-Mail für die Rückmeldung</label>
              <input id={`${id}-kontakt`} name="kontakt" required {...err('kontakt')} />
              {errText('kontakt')}
            </div>
          </div>
          <details className="optional">
            <summary>Freiwillig: Kommentar, Fotos, Pläne oder Leistungsverzeichnis</summary>
            <div className="field">
              <label htmlFor={`${id}-text`}>Kommentar</label>
              <textarea id={`${id}-text`} name="text" rows={3} />
            </div>
            <div className="field">
              <label htmlFor={`${id}-dateien`}>Dateien (bis 5 Dateien, je max. 10 MB)</label>
              <input id={`${id}-dateien`} name="dateien" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.x83,.x81,.d83,.p83" {...err('dateien')} />
              {errText('dateien')}
            </div>
          </details>
          {stoerung && <Ausweich text="Ihre Anfrage konnte gerade nicht übermittelt werden." />}
          <div className="actions">
            <button type="submit" className="btn btn-primary" disabled={senden}>
              {senden ? 'Wird gesendet …' : 'Einschätzung anfordern'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={zurueck}>
              Zurück
            </button>
          </div>
          <p className="small">
            Wir verwenden Ihre Angaben nur zur Bearbeitung dieser Anfrage. <a href="/datenschutz">Datenschutzhinweise</a>
          </p>
        </form>
      )}
      {step > 0 && step < 3 && (
        <button type="button" className="btn btn-ghost" onClick={zurueck}>
          Zurück
        </button>
      )}
    </div>
  );
}
