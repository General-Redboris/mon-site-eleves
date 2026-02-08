import fs from "fs";
import path from "path";

const flashcardsDir = path.join(process.cwd(), "content", "flashcards");
const niveaux = ["6e", "5e", "4e", "3e"];

export interface Carte {
  recto: string;
  verso: string;
  categorie: string;
  niveau_difficulte: number;
}

export interface FlashcardSet {
  titre: string;
  niveau?: string;
  matiere?: string;
  slug: string;
  cartes: Carte[];
}

export function getAllFlashcardSets(): Omit<FlashcardSet, "cartes">[] {
  const results: Omit<FlashcardSet, "cartes">[] = [];

  for (const niveau of niveaux) {
    const dir = path.join(flashcardsDir, niveau);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const fileName = file.replace(/\.json$/, "");
      const slug = `${niveau}-${fileName}`;
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const data = JSON.parse(raw);
      results.push({
        titre: data.titre,
        niveau: data.niveau || niveau,
        matiere: data.matiere,
        slug,
      });
    }
  }

  return results;
}

export function getFlashcardSet(slug: string): FlashcardSet | null {
  for (const niveau of niveaux) {
    const prefix = `${niveau}-`;
    if (slug.startsWith(prefix)) {
      const fileName = slug.slice(prefix.length);
      const filePath = path.join(flashcardsDir, niveau, `${fileName}.json`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(raw);
        return { ...data, slug };
      }
    }
  }
  return null;
}
