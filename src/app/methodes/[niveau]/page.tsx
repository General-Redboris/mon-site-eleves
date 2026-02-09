import Link from "next/link";
import { getFichesByFamille, NIVEAU_CONFIG } from "@/lib/methodes";
import ParcoursBrevet from "@/components/ParcoursBrevet";
import { notFound } from "next/navigation";

const niveauLabels: Record<string, string> = {
  "6e": "Sixième",
  "5e": "Cinquième",
  "4e": "Quatrième",
  "3e": "Troisième",
};

interface Props {
  params: Promise<{ niveau: string }>;
}

export default async function MethodesNiveauPage({ params }: Props) {
  const { niveau } = await params;
  const config = NIVEAU_CONFIG[niveau];

  if (!config) {
    notFound();
  }

  const famillesAvecFiches = getFichesByFamille(niveau);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/methodes" className="hover:text-accent">
          Méthodes
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{niveau}</span>
      </nav>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Fiches méthode — {niveau}</h1>
      <p className="text-gray-600 mb-8">
        {config.sousTitre} · {config.nbFiches} fiches · {config.cycle}
      </p>

      {/* Parcours brevet (3e only) */}
      {niveau === "3e" && <ParcoursBrevet />}

      {/* Families */}
      <div className="space-y-8">
        {famillesAvecFiches.map(({ famille, fiches }) => (
          <section key={famille.id}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{famille.icon}</span>
              <h2 className="text-xl font-bold">{famille.label}</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {fiches.length} fiche{fiches.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fiches.map((fiche) => (
                <Link
                  key={fiche.slug}
                  href={`/methodes/${niveau}/${fiche.slug}`}
                  className="group block bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-geographie hover:shadow-md transition-all"
                >
                  {/* Top row: numero badge + title */}
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-geographie text-white text-xs font-bold">
                      {fiche.numero}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm group-hover:text-geographie transition-colors leading-tight">
                        {fiche.titre}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{fiche.competence}</p>
                    </div>
                  </div>

                  {/* Bottom row: badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {fiche.mnemonique && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                        🔑 {fiche.mnemonique.acronyme}
                      </span>
                    )}
                    {fiche.dnb && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                        DNB {fiche.dnb.bareme} pts
                      </span>
                    )}
                    {fiche.etapes > 0 && (
                      <span className="text-xs text-gray-400">
                        {fiche.etapes} étape{fiche.etapes > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {famillesAvecFiches.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
            <div className="text-4xl mb-3">🧭</div>
            <p>Les fiches méthode pour la {niveauLabels[niveau] || niveau} arrivent bientôt !</p>
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="mt-10">
        <Link
          href="/methodes"
          className="text-accent hover:underline font-medium"
        >
          &larr; Retour aux fiches méthode
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { niveau: "6e" },
    { niveau: "5e" },
    { niveau: "4e" },
    { niveau: "3e" },
  ];
}
