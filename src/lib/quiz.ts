import fs from "fs";
import path from "path";

const quizDir = path.join(process.cwd(), "content", "quiz");
const niveaux = ["6e", "5e", "4e", "3e"];

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

export interface QuizMeta {
  titre: string;
  niveau: string;
  matiere: string;
  slug: string;
  nbQuestions: number;
}

export function getAllQuizzes(): QuizMeta[] {
  const results: QuizMeta[] = [];

  for (const niveau of niveaux) {
    const dir = path.join(quizDir, niveau);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const fileName = file.replace(/\.json$/, "");
      const slug = `${niveau}-${fileName}`;
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const data = JSON.parse(raw);
      results.push({
        titre: data.titre,
        niveau: data.niveau || niveau,
        matiere: data.matiere,
        slug,
        nbQuestions: Array.isArray(data.questions) ? data.questions.length : 0,
      });
    }
  }

  return results;
}

export function getQuiz(slug: string): Quiz | null {
  for (const niveau of niveaux) {
    const prefix = `${niveau}-`;
    if (slug.startsWith(prefix)) {
      const fileName = slug.slice(prefix.length);
      const filePath = path.join(quizDir, niveau, `${fileName}.json`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(raw);
        return { ...data, slug };
      }
    }
  }
  return null;
}
