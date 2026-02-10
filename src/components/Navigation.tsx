"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ParametresDrawer from "@/components/ParametresDrawer";

// ---------- Types ----------
interface NavLink {
  href: string;
  label: string;
  icon: string;
}

interface DropdownItem {
  id: string;
  label: string;
  icon: string;
  children: NavLink[];
}

// ---------- Données de navigation ----------
const mainLinks: NavLink[] = [
  { href: "/", label: "Accueil", icon: "🏠" },
  { href: "/cours", label: "Mes cours", icon: "📚" },
  { href: "/methodes", label: "Méthodes", icon: "🧭" },
];

const dropdowns: DropdownItem[] = [
  {
    id: "entrainement",
    label: "S'entraîner",
    icon: "🎯",
    children: [
      { href: "/entrainement/quiz", label: "Quiz", icon: "❓" },
      { href: "/entrainement/flashcards", label: "Flashcards", icon: "🃏" },
      { href: "/entrainement/brevet", label: "Sujets de brevet", icon: "📝" },
    ],
  },
  {
    id: "projets",
    label: "Nos projets",
    icon: "🎭",
    children: [
      { href: "/passeurs-de-memoire", label: "Passeurs de mémoire", icon: "🕯️" },
      { href: "/projets/comedie-musicale", label: "Comédie musicale", icon: "🎬" },
      { href: "/chansons", label: "Nos chansons", icon: "🎵" },
    ],
  },
  {
    id: "ressources",
    label: "Ressources",
    icon: "📎",
    children: [
      { href: "/ressources", label: "Ressources numériques", icon: "💻" },
      { href: "/glossaire", label: "Glossaire", icon: "📖" },
    ],
  },
];

// Lien direct "Mon tuteur IA" entre S'entraîner et Nos projets
const tuteurLink: NavLink = { href: "/tuteur", label: "Mon tuteur IA", icon: "🤖" };

// ---------- Composant chevron SVG ----------
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ---------- Composant principal ----------
export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // ID du dropdown desktop ouvert (null = aucun)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // IDs des accordéons mobiles ouverts
  const [mobileAccordions, setMobileAccordions] = useState<Set<string>>(new Set());
  const [parametresOpen, setParametresOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, toggleTheme, dys, toggleDys } = useTheme();

  // Détecte si un lien ou un de ses enfants est actif
  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  // Vérifie si un dropdown a un enfant actif
  function isDropdownActive(dropdown: DropdownItem): boolean {
    return dropdown.children.some((child) => isActive(child.href));
  }

  // Basculer un dropdown desktop (un seul ouvert à la fois)
  const toggleDropdown = useCallback((id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  }, []);

  // Basculer un accordéon mobile
  const toggleMobileAccordion = useCallback((id: string) => {
    setMobileAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Fermer le dropdown desktop au clic extérieur
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fermer le dropdown desktop à la touche Échap
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fermer les menus au changement de route
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // ---------- Rendu d'un dropdown desktop ----------
  function renderDesktopDropdown(dropdown: DropdownItem) {
    const isOpen = openDropdown === dropdown.id;
    const active = isDropdownActive(dropdown);

    return (
      <div className="relative" key={dropdown.id}>
        <button
          onClick={() => toggleDropdown(dropdown.id)}
          className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
            active
              ? "bg-accent/10 text-accent"
              : "text-gray-600 hover:bg-gray-100 hover:text-foreground dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="mr-1">{dropdown.icon}</span>
          {dropdown.label}
          <ChevronIcon open={isOpen} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg py-1 min-w-[220px] z-50">
            {dropdown.children.map((link) => (
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
    );
  }

  // ---------- Rendu d'un accordéon mobile ----------
  function renderMobileAccordion(dropdown: DropdownItem) {
    const isOpen = mobileAccordions.has(dropdown.id);
    const active = isDropdownActive(dropdown);

    return (
      <div key={dropdown.id} className="mt-1">
        <button
          onClick={() => toggleMobileAccordion(dropdown.id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
            active
              ? "bg-accent/10 text-accent"
              : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          aria-expanded={isOpen}
        >
          <span>
            <span className="mr-2">{dropdown.icon}</span>
            {dropdown.label}
          </span>
          <ChevronIcon open={isOpen} />
        </button>

        {isOpen && (
          <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-600 pl-2">
            {dropdown.children.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6" ref={navRef}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-accent transition-colors"
          >
            <span className="text-2xl">🌍</span>
            <span>Chronogéo</span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* Liens directs : Accueil, Mes cours, Méthodes */}
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-gray-600 hover:bg-gray-100 hover:text-foreground dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* Dropdown S'entraîner */}
            {renderDesktopDropdown(dropdowns[0])}

            {/* Lien direct Mon tuteur IA */}
            <Link
              href={tuteurLink.href}
              className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                isActive(tuteurLink.href)
                  ? "bg-accent/10 text-accent"
                  : "text-gray-600 hover:bg-gray-100 hover:text-foreground dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span className="mr-1">{tuteurLink.icon}</span>
              {tuteurLink.label}
            </Link>

            {/* Dropdown Nos projets */}
            {renderDesktopDropdown(dropdowns[1])}

            {/* Dropdown Ressources */}
            {renderDesktopDropdown(dropdowns[2])}
          </div>

          {/* Boutons thème/dys/paramètres + hamburger */}
          <div className="flex items-center gap-1">
            {/* Mode sombre */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-foreground transition-colors"
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

            {/* Mode Dys */}
            <button
              onClick={toggleDys}
              className={`p-2 rounded-lg transition-colors text-sm font-bold ${
                dys
                  ? "bg-accent/10 text-accent"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-foreground"
              }`}
              aria-label={dys ? "Désactiver le mode Dys" : "Activer le mode Dys"}
              title={dys ? "Désactiver le mode Dys" : "Activer le mode Dys"}
            >
              Aa
            </button>

            {/* Paramètres */}
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

            {/* Hamburger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
            {/* Liens directs */}
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* Accordéon S'entraîner */}
            {renderMobileAccordion(dropdowns[0])}

            {/* Lien direct Mon tuteur IA */}
            <Link
              href={tuteurLink.href}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive(tuteurLink.href)
                  ? "bg-accent/10 text-accent"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">{tuteurLink.icon}</span>
              {tuteurLink.label}
            </Link>

            {/* Accordéon Nos projets */}
            {renderMobileAccordion(dropdowns[1])}

            {/* Accordéon Ressources */}
            {renderMobileAccordion(dropdowns[2])}
          </div>
        )}
      </nav>

      {/* Drawer paramètres */}
      <ParametresDrawer
        open={parametresOpen}
        onClose={() => setParametresOpen(false)}
      />
    </header>
  );
}
