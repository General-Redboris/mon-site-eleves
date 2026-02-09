import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Composant MDX AlerteIA — encadré « Le savais-tu ? »
 * Utilisé dans les fichiers MDX de cours pour mettre en avant
 * une anecdote ou un fait marquant lié à l'actualité.
 */
export default function AlerteIA({ children }: Props) {
  return (
    <div className="my-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">💡</span>
        <div>
          <p className="font-bold text-amber-900 dark:text-amber-200 mb-1">Le savais-tu ?</p>
          <div className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
