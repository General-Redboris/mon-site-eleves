import Link from "next/link";
import { getPoeme, getAllPoemes } from "@/lib/passeurs";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PoemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const poeme = getPoeme(slug);

  if (!poeme) {
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
            <Link href="/passeurs-de-memoire#poesie" className="hover:text-stone-200 transition-colors">
              Poesie
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-300">{poeme.titre}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Title - centered for poetry */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-light text-stone-900 italic leading-tight mb-2">
            {poeme.titre}
          </h1>
          <p className="text-sm text-stone-500">{poeme.auteur}</p>
        </div>

        {/* Poem content - larger, more airy typography */}
        <article className="bg-white border border-stone-200 p-6 sm:p-10">
          <div className="passeurs-poem">
            <MarkdownContent content={poeme.content} />
          </div>
        </article>

        {/* Author credit */}
        {poeme.type === "creation_eleve" && (
          <div className="mt-6 p-4 bg-stone-100 border border-stone-200">
            <p className="text-sm text-stone-600 italic">
              Poeme ecrit par <strong>{poeme.auteur}</strong> dans le cadre du projet &laquo;&nbsp;Passeurs de memoire&nbsp;&raquo; — Annee scolaire 2025-2026.
            </p>
          </div>
        )}

        {/* Back link */}
        <div className="mt-8">
          <Link href="/passeurs-de-memoire#poesie" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">
            &larr; Retour aux poemes
          </Link>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const poemes = getAllPoemes();
  return poemes.map((p) => ({ slug: p.slug }));
}
