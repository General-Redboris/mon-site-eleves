import Link from "next/link";
import { getCourse, getAllCourses } from "@/lib/courses";
import CoursClient from "@/components/CoursClient";
import SignalerErreur from "@/components/SignalerErreur";
import BoutonEntrainer from "@/components/BoutonEntrainer";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { PointMethode, Chronologie, MiniQuiz, VocabHighlight, AlerteIA } from "@/components/mdx";
import ScrollTracker from "@/components/ScrollTracker";
import QRCodeModal from "@/components/QRCodeModal";

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

      <CoursClient
        titre={course.titre}
        vocabulaire={course.vocabulaire}
        resume={course.resume}
        dates_cles={course.dates_cles}
        methodes_liees={course.methodes_liees}
        niveau={niveau}
        matiere={matiere}
        slug={slug}
      >
        <MDXRemote
          source={course.content}
          components={{
            PointMethode,
            Chronologie,
            MiniQuiz,
            VocabHighlight,
            AlerteIA,
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </CoursClient>

      <BoutonEntrainer niveau={niveau} matiere={matiere} slug={slug} />

      <ScrollTracker niveau={niveau} matiere={matiere} slug={slug} />

      <div className="mt-4 flex items-center gap-4">
        <SignalerErreur pageTitle={course.titre} />
        <QRCodeModal path={`/cours/${niveau}/${matiere}/${slug}`} />
      </div>

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
