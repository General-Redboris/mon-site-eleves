import Link from "next/link";
import { getCourse, getAllCourses } from "@/lib/courses";
import LessonView from "@/components/LessonView";
import { notFound } from "next/navigation";

const matiereLabels: Record<string, string> = {
  histoire: "Histoire",
  geographie: "Géographie",
  emc: "EMC",
};

const niveauLabels: Record<string, string> = {
  "6e": "Sixième",
  "5e": "Cinquième",
  "4e": "Quatrième",
  "3e": "Troisième",
};

interface Props {
  params: Promise<{ niveau: string; matiere: string; slug: string }>;
}

export default async function CoursDetailPage({ params }: Props) {
  const { niveau, matiere, slug } = await params;
  const course = getCourse(niveau, matiere, slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/cours" className="hover:text-accent">
          Mes cours
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/cours/${niveau}`} className="hover:text-accent">
          {niveauLabels[niveau] || niveau}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">
          {matiereLabels[matiere] || matiere}
        </span>
      </nav>

      {/* Matiere badge */}
      <div className="mb-4">
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
            matiere === "histoire"
              ? "bg-histoire-light text-histoire"
              : matiere === "geographie"
              ? "bg-geographie-light text-geographie"
              : "bg-emc-light text-emc"
          }`}
        >
          {matiereLabels[matiere]} — {niveau}
        </span>
      </div>

      <LessonView titre={course.titre} content={course.content} />

      {/* Back link */}
      <div className="mt-8">
        <Link
          href={`/cours/${niveau}`}
          className="text-accent hover:underline font-medium"
        >
          &larr; Retour aux cours de {niveauLabels[niveau]}
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({
    niveau: c.niveau,
    matiere: c.matiere,
    slug: c.slug,
  }));
}
