"use client";

import { useState } from "react";

interface Props {
  question: string;
  options: string[];
  reponse: number;
  explication?: string;
}

export default function MiniQuiz({ question, options, reponse, explication }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(idx: number) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  }

  const isCorrect = selected === reponse;

  return (
    <div className="my-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
      <p className="text-sm font-bold text-accent mb-1">Mini-quiz</p>
      <p className="font-medium text-foreground mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((opt, idx) => {
          let cls = "w-full text-left p-3 rounded-lg border-2 text-sm font-medium transition-colors ";
          if (revealed) {
            if (idx === reponse) {
              cls += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
            } else if (idx === selected) {
              cls += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
            } else {
              cls += "border-gray-200 dark:border-gray-600 text-gray-400";
            }
          } else {
            cls += "border-gray-200 dark:border-gray-600 hover:border-accent hover:bg-accent/5 cursor-pointer";
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className={cls}>
              {opt}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className={`mt-3 p-3 rounded-lg text-sm ${
          isCorrect
            ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
            : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300"
        }`}>
          <p className="font-semibold">{isCorrect ? "Bonne reponse !" : "Pas tout a fait..."}</p>
          {explication && <p className="mt-1">{explication}</p>}
        </div>
      )}
    </div>
  );
}
