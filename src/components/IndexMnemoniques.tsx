"use client";

import { useState } from "react";
import Link from "next/link";

interface MnemoniqueEntry {
  acronyme: string;
  signification: string;
  competence: string;
  niveau: string;
  slug: string;
}

interface IndexMnemoniquesProps {
  mnemoniques: MnemoniqueEntry[];
}

export default function IndexMnemoniques({ mnemoniques }: IndexMnemoniquesProps) {
  const [open, setOpen] = useState(false);

  if (mnemoniques.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-bold text-lg">
          🔤 Retrouve ta méthode par son acronyme
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-6 pb-5 border-t border-gray-100">
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 pr-3 font-semibold text-gray-700">Acronyme</th>
                  <th className="text-left py-2 pr-3 font-semibold text-gray-700">Signification</th>
                  <th className="text-left py-2 pr-3 font-semibold text-gray-700 hidden sm:table-cell">Compétence</th>
                  <th className="text-left py-2 pr-3 font-semibold text-gray-700">Niveau</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Lien</th>
                </tr>
              </thead>
              <tbody>
                {mnemoniques.map((m) => (
                  <tr key={`${m.acronyme}-${m.niveau}`} className="border-b border-gray-100">
                    <td className="py-2 pr-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                        {m.acronyme}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-gray-700">{m.signification}</td>
                    <td className="py-2 pr-3 text-gray-500 hidden sm:table-cell">{m.competence}</td>
                    <td className="py-2 pr-3">
                      <span className="text-xs font-bold bg-gray-100 px-2 py-0.5 rounded">{m.niveau}</span>
                    </td>
                    <td className="py-2">
                      <Link
                        href={`/methodes/${m.niveau}/${m.slug}`}
                        className="text-geographie hover:text-accent hover:underline font-medium"
                      >
                        → fiche
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
