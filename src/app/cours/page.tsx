import Link from "next/link";

const niveaux = [
  {
    label: "6e",
    description: "Les débuts de l'humanité, le monde grec, les espaces de faible densité...",
    icon: "🏛️",
  },
  {
    label: "5e",
    description: "L'Islam, les grandes découvertes, le changement global...",
    icon: "⛵",
  },
  {
    label: "4e",
    description: "Les Lumières, la Révolution française, l'urbanisation du monde...",
    icon: "🗽",
  },
  {
    label: "3e",
    description: "Les deux guerres mondiales, la Ve République, la France et l'UE...",
    icon: "🌍",
  },
];

export default function CoursPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Mes cours</h1>
      <p className="text-gray-600 mb-8">
        Choisis ton niveau pour accéder à tes cours d&apos;histoire, de géographie et d&apos;EMC.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {niveaux.map((n) => (
          <Link
            key={n.label}
            href={`/cours/${n.label}`}
            className="group block bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-accent hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl">{n.icon}</span>
              <h2 className="text-2xl font-bold group-hover:text-accent transition-colors">
                Classe de {n.label}
              </h2>
            </div>
            <p className="text-gray-600">{n.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
