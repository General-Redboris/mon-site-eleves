"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface SujetBrevet {
  id: string;
  annee: number;
  session: string;
  themes: string[];
  types_exercice: string[];
  description: string;
  sujet_format: "markdown" | "pdf";
  sujet_fichier: string;
  corrige_format: "markdown" | "pdf";
  corrige_fichier: string;
}

const themeLabels: Record<string, string> = {
  histoire: "Histoire",
  geographie: "Géographie",
  emc: "EMC",
};

const themeColors: Record<string, string> = {
  histoire: "bg-histoire-light text-histoire",
  geographie: "bg-geographie-light text-geographie",
  emc: "bg-emc-light text-emc",
};

const typeLabels: Record<string, string> = {
  analyse_documents: "Analyse de documents",
  developpement_construit: "Développement construit",
  reperes: "Repères",
  exercice_cartographie: "Cartographie",
};

interface Props {
  sujet: SujetBrevet;
  sujetContent: string | null;
  corrigeContent: string | null;
}

export default function BrevetSujetClient({
  sujet,
  sujetContent,
  corrigeContent,
}: Props) {
  const [corrigeVisible, setCorrigeVisible] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{sujet.session}</h1>
        <p className="text-gray-600 mb-4">{sujet.description}</p>
        <div className="flex flex-wrap gap-2">
          {sujet.themes.map((t) => (
            <span
              key={t}
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                themeColors[t] || "bg-gray-100 text-gray-600"
              }`}
            >
              {themeLabels[t] || t}
            </span>
          ))}
          {sujet.types_exercice.map((type) => (
            <span
              key={type}
              className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600"
            >
              {typeLabels[type] || type}
            </span>
          ))}
        </div>
      </div>

      {/* Sujet content */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📝</span> Sujet
        </h2>
        {sujet.sujet_format === "pdf" ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-gray-500 mb-4">
              Ce sujet est disponible en format PDF.
            </p>
            <a
              href={`/documents/brevet/${sujet.sujet_fichier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              📄 Ouvrir le PDF du sujet
            </a>
          </div>
        ) : sujetContent ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <div className="prose prose-gray max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {sujetContent}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-400">
            Sujet non disponible.
          </div>
        )}
      </section>

      {/* Corrigé section */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>✅</span> Corrigé
        </h2>

        {!corrigeVisible ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-gray-500 mb-4 text-sm">
              ⚠️ Essaie d&apos;abord de répondre par toi-même avant de regarder
              le corrigé !
            </p>
            <button
              onClick={() => setCorrigeVisible(true)}
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              <span>👁️</span> Afficher le corrigé
            </button>
          </div>
        ) : (
          <div>
            {sujet.corrige_format === "pdf" ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <p className="text-gray-500 mb-4">
                  Le corrigé est disponible en format PDF.
                </p>
                <a
                  href={`/documents/brevet/${sujet.corrige_fichier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  📄 Ouvrir le PDF du corrigé
                </a>
              </div>
            ) : corrigeContent ? (
              <div className="bg-white rounded-xl border border-green-200 p-6 sm:p-8">
                <div className="prose prose-gray max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {corrigeContent}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-400">
                Corrigé non disponible.
              </div>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={() => setCorrigeVisible(false)}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                <span>🙈</span> Masquer le corrigé
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
