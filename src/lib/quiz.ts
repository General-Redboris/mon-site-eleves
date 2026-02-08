import fs from "fs";
import path from "path";

const quizDir = path.join(process.cwd(), "content", "quiz");

export interface QuestionQCM {
  type: "qcm";
  question: string;
  options: string[];
  reponse: number;
  explication: string;
}

export interface QuestionVraiFaux {
  type: "vrai_faux";
  question: string;
  reponse: boolean;
  explication: string;
}

export interface QuestionReponseCourte {
  type: "reponse_courte";
  question: string;
  reponses_acceptees: string[];
  explication: string;
}

export type Question = QuestionQCM | QuestionVraiFaux | QuestionReponseCourte;

export interface Quiz {
  titre: string;
  niveau: string;
  matiere: string;
  slug: string;
  questions: Question[];
}

export function getAllQuizzes(): Omit<Quiz, "questions">[] {
  if (!fs.existsSync(quizDir)) return [];
  const files = fs.readdirSync(quizDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const slug = file.replace(/\.json$/, "");
    const raw = fs.readFileSync(path.join(quizDir, file), "utf-8");
    const data = JSON.parse(raw);
    return {
      titre: data.titre,
      niveau: data.niveau,
      matiere: data.matiere,
      slug,
    };
  });
}

export function getQuiz(slug: string): Quiz | null {
  const filePath = path.join(quizDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return { ...data, slug };
}
