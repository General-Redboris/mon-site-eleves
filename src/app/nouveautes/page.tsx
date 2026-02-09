import Link from "next/link";
import { getAllNouveautes } from "@/lib/nouveautes";

const typeBadge: Record<string, { label: string; cls: string }> = {
  fonctionnalite: { label: "Fonctionnalite", cls: "bg-geographie-light text-geographie" },
  contenu: { label: "Contenu", cls: "bg-histoire-light text-histoire" },
  correction: { label: "Correction", cls: "bg-emc-light text-emc" },
};

export default function NouveautesPage() {
  const nouveautes = getAllNouveautes();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-accent">Accueil</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Nouveautes</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
        Quoi de neuf ?
      </h1>

      <div className="space-y-6">
        {nouveautes.map((n, i) => {
          const badge = typeBadge[n.type] || typeBadge.contenu;
          return (
            <div key={i} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-accent" />
              <p className="text-xs text-gray-400 mb-1">{n.date}</p>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.cls}`}>
                  {badge.label}
                </span>
                <h2 className="font-semibold text-foreground">{n.titre}</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{n.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <Link href="/" className="text-accent hover:underline font-medium">
          &larr; Retour a l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
