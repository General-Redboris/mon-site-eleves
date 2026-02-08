import fs from "fs";
import path from "path";
import matter from "gray-matter";

const baseDir = path.join(process.cwd(), "content", "passeurs-de-memoire");

// --- Introduction ---

export interface PasseursIntro {
  titre: string;
  content: string;
}

export function getPasseursIntro(): PasseursIntro | null {
  const filePath = path.join(baseDir, "index.md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    titre: (data.titre as string) || "Passeurs de mémoire",
    content,
  };
}

// --- Podcast ---

export interface Episode {
  numero: number;
  titre: string;
  description: string;
  duree: string;
  date: string;
  annee_scolaire: string;
  plateforme: "youtube" | "soundcloud";
  embed_id: string;
  lien_externe: string;
}

export interface PodcastData {
  titre_podcast: string;
  description: string;
  episodes: Episode[];
}

export function getPodcastData(): PodcastData | null {
  const filePath = path.join(baseDir, "podcast", "episodes.json");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

// --- Galerie ---

export interface Photo {
  fichier: string;
  legende: string;
  annee_scolaire: string;
}

export interface GalerieData {
  photos: Photo[];
}

export function getGalerieData(): GalerieData {
  const filePath = path.join(baseDir, "galerie", "galerie.json");
  if (!fs.existsSync(filePath)) return { photos: [] };
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

// --- Textes d'élèves ---

export interface TexteMeta {
  titre: string;
  auteur: string;
  annee_scolaire: string;
  date: string;
  slug: string;
}

export interface Texte extends TexteMeta {
  content: string;
}

export function getAllTextes(): TexteMeta[] {
  const dir = path.join(baseDir, "textes");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        titre: (data.titre as string) || slug,
        auteur: (data.auteur as string) || "Élèves",
        annee_scolaire: (data.annee_scolaire as string) || "",
        date: (data.date as string) || "",
        slug,
      };
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function getTexte(slug: string): Texte | null {
  const filePath = path.join(baseDir, "textes", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    titre: (data.titre as string) || slug,
    auteur: (data.auteur as string) || "Élèves",
    annee_scolaire: (data.annee_scolaire as string) || "",
    date: (data.date as string) || "",
    slug,
    content,
  };
}
