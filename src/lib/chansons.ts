import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "content", "chansons", "chansons.json");

export interface Chanson {
  titre: string;
  auteur: string;
  theme: string;
  annee_scolaire: string;
  description: string;
  plateforme: "youtube" | "soundcloud";
  embed_id: string;
  lien_externe: string;
}

export interface ChansonsData {
  chansons: Chanson[];
}

export function getChansonsData(): ChansonsData {
  if (!fs.existsSync(filePath)) return { chansons: [] };
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getAllThemes(): string[] {
  const data = getChansonsData();
  const themes = new Set(data.chansons.map((c) => c.theme));
  return Array.from(themes).sort();
}

export function getAllAnnesScolaires(): string[] {
  const data = getChansonsData();
  const annees = new Set(data.chansons.map((c) => c.annee_scolaire));
  return Array.from(annees).sort().reverse();
}
