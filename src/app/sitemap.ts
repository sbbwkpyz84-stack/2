import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/company';
import { leistungen, orte } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const pfade = ['', '/leistungen', '/projekte', '/betrieb', '/karriere', '/kontakt', '/impressum', '/datenschutz', '/barrierefreiheit', ...leistungen.map((l) => `/leistungen/${l.slug}`), ...orte.map((o) => `/flachdachsanierung/${o.slug}`)];
  return pfade.map((p) => ({ url: `${SITE_URL}${p}` }));
}
