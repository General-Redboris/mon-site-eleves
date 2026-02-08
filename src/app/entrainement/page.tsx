import { getAllQuizzes } from "@/lib/quiz";
import { getAllFlashcardSets } from "@/lib/flashcards";
import EntrainementClient from "./EntrainementClient";

export default function EntrainementPage() {
  const quizzes = getAllQuizzes();
  const flashcards = getAllFlashcardSets();

  return <EntrainementClient quizzes={quizzes} flashcards={flashcards} />;
}
