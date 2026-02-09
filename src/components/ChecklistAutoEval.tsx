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

  let message = "";
  let messageColor = "";
  if (percentage === 100) {
    message = "Bravo, tu maitrises cette competence !";
    messageColor = "text-green-700 bg-green-50 border-green-200";
  } else if (percentage >= 70) {
    message = "Bien, revois les points non coches pour progresser.";
    messageColor = "text-blue-700 bg-blue-50 border-blue-200";
  } else {
    message = "Reprends la fiche etape par etape, tu vas y arriver !";
    messageColor = "text-orange-700 bg-orange-50 border-orange-200";
  }

  return (
    <div className="mt-8 bg-white rounded-2xl border-2 border-gray-200 p-6">
      <h3 className="text-lg font-bold mb-4">Grille d&apos;auto-evaluation</h3>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium mb-1">
          <span>{score} / {totalPoints} pts</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              backgroundColor: percentage === 100 ? "#16a34a" : percentage >= 70 ? "#2563eb" : "#ea580c",
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
                className="mt-1 w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
              />
              <span className={`text-sm transition-colors ${checked[i] ? "text-gray-400 line-through" : "text-gray-700"}`}>
                {critere.label}
                <span className="ml-1 text-xs font-medium text-gray-400">({critere.points} pt{critere.points > 1 ? "s" : ""})</span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      {/* Contextual message */}
      {score > 0 && (
        <div className={`text-sm font-medium p-3 rounded-lg border ${messageColor}`}>
          {message}
        </div>
      )}
    </div>
  );
}
