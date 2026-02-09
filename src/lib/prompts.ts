import fs from "fs";
import path from "path";

export interface PromptEntry {
  label: string;
  texte: string;
}

export interface PromptCategorie {
  categorie: string;
  prompts: PromptEntry[];
}

export function getAllPrompts(): PromptCategorie[] {
  const filePath = path.join(process.cwd(), "content", "tuteur", "prompts.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as PromptCategorie[];
}
