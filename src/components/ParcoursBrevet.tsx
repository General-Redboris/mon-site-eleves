import Link from "next/link";

interface ParcoursBlocProps {
  titre: string;
  sousTitre: string;
  points: string;
  lien: string;
  lienLabel: string;
}

function ParcoursBloc({ titre, sousTitre, points, lien, lienLabel }: ParcoursBlocProps) {
  return (
    <Link
      href={lien}
      className="group flex-1 min-w-[160px] bg-white border-2 border-red-200 rounded-xl p-4 hover:border-red-400 hover:shadow-md transition-all"
    >
      <p className="font-bold text-sm text-gray-900 group-hover:text-red-700 transition-colors">{titre}</p>
      <p className="text-xs text-gray-500 mt-0.5">{sousTitre}</p>
      {points && <p className="text-xs font-bold text-red-600 mt-1">{points}</p>}
      <p className="text-xs text-geographie mt-2">→ {lienLabel}</p>
    </Link>
  );
}

export default function ParcoursBrevet() {
  return (
    <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎯</span>
        <h2 className="text-lg font-bold text-red-900">Parcours brevet — Les fiches essentielles pour reussir le DNB</h2>
      </div>

      {/* Blocs principaux */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <ParcoursBloc
          titre="Exercice 1"
          sousTitre="Documents"
          points="15 pts"
          lien="/methodes/3e/analyser-un-document"
          lienLabel="Fiche 1A"
        />
        <div className="hidden sm:flex items-center text-red-300 text-xl font-bold">→</div>
        <ParcoursBloc
          titre="Exercice 2"
          sousTitre="Dev. construit"
          points="18 pts"
          lien="/methodes/3e/developpement-construit"
          lienLabel="Fiche 2"
        />
        <div className="hidden sm:flex items-center text-red-300 text-xl font-bold">→</div>
        <ParcoursBloc
          titre="Exercice 2"
          sousTitre="Croquis / Frise"
          points="7 pts"
          lien="/methodes/3e/croquis"
          lienLabel="Fiches 3/4"
        />
        <div className="hidden sm:flex items-center text-red-300 text-xl font-bold">→</div>
        <ParcoursBloc
          titre="EMC"
          sousTitre="Argumentation"
          points="10 pts"
          lien="/methodes/3e/argumentation-emc"
          lienLabel="Fiche 9"
        />
        <div className="hidden sm:flex items-center text-red-300 text-xl font-bold">→</div>
        <ParcoursBloc
          titre="Oral"
          sousTitre="Soutenance"
          points="100 pts"
          lien="/methodes/3e/oral-dnb"
          lienLabel="Fiche 12"
        />
      </div>

      {/* Fiches complémentaires */}
      <p className="text-xs text-red-800">
        <span className="font-medium">Fiches complementaires :</span>{" "}
        <Link href="/methodes/3e/reperes-dnb" className="underline hover:text-red-600">Reperes (#18)</Link>
        {" · "}
        <Link href="/methodes/3e/epreuve-ecrite-dnb" className="underline hover:text-red-600">Epreuve ecrite (#11)</Link>
        {" · "}
        <Link href="/methodes/3e/apprendre-sa-lecon" className="underline hover:text-red-600">Apprendre sa lecon (#16)</Link>
      </p>
    </div>
  );
}
