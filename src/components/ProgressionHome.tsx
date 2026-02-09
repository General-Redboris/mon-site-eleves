"use client";

import { useEffect, useState } from "react";
import { getProgressionStats } from "@/lib/progression";

interface Props {
  totalCours: number;
  totalQuiz: number;
  coursParNiveau: Record<string, number>;
}

export default function ProgressionHome({ totalCours, totalQuiz, coursParNiveau }: Props) {
  const [stats, setStats] = useState<ReturnType<typeof getProgressionStats> | null>(null);

  useEffect(() => {
    setStats(getProgressionStats());
  }, []);

  if (!stats || (stats.totalCoursVus === 0 && stats.totalQuizReussis === 0)) return null;

  const niveauLabels: Record<string, string> = {
    "6e": "Sixième",
    "5e": "Cinquième",
    "4e": "Quatrième",
    "3e": "Troisième",
  };

  const niveauColors: Record<string, string> = {
    "6e": "bg-histoire",
    "5e": "bg-geographie",
    "4e": "bg-emc",
    "3e": "bg-accent",
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Ta progression</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cours lus</p>
          <p className="text-2xl font-bold text-foreground">
            {stats.totalCoursVus} <span className="text-sm font-normal text-gray-400">/ {totalCours}</span>
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-geographie h-2 rounded-full transition-all"
              style={{ width: `${Math.min(100, (stats.totalCoursVus / totalCours) * 100)}%` }}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Quiz réussis</p>
          <p className="text-2xl font-bold text-foreground">
            {stats.totalQuizReussis} <span className="text-sm font-normal text-gray-400">/ {totalQuiz}</span>
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-accent h-2 rounded-full transition-all"
              style={{ width: `${Math.min(100, (stats.totalQuizReussis / totalQuiz) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["6e", "5e", "4e", "3e"].map((niv) => {
          const total = coursParNiveau[niv] || 0;
          const done = stats.coursVusParNiveau[niv] || 0;
          if (total === 0) return null;
          const pct = Math.round((done / total) * 100);
          return (
            <div key={niv} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 text-center">
              <p className="text-sm font-semibold text-foreground mb-1">{niveauLabels[niv]}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                <div
                  className={`${niveauColors[niv]} h-1.5 rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{done}/{total}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
