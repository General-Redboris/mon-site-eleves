import Link from "next/link";
import { getAllFichesMethode, getAllMnemoniques, NIVEAU_CONFIG } from "@/lib/methodes";
import IndexMnemoniques from "@/components/IndexMnemoniques";
import SearchMethodes from "@/components/SearchMethodes";

const niveauIcons: Record<string, string> = {
  "6e": "🏗️",
  "5e": "🧭",
  "4e": "🔍",
  "3e": "🎯",
};

const niveauColors: Record<string, string> = {
  "6e": "border-green-300 hover:border-green-500 hover:shadow-green-100",
  "5e": "border-blue-300 hover:border-blue-500 hover:shadow-blue-100",
  "4e": "border-purple-300 hover:border-purple-500 hover:shadow-purple-100",
  "3e": "border-red-300 hover:border-red-500 hover:shadow-red-100",
};

const niveauBadgeColors: Record<string, string> = {
  "6e": "bg-green-100 text-green-800",
  "5e": "bg-blue-100 text-blue-800",
  "4e": "bg-purple-100 text-purple-800",
  "3e": "bg-red-100 text-red-800",
};

export default function MethodesPage() {
  const fiches = getAllFichesMethode();
  const mnemoniques = getAllMnemoniques();

  // Prepare search data
  const searchItems = fiches.map((f) => ({
    titre: f.titre,
    niveau: f.niveau,
    slug: f.slug,
    mnemonique: f.mnemonique?.acronyme || null,
    competence: f.competence,
  }));

  const niveaux = ["6e", "5e", "4e", "3e"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Fiches methode</h1>
      <p className="text-gray-600 mb-8">
        Toutes les methodes pour reussir en histoire-geographie-EMC
      </p>

      {/* Search bar */}
      <SearchMethodes fiches={searchItems} />

      {/* 4 level cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {niveaux.map((niveau) => {
          const config = NIVEAU_CONFIG[niveau];
          const ficheCount = fiches.filter((f) => f.niveau === niveau).length;

          return (
            <Link
              key={niveau}
              href={`/methodes/${niveau}`}
              className={`group block bg-white p-6 rounded-2xl border-2 ${niveauColors[niveau]} hover:shadow-lg transition-all`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl">{niveauIcons[niveau]}</span>
                  <h2 className="text-2xl font-bold mt-2 group-hover:text-foreground transition-colors">
                    {niveau}
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">{config.sousTitre}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${niveauBadgeColors[niveau]}`}>
                  {config.cycle}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {ficheCount > 0 ? `${ficheCount} fiche${ficheCount > 1 ? "s" : ""}` : `${config.nbFiches} fiches`}
                </span>
                <span className="text-sm font-medium text-geographie group-hover:text-accent transition-colors">
                  Voir les fiches →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Index des mnémotechniques */}
      <IndexMnemoniques mnemoniques={mnemoniques} />
    </div>
  );
}
