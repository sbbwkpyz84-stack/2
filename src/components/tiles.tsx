'use client';
import type { Option, Ergebnis } from '@/lib/vorcheck';

// Auswahlkacheln: echte Buttons, per Touch und Tastatur bedienbar, mind. 56 px hoch.
export function Tiles({ legend, options, value, onSelect, name }: { legend: string; options: Option[]; value?: string; onSelect: (id: string) => void; name: string }) {
  return (
    <fieldset className="tiles">
      <legend>{legend}</legend>
      <div className="tiles-grid">
        {options.map((o) => (
          <button key={o.id} type="button" className="tile" aria-pressed={value === o.id} data-name={name} onClick={() => onSelect(o.id)}>
            <span className="tile-label">{o.label}</span>
            {o.hint && <span className="tile-hint">{o.hint}</span>}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function StatusBox({ e, sicht }: { e: Ergebnis; sicht: 'kunde' | 'buero' }) {
  return (
    <div className={`status status-${e.status}`}>
      <p className="status-label">
        <span className="status-dot" aria-hidden="true" />
        {e.label}
      </p>
      <p className="status-h">Begründung</p>
      <ul>
        {e.gruende.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
      {e.hinweise.length > 0 && (
        <>
          <p className="status-h">Hinweise</p>
          <ul>
            {e.hinweise.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </>
      )}
      <p className="status-h">{sicht === 'buero' ? 'Nächster Schritt im Büro' : 'So geht es weiter'}</p>
      <p>{sicht === 'buero' ? e.buero : e.kunde}</p>
    </div>
  );
}
