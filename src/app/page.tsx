import Link from "next/link";

const sections = [
  {
    icon: "📚",
    title: "Mes cours",
    description:
      "Retrouve tous tes cours d'histoire, de géographie et d'EMC, de la 6e à la 3e.",
    href: "/cours",
    color: "bg-histoire-light text-histoire border-histoire/20",
  },
  {
    icon: "🧭",
    title: "Méthodes",
    description:
      "Apprends les méthodes essentielles : analyser un document, rédiger, lire une carte...",
    href: "/methodes",
    color: "bg-geographie-light text-geographie border-geographie/20",
  },
  {
    icon: "🎯",
    title: "S'entraîner",
    description:
      "Quiz, flashcards et exercices interactifs pour tester tes connaissances.",
    href: "/entrainement",
    color: "bg-emc-light text-emc border-emc/20",
  },
  {
    icon: "🤖",
    title: "Mon tuteur IA",
    description:
      "Pose tes questions à un chatbot spécialisé en histoire-géo pour t'aider à réviser.",
    href: "/tuteur",
    color: "bg-orange-50 text-accent border-accent/20",
  },
];

const niveaux = [
  { label: "6e", href: "/cours/6e" },
  { label: "5e", href: "/cours/5e" },
  { label: "4e", href: "/cours/4e" },
  { label: "3e", href: "/cours/3e" },
];

export default function Home() {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Bienvenue sur ton espace de révision
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Histoire-Géographie et EMC au Collège Francine Leca de Sancerre.
            Cours, méthodes, quiz et bien plus encore !
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {niveaux.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-foreground hover:border-accent hover:text-accent transition-colors shadow-sm"
              >
                Classe de {n.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          Que veux-tu faire aujourd&apos;hui ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`group block p-6 rounded-2xl border-2 ${section.color} hover:shadow-lg transition-all hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3">{section.icon}</div>
              <h3 className="text-lg font-bold mb-2">{section.title}</h3>
              <p className="text-sm opacity-80">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick info */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-accent/5 to-histoire-light rounded-2xl p-8 sm:p-10">
            <h2 className="text-xl font-bold mb-3">
              À quoi sert ce site ?
            </h2>
            <p className="text-gray-700 mb-4">
              Ce site est ton compagnon de révision en histoire-géographie et EMC.
              Tu y trouveras tous les cours vus en classe, des fiches méthode pour
              progresser, et des exercices interactifs pour tester tes connaissances.
            </p>
            <p className="text-gray-700">
              <strong>Conseil :</strong> commence par relire ton cours, puis
              entraîne-toi avec les quiz et les flashcards. Utilise les fiches méthode
              pour préparer tes contrôles et le brevet !
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
