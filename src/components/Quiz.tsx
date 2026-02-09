"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { markQuizReussi } from "@/lib/progression";

interface QuestionQCM {
  type: "qcm";
  question: string;
  options: string[];
  reponse: number;
  explication: string;
  methode_liee?: { slug: string; niveau: string; label: string };
}

interface QuestionVraiFaux {
  type: "vrai_faux";
  question: string;
  reponse: boolean;
  explication: string;
  methode_liee?: { slug: string; niveau: string; label: string };
}

interface QuestionReponseCourte {
  type: "reponse_courte";
  question: string;
  reponses_acceptees: string[];
  explication: string;
  methode_liee?: { slug: string; niveau: string; label: string };
}

type Question = QuestionQCM | QuestionVraiFaux | QuestionReponseCourte;

interface QuizProps {
  titre: string;
  questions: Question[];
  slug?: string;
}

export default function Quiz({ titre, questions, slug }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [textInput, setTextInput] = useState("");

  const question = questions[currentIndex];
  const total = questions.length;

  function checkAnswer() {
    if (selectedAnswer === null && question.type !== "reponse_courte") return;

    let isCorrect = false;

    if (question.type === "qcm") {
      isCorrect = selectedAnswer === question.reponse;
    } else if (question.type === "vrai_faux") {
      isCorrect = selectedAnswer === question.reponse;
    } else if (question.type === "reponse_courte") {
      const userAnswer = (textInput || "").trim().toLowerCase();
      isCorrect = question.reponses_acceptees.some(
        (r) => r.toLowerCase() === userAnswer
      );
    }

    if (isCorrect) {
      setScore((s) => s + 1);
    } else if (question.methode_liee) {
      setWrongMethodes((prev) => {
        const next = new Map(prev);
        next.set(question.methode_liee!.slug, question.methode_liee!);
        return next;
      });
    }
    setShowResult(true);
  }

  function nextQuestion() {
    if (currentIndex + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTextInput("");
    }
  }

  function restart() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setTextInput("");
  }

  function isCorrectAnswer(): boolean {
    if (question.type === "qcm") return selectedAnswer === question.reponse;
    if (question.type === "vrai_faux") return selectedAnswer === question.reponse;
    if (question.type === "reponse_courte") {
      return question.reponses_acceptees.some(
        (r) => r.toLowerCase() === (textInput || "").trim().toLowerCase()
      );
    }
    return false;
  }

  // Track progression when quiz is finished with >= 70%
  useEffect(() => {
    if (finished && slug) {
      const percent = Math.round((score / total) * 100);
      if (percent >= 70) {
        markQuizReussi(slug);
      }
    }
  }, [finished, score, total, slug]);

  // Collect methode links from wrong answers for the result screen
  const [wrongMethodes, setWrongMethodes] = useState<Map<string, { slug: string; niveau: string; label: string }>>(new Map());

  if (finished) {
    const percent = Math.round((score / total) * 100);
    const methodesList = Array.from(wrongMethodes.values());
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">{titre}</h2>
          <div className="text-6xl mb-4">
            {percent >= 80 ? "🎉" : percent >= 50 ? "👍" : "💪"}
          </div>
          <p className="text-xl font-semibold mb-2">
            Score : {score} / {total}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full transition-all ${
                percent >= 80
                  ? "bg-green-500"
                  : percent >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-gray-600 mb-6">
            {percent >= 80
              ? "Excellent travail ! Tu maîtrises bien ce chapitre."
              : percent >= 50
              ? "Pas mal ! Continue à réviser pour t'améliorer."
              : "Continue tes efforts, révise le cours et recommence !"}
          </p>

          {methodesList.length > 0 && (
            <div className="mb-6 p-4 bg-emc-light rounded-xl text-left">
              <p className="text-sm font-semibold text-emc mb-2">Fiches à revoir :</p>
              <div className="flex flex-wrap gap-2">
                {methodesList.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/methodes/${m.niveau}/${m.slug}`}
                    className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-white border border-emc/20 hover:border-emc transition-colors"
                  >
                    <span>📋</span>
                    <span>{m.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={restart}
            className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
          >
            Recommencer le quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">{titre}</h2>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-accent h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* Question */}
        <p className="text-lg font-medium mb-6">{question.question}</p>

        {/* Answer options */}
        {question.type === "qcm" && (
          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => {
              let btnClass =
                "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
              if (showResult) {
                if (idx === question.reponse) {
                  btnClass += "border-green-500 bg-green-50 text-green-800";
                } else if (idx === selectedAnswer && idx !== question.reponse) {
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-gray-200 text-gray-400";
                }
              } else {
                btnClass +=
                  idx === selectedAnswer
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
              }
              return (
                <button
                  key={idx}
                  onClick={() => !showResult && setSelectedAnswer(idx)}
                  disabled={showResult}
                  className={btnClass}
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-sm font-bold mr-3">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {question.type === "vrai_faux" && (
          <div className="flex gap-4 mb-6">
            {[
              { label: "Vrai", value: true },
              { label: "Faux", value: false },
            ].map(({ label, value }) => {
              let btnClass =
                "flex-1 p-4 rounded-xl border-2 transition-all font-semibold text-center ";
              if (showResult) {
                if (value === question.reponse) {
                  btnClass += "border-green-500 bg-green-50 text-green-800";
                } else if (
                  value === selectedAnswer &&
                  value !== question.reponse
                ) {
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-gray-200 text-gray-400";
                }
              } else {
                btnClass +=
                  selectedAnswer === value
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
              }
              return (
                <button
                  key={label}
                  onClick={() => !showResult && setSelectedAnswer(value)}
                  disabled={showResult}
                  className={btnClass}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {question.type === "reponse_courte" && (
          <div className="mb-6">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={showResult}
              placeholder="Tape ta réponse ici..."
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-colors text-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !showResult) checkAnswer();
              }}
            />
          </div>
        )}

        {/* Explanation */}
        {showResult && (
          <div
            className={`p-4 rounded-xl mb-6 ${
              isCorrectAnswer()
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p className="font-semibold mb-1">
              {isCorrectAnswer() ? "Bonne réponse !" : "Mauvaise réponse"}
            </p>
            <p className="text-sm text-gray-700">{question.explication}</p>
            {!isCorrectAnswer() && question.methode_liee && (
              <Link
                href={`/methodes/${question.methode_liee.niveau}/${question.methode_liee.slug}`}
                className="inline-flex items-center gap-1 mt-2 text-sm text-emc hover:underline font-medium"
              >
                📋 Revoir : {question.methode_liee.label}
              </Link>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={
                selectedAnswer === null &&
                question.type !== "reponse_courte"
              }
              className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Vérifier
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
            >
              {currentIndex + 1 >= total ? "Voir le résultat" : "Question suivante"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
