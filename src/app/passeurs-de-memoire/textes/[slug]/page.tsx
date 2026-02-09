import Link from "next/link";
import { getTexte, getAllTextes } from "@/lib/passeurs";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function TexteDetailPage({ params }: Props) {
  const { slug } = await params;
  const texte = getTexte(slug);

  if (!texte) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header bar */}
      <div className="bg-passeurs-dark py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-stone-400 mb-2">
            <Link
              href="/passeurs-de-memoire"
              className="hover:text-stone-200 transition-colors"
            >
              Passeurs de mémoire
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-300">Texte</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4 leading-tight">
          {texte.titre}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 mb-8">
          <span>Texte rédigé par {texte.auteur}</span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span>{texte.annee_scolaire}</span>
          {texte.date && (
            <>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span>{formatDate(texte.date)}</span>
            </>
          )}
        </div>

        {/* Content */}
        <article className="bg-white border border-stone-200 p-6 sm:p-10">
          <div className="prose max-w-none text-stone-700 text-base sm:text-lg leading-relaxed sm:leading-loose">
            <MarkdownContent content={texte.content} />
          </div>
        </article>

        {/* Author credit */}
        <div className="mt-6 p-4 bg-stone-100 border border-stone-200">
          <p className="text-sm text-stone-600 italic">
            Texte rédigé par <strong>{texte.auteur}</strong> dans le cadre du
            projet &laquo;&nbsp;Passeurs de mémoire&nbsp;&raquo; — Année
            scolaire {texte.annee_scolaire}.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/passeurs-de-memoire"
            className="text-stone-600 hover:text-stone-900 font-medium transition-colors"
          >
            &larr; Retour aux textes
          </Link>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const textes = getAllTextes();
  return textes.map((t) => ({ slug: t.slug }));
}
