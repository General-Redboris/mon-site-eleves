"use client";

import { useState } from "react";

interface Critere {
  label: string;
  points: number;
}

interface ChecklistAutoEvalProps {
  totalPoints: number;
  criteres: Critere[];
}

export default function ChecklistAutoEval({ totalPoints, criteres }: ChecklistAutoEvalProps) {
  const [checked, setChecked] = useState<boolean[]>(new Array(criteres.length).fill(false));

  const score = criteres.reduce((sum, c, i) => (checked[i] ? sum + c.points : sum), 0);
  const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  function toggle(index: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  const barColor = percentage >= 70 ? "#16a34a" : percentage >= 50 ? "#ea580c" : "#dc2626";

  let message = "";
  let messageColor = "";
  if (percentage === 100) {
    message = "Bravo, tu maîtrises cette compétence !";
    messageColor = "text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
  } else if (percentage >= 70) {
    message = "Bien, revois les points non cochés pour progresser.";
    messageColor = "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
  } else if (percentage >= 50) {
    message = "Continue tes efforts, tu es sur la bonne voie !";
    messageColor = "text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
  } else {
    message = "Reprends la fiche étape par étape, tu vas y arriver !";
    messageColor = "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
  }

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Grille d&apos;auto-évaluation</h3>

      {/* Barre de progression */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium mb-1">
          <span className="text-gray-700 dark:text-gray-300">{score} / {totalPoints} pts</span>
          <span className="text-gray-700 dark:text-gray-300">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              backgroundColor: barColor,
            }}
          />
        </div>
      </div>

      {/* Checklist */}
      <ul className="space-y-2 mb-4">
        {criteres.map((critere, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-accent focus:ring-accent cursor-pointer"
              />
              <span className={`text-sm transition-colors ${checked[i] ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-700 dark:text-gray-300"}`}>
                {critere.label}
                <span className="ml-1 text-xs font-medium text-gray-400 dark:text-gray-500">({critere.points} pt{critere.points > 1 ? "s" : ""})</span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      {/* Message contextuel */}
      {score > 0 && (
        <div className={`text-sm font-medium p-3 rounded-lg border ${messageColor}`}>
          {message}
        </div>
      )}
    </div>
  );
}
