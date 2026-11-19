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
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "PizzaHub",
  description: "Pizza Ordering & Delivery Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        {children}
      </body>
    </html>
  );
}

export { dmSerif, dancingScript, lato };