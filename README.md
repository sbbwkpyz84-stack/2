# Website Bär + Seibl GmbH

Next.js (App Router, TypeScript). Öffentliche Betriebswebsite mit Projekt-Check sowie geschützte ELVIANE-QR-Zielseite.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run typecheck && npm run build
```

- Betriebsdaten: `src/lib/company.ts` · Leistungen, Projekte, Orte, 301-Weiterleitungen: `src/lib/content.ts`
- Prüfregeln des Projekt-Checks (Demo und Live identisch): `src/lib/vorcheck.ts`
- Validierung, Upload-Prüfung, Übergabe ans Büro, Audit-Zugriff: `src/lib/server.ts`
- QR-Seite: `/a/BS-2611?k=<Token>` (lokal: `k=demo`), PDF: `/a/BS-2611/report?k=<Token>`
- Umgebungsvariablen: `.env.example`
- Offene Punkte zur Freigabe: `docs/FREIGABE.md`
