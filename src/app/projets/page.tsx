import Link from "next/link";

export const metadata = {
  title: "Nos projets | Chronogéo",
  description:
    "Découvrez les projets des élèves du Collège Francine Leca : Passeurs de mémoire, Comédie musicale et chansons.",
};

// Données des projets pour les cartes
const projets = [
  {
    href: "/passeurs-de-memoire",
    titre: "Passeurs de mémoire",
    description:
      "Projet mémoriel des 3e autour de la tragédie des Puits de Guerry (été 1944). Portraits, poèmes et témoignages.",
    icon: "🕯️",
    couleur: "border-amber-400 dark:border-amber-500",
    bgHover: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
  },
  {
    href: "/projets/comedie-musicale",
    titre: "Comédie musicale",
    description:
      "L'Odyssée : une aventure qui swingue ! Les élèves de 5e adaptent Homère en comédie musicale.",
    icon: "🎬",
    couleur: "border-rose-400 dark:border-rose-500",
    bgHover: "hover:bg-rose-50 dark:hover:bg-rose-900/20",
  },
  {
    href: "/chansons",
    titre: "Nos chansons",
    description:
      "Chansons créées par Nicolas et par les élèves — Écoute et partage !",
    icon: "🎵",
    couleur: "border-sky-400 dark:border-sky-500",
    bgHover: "hover:bg-sky-50 dark:hover:bg-sky-900/20",
  },
];

export default function ProjetsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
        🎭 Nos projets
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        Les projets des élèves du Collège Francine Leca de Sancerre
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projets.map((projet) => (
          <Link
            key={projet.href}
            href={projet.href}
            className={`group block bg-white dark:bg-gray-800 border-2 ${projet.couleur} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ${projet.bgHover}`}
          >
            <div className="text-4xl mb-4">{projet.icon}</div>
            <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
              {projet.titre}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {projet.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
