"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface FicheSearchItem {
  titre: string;
  niveau: string;
  slug: string;
  mnemonique: string | null;
  competence: string;
}

interface SearchMethodesProps {
  fiches: FicheSearchItem[];
}

export default function SearchMethodes({ fiches }: SearchMethodesProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return fiches.filter(
      (f) =>
        f.titre.toLowerCase().includes(q) ||
        (f.mnemonique && f.mnemonique.toLowerCase().includes(q)) ||
        f.competence.toLowerCase().includes(q)
    );
  }, [query, fiches]);

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une méthode (ex : croquis, TOLES, oral...)"
          className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:border-geographie transition-colors"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {query.length >= 2 && (
        <div className="mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {results.length > 0 ? (
            <ul>
              {results.map((f) => (
                <li key={`${f.niveau}-${f.slug}`}>
                  <Link
                    href={`/methodes/${f.niveau}/${f.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-xs font-bold bg-gray-100 px-2 py-0.5 rounded shrink-0">
                      {f.niveau}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{f.titre}</span>
                    {f.mnemonique && (
                      <span className="ml-auto text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300 shrink-0">
                        {f.mnemonique}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-gray-400">Aucune fiche trouvée pour &laquo; {query} &raquo;</p>
          )}
        </div>
      )}
    </div>
  );
}
