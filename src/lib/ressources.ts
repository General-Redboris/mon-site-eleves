import fs from "fs";
import path from "path";

export interface Ressource {
  titre: string;
  description: string;
  url: string;
  type: "site" | "video" | "document" | "outil";
  niveau: string[];
  matiere: string;
}

export function getAllRessources(): Ressource[] {
  const filePath = path.join(process.cwd(), "content", "ressources", "ressources.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Ressource[];
}
