import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const bodoni72 = localFont({
  src: [
    {
      path: "../../public/fonts/ITC-Bodoni-72-OS-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-bodoni-72",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni72.variable} dark`}>
      <body className="min-h-screen bg-black font-sans text-neutral-100 antialiased selection:bg-lime-400 selection:text-black">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
