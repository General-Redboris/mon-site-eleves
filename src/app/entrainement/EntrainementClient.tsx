"use client";

import { useState } from "react";
import Link from "next/link";

interface QuizMeta {
  titre: string;
  niveau: string;
  matiere: string;
  slug: string;
}

interface FlashcardMeta {
  titre: string;
  niveau?: string;
  matiere?: string;
  slug: string;
}

interface Props {
  quizzes: QuizMeta[];
  flashcards: FlashcardMeta[];
}

const matiereColors: Record<string, string> = {
  histoire: "bg-histoire-light text-histoire",
  geographie: "bg-geographie-light text-geographie",
  emc: "bg-emc-light text-emc",
};

const niveauxConfig = [
  { value: "Tous", label: "Tous les niveaux" },
  { value: "6e", label: "6e" },
  { value: "5e", label: "5e" },
  { value: "4e", label: "4e" },
  { value: "3e", label: "3e" },
];

const ordreNiveaux = ["6e", "5e", "4e", "3e"];

function groupByNiveau<T extends { niveau?: string }>(
  items: T[]
): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  for (const item of items) {
    const niv = item.niveau || "Autre";
    if (!groups[niv]) groups[niv] = [];
    groups[niv].push(item);
  }
  return groups;
}

function NiveauSection({
  niveau,
  children,
}: {
  niveau: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
          {niveau}
        </span>
        Classe de {niveau}
      </h3>
      {children}
    </div>
  );
}

export default function EntrainementClient({ quizzes, flashcards }: Props) {
  const [filtreNiveau, setFiltreNiveau] = useState("Tous");

  const filteredQuizzes =
    filtreNiveau === "Tous"
      ? quizzes
      : quizzes.filter((q) => q.niveau === filtreNiveau);

  const filteredFlashcards =
    filtreNiveau === "Tous"
      ? flashcards
      : flashcards.filter((f) => f.niveau === filtreNiveau);

  const quizByNiveau = groupByNiveau(filteredQuizzes);
  const flashcardsByNiveau = groupByNiveau(filteredFlashcards);

  // Ordered niveaux that have content
  const quizNiveaux = ordreNiveaux.filter((n) => quizByNiveau[n]?.length > 0);
  const flashcardsNiveaux = ordreNiveaux.filter(
    (n) => flashcardsByNiveau[n]?.length > 0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">S&apos;entraîner</h1>
      <p className="text-gray-600 mb-8">
        Teste tes connaissances avec des quiz et des flashcards interactifs.
      </p>

      {/* Niveau selector */}
      <div className="mb-10">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Filtrer par niveau
        </label>
        <div className="flex flex-wrap gap-2">
          {niveauxConfig.map((n) => (
            <button
              key={n.value}
              onClick={() => setFiltreNiveau(n.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtreNiveau === n.value
                  ? "bg-accent text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz section */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>🎯</span> Quiz
        </h2>

        {filteredQuizzes.length > 0 ? (
          filtreNiveau === "Tous" ? (
            // Grouped by niveau
            quizNiveaux.map((niveau) => (
              <NiveauSection key={niveau} niveau={niveau}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quizByNiveau[niveau].map((q) => (
                    <QuizCard key={q.slug} quiz={q} />
                  ))}
                </div>
              </NiveauSection>
            ))
          ) : (
            // Flat list for single niveau
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredQuizzes.map((q) => (
                <QuizCard key={q.slug} quiz={q} />
              ))}
            </div>
          )
        ) : (
          <EmptyState text="Aucun quiz pour ce niveau." />
        )}
      </section>

      {/* Flashcards section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>🃏</span> Flashcards
        </h2>

        {filteredFlashcards.length > 0 ? (
          filtreNiveau === "Tous" ? (
            flashcardsNiveaux.map((niveau) => (
              <NiveauSection key={niveau} niveau={niveau}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {flashcardsByNiveau[niveau].map((f) => (
                    <FlashcardCard key={f.slug} flashcard={f} />
                  ))}
                </div>
              </NiveauSection>
            ))
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFlashcards.map((f) => (
                <FlashcardCard key={f.slug} flashcard={f} />
              ))}
            </div>
          )
        ) : (
          <EmptyState text="Aucune flashcard pour ce niveau." />
        )}
      </section>
    </div>
  );
}

function QuizCard({ quiz }: { quiz: QuizMeta }) {
  return (
    <Link
      href={`/entrainement/quiz/${quiz.slug}`}
      className="group block bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-accent hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            matiereColors[quiz.matiere] || "bg-gray-100 text-gray-600"
          }`}
        >
          {quiz.matiere}
        </span>
        <span className="text-xs text-gray-400">{quiz.niveau}</span>
      </div>
      <h3 className="font-semibold group-hover:text-accent transition-colors">
        {quiz.titre}
      </h3>
    </Link>
  );
}

function FlashcardCard({ flashcard }: { flashcard: FlashcardMeta }) {
  return (
    <Link
      href={`/entrainement/flashcards/${flashcard.slug}`}
      className="group block bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-emc hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        {flashcard.matiere && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              matiereColors[flashcard.matiere] || "bg-gray-100 text-gray-600"
            }`}
          >
            {flashcard.matiere}
          </span>
        )}
        {flashcard.niveau && (
          <span className="text-xs text-gray-400">{flashcard.niveau}</span>
        )}
      </div>
      <h3 className="font-semibold group-hover:text-emc transition-colors">
        {flashcard.titre}
      </h3>
    </Link>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="bg-white rounded-xl p-8 text-center text-gray-400 border border-gray-100">
      <p>{text}</p>
    </div>
  );
}
