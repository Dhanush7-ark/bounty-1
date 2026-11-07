import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";

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
  title: `${siteConfig.name} — The handoffs run themselves`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — The handoffs run themselves`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoni72.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#050505] font-sans text-neutral-100 antialiased selection:bg-[#C6FF36] selection:text-black">
        {children}
      </body>
    </html>
  );
}
