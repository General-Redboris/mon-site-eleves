import Link from "next/link";
import { getAllQuizzes } from "@/lib/quiz";

interface Props {
  niveau: string;
  matiere: string;
  slug: string;
}

export default function BoutonEntrainer({ niveau, matiere, slug }: Props) {
  const quizzes = getAllQuizzes();

  // Try to find a matching quiz by checking if slug parts overlap
  const match = quizzes.find((q) => {
    if (q.niveau !== niveau || q.matiere !== matiere) return false;
    // Check if quiz slug contains the course slug or vice versa
    const qSlugNorm = q.slug.replace(`${niveau}-`, "").replace(`${matiere}-`, "");
    const cSlugNorm = slug.replace("chapitre-", "").replace(/^\d+-/, "");
    return (
      qSlugNorm.includes(cSlugNorm) ||
      cSlugNorm.includes(qSlugNorm) ||
      q.slug.includes(slug) ||
      slug.includes(qSlugNorm)
    );
  });

  if (!match) return null;

  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <Link
        href={`/entrainement/quiz/${match.slug}`}
        className="inline-flex items-center gap-2 bg-accent text-white px-5 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
      >
        <span className="text-lg">🎯</span>
        {"S'entraîner sur ce chapitre"}
      </Link>
    </div>
  );
}
