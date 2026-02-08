import Link from "next/link";
import { getMethod, getAllMethods } from "@/lib/courses";
import LessonView from "@/components/LessonView";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MethodeDetailPage({ params }: Props) {
  const { slug } = await params;
  const method = getMethod(slug);

  if (!method) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/methodes" className="hover:text-accent">
          Méthodes
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{method.titre}</span>
      </nav>

      <LessonView titre={method.titre} content={method.content} />

      <div className="mt-8">
        <Link
          href="/methodes"
          className="text-accent hover:underline font-medium"
        >
          &larr; Retour aux fiches méthode
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const methods = getAllMethods();
  return methods.map((m) => ({ slug: m.slug }));
}
