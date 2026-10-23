import Script from "next/script";

// GA4. Solo se carga si el build recibe NEXT_PUBLIC_GA_ID (variable GA_ID del repo,
// ver .github/workflows/deploy.yml). Los cambios de ruta se miden solos con la
// "medición mejorada" de GA4 (cambios en el historial del navegador).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
