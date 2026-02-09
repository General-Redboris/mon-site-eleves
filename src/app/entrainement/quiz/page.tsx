import { getAllQuizzes } from "@/lib/quiz";
import QuizListClient from "./QuizListClient";

export const metadata = {
  title: "Quiz | S'entraîner | Histoire-Géo Sancerre",
};

export default function QuizListPage() {
  const quizzes = getAllQuizzes();
  return <QuizListClient quizzes={quizzes} />;
}
