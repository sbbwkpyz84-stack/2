import { Header, Footer, JsonLd, betriebLd } from '@/components/site';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="inhalt">{children}</main>
      <Footer />
      <JsonLd data={betriebLd} />
    </>
  );
}
