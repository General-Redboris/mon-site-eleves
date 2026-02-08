import Link from "next/link";
import { getAllQuizzes } from "@/lib/quiz";
import { getAllFlashcardSets } from "@/lib/flashcards";

const matiereColors: Record<string, string> = {
  histoire: "bg-histoire-light text-histoire",
  geographie: "bg-geographie-light text-geographie",
  emc: "bg-emc-light text-emc",
};

export default function EntrainementPage() {
  const quizzes = getAllQuizzes();
  const flashcards = getAllFlashcardSets();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">S&apos;entraîner</h1>
      <p className="text-gray-600 mb-10">
        Teste tes connaissances avec des quiz et des flashcards interactifs.
      </p>

      {/* Quiz section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🎯</span> Quiz
        </h2>
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((q) => (
              <Link
                key={q.slug}
                href={`/entrainement/quiz/${q.slug}`}
                className="group block bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-accent hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      matiereColors[q.matiere] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {q.matiere}
                  </span>
                  <span className="text-xs text-gray-400">{q.niveau}</span>
                </div>
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {q.titre}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400 border border-gray-100">
            <p>Les quiz arrivent bientôt !</p>
          </div>
        )}
      </section>

      {/* Flashcards section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🃏</span> Flashcards
        </h2>
        {flashcards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcards.map((f) => (
              <Link
                key={f.slug}
                href={`/entrainement/flashcards/${f.slug}`}
                className="group block bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-emc hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  {f.matiere && (
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        matiereColors[f.matiere] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {f.matiere}
                    </span>
                  )}
                  {f.niveau && (
                    <span className="text-xs text-gray-400">{f.niveau}</span>
                  )}
                </div>
                <h3 className="font-semibold group-hover:text-emc transition-colors">
                  {f.titre}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400 border border-gray-100">
            <p>Les flashcards arrivent bientôt !</p>
          </div>
        )}
      </section>
    </div>
  );
}
