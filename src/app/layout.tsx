import {
  DM_Serif_Display,
  Dancing_Script,
  Lato,
} from "next/font/google";

import "./globals.css";
import { Metadata } from "next";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "PizzaHub",
  description: "Pizza Ordering & Delivery Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${dancingScript.variable} ${lato.variable}`}
    >
      <body className={lato.className}>{children}</body>
    </html>
  );
}