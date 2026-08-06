import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { clinic, fullAddress, siteUrl } from "@/lib/clinic";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Instrument Serif tem um peso só — o contraste vem do tamanho, não do bold.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const title = `${clinic.name} | Dentista no Brooklin e Berrini — São Paulo`;
const description = `${clinic.shortDescription} Agende sua avaliação pelo WhatsApp.`;
const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `Consultório da ${clinic.name}, ${clinic.role} na Cidade Monções, São Paulo`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${clinic.name}`,
  },
  description,
  keywords: [
    "dentista Brooklin",
    "dentista Berrini",
    "dentista Cidade Monções",
    "consultório odontológico São Paulo",
    "clareamento dental Berrini",
    "reabilitação oral São Paulo",
    clinic.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: clinic.name,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f2eee6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrument.variable}`}>
      <body>
        <a
          href="#agendar"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Ir para o agendamento
        </a>
        {children}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Dentist",
            "@id": `${siteUrl}#dentist`,
            name: clinic.name,
            legalName: clinic.legalName,
            description,
            url: siteUrl,
            telephone: clinic.phone.e164,
            ...(clinic.email ? { email: clinic.email } : {}),
            image: `${siteUrl}/og.jpg`,
            priceRange: "$$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: `${clinic.address.street}${
                clinic.address.complement ? `, ${clinic.address.complement}` : ""
              }`,
              addressLocality: clinic.address.city,
              addressRegion: clinic.address.state,
              postalCode: clinic.address.postalCode,
              addressCountry: clinic.address.country,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: clinic.geo.latitude,
              longitude: clinic.geo.longitude,
            },
            areaServed: [
              clinic.address.neighborhood,
              "Brooklin",
              "Berrini",
              "Itaim Bibi",
              clinic.address.city,
            ],
            hasMap: clinic.mapsUrl,
            openingHoursSpecification: clinic.hours
              .filter((h) => !("closed" in h && h.closed))
              .map((h) => ({
                "@type": "OpeningHoursSpecification",
                dayOfWeek: h.days,
                opens: h.opens,
                closes: h.closes,
              })),
            sameAs: [clinic.social.instagram, clinic.social.facebook].filter(Boolean),
            knowsAbout: clinic.focusAreas,
            slogan: clinic.tagline,
            location: fullAddress,
          }}
        />
      </body>
    </html>
  );
}
