import Link from "next/link";

interface ProgressionProps {
  niveauActuel: string;
  progression: {
    precedent: { niveau: string; slug: string } | null;
    suivant: { niveau: string; slug: string } | null;
  };
}

const niveauLabels: Record<string, string> = {
  "6e": "6e",
  "5e": "5e",
  "4e": "4e",
  "3e": "3e",
};

const niveauComplexite: Record<string, string> = {
  "6e": "Version simplifiée",
  "5e": "Version intermédiaire",
  "4e": "Version approfondie",
  "3e": "Version brevet",
};

export default function ProgressionSpiralaire({ niveauActuel, progression }: ProgressionProps) {
  const { precedent, suivant } = progression;
  if (!precedent && !suivant) return null;

  const liens: { niveau: string; slug: string }[] = [];
  if (precedent) liens.push(precedent);
  if (suivant) liens.push(suivant);

  return (
    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
      <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
        Cette méthode existe aussi en :
      </p>
      <div className="flex flex-wrap gap-2">
        {liens.map((lien) => (
          <Link
            key={lien.niveau}
            href={`/methodes/${lien.niveau}/${lien.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <span className="font-bold">{niveauLabels[lien.niveau] || lien.niveau}</span>
            <span className="text-blue-500 dark:text-blue-400 text-xs">
              ({niveauComplexite[lien.niveau] || ""})
            </span>
          </Link>
        ))}
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-sm font-bold text-accent">
          {niveauActuel} (version actuelle)
        </span>
      </div>
    </div>
  );
}
