// Progression tracking via localStorage
// All functions must be called client-side only

const STORAGE_KEY = "chronogeo-progression";

export interface ProgressionData {
  coursVus: string[]; // "niveau/matiere/slug"
  quizReussis: string[]; // quiz slug
}

function getProgression(): ProgressionData {
  if (typeof window === "undefined") return { coursVus: [], quizReussis: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { coursVus: [], quizReussis: [] };
    return JSON.parse(raw);
  } catch {
    return { coursVus: [], quizReussis: [] };
  }
}

function saveProgression(data: ProgressionData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markCoursVu(niveau: string, matiere: string, slug: string) {
  const key = `${niveau}/${matiere}/${slug}`;
  const data = getProgression();
  if (!data.coursVus.includes(key)) {
    data.coursVus.push(key);
    saveProgression(data);
  }
}

export function markQuizReussi(slug: string) {
  const data = getProgression();
  if (!data.quizReussis.includes(slug)) {
    data.quizReussis.push(slug);
    saveProgression(data);
  }
}

export function isCoursVu(niveau: string, matiere: string, slug: string): boolean {
  const key = `${niveau}/${matiere}/${slug}`;
  return getProgression().coursVus.includes(key);
}

export function isQuizReussi(slug: string): boolean {
  return getProgression().quizReussis.includes(slug);
}

export function getProgressionStats(): {
  totalCoursVus: number;
  totalQuizReussis: number;
  coursVusParNiveau: Record<string, number>;
} {
  const data = getProgression();
  const coursVusParNiveau: Record<string, number> = {};
  for (const key of data.coursVus) {
    const niveau = key.split("/")[0];
    coursVusParNiveau[niveau] = (coursVusParNiveau[niveau] || 0) + 1;
  }
  return {
    totalCoursVus: data.coursVus.length,
    totalQuizReussis: data.quizReussis.length,
    coursVusParNiveau,
  };
}

export function resetProgression() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
