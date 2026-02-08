"use client";

import { useState } from "react";

interface Carte {
  recto: string;
  verso: string;
  categorie: string;
  niveau_difficulte: number;
}

interface FlashcardProps {
  titre: string;
  cartes: Carte[];
}

export default function Flashcard({ titre, cartes }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [toReview, setToReview] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const card = cartes[currentIndex];
  const total = cartes.length;

  function flip() {
    setFlipped(!flipped);
  }

  function markKnown() {
    setKnown((prev) => [...prev, currentIndex]);
    goNext();
  }

  function markToReview() {
    setToReview((prev) => [...prev, currentIndex]);
    goNext();
  }

  function goNext() {
    setFlipped(false);
    if (currentIndex + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function restart() {
    setCurrentIndex(0);
    setFlipped(false);
    setKnown([]);
    setToReview([]);
    setFinished(false);
  }

  function restartToReview() {
    if (toReview.length === 0) return;
    setCurrentIndex(0);
    setFlipped(false);
    setKnown([]);
    setToReview([]);
    setFinished(false);
  }

  const categorieBadge = (cat: string) => {
    const colors: Record<string, string> = {
      dates: "bg-histoire-light text-histoire",
      vocabulaire: "bg-geographie-light text-geographie",
      "repères géographiques": "bg-geographie-light text-geographie",
      personnages: "bg-emc-light text-emc",
    };
    return colors[cat] || "bg-gray-100 text-gray-600";
  };

  if (finished) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">{titre}</h2>
          <div className="text-5xl mb-4">📊</div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-green-600">{known.length}</p>
              <p className="text-sm text-green-700">Connues</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-orange-600">
                {toReview.length}
              </p>
              <p className="text-sm text-orange-700">À revoir</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={restart}
              className="flex-1 bg-accent text-white px-5 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
            >
              Tout recommencer
            </button>
            {toReview.length > 0 && (
              <button
                onClick={restartToReview}
                className="flex-1 bg-orange-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                Revoir les cartes manquées
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{titre}</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-accent h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        className="perspective cursor-pointer mb-6"
        onClick={flip}
      >
        <div
          className={`card-flip relative w-full ${flipped ? "flipped" : ""}`}
          style={{ minHeight: "250px" }}
        >
          {/* Front */}
          <div className="card-front absolute inset-0 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categorieBadge(card.categorie)}`}
            >
              {card.categorie}
            </span>
            <p className="text-xl font-semibold text-center">{card.recto}</p>
            <p className="text-sm text-gray-400 mt-4">
              Clique pour retourner la carte
            </p>
          </div>

          {/* Back */}
          <div className="card-back absolute inset-0 bg-accent/5 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-accent/20">
            <p className="text-lg text-center font-medium">{card.verso}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {flipped && (
        <div className="flex gap-4">
          <button
            onClick={markToReview}
            className="flex-1 bg-orange-100 text-orange-700 px-5 py-3 rounded-xl font-semibold hover:bg-orange-200 transition-colors"
          >
            🔄 À revoir
          </button>
          <button
            onClick={markKnown}
            className="flex-1 bg-green-100 text-green-700 px-5 py-3 rounded-xl font-semibold hover:bg-green-200 transition-colors"
          >
            ✅ Connue
          </button>
        </div>
      )}

      {!flipped && (
        <div className="text-center">
          <button
            onClick={flip}
            className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
          >
            Retourner la carte
          </button>
        </div>
      )}
    </div>
  );
}
