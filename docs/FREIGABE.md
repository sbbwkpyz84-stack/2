# Offene Angaben zur Freigabe durch den Betrieb

Quelle aller Betriebsangaben: baer-seibl-gmbh.de, abgerufen am 16.11.2026. Alles Folgende ist ein Vorschlag
und muss vor der Veröffentlichung von der Bär + Seibl GmbH bestätigt werden.

## Projekt-Check (src/lib/vorcheck.ts)
- [ ] Einsatzgebiet nach PLZ: Kerngebiet 80/81/85, Randgebiet 82/83/84/86, alles andere „außerhalb“ (aus den Referenzorten abgeleitet).
- [ ] Rot-Kriterium: bisher nur „außerhalb des Einsatzgebiets“. Weitere tatsächliche Ausschlüsse (z. B. Mindestfläche, Kleinreparaturen, Einfamilienhäuser)?
- [ ] Gelb-Kriterien: Bestand unbekannt, Randgebiet, Zeitrahmen offen.
- [ ] Auswahloptionen für Objekt, Bestand und Zeitraum.
- [ ] Umgang mit „bereits undicht“: Es wird kein Notdienst genannt, nur der Hinweis auf einen Anruf zu Bürozeiten. Gibt es einen Notdienst (Zeiten, Gebiet, Zuschläge)?
- [ ] Terminlink bei Grün: nicht eingebaut. Nur ergänzen, wenn Buchungen zuverlässig betreut werden.
- [ ] Kostenspannen: keine Zahlen veröffentlicht. Freigegebene Spannen oder Beispielprojekte mit Annahmen liefern.
- [ ] Förderhinweis: allgemein formuliert, ohne Fördersätze. Voraussetzungen und Prüfdatum ergänzen.
- [ ] Bezeichnung „Projekt-Check“ und Zeitangabe (z. B. „in 90 Sekunden“) erst nach Nutzungstest.

## Zuständigkeit und Büroprozess
- [ ] Erstprüfung: Enrico Skrowny (Kalkulation), Vertretung Franz Mayr – Annahme aus den Funktionsbezeichnungen.
- [ ] Rückmeldefrist „in der Regel innerhalb von zwei Werktagen“.
- [ ] Ziel der Übergabe (CRM, Postfach, Ticket): `LEAD_WEBHOOK_URL` setzen. Ohne Ziel zeigt die Website eine Störung mit Telefon/E-Mail.
- [ ] Löschfristen für Anfragen und Bewerbungen, Zugriffsrechte.

## Inhalte
- [ ] Kundengruppen (Gewerbe/Industrie, Wohnungsbau/Hausverwaltungen, öffentliche Auftraggeber, Planungsbüros) – aus Referenzen abgeleitet, auf der alten Website nicht ausdrücklich genannt.
- [ ] Fotos: überall Platzhalter. Freigegebene Bilder liefern; Bildrechte klären (bisher: Luftaufnahmen Fischer, interne Baustellenfotos).
- [ ] Porträt und Nennung von Enrico Skrowny auf den lokalen Seiten.
- [ ] Projekte: Ausgangslage, Dauer, Ergebnis und Messwerte fehlen bei den meisten Referenzen.
- [ ] Zuordnung „Gewerbehalle in Garching“ zum 15.000-m²-Projekt (aus Bildnachweis abgeleitet); Objektarten in Erding, Aschheim, Anzing, Altenerding, Höhenkirchen.
- [ ] Abweichungen der alten Website: Schrägaufzüge „3 bis 24 m“ vs. „2 für 30 m“; Schweißautomaten 4 vs. 3. Übernommen: 3 bis 24 m, 4 Automaten.
- [ ] „TRG 519“ der alten Website als TRGS 519 geschrieben.
- [ ] FAQ, Eignung und Varianten je Leistung sind Formulierungsvorschläge.
- [ ] Lokale Seiten (Poing, Haar, Moosinning, Anzing): Ortstexte und lokale Frage. Weitere Orte erst mit eigenem Referenzinhalt.
- [ ] Karriere: keine konkreten offenen Stellen bekannt (alte Website nennt nur die Bewerbungsadresse). Stellen, Arbeitszeiten, Ausbildung bestätigen.
- [ ] Rahmenverträge und E-Rechnung für gewerbliche/öffentliche Auftraggeber.
- [ ] Mobilnummern der Ansprechpersonen wurden nicht übernommen (nur Zentrale und Direktwahlen).

## Recht und Betrieb
- [ ] Datenschutzerklärung ist ein Entwurf: Hosting-Anbieter, Auftragsverarbeiter, Fristen ergänzen; rechtlich prüfen.
- [ ] Barrierefreiheit: Anwendbarkeit der gesetzlichen Anforderungen klären; Prüfung nach WCAG 2.2 AA mit Datum dokumentieren.
- [ ] Google-Unternehmensprofil mit Name, Anschrift, Telefon, Bürozeiten abgleichen.
- [ ] Hosting über HTTPS, Admin-Zugänge mit 2FA, Backup-Wiederherstellung testen, Übergabe von Domain, Code, Zugängen.
- [ ] Alte URLs mit Schrägstrich am Ende werden in zwei Schritten weitergeleitet (308 → 301).

## ELVIANE-QR-Seite
- [ ] `AUDIT_TOKEN_BS_2611` und `ELVIANE_TEL` setzen. Ohne Telefonnummer führen Anruf-Icon und „Anrufen“ zur Terminwahl.
- [ ] Regionaler Vergleich: keine Messdaten vorhanden – Tabelle zeigt nur den Messplan.
- [ ] Rechner-Startwerte (Termine, Stundensatz, Investition, Deckungsbeitrag) sind Beispielannahmen.
- [ ] Terminfenster (07:30, 12:30, 16:30 an den nächsten sechs Werktagen) sind Platzhalter ohne Kalenderabgleich.
- [ ] Zusagen „live in 21 Tagen“ und „maximal 120 Minuten“ sind als Ziel formuliert.
- [ ] Anrede „Frau Rauschenbach“ und Audit-ID.
