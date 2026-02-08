import fs from "fs";
import path from "path";

const flashcardsDir = path.join(process.cwd(), "content", "flashcards");

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
  if (!fs.existsSync(flashcardsDir)) return [];
  const files = fs
    .readdirSync(flashcardsDir)
    .filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const slug = file.replace(/\.json$/, "");
    const raw = fs.readFileSync(path.join(flashcardsDir, file), "utf-8");
    const data = JSON.parse(raw);
    return {
      titre: data.titre,
      niveau: data.niveau,
      matiere: data.matiere,
      slug,
    };
  });
}

export function getFlashcardSet(slug: string): FlashcardSet | null {
  const filePath = path.join(flashcardsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return { ...data, slug };
}
