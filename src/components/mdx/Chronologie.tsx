"use client";

import { useState } from "react";

interface Evenement {
  date: string;
  label: string;
  detail?: string;
}

interface Props {
  evenements: Evenement[];
}

export default function Chronologie({ evenements }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="my-6">
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-0 min-w-max">
          {evenements.map((evt, i) => (
            <div key={i} className="flex items-start">
              <button
                onClick={() => setSelected(selected === i ? null : i)}
                className="flex flex-col items-center group"
              >
                <span className="text-xs font-bold text-histoire mb-1 whitespace-nowrap">
                  {evt.date}
                </span>
                <span
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    selected === i
                      ? "bg-histoire border-histoire"
                      : "bg-white border-histoire/40 group-hover:border-histoire"
                  }`}
                />
                <span className="mt-1 text-xs text-gray-600 dark:text-gray-400 max-w-[100px] text-center leading-tight">
                  {evt.label}
                </span>
              </button>
              {i < evenements.length - 1 && (
                <div className="w-12 h-0.5 bg-histoire/30 mt-[1.75rem] mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>
      {selected !== null && evenements[selected]?.detail && (
        <div className="mt-2 p-3 bg-histoire-light rounded-lg border border-histoire/10 text-sm text-gray-700 dark:text-gray-300">
          <strong>{evenements[selected].date}</strong> — {evenements[selected].detail}
        </div>
      )}
    </div>
  );
}
