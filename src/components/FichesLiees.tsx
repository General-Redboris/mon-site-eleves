import Link from "next/link";

interface FicheLiee {
  slug: string;
  label: string;
}

interface FichesLieesProps {
  niveau: string;
  fiches: FicheLiee[];
}

export default function FichesLiees({ niveau, fiches }: FichesLieesProps) {
  if (fiches.length === 0) return null;

  return (
    <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
      <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">
        Fiches complémentaires
      </p>
      <div className="flex flex-wrap gap-2">
        {fiches.map((fiche) => (
          <Link
            key={fiche.slug}
            href={`/methodes/${niveau}/${fiche.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm font-medium text-geographie dark:text-geographie-light hover:bg-geographie/5 dark:hover:bg-geographie/10 hover:border-geographie/30 transition-colors"
          >
            <span>📄</span>
            {fiche.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
