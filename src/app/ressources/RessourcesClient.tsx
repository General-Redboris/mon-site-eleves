"use client";

import { useState } from "react";
import Link from "next/link";
import type { Ressource } from "@/lib/ressources";

const typeIcons: Record<string, string> = {
  site: "🌐",
  video: "🎬",
  document: "📄",
  outil: "🔧",
};

const matiereColors: Record<string, string> = {
  histoire: "bg-histoire-light text-histoire",
  geographie: "bg-geographie-light text-geographie",
  emc: "bg-emc-light text-emc",
};

interface Props {
  ressources: Ressource[];
}

export default function RessourcesClient({ ressources }: Props) {
  const [filtreNiveau, setFiltreNiveau] = useState("Tous");
  const [filtreMatiere, setFiltreMatiere] = useState("Toutes");
  const [filtreType, setFiltreType] = useState("Tous");

  const filtered = ressources.filter((r) => {
    if (filtreNiveau !== "Tous" && !r.niveau.includes(filtreNiveau)) return false;
    if (filtreMatiere !== "Toutes" && r.matiere !== filtreMatiere.toLowerCase()) return false;
    if (filtreType !== "Tous" && r.type !== filtreType) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-accent">Accueil</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Ressources</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Ressources</h1>
      <p className="text-gray-600 mb-8">
        Sites, videos et outils utiles pour reviser et approfondir tes cours.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Niveau</label>
          <div className="flex gap-1">
            {["Tous", "6e", "5e", "4e", "3e"].map((n) => (
              <button
                key={n}
                onClick={() => setFiltreNiveau(n)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filtreNiveau === n
                    ? "bg-accent text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Matiere</label>
          <div className="flex gap-1">
            {["Toutes", "Histoire", "Geographie", "EMC"].map((m) => (
              <button
                key={m}
                onClick={() => setFiltreMatiere(m)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filtreMatiere === m
                    ? "bg-accent text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Type</label>
          <div className="flex gap-1">
            {["Tous", "site", "video", "document", "outil"].map((t) => (
              <button
                key={t}
                onClick={() => setFiltreType(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filtreType === t
                    ? "bg-accent text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {t === "Tous" ? "Tous" : `${typeIcons[t] || ""} ${t}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{typeIcons[r.type] || "📎"}</span>
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                    {r.titre}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{r.url.replace(/^https?:\/\//, "").split("/")[0]}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{r.description}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${matiereColors[r.matiere] || "bg-gray-100 text-gray-600"}`}>
                  {r.matiere}
                </span>
                {r.niveau.map((n) => (
                  <span key={n} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {n}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border">
          <p>Aucune ressource ne correspond a ces filtres.</p>
        </div>
      )}
    </div>
  );
}
