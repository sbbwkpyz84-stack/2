import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_URL, company } from '@/lib/company';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${company.name} – Dachdeckerei und Spenglerei in Anzing bei München`, template: `%s | ${company.name}` },
  description: 'Flachdachsanierung, Abdichtungen, Spenglerarbeiten und Profilblechbau für Gewerbe, Wohnungsbau und öffentliche Auftraggeber im Raum München, Ebersberg und Erding.',
  formatDetection: { telephone: false },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#15779b' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
