import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quinnkiefer.com"),
  title: {
    default: "Quinn Kiefer",
    template: "%s — Quinn Kiefer",
  },
  description:
    "Cognitive Science @ UCLA. Founder of Narrow. Building at the intersection of people and technology.",
  openGraph: {
    title: "Quinn Kiefer",
    description:
      "Cognitive Science @ UCLA. Founder of Narrow. Building at the intersection of people and technology.",
    url: "https://quinnkiefer.com",
    siteName: "Quinn Kiefer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Quinn Kiefer" href="/feed.xml" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
