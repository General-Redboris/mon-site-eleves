import { getAllCourses, getCourse } from "@/lib/courses";
import GlossaireClient from "./GlossaireClient";

interface VocabItem {
  terme: string;
  definition: string;
  niveau: string;
  matiere: string;
  coursSlug: string;
  coursTitre: string;
}

export default function GlossairePage() {
  const courses = getAllCourses();
  const vocabItems: VocabItem[] = [];
  const seen = new Set<string>();

  for (const meta of courses) {
    const course = getCourse(meta.niveau, meta.matiere, meta.slug);
    if (!course?.vocabulaire) continue;
    for (const v of course.vocabulaire) {
      const key = v.terme.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      vocabItems.push({
        terme: v.terme,
        definition: v.definition,
        niveau: meta.niveau,
        matiere: meta.matiere,
        coursSlug: meta.slug,
        coursTitre: meta.titre,
      });
    }
  }

  vocabItems.sort((a, b) => a.terme.localeCompare(b.terme, "fr"));

  return <GlossaireClient items={vocabItems} />;
}
