"use client";

import { useState } from "react";

interface Prompt {
  label: string;
  texte: string;
}

interface Categorie {
  categorie: string;
  prompts: Prompt[];
}

interface Props {
  categories: Categorie[];
}

export default function BibliothequePrompts({ categories }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopy(texte: string, label: string) {
    try {
      await navigator.clipboard.writeText(texte);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = texte;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  }

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.categorie}>
          <h3 className="text-lg font-bold text-foreground mb-3">{cat.categorie}</h3>
          <div className="space-y-3">
            {cat.prompts.map((p) => (
              <div
                key={p.label}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{p.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">{p.texte}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(p.texte, p.label)}
                    className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {copied === p.label ? "Copie !" : "Copier"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
