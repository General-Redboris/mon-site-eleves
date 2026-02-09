import Link from "next/link";
import type { Nouveaute } from "@/lib/nouveautes";

const typeBadge: Record<string, { label: string; cls: string }> = {
  fonctionnalite: { label: "Nouveau", cls: "bg-geographie-light text-geographie" },
  contenu: { label: "Contenu", cls: "bg-histoire-light text-histoire" },
  correction: { label: "Fix", cls: "bg-emc-light text-emc" },
};

interface Props {
  nouveautes: Nouveaute[];
}

export default function NouveautesHome({ nouveautes }: Props) {
  if (nouveautes.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Quoi de neuf ?</h2>
        <Link href="/nouveautes" className="text-sm text-accent hover:underline font-medium">
          Tout voir
        </Link>
      </div>
      <div className="space-y-3">
        {nouveautes.slice(0, 3).map((n, i) => {
          const badge = typeBadge[n.type] || typeBadge.contenu;
          return (
            <div key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${badge.cls}`}>
                {badge.label}
              </span>
              <div>
                <p className="font-medium text-foreground text-sm">{n.titre}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
