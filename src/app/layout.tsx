import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Providers from "./providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bakiakyol.com";
const profileTitle = "Baki Akyol | İstinye Üniversitesi Eczacılık Öğrencisi";
const profileDescription =
  "Baki Akyol, İstinye Üniversitesi Eczacılık Fakültesi öğrencisi ve ISUPA Kulübü yönetim ekibi üyesidir. Sağlık, teknoloji ve akademik projeler.";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  icons: { icon: "/icon.png?v=2", shortcut: "/icon.png?v=2", apple: "/icon.png?v=2" },
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: { default: profileTitle, template: "%s | Baki Akyol" },
  description: profileDescription,
  openGraph: {
    type: "website", locale: "tr_TR", url: "/", siteName: "Baki Akyol",
    title: profileTitle, description: profileDescription,
    images: [{ url: "/profile.jpg", width: 1200, height: 630, alt: "Baki Akyol" }],
  },
  twitter: { card: "summary_large_image", title: profileTitle, description: profileDescription, images: ["/profile.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <LanguageProvider>{children}</LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}