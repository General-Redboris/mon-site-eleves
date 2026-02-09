import Link from "next/link";

interface AlerteIAProps {
  niveau: string;
}

export default function AlerteIA({ niveau }: AlerteIAProps) {
  const isTroisieme = niveau === "3e";
  const acronyme = isTroisieme ? "SAQO+B" : "SAQO";
  const signification = isTroisieme
    ? "Source, Auteur, Quand, Objectif + Biais"
    : "Source, Auteur, Quand, Objectif";

  return (
    <div className="my-6 bg-purple-50 border-2 border-purple-200 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">🤖</span>
        <div>
          <p className="font-bold text-purple-900 mb-1">Alerte IA</p>
          <p className="text-sm text-purple-800">
            Si tu utilises une IA (ChatGPT, Gemini...), vérifie TOUJOURS les informations
            avec le réflexe <strong>{acronyme}</strong> : {signification}.
            Une IA peut inventer des faits !
          </p>
          <Link
            href={`/methodes/${niveau}/recherche-documentaire`}
            className="inline-block mt-2 text-sm font-medium text-purple-700 hover:text-purple-900 hover:underline"
          >
            → Voir la fiche Recherche documentaire
          </Link>
        </div>
      </div>
    </div>
  );
}
