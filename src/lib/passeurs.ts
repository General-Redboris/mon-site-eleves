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

// --- Contexte historique ---

export interface ContexteHistorique {
  titre: string;
  content: string;
}

export function getContexteHistorique(): ContexteHistorique | null {
  const filePath = path.join(baseDir, "contexte-historique.md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    titre: (data.titre as string) || "Les Puits de Guerry",
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
  type?: string;
  classe?: string;
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
  date?: string;
}

export interface GalerieSection {
  titre: string;
  photos: Photo[];
}

export interface GalerieData {
  sections: GalerieSection[];
}

export function getGalerieData(): GalerieData {
  const filePath = path.join(baseDir, "galerie", "galerie.json");
  if (!fs.existsSync(filePath)) return { sections: [] };
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  if (data.sections) return data;
  if (data.photos) return { sections: [{ titre: "Photos", photos: data.photos }] };
  return { sections: [] };
}

// --- Portraits (3e2) ---

export interface PortraitMeta {
  titre: string;
  soustitre: string;
  auteurs: string;
  famille_ou_victime: string;
  dates: string;
  slug: string;
}

export interface Portrait extends PortraitMeta {
  content: string;
}

export function getAllPortraits(): PortraitMeta[] {
  const dir = path.join(baseDir, "portraits");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        titre: (data.titre as string) || slug,
        soustitre: (data.soustitre as string) || "",
        auteurs: (data.auteurs as string) || "Élèves de 3e2",
        famille_ou_victime: (data.famille_ou_victime as string) || "",
        dates: (data.dates as string) || "",
        slug,
      };
    })
    .sort((a, b) => a.titre.localeCompare(b.titre));
}

export function getPortrait(slug: string): Portrait | null {
  const filePath = path.join(baseDir, "portraits", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    titre: (data.titre as string) || slug,
    soustitre: (data.soustitre as string) || "",
    auteurs: (data.auteurs as string) || "Élèves de 3e2",
    famille_ou_victime: (data.famille_ou_victime as string) || "",
    dates: (data.dates as string) || "",
    slug,
    content,
  };
}

// --- Poemes (3e1) ---

export interface PoemeMeta {
  titre: string;
  auteur: string;
  type: "creation_eleve" | "corpus";
  date: string;
  slug: string;
}

export interface Poeme extends PoemeMeta {
  content: string;
}

export function getAllPoemes(): PoemeMeta[] {
  const dir = path.join(baseDir, "poemes");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        titre: (data.titre as string) || slug,
        auteur: (data.auteur as string) || "",
        type: (data.type as "creation_eleve" | "corpus") || "creation_eleve",
        date: (data.date as string) || "",
        slug,
      };
    })
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
}

export function getPoeme(slug: string): Poeme | null {
  const filePath = path.join(baseDir, "poemes", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    titre: (data.titre as string) || slug,
    auteur: (data.auteur as string) || "",
    type: (data.type as "creation_eleve" | "corpus") || "creation_eleve",
    date: (data.date as string) || "",
    slug,
    content,
  };
}

// --- Textes d'élèves (legacy) ---

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
