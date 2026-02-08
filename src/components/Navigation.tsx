"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

interface NavGroup {
  label: string;
  icon: string;
  links: NavLink[];
}

const mainLinks: NavLink[] = [
  { href: "/", label: "Accueil", icon: "🏠" },
  { href: "/cours", label: "Mes cours", icon: "📚" },
  { href: "/methodes", label: "Méthodes", icon: "🧭" },
  { href: "/entrainement", label: "S'entraîner", icon: "🎯" },
  { href: "/tuteur", label: "Mon tuteur IA", icon: "🤖" },
];

const projetLinks: NavLink[] = [
  { href: "/passeurs-de-memoire", label: "Passeurs de mémoire", icon: "🕯️" },
  { href: "/chansons", label: "Nos chansons", icon: "🎵" },
];

// All links flat for desktop
const allDesktopLinks: NavLink[] = [...mainLinks, ...projetLinks];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-accent transition-colors"
          >
            <span className="text-2xl">📖</span>
            <span className="hidden sm:inline">Histoire-Géo Sancerre</span>
            <span className="sm:hidden">HG Sancerre</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {allDesktopLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-gray-600 hover:bg-gray-100 hover:text-foreground"
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Ouvrir le menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-2 pt-2">
            {/* Main links */}
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* Projets group */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="px-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Projets
              </p>
              {projetLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-accent/10 text-accent"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
