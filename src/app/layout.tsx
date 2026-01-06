import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Mountains_of_Christmas } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mountainsOfChristmas = Mountains_of_Christmas({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-mountains-of-christmas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pets Santa - AI Christmas Pet Portraits",
  description: "Upload a photo of your pet and let AI turn it into a festive holiday portrait. Dress your pet in Santa, Elf, or Reindeer outfits, add cozy winter scenes, Christmas trees, lights, and gifts—no editing needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${mountainsOfChristmas.variable} antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
