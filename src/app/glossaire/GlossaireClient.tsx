"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface VocabItem {
  terme: string;
  definition: string;
  niveau: string;
  matiere: string;
  coursSlug: string;
  coursTitre: string;
}

const matiereColors: Record<string, string> = {
  histoire: "bg-histoire-light text-histoire",
  geographie: "bg-geographie-light text-geographie",
  emc: "bg-emc-light text-emc",
};

interface Props {
  items: VocabItem[];
}

export default function GlossaireClient({ items }: Props) {
  const [search, setSearch] = useState("");
  const [filtreNiveau, setFiltreNiveau] = useState("Tous");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filtreNiveau !== "Tous" && item.niveau !== filtreNiveau) return false;
      if (search) {
        const q = search.toLowerCase();
        return item.terme.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q);
      }
      if (activeLetter) {
        return item.terme[0].toUpperCase() === activeLetter;
      }
      return true;
    });
  }, [items, search, filtreNiveau, activeLetter]);

  const letters = useMemo(() => {
    const set = new Set<string>();
    for (const item of items) {
      const first = item.terme[0]?.toUpperCase();
      if (first) set.add(first);
    }
    return Array.from(set).sort();
  }, [items]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-accent">Accueil</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Glossaire</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Glossaire</h1>
      <p className="text-gray-600 mb-6">
        Tous les termes de vocabulaire de tes cours, classes par ordre alphabetique.
        {items.length > 0 && ` ${items.length} termes au total.`}
      </p>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
          placeholder="Rechercher un terme..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground focus:border-accent focus:outline-none"
        />
        <div className="flex gap-1">
          {["Tous", "6e", "5e", "4e", "3e"].map((n) => (
            <button
              key={n}
              onClick={() => setFiltreNiveau(n)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtreNiveau === n
                  ? "bg-accent text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Alphabet nav */}
      <div className="flex flex-wrap gap-1 mb-6">
        <button
          onClick={() => { setActiveLetter(null); setSearch(""); }}
          className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
            !activeLetter && !search ? "bg-accent text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Tous
        </button>
        {letters.map((l) => (
          <button
            key={l}
            onClick={() => { setActiveLetter(l); setSearch(""); }}
            className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
              activeLetter === l ? "bg-accent text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Items */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-foreground">{item.terme}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.definition}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${matiereColors[item.matiere] || "bg-gray-100"}`}>
                    {item.matiere}
                  </span>
                  <span className="text-xs text-gray-400">{item.niveau}</span>
                </div>
              </div>
              <Link
                href={`/cours/${item.niveau}/${item.matiere}/${item.coursSlug}`}
                className="inline-block mt-2 text-xs text-accent hover:underline"
              >
                Voir le cours : {item.coursTitre}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center text-gray-400">
          Aucun terme ne correspond a ta recherche.
        </div>
      )}
    </div>
  );
}
