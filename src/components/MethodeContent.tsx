"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

/* Couleurs par famille de méthode */
const familleColors: Record<string, { border: string; bg: string; text: string; circle: string }> = {
  analyser: { border: "border-geographie", bg: "bg-geographie/10", text: "text-geographie", circle: "bg-geographie" },
  rediger: { border: "border-histoire", bg: "bg-histoire/10", text: "text-histoire", circle: "bg-histoire" },
  cartographier: { border: "border-geographie", bg: "bg-geographie/10", text: "text-geographie", circle: "bg-geographie" },
  temps: { border: "border-histoire", bg: "bg-histoire/10", text: "text-histoire", circle: "bg-histoire" },
  reperer: { border: "border-geographie", bg: "bg-geographie/10", text: "text-geographie", circle: "bg-geographie" },
  raisonner: { border: "border-emc", bg: "bg-emc/10", text: "text-emc", circle: "bg-emc" },
  brevet: { border: "border-accent", bg: "bg-accent/10", text: "text-accent", circle: "bg-accent" },
  apprendre: { border: "border-emc", bg: "bg-emc/10", text: "text-emc", circle: "bg-emc" },
};

interface MethodeContentProps {
  content: string;
  famille: string;
}

/**
 * Composant de rendu du contenu Markdown des fiches méthodes.
 * Transforme les titres ## en cartes d'étapes numérotées
 * et améliore le style des listes à puces.
 */
export default function MethodeContent({ content, famille }: MethodeContentProps) {
  const colors = familleColors[famille] || familleColors.analyser;

  /* Compteur d'étapes pour numéroter les h2 */
  let etapeCounter = 0;

  const components: Components = {
    /* Transformer chaque h2 en carte d'étape numérotée */
    h2: ({ children }) => {
      etapeCounter++;
      const num = etapeCounter;
      return (
        <div className={`my-6 rounded-xl border ${colors.border}/20 bg-white dark:bg-gray-800 overflow-hidden`}>
          <div className={`flex items-center gap-3 px-5 py-3 ${colors.bg} border-b ${colors.border}/20`}>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${colors.circle} text-white text-sm font-bold shrink-0`}>
              {num}
            </span>
            <h2 className={`text-lg font-semibold ${colors.text} m-0`}>{children}</h2>
          </div>
        </div>
      );
    },

    /* Sous-titres h3 avec accent coloré */
    h3: ({ children }) => (
      <h3 className={`text-base font-semibold text-foreground mt-5 mb-2 flex items-center gap-2`}>
        <span className={`w-1.5 h-1.5 rounded-full ${colors.circle} shrink-0`} />
        {children}
      </h3>
    ),

    /* Listes à puces avec style amélioré */
    ul: ({ children }) => (
      <ul className="space-y-2 my-3 list-none pl-0">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.circle} shrink-0`} />
        <span>{children}</span>
      </li>
    ),

    /* Listes ordonnées */
    ol: ({ children }) => (
      <ol className="space-y-2 my-3 list-decimal pl-5 marker:font-semibold marker:text-gray-500">{children}</ol>
    ),

    /* Blockquotes avec style d'accroche */
    blockquote: ({ children }) => (
      <blockquote className={`my-4 border-l-4 ${colors.border} ${colors.bg} rounded-r-lg px-4 py-3 text-gray-700 dark:text-gray-300 not-italic`}>
        {children}
      </blockquote>
    ),

    /* Tableaux stylisés */
    table: ({ children }) => (
      <div className="overflow-x-auto my-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className={`${colors.bg} dark:bg-gray-700`}>{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-gray-200 dark:border-gray-600">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">{children}</td>
    ),

    /* Mise en valeur du texte en gras */
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),

    /* Paragraphes avec espacement adapté */
    p: ({ children }) => (
      <p className="my-2 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>
    ),

    /* Liens */
    a: ({ children, href }) => (
      <a href={href} className={`${colors.text} hover:underline font-medium`}>
        {children}
      </a>
    ),

    /* Blocs de code (pour les exemples) */
    pre: ({ children }) => (
      <pre className="my-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm border border-gray-200 dark:border-gray-700">
        {children}
      </pre>
    ),

    /* Séparateurs */
    hr: () => (
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
    ),
  };

  /* Réinitialise le compteur à chaque rendu */
  etapeCounter = 0;

  return (
    <div className="methode-content prose-sm max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
