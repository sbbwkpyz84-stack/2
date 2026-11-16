'use client';
import { useEffect, useRef, useState } from 'react';
import { BESTAND, DEMO_SCHRITT3, GEBIET_TEXT, LEISTUNG, OBJEKTE, bewerte, gebietVonPlz, labels } from '@/lib/vorcheck';
import { Tiles, StatusBox } from './tiles';
import { track } from './track';

const SZENARIEN = [
  { id: 'gewerbe', label: 'Hallendach sanieren', hint: 'Gewerbe- oder Industriehalle' },
  { id: 'wohn', label: 'Flachdach einer Wohnanlage', hint: 'Anfrage einer Hausverwaltung' },
  { id: 'oeffentlich', label: 'Schuldach, öffentlicher Auftraggeber', hint: 'Mit Leistungsverzeichnis' },
];

// Vollbild-Prototyp: drei Auswahlen, keine Texteingabe – die Bildschirmtastatur bleibt geschlossen.
export function Demo({ vorschau, firma }: { vorschau: string; firma: string }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const kopf = useRef<HTMLHeadingElement>(null);
  const [objekt, setObjekt] = useState<string>();
  const [bestand, setBestand] = useState<string>();
  const [s3, setS3] = useState<string>();
  const wahl = DEMO_SCHRITT3.find((d) => d.id === s3);
  const ergebnis = objekt && bestand && wahl ? bewerte({ objekt, bestand, zeitraum: wahl.zeitraum, plz: wahl.plz }) : null;

  useEffect(() => {
    kopf.current?.focus();
  }, [bestand, s3, objekt]);

  const start = (id: string) => {
    track('demo_start');
    setObjekt(id);
    setBestand(undefined);
    setS3(undefined);
    dlg.current?.showModal();
  };
  const schliessen = () => dlg.current?.close();

  return (
    <>
      <div className="scenario-grid" role="group" aria-label="Szenario wählen">
        {SZENARIEN.map((s) => (
          <button key={s.id} type="button" className="tile scenario" onClick={() => start(s.id)}>
            <span className="logo-mark" aria-hidden="true">B+S</span>
            <span>
              <span className="tile-label">{s.label}</span>
              <br />
              <span className="tile-hint">{s.hint}</span>
            </span>
          </button>
        ))}
      </div>
      <dialog ref={dlg} className="proto" aria-labelledby="proto-titel">
        <div className="proto-head">
          <p id="proto-titel">{firma} · Projekt-Check (Prototyp)</p>
          <button type="button" onClick={schliessen}>Schließen</button>
        </div>
        <div className="proto-body">
          {!bestand && (
            <>
              <h2 tabIndex={-1} ref={kopf}>Auswahl 2 von 3</h2>
              <p>Gewählt: {objekt && labels.objekt(objekt)}</p>
              <Tiles name="bestand" legend="Was liegt aktuell auf dem Dach?" options={BESTAND} onSelect={setBestand} />
            </>
          )}
          {bestand && !wahl && (
            <>
              <h2 tabIndex={-1} ref={kopf}>Auswahl 3 von 3</h2>
              <Tiles
                name="zeit"
                legend="Wann und wo soll saniert werden?"
                options={DEMO_SCHRITT3}
                onSelect={(v) => {
                  track('demo_ergebnis');
                  setS3(v);
                }}
              />
              <button type="button" className="btn btn-ghost" onClick={() => setBestand(undefined)}>Zurück</button>
            </>
          )}
          {ergebnis && wahl && (
            <>
              <h2 tabIndex={-1} ref={kopf}>So kommt die Anfrage im Büro an</h2>
              <div className="steckbrief">
                <span className="sample">Beispieldaten</span>
                <dl>
                  <dt>Leistung</dt><dd>{LEISTUNG}</dd>
                  <dt>Objekt</dt><dd>{labels.objekt(objekt!)}</dd>
                  <dt>Bestand</dt><dd>{labels.bestand(bestand!)}</dd>
                  <dt>Ort</dt><dd>{wahl.plz} {wahl.ort} – {GEBIET_TEXT[gebietVonPlz(wahl.plz)!]}</dd>
                  <dt>Zeitraum</dt><dd>{labels.zeitraum(wahl.zeitraum)}</dd>
                  <dt>Kontakt</dt><dd>Max Beispiel, 0151 0000000 (Beispiel)</dd>
                  <dt>Anhänge</dt><dd>{bestand === 'unbekannt' ? 'keine' : '2 Fotos (Beispiel)'}</dd>
                </dl>
              </div>
              <StatusBox e={ergebnis} sicht="buero" />
              <div className="actions">
                <a className="btn btn-primary" href="#termin" onClick={schliessen}>25-Min. Live-Durchsprache am Prototyp sichern</a>
                <a className="btn btn-secondary" href={vorschau}>Vorschau der lokalen Leistungsseite öffnen</a>
                <button type="button" className="btn btn-ghost" onClick={() => { setBestand(undefined); setS3(undefined); }}>Anderen Fall testen</button>
              </div>
              <p className="small">Auf der Leistungsseite beginnt derselbe Check aus Kundensicht; dort ergänzt der Interessent PLZ, Name und Rückkontakt.</p>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

const eur = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

function Regler({ label, value, set, min, max, step, einheit }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; einheit: string }) {
  const id = label.replace(/\W+/g, '-').toLowerCase();
  return (
    <div className="range">
      <label htmlFor={id}>
        <span>{label}</span>
        <output htmlFor={id}>{value.toLocaleString('de-DE')} {einheit}</output>
      </label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} />
    </div>
  );
}

// Kalkulatorischer Zeitaufwand: vermeidbare Termine × Dauer × interner Stundensatz.
export function AufwandRechner() {
  const [termine, setTermine] = useState(4);
  const [dauer, setDauer] = useState(2);
  const [satz, setSatz] = useState(65);
  const jahr = termine * 12 * dauer * satz;
  return (
    <div className="grid grid-2 rechner">
      <div>
        <Regler label="Vermeidbare Termine und Rückfragerunden pro Monat" value={termine} set={setTermine} min={0} max={20} step={1} einheit="" />
        <Regler label="Dauer je Termin inkl. Anfahrt" value={dauer} set={setDauer} min={0.5} max={5} step={0.5} einheit="Std." />
        <Regler label="Interner Stundensatz" value={satz} set={setSatz} min={30} max={120} step={5} einheit="€" />
      </div>
      <div className="ergebnis" aria-live="polite">
        <p>Kalkulatorischer Aufwand pro Jahr</p>
        <strong>{eur(jahr)}</strong>
        <p className="small">{termine} × 12 Monate × {dauer.toLocaleString('de-DE')} Std. × {satz} €. Startwerte sind Beispielannahmen, keine Messwerte Ihres Betriebs. Portalgebühren sind nicht angesetzt.</p>
      </div>
    </div>
  );
}

// Amortisation: Investition und laufende Kosten gegen Deckungsbeitrag zusätzlicher Aufträge.
export function AmortisationRechner() {
  const [invest, setInvest] = useState(9000);
  const [laufend, setLaufend] = useState(150);
  const [auftraege, setAuftraege] = useState(2);
  const [db, setDb] = useState(8000);
  const nutzenMonat = (auftraege * db) / 12 - laufend;
  const monate = nutzenMonat > 0 ? Math.ceil(invest / nutzenMonat) : null;
  return (
    <div className="grid grid-2 rechner">
      <div>
        <Regler label="Einmalige Investition" value={invest} set={setInvest} min={2000} max={30000} step={500} einheit="€" />
        <Regler label="Laufende Kosten pro Monat" value={laufend} set={setLaufend} min={0} max={600} step={10} einheit="€" />
        <Regler label="Zusätzliche Aufträge pro Jahr" value={auftraege} set={setAuftraege} min={0} max={12} step={1} einheit="" />
        <Regler label="Deckungsbeitrag je zusätzlichem Auftrag" value={db} set={setDb} min={1000} max={50000} step={1000} einheit="€" />
      </div>
      <div className="ergebnis" aria-live="polite">
        <p>Amortisation</p>
        <strong>{monate ? `nach ${monate} Monaten` : 'mit diesen Annahmen nicht erreicht'}</strong>
        <p className="small">Nutzen pro Monat: {eur(Math.round(nutzenMonat))} (Deckungsbeitrag abzüglich laufender Kosten). Alle Startwerte sind Beispielannahmen; Investition und laufende Kosten stehen im Angebot, Deckungsbeitrag und Auftragszahl setzen Sie selbst.</p>
      </div>
    </div>
  );
}

type Slot = { tag: string; label: string; zeiten: string[] };
export function Terminwahl({ slots, id, k, telHref }: { slots: Slot[]; id: string; k: string; telHref: string }) {
  const [wahl, setWahl] = useState<{ tag: string; zeit: string }>();
  const [zustand, setZustand] = useState<'offen' | 'senden' | 'fehler'>('offen');
  const [gebucht, setGebucht] = useState<string>();
  const dank = useRef<HTMLParagraphElement>(null);

  async function bestaetigen() {
    if (!wahl) return;
    setZustand('senden');
    try {
      const res = await fetch('/api/termin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, k, ...wahl }) });
      const data = await res.json();
      if (data.ok) {
        track('termin_gebucht');
        setGebucht(data.label);
        setTimeout(() => dank.current?.focus());
      } else setZustand('fehler');
    } catch {
      setZustand('fehler');
    }
  }

  if (gebucht)
    return (
      <p className="status status-gruen" tabIndex={-1} ref={dank}>
        <span className="status-label"><span className="status-dot" aria-hidden="true" />Terminwunsch übermittelt: {gebucht}</span>
        Sie erhalten die Bestätigung von ELVIANE an die Kontaktdaten aus unserem Schreiben.
      </p>
    );

  return (
    <div>
      <div className="slots">
        {slots.map((s) => (
          <div key={s.tag}>
            <p className="slot-tag">{s.label}</p>
            <div>
              {s.zeiten.map((z) => (
                <button key={z} type="button" className={`btn slot ${wahl?.tag === s.tag && wahl.zeit === z ? 'btn-primary' : 'btn-secondary'}`} aria-pressed={wahl?.tag === s.tag && wahl.zeit === z} onClick={() => setWahl({ tag: s.tag, zeit: z })}>
                  {z} Uhr<span className="hp"> am {s.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="actions">
        <button type="button" className="btn btn-primary" disabled={!wahl || zustand === 'senden'} onClick={bestaetigen}>
          {zustand === 'senden' ? 'Wird übermittelt …' : wahl ? 'Termin bestätigen' : 'Bitte Termin auswählen'}
        </button>
      </div>
      {zustand === 'fehler' && (
        <p className="alert" role="alert">
          Der Termin konnte nicht übermittelt werden. {telHref ? <a href={telHref}>Bitte rufen Sie uns an.</a> : 'Bitte antworten Sie auf unser Schreiben.'}
        </p>
      )}
      <p className="small">25 Minuten, per Videogespräch oder Telefon. Firmendaten sind Ihrem persönlichen Zugang bereits zugeordnet – Sie müssen nichts eintippen.</p>
    </div>
  );
}
