import { urlForImage } from "@/sanity/lib/image";
import { globalSettingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { ExtendedFooter } from "@/src/components/Framework/ExtendedFooter";
import { SiteFooter } from "@/src/components/Framework/SiteFooter";
import { SiteHeader } from "@/src/components/Framework/SiteHeader";
import { Logo } from "@/src/components/Logo";
import { ScrollIndicatorArrow } from "@/src/components/ScrollIndicatorArrow";
import { fetchTrackingIds } from "@/src/lib/trackingIds";
import { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "../globals.css";

const abcGinto = localFont({
  src: "../../fonts/ABCGintoNormalVariable.woff2",
  fallback: ["sans-serif"],
  variable: "--font-abc-ginto",
});

interface MetadataProps {
  params: { language: string };
  // searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  // read route params

  const language = params.language;

  // fetch fallback data
  const globalSettings = await sanityFetch<GlobalSettings>({
    query: globalSettingsQuery,
    params: { language },
    tags: [
      "globalSettings",
      "categoryPage",
      "clinicListPage",
      "specialistListPage",
    ],
  });

  const images = [globalSettings.siteImage]
    .map(urlForImage)
    .map((img) => img.url());

  const description = globalSettings.siteDescription;

  return {
    metadataBase: new URL("https://cmedical.no"),
    title: {
      default: "CMedical",
      template: `%s | ${globalSettings.siteTitle}`,
    },
    description,
    openGraph: {
      images,
    },
  };
}

export default async function RootLayout({
  params,
  children,
}: {
  params: { language: string; path: string[] };
  children: React.ReactElement;
}) {
  const { tagManagerCode } = await fetchTrackingIds();

  return (
    <html
      lang={params.language === "se" ? "sv" : params.language}
      className={abcGinto.variable}
    >
      <body>
        <div id="portal"></div>
        {tagManagerCode && (
          <>
            <Script
              id="google-tag-manager"
              dangerouslySetInnerHTML={{
                __html: `(function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', '${tagManagerCode}');`,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${tagManagerCode}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            ></noscript>
          </>
        )}
        <div className="relative">
          <Logo language={params.language} />
          <ScrollIndicatorArrow />
          <SiteHeader language={params.language} />
          <div id="app" className="relative">
            {children}
            <SiteFooter language={params.language} />
          </div>
        </div>
        <ExtendedFooter language={params.language} />
      </body>
    </html>
  );
}
