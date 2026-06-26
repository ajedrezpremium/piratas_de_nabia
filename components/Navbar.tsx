"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Islas Cíes", href: "https://www.piratasdenabia.com/islas-cies" },
  { label: "Isla de Ons", href: "https://www.piratasdenabia.com/isla-de-ons" },
  { label: "San Simón", href: "https://www.piratasdenabia.com/isla-de-san-simon" },
  { label: "Ruta del Mejillón", href: "https://www.piratasdenabia.com/ruta-del-mejillon" },
  { label: "Moaña-Vigo", href: "https://www.piratasdenabia.com/linea-regular-moana-vigo" },
  { label: "Grupos", href: "https://www.piratasdenabia.com/grupos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⛵</span>
          <span className="text-xl font-bold tracking-tight text-white">
            Piratas de <span className="text-gold-400">Nabia</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.piratasdenabia.com/comprar-billetes/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
          >
            Comprar billetes
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Menú"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-800 px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-sm text-white/80"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.piratasdenabia.com/comprar-billetes/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-900"
          >
            Comprar billetes
          </a>
        </div>
      )}
    </nav>
  );
}
