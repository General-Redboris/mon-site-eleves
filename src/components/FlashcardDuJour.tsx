"use client";

import { useState, useMemo } from "react";

interface Carte {
  recto: string;
  verso: string;
}

interface Props {
  cartes: Carte[];
}

export default function FlashcardDuJour({ cartes }: Props) {
  const randomCard = useMemo(() => {
    if (cartes.length === 0) return null;
    return cartes[Math.floor(Math.random() * cartes.length)];
  }, []);

  const [carte, setCarte] = useState(randomCard);
  const [flipped, setFlipped] = useState(false);

  if (!carte || cartes.length === 0) return null;

  function autreCarte() {
    const next = cartes[Math.floor(Math.random() * cartes.length)];
    setCarte(next);
    setFlipped(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-accent/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🃏</span>
        <h3 className="text-lg font-bold text-foreground">Flashcard du jour</h3>
      </div>

      <div
        className="perspective cursor-pointer mb-4"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`card-flip relative w-full min-h-[140px] ${flipped ? "flipped" : ""}`}>
          <div className="card-front absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-accent/5 to-histoire-light rounded-xl border border-gray-200 dark:border-gray-600">
            <p className="text-center font-medium text-foreground">{carte.recto}</p>
          </div>
          <div className="card-back absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-geographie-light to-emc-light rounded-xl border border-gray-200 dark:border-gray-600">
            <p className="text-center text-sm text-foreground">{carte.verso}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Clique pour retourner</p>
        <button
          onClick={autreCarte}
          className="text-sm text-accent hover:underline font-medium"
        >
          Une autre carte !
        </button>
      </div>
    </div>
  );
}
