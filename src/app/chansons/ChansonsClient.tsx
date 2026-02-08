"use client";

import { useState } from "react";

interface Chanson {
  titre: string;
  auteur: string;
  theme: string;
  annee_scolaire: string;
  description: string;
  plateforme: "youtube" | "soundcloud";
  embed_id: string;
  lien_externe: string;
}

interface Props {
  chansons: Chanson[];
  themes: string[];
  annees: string[];
}

const themeColors: Record<string, string> = {
  "Première Guerre mondiale": "bg-histoire-light text-histoire",
  "Seconde Guerre mondiale": "bg-histoire-light text-histoire",
  "Révolution française": "bg-histoire-light text-histoire",
  "Développement durable": "bg-geographie-light text-geographie",
  "Mondialisation": "bg-geographie-light text-geographie",
};

function getThemeColor(theme: string): string {
  return themeColors[theme] || "bg-amber-100 text-amber-800";
}

export default function ChansonsClient({ chansons, themes, annees }: Props) {
  const [filtreTheme, setFiltreTheme] = useState("Tous");
  const [filtreAnnee, setFiltreAnnee] = useState("Toutes");

  const filtered = chansons.filter((c) => {
    if (filtreTheme !== "Tous" && c.theme !== filtreTheme) return false;
    if (filtreAnnee !== "Toutes" && c.annee_scolaire !== filtreAnnee)
      return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-3">Nos chansons</h1>
      <p className="text-gray-600 mb-8 max-w-3xl text-lg">
        Des chansons nées en classe, composées par votre professeur ou par
        vous-mêmes. Bonne écoute !
      </p>

      {/* Filters */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Theme filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Thème
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltreTheme("Tous")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filtreTheme === "Tous"
                    ? "bg-accent text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Tous
              </button>
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setFiltreTheme(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filtreTheme === t
                      ? "bg-accent text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Année scolaire filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Année scolaire
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltreAnnee("Toutes")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filtreAnnee === "Toutes"
                    ? "bg-accent text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Toutes
              </button>
              {annees.map((a) => (
                <button
                  key={a}
                  onClick={() => setFiltreAnnee(a)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filtreAnnee === a
                      ? "bg-accent text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((chanson, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl border-2 border-amber-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Embed player */}
              <div className="aspect-video bg-amber-50">
                {chanson.plateforme === "youtube" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${chanson.embed_id}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                    title={chanson.titre}
                  />
                ) : (
                  <iframe
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(chanson.embed_id)}&color=%23e76f51&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
                    className="w-full h-full"
                    allow="autoplay"
                    title={chanson.titre}
                  />
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {chanson.titre}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  Par {chanson.auteur}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {chanson.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getThemeColor(chanson.theme)}`}
                  >
                    {chanson.theme}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                    {chanson.annee_scolaire}
                  </span>
                </div>

                {/* External link */}
                <a
                  href={chanson.lien_externe}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors ${
                    chanson.plateforme === "youtube"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  Écouter sur{" "}
                  {chanson.plateforme === "youtube" ? "YouTube" : "SoundCloud"}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-gray-100">
          <div className="text-4xl mb-3">🎵</div>
          <p className="font-medium">
            Aucune chanson ne correspond à ces filtres.
          </p>
          <button
            onClick={() => {
              setFiltreTheme("Tous");
              setFiltreAnnee("Toutes");
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
