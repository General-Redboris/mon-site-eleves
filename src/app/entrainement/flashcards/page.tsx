import { getAllFlashcardSets } from "@/lib/flashcards";
import FlashcardsListClient from "./FlashcardsListClient";

export const metadata = {
  title: "Flashcards | S'entraîner | Histoire-Géo Sancerre",
};

export default function FlashcardsListPage() {
  const sets = getAllFlashcardSets();
  return <FlashcardsListClient sets={sets} />;
}
