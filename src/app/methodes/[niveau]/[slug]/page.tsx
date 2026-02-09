import Link from "next/link";
import { getFiche, getFichesByNiveau } from "@/lib/methodes";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import BadgeMnemonique from "@/components/BadgeMnemonique";
import BadgeDNB from "@/components/BadgeDNB";
import ChecklistAutoEval from "@/components/ChecklistAutoEval";
import ProgressionSpiralaire from "@/components/ProgressionSpiralaire";
import FichesLiees from "@/components/FichesLiees";
import AlerteIA from "@/components/AlerteIA";

const domaineColors: Record<string, string> = {
  "Histoire-Geographie": "bg-histoire-light text-histoire",
  "Histoire-Géographie": "bg-histoire-light text-histoire",
  "Geographie": "bg-geographie-light text-geographie",
  "Géographie": "bg-geographie-light text-geographie",
  "Histoire": "bg-histoire-light text-histoire",
  "EMC": "bg-emc-light text-emc",
  "Histoire-Geographie-EMC": "bg-gray-100 text-gray-700",
  "Histoire-Géographie-EMC": "bg-gray-100 text-gray-700",
};

interface Props {
  params: Promise<{ niveau: string; slug: string }>;
}

export default async function FicheMethodePage({ params }: Props) {
  const { niveau, slug } = await params;
  const fiche = getFiche(niveau, slug);

  if (!fiche) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/methodes" className="hover:text-accent">
          Methodes
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/methodes/${niveau}`} className="hover:text-accent">
          {niveau}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{fiche.titre}</span>
      </nav>

      {/* Main card */}
      <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
          {fiche.titre}
        </h1>

        {/* Metadata badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
            {niveau}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-geographie-light text-geographie font-medium">
            {fiche.competence}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${domaineColors[fiche.domaine] || "bg-gray-100 text-gray-700"}`}>
            {fiche.domaine}
          </span>
          {fiche.dnb && (
            <BadgeDNB exercice={fiche.dnb.exercice} bareme={fiche.dnb.bareme} />
          )}
        </div>

        {/* Mnemonique highlight */}
        {fiche.mnemonique && (
          <BadgeMnemonique
            acronyme={fiche.mnemonique.acronyme}
            signification={fiche.mnemonique.signification}
            size="lg"
          />
        )}

        {/* Alerte IA for 3e */}
        {niveau === "3e" && <AlerteIA niveau={niveau} />}

        {/* Markdown content */}
        <div className="mt-6">
          <MarkdownContent content={fiche.content} />
        </div>
      </article>

      {/* Auto-evaluation checklist */}
      {fiche.auto_evaluation && (
        <ChecklistAutoEval
          totalPoints={fiche.auto_evaluation.total_points}
          criteres={fiche.auto_evaluation.criteres}
        />
      )}

      {/* Fiches liees */}
      <FichesLiees niveau={niveau} fiches={fiche.fiches_liees} />

      {/* Progression spiralaire */}
      {fiche.progression && (
        <ProgressionSpiralaire
          niveauActuel={niveau}
          progression={fiche.progression}
        />
      )}

      {/* Back link */}
      <div className="mt-8">
        <Link
          href={`/methodes/${niveau}`}
          className="text-accent hover:underline font-medium"
        >
          &larr; Retour aux fiches {niveau}
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const niveaux = ["6e", "5e", "4e", "3e"];
  const params: { niveau: string; slug: string }[] = [];

  for (const niveau of niveaux) {
    const fiches = getFichesByNiveau(niveau);
    for (const fiche of fiches) {
      params.push({ niveau, slug: fiche.slug });
    }
  }

  return params;
}
