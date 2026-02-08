import Link from "next/link";
import { getQuiz, getAllQuizzes } from "@/lib/quiz";
import Quiz from "@/components/Quiz";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuiz(slug);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/entrainement" className="hover:text-accent">
          S&apos;entraîner
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{quiz.titre}</span>
      </nav>

      <Quiz titre={quiz.titre} questions={quiz.questions} />

      <div className="mt-8 text-center">
        <Link
          href="/entrainement"
          className="text-accent hover:underline font-medium"
        >
          &larr; Retour aux exercices
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const quizzes = getAllQuizzes();
  return quizzes.map((q) => ({ slug: q.slug }));
}
