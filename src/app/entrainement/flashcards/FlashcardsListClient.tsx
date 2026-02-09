"use client";

import { useState } from "react";
import Link from "next/link";

interface FlashcardSetMeta {
  titre: string;
  niveau: string;
  matiere?: string;
  slug: string;
  nbCartes: number;
  categories: Record<string, number>;
}

interface Props {
  sets: FlashcardSetMeta[];
}

const matiereColors: Record<string, string> = {
  histoire: "bg-histoire-light text-histoire",
  geographie: "bg-geographie-light text-geographie",
  emc: "bg-emc-light text-emc",
};

const categoryLabels: Record<string, string> = {
  dates: "Dates",
  vocabulaire: "Vocabulaire",
  "repères géographiques": "Repères",
  personnages: "Personnages",
};

export default function FlashcardsListClient({ sets }: Props) {
  const [filtreNiveau, setFiltreNiveau] = useState("Tous");
  const [filtreMatiere, setFiltreMatiere] = useState("Tous");

  const filtered = sets.filter((f) => {
    if (filtreNiveau !== "Tous" && f.niveau !== filtreNiveau) return false;
    if (
      filtreMatiere !== "Tous" &&
      (f.matiere || "").toLowerCase() !== filtreMatiere.toLowerCase()
    )
      return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
      <p className="text-gray-600 mb-8">
        Révise avec des cartes recto/verso : dates, vocabulaire, repères et personnages.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
        <FilterGroup
          label="Niveau"
          options={["Tous", "6e", "5e", "4e", "3e"]}
          value={filtreNiveau}
          onChange={setFiltreNiveau}
        />
        <FilterGroup
          label="Matière"
          options={["Tous", "Histoire", "Géographie", "EMC"]}
          value={filtreMatiere}
          onChange={setFiltreMatiere}
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((f) => (
            <Link
              key={f.slug}
              href={`/entrainement/flashcards/${f.slug}`}
              className="group block bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-emc hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {f.niveau}
                </span>
                {f.matiere && (
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      matiereColors[f.matiere] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {f.matiere}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg group-hover:text-emc transition-colors mb-2">
                {f.titre}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {f.nbCartes} carte{f.nbCartes > 1 ? "s" : ""}
              </p>
              {Object.keys(f.categories).length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(f.categories).map(([cat, count]) => (
                    <span
                      key={cat}
                      className="text-xs px-2 py-0.5 rounded bg-gray-50 text-gray-500 border border-gray-100"
                    >
                      {categoryLabels[cat] || cat} ({count})
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 text-sm font-semibold text-emc opacity-0 group-hover:opacity-100 transition-opacity">
                Réviser &rarr;
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">
            Aucune flashcard ne correspond à ces filtres.
          </p>
          <button
            onClick={() => {
              setFiltreNiveau("Tous");
              setFiltreMatiere("Tous");
            }}
            className="mt-3 text-accent hover:underline text-sm font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              value === o
                ? "bg-accent text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
