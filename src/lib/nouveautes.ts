import fs from "fs";
import path from "path";

export interface Nouveaute {
  date: string;
  type: "fonctionnalite" | "contenu" | "correction";
  titre: string;
  description: string;
}

export function getAllNouveautes(): Nouveaute[] {
  const filePath = path.join(process.cwd(), "content", "nouveautes", "nouveautes.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as Nouveaute[];
  return data.sort((a, b) => b.date.localeCompare(a.date));
}

export function getRecentNouveautes(limit = 5): Nouveaute[] {
  return getAllNouveautes().slice(0, limit);
}
