import Link from "next/link";
import { getFlashcardSet, getAllFlashcardSets } from "@/lib/flashcards";
import Flashcard from "@/components/Flashcard";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function FlashcardsPage({ params }: Props) {
  const { slug } = await params;
  const set = getFlashcardSet(slug);

  if (!set) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/entrainement/flashcards" className="hover:text-accent">
          Flashcards
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{set.titre}</span>
      </nav>

      <Flashcard titre={set.titre} cartes={set.cartes} />

      <div className="mt-8 text-center">
        <Link
          href="/entrainement/flashcards"
          className="text-accent hover:underline font-medium"
        >
          &larr; Retour aux flashcards
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const sets = getAllFlashcardSets();
  return sets.map((s) => ({ slug: s.slug }));
}
