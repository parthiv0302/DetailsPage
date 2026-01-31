import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "optional",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "optional",
});

export const metadata: Metadata = {
  title: "Canvas Details - Property Details",
  description: "Property details page for Canvas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`}>
      <body className="antialiased font-manrope">
        {children}
      </body>
    </html>
  );
}
