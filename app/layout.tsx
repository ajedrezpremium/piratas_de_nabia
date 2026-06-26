import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piratas de Nabia | Barco a Islas Cíes, Ons, San Simón",
  description:
    "Naviera en las Rías Baixas. Billetes a Islas Cíes, Isla de Ons, San Simón, Ruta del Mejillón y más. La flota más moderna desde 1998.",
  openGraph: {
    title: "Piratas de Nabia - Naviera Rías Baixas",
    description: "Barco a Islas Cíes, Isla de Ons, Rodas, Moaña | Nabia",
    siteName: "Piratas de Nabia",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-ocean-50 text-navy-900 antialiased">
        {children}
      </body>
    </html>
  );
}
