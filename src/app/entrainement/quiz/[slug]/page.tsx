import Link from "next/link";
import { getQuiz, getAllQuizzes } from "@/lib/quiz";
import Quiz from "@/components/Quiz";
import SignalerErreur from "@/components/SignalerErreur";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function QuizDetailPage({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuiz(slug);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/entrainement/quiz" className="hover:text-accent">
          Quiz
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{quiz.titre}</span>
      </nav>

      <Quiz titre={quiz.titre} questions={quiz.questions} slug={slug} />

      <SignalerErreur pageTitle={quiz.titre} />

      <div className="mt-8 text-center">
        <Link
          href="/entrainement/quiz"
          className="text-accent hover:underline font-medium"
        >
          &larr; Retour aux quiz
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const quizzes = getAllQuizzes();
  return quizzes.map((q) => ({ slug: q.slug }));
}
