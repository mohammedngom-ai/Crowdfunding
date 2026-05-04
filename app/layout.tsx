import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const barlow = Barlow({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Hiray Finance — Investissez dans les machines qui font tourner l'Afrique",
  description:
    "Financement participatif d'équipements miniers, carriers et de construction. Rendement sur 5 ans avec contrats garantis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${barlow.className} min-h-full flex flex-col bg-white text-[#171B31]`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
