import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface CourseMeta {
  titre: string;
  niveau: string;
  matiere: string;
  chapitre: number;
  description?: string;
  slug: string;
}

export interface Course extends CourseMeta {
  content: string;
}

export function getAllCourses(): CourseMeta[] {
  const courses: CourseMeta[] = [];
  const niveaux = ["6e", "5e", "4e", "3e"];
  const matieres = ["histoire", "geographie", "emc"];

  for (const niveau of niveaux) {
    for (const matiere of matieres) {
      const dir = path.join(contentDir, "cours", niveau, matiere);
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
      for (const file of files) {
        const slug = file.replace(/\.md$/, "");
        const raw = fs.readFileSync(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        courses.push({
          titre: (data.titre as string) || slug,
          niveau,
          matiere,
          chapitre: (data.chapitre as number) || 1,
          description: data.description as string | undefined,
          slug,
        });
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
    `${slug}.md`
  );
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    titre: (data.titre as string) || slug,
    niveau,
    matiere,
    chapitre: (data.chapitre as number) || 1,
    description: data.description as string | undefined,
    slug,
    content,
  };
}

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
