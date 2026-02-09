import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "methodes");

export interface FicheLiee {
  slug: string;
  label: string;
}

export interface Progression {
  precedent: { niveau: string; slug: string } | null;
  suivant: { niveau: string; slug: string } | null;
}

export interface Mnemonique {
  acronyme: string;
  signification: string;
}

export interface DNB {
  exercice: string;
  bareme: number;
}

export interface CritereAutoEval {
  label: string;
  points: number;
}

export interface AutoEvaluation {
  total_points: number;
  criteres: CritereAutoEval[];
}

export interface FicheMethodeMeta {
  titre: string;
  niveau: string;
  numero: string;
  competence: string;
  domaine: string;
  famille: string;
  etapes: number;
  mnemonique: Mnemonique | null;
  dnb: DNB | null;
  fiches_liees: FicheLiee[];
  progression: Progression | null;
  auto_evaluation: AutoEvaluation | null;
  slug: string;
}

export interface FicheMethode extends FicheMethodeMeta {
  content: string;
}

const NIVEAUX = ["6e", "5e", "4e", "3e"];

export function getAllFichesMethode(): FicheMethodeMeta[] {
  const fiches: FicheMethodeMeta[] = [];

  for (const niveau of NIVEAUX) {
    const dir = path.join(contentDir, niveau);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);

      fiches.push(parseFicheMeta(data, niveau, slug));
    }
  }

  return fiches.sort((a, b) => {
    const numA = parseNumero(a.numero);
    const numB = parseNumero(b.numero);
    return numA - numB;
  });
}

export function getFichesByNiveau(niveau: string): FicheMethodeMeta[] {
  return getAllFichesMethode().filter((f) => f.niveau === niveau);
}

export function getFiche(niveau: string, slug: string): FicheMethode | null {
  const filePath = path.join(contentDir, niveau, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    ...parseFicheMeta(data, niveau, slug),
    content,
  };
}

export function getAllMnemoniques(): (Mnemonique & { niveau: string; competence: string; slug: string })[] {
  const fiches = getAllFichesMethode();
  return fiches
    .filter((f) => f.mnemonique !== null)
    .map((f) => ({
      acronyme: f.mnemonique!.acronyme,
      signification: f.mnemonique!.signification,
      competence: f.competence,
      niveau: f.niveau,
      slug: f.slug,
    }));
}

// Families config per niveau
export interface FamilleConfig {
  id: string;
  label: string;
  icon: string;
}

export const FAMILLES: Record<string, FamilleConfig> = {
  analyser: { id: "analyser", label: "Analyser", icon: "\uD83D\uDCC4" },
  rediger: { id: "rediger", label: "R\u00e9diger", icon: "\u270D\uFE0F" },
  cartographier: { id: "cartographier", label: "Cartographier", icon: "\uD83D\uDDFA\uFE0F" },
  temps: { id: "temps", label: "Se rep\u00e9rer dans le temps", icon: "\u23F3" },
  reperer: { id: "reperer", label: "Se rep\u00e9rer", icon: "\u23F3" },
  raisonner: { id: "raisonner", label: "Raisonner", icon: "\uD83D\uDD00" },
  brevet: { id: "brevet", label: "R\u00e9ussir le brevet", icon: "\uD83C\uDFAF" },
  apprendre: { id: "apprendre", label: "Apprendre", icon: "\uD83D\uDCDA" },
};

// The ordered list of families for each niveau
export const FAMILLES_PAR_NIVEAU: Record<string, string[]> = {
  "6e": ["analyser", "rediger", "cartographier", "temps", "apprendre"],
  "5e": ["analyser", "rediger", "cartographier", "temps", "apprendre"],
  "4e": ["analyser", "rediger", "cartographier", "temps", "raisonner", "apprendre"],
  "3e": ["analyser", "rediger", "cartographier", "reperer", "brevet", "apprendre"],
};

export function getFichesByFamille(niveau: string): { famille: FamilleConfig; fiches: FicheMethodeMeta[] }[] {
  const fiches = getFichesByNiveau(niveau);
  const orderedFamilleIds = FAMILLES_PAR_NIVEAU[niveau] || [];

  return orderedFamilleIds
    .map((familleId) => ({
      famille: FAMILLES[familleId],
      fiches: fiches.filter((f) => f.famille === familleId),
    }))
    .filter((group) => group.fiches.length > 0);
}

export const NIVEAU_CONFIG: Record<string, { sousTitre: string; nbFiches: number; cycle: string }> = {
  "6e": { sousTitre: "Les fondations", nbFiches: 13, cycle: "Cycle 3" },
  "5e": { sousTitre: "Les rep\u00e8res", nbFiches: 10, cycle: "Cycle 4" },
  "4e": { sousTitre: "L\u2019approfondissement", nbFiches: 13, cycle: "Cycle 4" },
  "3e": { sousTitre: "Objectif brevet", nbFiches: 19, cycle: "Cycle 4" },
};

// --- Helpers ---

function parseFicheMeta(data: Record<string, unknown>, niveau: string, slug: string): FicheMethodeMeta {
  let mnemonique: Mnemonique | null = null;
  if (data.mnemonique && typeof data.mnemonique === "object") {
    const m = data.mnemonique as Record<string, string>;
    if (m.acronyme && m.signification) {
      mnemonique = { acronyme: m.acronyme, signification: m.signification };
    }
  }

  let dnb: DNB | null = null;
  if (data.dnb && typeof data.dnb === "object") {
    const d = data.dnb as Record<string, unknown>;
    if (d.exercice && d.bareme) {
      dnb = { exercice: d.exercice as string, bareme: d.bareme as number };
    }
  }

  let auto_evaluation: AutoEvaluation | null = null;
  if (data.auto_evaluation && typeof data.auto_evaluation === "object") {
    const ae = data.auto_evaluation as Record<string, unknown>;
    if (ae.total_points && Array.isArray(ae.criteres)) {
      auto_evaluation = {
        total_points: ae.total_points as number,
        criteres: (ae.criteres as Record<string, unknown>[]).map((c) => ({
          label: c.label as string,
          points: c.points as number,
        })),
      };
    }
  }

  let fiches_liees: FicheLiee[] = [];
  if (Array.isArray(data.fiches_liees)) {
    fiches_liees = (data.fiches_liees as Record<string, string>[]).map((fl) => ({
      slug: fl.slug,
      label: fl.label,
    }));
  }

  let progression: Progression | null = null;
  if (data.progression && typeof data.progression === "object") {
    const p = data.progression as Record<string, unknown>;
    progression = {
      precedent: p.precedent && typeof p.precedent === "object"
        ? { niveau: (p.precedent as Record<string, string>).niveau, slug: (p.precedent as Record<string, string>).slug }
        : null,
      suivant: p.suivant && typeof p.suivant === "object"
        ? { niveau: (p.suivant as Record<string, string>).niveau, slug: (p.suivant as Record<string, string>).slug }
        : null,
    };
  }

  return {
    titre: (data.titre as string) || slug,
    niveau,
    numero: (data.numero as string) || "0",
    competence: (data.competence as string) || "",
    domaine: (data.domaine as string) || "Histoire-G\u00e9ographie",
    famille: (data.famille as string) || "apprendre",
    etapes: (data.etapes as number) || 0,
    mnemonique,
    dnb,
    fiches_liees,
    progression,
    auto_evaluation,
    slug,
  };
}

function parseNumero(numero: string): number {
  const match = numero.match(/^(\d+)/);
  if (match) return parseInt(match[1], 10);
  return 999;
}
