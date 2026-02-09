"use client";

import { useState } from "react";
import Link from "next/link";

interface QuizMeta {
  titre: string;
  niveau: string;
  matiere: string;
  slug: string;
  nbQuestions: number;
}

interface Props {
  quizzes: QuizMeta[];
}

const matiereColors: Record<string, string> = {
  histoire: "bg-histoire-light text-histoire",
  geographie: "bg-geographie-light text-geographie",
  emc: "bg-emc-light text-emc",
};

export default function QuizListClient({ quizzes }: Props) {
  const [filtreNiveau, setFiltreNiveau] = useState("Tous");
  const [filtreMatiere, setFiltreMatiere] = useState("Tous");

  const filtered = quizzes.filter((q) => {
    if (filtreNiveau !== "Tous" && q.niveau !== filtreNiveau) return false;
    if (filtreMatiere !== "Tous" && q.matiere.toLowerCase() !== filtreMatiere.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Quiz</h1>
      <p className="text-gray-600 mb-8">
        Teste tes connaissances avec des quiz interactifs par chapitre.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
        <FilterGroup
          label="Niveau"
          options={["Tous", "6e", "5e", "4e", "3e"]}
          value={filtreNiveau}
          onChange={setFiltreNiveau}
        />
        <FilterGroup
          label="Matière"
          options={["Tous", "Histoire", "Géographie", "EMC"]}
          value={filtreMatiere}
          onChange={setFiltreMatiere}
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((q) => (
            <Link
              key={q.slug}
              href={`/entrainement/quiz/${q.slug}`}
              className="group block bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-accent hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {q.niveau}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    matiereColors[q.matiere] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {q.matiere}
                </span>
              </div>
              <h3 className="font-semibold text-lg group-hover:text-accent transition-colors mb-2">
                {q.titre}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {q.nbQuestions} question{q.nbQuestions > 1 ? "s" : ""}
                </span>
                <span className="text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Commencer &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          onReset={() => {
            setFiltreNiveau("Tous");
            setFiltreMatiere("Tous");
          }}
        />
      )}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              value === o
                ? "bg-accent text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">
      <div className="text-4xl mb-3">🔍</div>
      <p className="font-medium">Aucun quiz ne correspond à ces filtres.</p>
      <button
        onClick={onReset}
        className="mt-3 text-accent hover:underline text-sm font-medium"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}
