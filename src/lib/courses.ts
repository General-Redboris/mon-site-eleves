import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface VocabEntry {
  terme: string;
  definition: string;
}

export interface DateCle {
  date: string;
  evenement: string;
}

export interface MethodeLiee {
  slug: string;
  label: string;
  niveau: string;
}

export interface CourseMeta {
  titre: string;
  niveau: string;
  matiere: string;
  chapitre: number;
  description?: string;
  theme?: string;
  slug: string;
  resume?: string;
  vocabulaire?: VocabEntry[];
  dates_cles?: DateCle[];
  methodes_liees?: MethodeLiee[];
}

export interface Course extends CourseMeta {
  content: string;
}

function parseMeta(
  data: Record<string, unknown>,
  slug: string,
  niveau: string,
  matiere: string
): CourseMeta {
  return {
    titre: (data.titre as string) || slug,
    niveau,
    matiere,
    chapitre: (data.chapitre as number) || 1,
    description: data.description as string | undefined,
    theme: data.theme as string | undefined,
    slug,
    resume: data.resume as string | undefined,
    vocabulaire: data.vocabulaire as VocabEntry[] | undefined,
    dates_cles: data.dates_cles as DateCle[] | undefined,
    methodes_liees: data.methodes_liees as MethodeLiee[] | undefined,
  };
}

export function getAllCourses(): CourseMeta[] {
  const courses: CourseMeta[] = [];
  const niveaux = ["6e", "5e", "4e", "3e"];
  const matieres = ["histoire", "geographie", "emc"];

  for (const niveau of niveaux) {
    for (const matiere of matieres) {
      const dir = path.join(contentDir, "cours", niveau, matiere);
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
      for (const file of files) {
        const slug = file.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        courses.push(parseMeta(data as Record<string, unknown>, slug, niveau, matiere));
      }
    }
  }

  return courses.sort((a, b) => a.chapitre - b.chapitre);
}

export function getCoursesByNiveau(niveau: string): CourseMeta[] {
  return getAllCourses().filter((c) => c.niveau === niveau);
}

export function getCoursesByNiveauAndMatiere(
  niveau: string,
  matiere: string
): CourseMeta[] {
  return getAllCourses().filter(
    (c) => c.niveau === niveau && c.matiere === matiere
  );
}

export function getCourse(
  niveau: string,
  matiere: string,
  slug: string
): Course | null {
  const filePath = path.join(
    contentDir,
    "cours",
    niveau,
    matiere,
    `${slug}.mdx`
  );
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...parseMeta(data as Record<string, unknown>, slug, niveau, matiere),
    content,
  };
}

// Legacy methods (unused, kept for backward compat)
export function getAllMethods(): CourseMeta[] {
  const dir = path.join(contentDir, "methodes");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return {
      titre: (data.titre as string) || slug,
      niveau: "",
      matiere: "methode",
      chapitre: (data.ordre as number) || 1,
      description: data.description as string | undefined,
      slug,
    };
  }).sort((a, b) => a.chapitre - b.chapitre);
}

export function getMethod(slug: string): Course | null {
  const filePath = path.join(contentDir, "methodes", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    titre: (data.titre as string) || slug,
    niveau: "",
    matiere: "methode",
    chapitre: (data.ordre as number) || 1,
    description: data.description as string | undefined,
    slug,
    content,
  };
}
