'use client';
import type { ReactNode } from 'react';

export function track(name: string) {
  try {
    const body = JSON.stringify({ name, pfad: location.pathname });
    if (!navigator.sendBeacon?.('/api/ereignis', new Blob([body], { type: 'application/json' })))
      fetch('/api/ereignis', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
  } catch {
    /* Messung darf nie stören */
  }
}

// Telefon- und E-Mail-Links mit Klickmessung (Kontaktinteresse).
export function KontaktLink({ href, className, children, label }: { href: string; className?: string; children: ReactNode; label?: string }) {
  return (
    <a href={href} className={className} aria-label={label} onClick={() => track(href.startsWith('tel:') ? 'telefon_klick' : 'email_klick')}>
      {children}
    </a>
  );
}
