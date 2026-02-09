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
    <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
      <p className="text-sm font-bold text-gray-700 mb-2">
        Fiches complementaires
      </p>
      <ul className="space-y-1">
        {fiches.map((fiche) => (
          <li key={fiche.slug}>
            <Link
              href={`/methodes/${niveau}/${fiche.slug}`}
              className="text-sm text-geographie hover:text-accent hover:underline transition-colors"
            >
              → {fiche.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
