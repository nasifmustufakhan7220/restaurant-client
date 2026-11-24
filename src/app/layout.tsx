
import {
  DM_Serif_Display,
  Cinzel,
  Dancing_Script,
  Lato,
  Playfair_Display,
} from "next/font/google";
import { Toaster } from "@/components/ui/toast"

import "./globals.css";
import Footer from "@/components/Footer";


const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});




export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lato.className} `}
    >
      <body className={lato.className}>
        {children}
        <Toaster />
        <Footer/>
      </body>
    </html>
  );
}


export {
  dmSerif,
  cinzel,
  dancingScript,
  lato,
  playfair,
};