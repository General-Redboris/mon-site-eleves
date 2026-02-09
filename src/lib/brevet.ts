import fs from "fs";
import path from "path";
import matter from "gray-matter";

const brevetDir = path.join(process.cwd(), "content", "brevet");

export interface SujetBrevet {
  id: string;
  annee: number;
  session: string;
  themes: string[];
  types_exercice: string[];
  description: string;
  sujet_format: "markdown" | "pdf";
  sujet_fichier: string;
  corrige_format: "markdown" | "pdf";
  corrige_fichier: string;
}

export interface BrevetCatalogue {
  sujets: SujetBrevet[];
}

export function getBrevetCatalogue(): BrevetCatalogue {
  const filePath = path.join(brevetDir, "index.json");
  if (!fs.existsSync(filePath)) return { sujets: [] };
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getSujetContent(fichier: string): string | null {
  const filePath = path.join(brevetDir, "sujets", fichier);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}

export function getCorrigeContent(fichier: string): string | null {
  const filePath = path.join(brevetDir, "corriges", fichier);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}

export function getAllAnnees(): number[] {
  const catalogue = getBrevetCatalogue();
  const annees = new Set(catalogue.sujets.map((s) => s.annee));
  return Array.from(annees).sort((a, b) => b - a);
}
