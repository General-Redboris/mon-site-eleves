import Link from "next/link";
import { getPortrait, getAllPortraits } from "@/lib/passeurs";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PortraitDetailPage({ params }: Props) {
  const { slug } = await params;
  const portrait = getPortrait(slug);

  if (!portrait) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header bar */}
      <div className="bg-passeurs-dark py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-stone-400 mb-2">
            <Link href="/passeurs-de-memoire" className="hover:text-stone-200 transition-colors">
              Passeurs de memoire
            </Link>
            <span className="mx-2">/</span>
            <Link href="/passeurs-de-memoire#portraits" className="hover:text-stone-200 transition-colors">
              Portraits
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-300">{portrait.titre}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2 leading-tight">
          {portrait.titre}
        </h1>

        {portrait.dates && (
          <p className="text-sm text-stone-500 mb-1">{portrait.dates}</p>
        )}
        {portrait.soustitre && (
          <p className="text-sm text-stone-500 italic mb-6">{portrait.soustitre}</p>
        )}

        {/* Content */}
        <article className="bg-white border border-stone-200 p-6 sm:p-10">
          <div className="text-stone-700 text-base sm:text-lg leading-relaxed sm:leading-loose">
            <MarkdownContent content={portrait.content} />
          </div>
        </article>

        {/* Author credit */}
        <div className="mt-6 p-4 bg-stone-100 border border-stone-200">
          <p className="text-sm text-stone-600 italic">
            Recherche biographique realisee par <strong>{portrait.auteurs}</strong> dans le cadre du projet &laquo;&nbsp;Une classe, des destins&nbsp;&raquo; — Annee scolaire 2025-2026.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link href="/passeurs-de-memoire#portraits" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">
            &larr; Retour aux portraits
          </Link>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const portraits = getAllPortraits();
  return portraits.map((p) => ({ slug: p.slug }));
}
