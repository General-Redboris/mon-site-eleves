"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ParametresDrawer from "@/components/ParametresDrawer";

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

const mainLinks: NavLink[] = [
  { href: "/", label: "Accueil", icon: "🏠" },
  { href: "/cours", label: "Mes cours", icon: "📚" },
  { href: "/methodes", label: "Méthodes", icon: "🧭" },
];

const entrainementLinks: NavLink[] = [
  { href: "/entrainement/quiz", label: "Quiz", icon: "❓" },
  { href: "/entrainement/flashcards", label: "Flashcards", icon: "🃏" },
  { href: "/entrainement/brevet", label: "Sujets de brevet", icon: "📝" },
];

const afterLinks: NavLink[] = [
  { href: "/tuteur", label: "Mon tuteur IA", icon: "🤖" },
  { href: "/ressources", label: "Ressources", icon: "📎" },
  { href: "/glossaire", label: "Glossaire", icon: "📖" },
];

const projetLinks: NavLink[] = [
  { href: "/passeurs-de-memoire", label: "Passeurs de mémoire", icon: "🕯️" },
  { href: "/chansons", label: "Nos chansons", icon: "🎵" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [parametresOpen, setParametresOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, toggleTheme, dys, toggleDys } = useTheme();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const isEntrainementActive = pathname.startsWith("/entrainement");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-accent transition-colors"
          >
            <span className="text-2xl">🌍</span>
            <span className="hidden sm:inline">Chronogéo</span>
            <span className="sm:hidden">Chronogéo</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((link) => (
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

            {/* S'entraîner dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                  isEntrainementActive
                    ? "bg-accent/10 text-accent"
                    : "text-gray-600 hover:bg-gray-100 hover:text-foreground"
                }`}
              >
                <span className="mr-1">🎯</span>
                S&apos;entraîner
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg py-1 min-w-[200px] z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {entrainementLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-accent/10 text-accent"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-foreground"
                      }`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {afterLinks.map((link) => (
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

            {projetLinks.map((link) => (
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

          {/* Theme + Dys toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-foreground transition-colors"
              aria-label={theme === "dark" ? "Mode clair" : "Mode sombre"}
              title={theme === "dark" ? "Mode clair" : "Mode sombre"}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleDys}
              className={`p-2 rounded-lg transition-colors text-sm font-bold ${
                dys
                  ? "bg-accent/10 text-accent"
                  : "text-gray-500 hover:bg-gray-100 hover:text-foreground"
              }`}
              aria-label={dys ? "Désactiver le mode Dys" : "Activer le mode Dys"}
              title={dys ? "Désactiver le mode Dys" : "Activer le mode Dys"}
            >
              Aa
            </button>

            {/* Bouton paramètres — ouvre le drawer latéral */}
            <button
              onClick={() => setParametresOpen(true)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-foreground transition-colors"
              aria-label="Paramètres"
              aria-haspopup="dialog"
              aria-expanded={parametresOpen}
              title="Paramètres"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

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
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-2 pt-2">
            {/* Main links */}
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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

            {/* S'entraîner group */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="px-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                S&apos;entraîner
              </p>
              {entrainementLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 pl-6 rounded-lg text-base font-medium transition-colors ${
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

            {/* Tuteur */}
            {afterLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="px-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Projets
              </p>
              {projetLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
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

      {/* Parametres drawer */}
      <ParametresDrawer
        open={parametresOpen}
        onClose={() => setParametresOpen(false)}
      />
    </header>
  );
}
