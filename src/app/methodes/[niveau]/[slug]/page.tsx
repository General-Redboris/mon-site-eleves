import Link from "next/link";
import { getFiche, getFichesByNiveau, FAMILLES } from "@/lib/methodes";
import { notFound } from "next/navigation";
import MethodeContent from "@/components/MethodeContent";
import BadgeMnemonique from "@/components/BadgeMnemonique";
import BadgeDNB from "@/components/BadgeDNB";
import ChecklistAutoEval from "@/components/ChecklistAutoEval";
import ProgressionSpiralaire from "@/components/ProgressionSpiralaire";
import FichesLiees from "@/components/FichesLiees";
import AlerteIA from "@/components/AlerteIA";
import SignalerErreur from "@/components/SignalerErreur";
import QRCodeModal from "@/components/QRCodeModal";

/* Couleurs par famille pour le hero */
const familleHeroColors: Record<string, { bg: string; border: string; text: string; badgeBg: string; badgeText: string }> = {
  analyser: { bg: "bg-geographie/5 dark:bg-geographie/10", border: "border-geographie/20", text: "text-geographie", badgeBg: "bg-geographie/10 dark:bg-geographie/20", badgeText: "text-geographie" },
  rediger: { bg: "bg-histoire/5 dark:bg-histoire/10", border: "border-histoire/20", text: "text-histoire", badgeBg: "bg-histoire/10 dark:bg-histoire/20", badgeText: "text-histoire" },
  cartographier: { bg: "bg-geographie/5 dark:bg-geographie/10", border: "border-geographie/20", text: "text-geographie", badgeBg: "bg-geographie/10 dark:bg-geographie/20", badgeText: "text-geographie" },
  temps: { bg: "bg-histoire/5 dark:bg-histoire/10", border: "border-histoire/20", text: "text-histoire", badgeBg: "bg-histoire/10 dark:bg-histoire/20", badgeText: "text-histoire" },
  reperer: { bg: "bg-geographie/5 dark:bg-geographie/10", border: "border-geographie/20", text: "text-geographie", badgeBg: "bg-geographie/10 dark:bg-geographie/20", badgeText: "text-geographie" },
  raisonner: { bg: "bg-emc/5 dark:bg-emc/10", border: "border-emc/20", text: "text-emc", badgeBg: "bg-emc/10 dark:bg-emc/20", badgeText: "text-emc" },
  brevet: { bg: "bg-accent/5 dark:bg-accent/10", border: "border-accent/20", text: "text-accent", badgeBg: "bg-accent/10 dark:bg-accent/20", badgeText: "text-accent" },
  apprendre: { bg: "bg-emc/5 dark:bg-emc/10", border: "border-emc/20", text: "text-emc", badgeBg: "bg-emc/10 dark:bg-emc/20", badgeText: "text-emc" },
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

  const familleConfig = FAMILLES[fiche.famille];
  const heroColors = familleHeroColors[fiche.famille] || familleHeroColors.analyser;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/methodes" className="hover:text-accent transition-colors">
          Méthodes
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/methodes/${niveau}`} className="hover:text-accent transition-colors">
          {niveau}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{fiche.titre}</span>
      </nav>

      {/* Hero section */}
      <header className={`rounded-2xl border ${heroColors.border} ${heroColors.bg} p-6 sm:p-8 mb-8`}>
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            {niveau}
          </span>
          {familleConfig && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${heroColors.badgeBg} ${heroColors.badgeText}`}>
              {familleConfig.icon} {familleConfig.label}
            </span>
          )}
          {fiche.etapes > 0 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {fiche.etapes} étapes
            </span>
          )}
        </div>

        {/* Numéro + Titre */}
        <div className="mb-3">
          <p className={`text-sm font-semibold ${heroColors.text} mb-1`}>
            Fiche {fiche.numero}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {fiche.titre}
          </h1>
        </div>

        {/* Compétence */}
        {fiche.competence && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {fiche.competence}
          </p>
        )}

        {/* Mnémonique encadré */}
        {fiche.mnemonique && (
          <BadgeMnemonique
            acronyme={fiche.mnemonique.acronyme}
            signification={fiche.mnemonique.signification}
            size="lg"
          />
        )}

        {/* DNB encadré */}
        {fiche.dnb && (
          <BadgeDNB
            exercice={fiche.dnb.exercice}
            bareme={fiche.dnb.bareme}
            size="lg"
          />
        )}

        {/* Bouton PDF si disponible */}
        {fiche.pdf_url && (
          <div className="mt-4">
            <a
              href={fiche.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger le PDF
            </a>
          </div>
        )}
      </header>

      {/* Alerte IA pour les 3e */}
      {niveau === "3e" && <AlerteIA niveau={niveau} />}

      {/* Contenu Markdown avec étapes numérotées */}
      <article className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <MethodeContent content={fiche.content} famille={fiche.famille} />
      </article>

      {/* Auto-évaluation */}
      {fiche.auto_evaluation && (
        <ChecklistAutoEval
          totalPoints={fiche.auto_evaluation.total_points}
          criteres={fiche.auto_evaluation.criteres}
        />
      )}

      {/* Fiches liées */}
      <FichesLiees niveau={niveau} fiches={fiche.fiches_liees} />

      {/* Progression spiralaire */}
      {fiche.progression && (
        <ProgressionSpiralaire
          niveauActuel={niveau}
          progression={fiche.progression}
        />
      )}

      {/* Bouton tuteur IA pour les 3e */}
      {niveau === "3e" && (
        <div className="mt-6">
          <Link
            href="/tuteur"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emc/10 dark:bg-emc/20 border border-emc/20 text-emc font-medium text-sm hover:bg-emc/20 dark:hover:bg-emc/30 transition-colors"
          >
            <span>🤖</span>
            S&apos;entraîner avec DéclikBrevet →
          </Link>
        </div>
      )}

      {/* Pied de fiche */}
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-4">
        <SignalerErreur pageTitle={fiche.titre} />
        <QRCodeModal path={`/methodes/${niveau}/${slug}`} />
      </div>

      {/* Retour */}
      <div className="mt-6">
        <Link
          href={`/methodes/${niveau}`}
          className="text-accent hover:underline font-medium text-sm"
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
