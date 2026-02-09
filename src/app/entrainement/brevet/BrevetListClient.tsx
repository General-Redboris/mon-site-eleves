"use client";

import { useState } from "react";
import Link from "next/link";

interface SujetBrevet {
  id: string;
  annee: number;
  session: string;
  themes: string[];
  types_exercice: string[];
  description: string;
}

interface Props {
  sujets: SujetBrevet[];
}

const themeLabels: Record<string, string> = {
  histoire: "Histoire",
  geographie: "Géographie",
  emc: "EMC",
};

const themeColors: Record<string, string> = {
  histoire: "bg-histoire-light text-histoire",
  geographie: "bg-geographie-light text-geographie",
  emc: "bg-emc-light text-emc",
};

const typeLabels: Record<string, string> = {
  analyse_documents: "Analyse de documents",
  developpement_construit: "Développement construit",
  reperes: "Repères",
  exercice_cartographie: "Cartographie",
};

export default function BrevetListClient({ sujets }: Props) {
  const [filtreAnnee, setFiltreAnnee] = useState("Toutes");
  const [filtreTheme, setFiltreTheme] = useState("Tous");

  const annees = Array.from(new Set(sujets.map((s) => s.annee)))
    .sort((a, b) => b - a)
    .map(String);

  const filtered = sujets.filter((s) => {
    if (filtreAnnee !== "Toutes" && s.annee !== Number(filtreAnnee))
      return false;
    if (filtreTheme !== "Tous" && !s.themes.includes(filtreTheme.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Sujets de brevet</h1>
      <p className="text-gray-600 mb-8">
        Entraîne-toi avec des sujets de brevet corrigés en histoire-géographie
        et EMC.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
        <FilterGroup
          label="Année"
          options={["Toutes", ...annees]}
          value={filtreAnnee}
          onChange={setFiltreAnnee}
        />
        <FilterGroup
          label="Thème"
          options={["Tous", "Histoire", "Géographie", "EMC"]}
          value={filtreTheme}
          onChange={setFiltreTheme}
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <Link
              key={s.id}
              href={`/entrainement/brevet/${s.id}`}
              className="group block bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-accent hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {s.annee}
                </span>
                {s.themes.map((t) => (
                  <span
                    key={t}
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      themeColors[t] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {themeLabels[t] || t}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-lg group-hover:text-accent transition-colors mb-2">
                {s.session}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{s.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.types_exercice.map((type) => (
                  <span
                    key={type}
                    className="text-xs px-2 py-0.5 rounded bg-gray-50 text-gray-500 border border-gray-100"
                  >
                    {typeLabels[type] || type}
                  </span>
                ))}
              </div>
              <div className="text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Voir le sujet &rarr;
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">
            Aucun sujet ne correspond à ces filtres.
          </p>
          <button
            onClick={() => {
              setFiltreAnnee("Toutes");
              setFiltreTheme("Tous");
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
