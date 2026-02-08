import Link from "next/link";
import { getCoursesByNiveauAndMatiere } from "@/lib/courses";

const matiereConfig: Record<string, { label: string; icon: string; color: string }> = {
  histoire: { label: "Histoire", icon: "📜", color: "bg-histoire-light text-histoire border-histoire/30" },
  geographie: { label: "Géographie", icon: "🗺️", color: "bg-geographie-light text-geographie border-geographie/30" },
  emc: { label: "EMC", icon: "⚖️", color: "bg-emc-light text-emc border-emc/30" },
};

const niveauLabels: Record<string, string> = {
  "6e": "Sixième",
  "5e": "Cinquième",
  "4e": "Quatrième",
  "3e": "Troisième",
};

interface Props {
  params: Promise<{ niveau: string }>;
}

export default async function NiveauPage({ params }: Props) {
  const { niveau } = await params;
  const matieres = ["histoire", "geographie", "emc"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:text-accent">
          Mes cours
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">
          {niveauLabels[niveau] || niveau}
        </span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">
        Cours de {niveauLabels[niveau] || niveau}
      </h1>

      <div className="space-y-8">
        {matieres.map((matiere) => {
          const config = matiereConfig[matiere];
          const courses = getCoursesByNiveauAndMatiere(niveau, matiere);

          return (
            <section key={matiere}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{config.icon}</span>
                <h2 className="text-xl font-bold">{config.label}</h2>
              </div>

              {courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <Link
                      key={course.slug}
                      href={`/cours/${niveau}/${matiere}/${course.slug}`}
                      className={`block p-5 rounded-xl border-2 ${config.color} hover:shadow-md transition-all`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-70">
                        Chapitre {course.chapitre}
                      </span>
                      <h3 className="font-semibold mt-1">{course.titre}</h3>
                      {course.description && (
                        <p className="text-sm mt-1 opacity-70">
                          {course.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm pl-2">
                  Contenu à venir...
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { niveau: "6e" },
    { niveau: "5e" },
    { niveau: "4e" },
    { niveau: "3e" },
  ];
}
