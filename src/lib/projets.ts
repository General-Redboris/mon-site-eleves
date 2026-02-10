import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ---------- Types ----------
export interface EquipeMembre {
  role: string;
  nom: string;
}

export interface TextePiece {
  url: string | null;
  format: "pdf" | "gdoc";
  label: string;
}

export interface ComedieMusicaleData {
  titre: string;
  sous_titre: string;
  annee: string;
  date_spectacle: string;
  lieu: string;
  description: string;
  texte_piece: TextePiece;
  equipe: EquipeMembre[];
  content: string;
}

export interface GaleriePhoto {
  src: string;
  alt: string;
  legende: string;
  date: string;
}

export interface GalerieAlbum {
  id: string;
  titre: string;
  description: string;
  photos: GaleriePhoto[];
}

export interface GalerieData {
  titre: string;
  albums: GalerieAlbum[];
}

// ---------- Chemins ----------
const PROJETS_DIR = path.join(process.cwd(), "content", "projets");

// ---------- Comédie musicale ----------

/** Charge les données de la comédie musicale (front matter + contenu markdown) */
export function getComedieMusicaleData(): ComedieMusicaleData {
  const filePath = path.join(PROJETS_DIR, "comedie-musicale.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    titre: data.titre || "",
    sous_titre: data.sous_titre || "",
    annee: data.annee || "",
    date_spectacle: data.date_spectacle || "",
    lieu: data.lieu || "",
    description: data.description || "",
    texte_piece: data.texte_piece || { url: null, format: "pdf", label: "Lire le texte de la pièce" },
    equipe: data.equipe || [],
    content,
  };
}

/** Charge les données de la galerie photo de la comédie musicale */
export function getComedieMusicaleGalerie(): GalerieData {
  const filePath = path.join(PROJETS_DIR, "comedie-musicale-galerie.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}
