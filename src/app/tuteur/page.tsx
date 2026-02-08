"use client";

import { useState } from "react";

interface Chatbot {
  nom: string;
  description: string;
  icon: string;
  niveau: string;
  matiere: string;
  plateforme: "chatgpt" | "gemini";
  lien: string;
}

const chatbots: Chatbot[] = [
  // ChatGPT bots
  {
    nom: "DéclikBrevet",
    description:
      "Révision complète pour le brevet d'histoire-géographie-EMC",
    icon: "🎯",
    niveau: "3e",
    matiere: "Toutes",
    plateforme: "chatgpt",
    lien: "https://chatgpt.com/g/g-69289a32088c8191902cfc5e1fc68d85-declikbrevet",
  },
  {
    nom: "GéoCoach 3e : Ton Copilote Espaces Productifs ✈️",
    description:
      "Révision sur les espaces productifs en France",
    icon: "🏭",
    niveau: "3e",
    matiere: "Géographie",
    plateforme: "chatgpt",
    lien: "https://chatgpt.com/g/g-69624be8410081919265ef232b5d1df3-geocoach-3e-ton-copilote-espaces-productifs",
  },
  {
    nom: "GéoSphère : Comprendre le Monde 🌐",
    description:
      "Révision de géographie générale : mondialisation, territoires, dynamiques",
    icon: "🌍",
    niveau: "4e",
    matiere: "Géographie",
    plateforme: "chatgpt",
    lien: "https://chatgpt.com/g/g-6924600002408191ba71c4468fea9bc6-geosphere-comprendre-le-monde",
  },
  {
    nom: "EcoSphère : Défis de la Terre 🌱",
    description:
      "Révision sur le développement durable et les défis environnementaux",
    icon: "🌱",
    niveau: "5e",
    matiere: "Géographie",
    plateforme: "chatgpt",
    lien: "https://chatgpt.com/g/g-692470b6729881919019a17a610ad3e3-ecosphere-defis-de-la-terre",
  },
  {
    nom: "Instruction Nuremberg — Révision 2GM",
    description:
      "Révision sur la Seconde Guerre mondiale à travers le procès de Nuremberg",
    icon: "⚖️",
    niveau: "3e",
    matiere: "Histoire",
    plateforme: "chatgpt",
    lien: "https://chatgpt.com/g/g-6961757ece248191948334dbd49f7b7c-instruction-nuremberg-revision-2gm",
  },
  {
    nom: "Révision Histoire — France Années 30",
    description:
      "Révision sur la France dans les années 1930 : crise et Front populaire",
    icon: "📜",
    niveau: "3e",
    matiere: "Histoire",
    plateforme: "chatgpt",
    lien: "https://chatgpt.com/g/g-695ffa2721bc8191941e5c8b4848722c-revision-histoire-france-annees-30",
  },
  // Gemini bots
  {
    nom: "GéoSphère : Comprendre le Monde 🌐",
    description:
      "Ton assistant pour maîtriser le programme de géographie de 4e. Des océans aux grandes métropoles, révise tes chapitres et prépare tes contrôles.",
    icon: "🌍",
    niveau: "4e",
    matiere: "Géographie",
    plateforme: "gemini",
    lien: "https://gemini.google.com/gem/1nNB2uxF1q4YMG6EkoCkb--HWHKxG6mWZ?usp=sharing",
  },
  {
    nom: "EcoSphère : Défis de la Terre 🌱",
    description:
      "Ton assistant pour le programme de géographie de 5e. Démographie, inégalités, eau, énergie et changement climatique.",
    icon: "🌱",
    niveau: "5e",
    matiere: "Géographie",
    plateforme: "gemini",
    lien: "https://gemini.google.com/gem/1-Hs3OTKXyjk7LyJiNLseCm1gRhMTpruO?usp=sharing",
  },
  {
    nom: "DéclikBrevet 🎯",
    description:
      "Le déclic pour tes révisions ! Accompagnement méthodique sur les exercices du brevet : analyse de documents et développement construit, étape par étape.",
    icon: "🎯",
    niveau: "3e",
    matiere: "Toutes",
    plateforme: "gemini",
    lien: "https://gemini.google.com/gem/1fLh_zK5g1uxAe8DxJi8HrOizoq80oN5X?usp=sharing",
  },
];

const conseilsUtilisation = [
  {
    icon: "🎯",
    text: "Pose des questions précises plutôt que vagues. Par exemple : « Explique-moi les causes de la Révolution française » plutôt que « Parle-moi d'histoire ».",
  },
  {
    icon: "🔄",
    text: "Demande-lui de reformuler si tu ne comprends pas. Tu peux dire : « Peux-tu m'expliquer plus simplement ? »",
  },
  {
    icon: "📖",
    text: "Vérifie toujours avec ton cours : le chatbot peut faire des erreurs. Ton cours reste la référence.",
  },
  {
    icon: "✍️",
    text: "Utilise-le pour réviser, pas pour copier-coller tes devoirs. C'est un outil d'apprentissage, pas de triche !",
  },
  {
    icon: "🧠",
    text: "Tu peux lui demander de te faire un quiz ou de t'interroger sur une leçon. C'est un super moyen de réviser !",
  },
];

function getMatiereColor(matiere: string): string {
  const m = matiere.toLowerCase();
  if (m.includes("histoire") && !m.includes("géographie") && !m.includes("emc") && !m.includes("toutes")) {
    return "border-histoire/40 bg-histoire-light/50";
  }
  if (m.includes("géographie") && !m.includes("histoire") && !m.includes("emc") && !m.includes("toutes")) {
    return "border-geographie/40 bg-geographie-light/50";
  }
  if (m === "emc") {
    return "border-emc/40 bg-emc-light/50";
  }
  // Mixed or Toutes
  return "border-gray-200 bg-white";
}

function getMatiereTagColor(matiere: string): string {
  const m = matiere.toLowerCase();
  if (m.includes("histoire")) return "bg-histoire-light text-histoire";
  if (m.includes("géographie")) return "bg-geographie-light text-geographie";
  if (m.includes("emc")) return "bg-emc-light text-emc";
  return "bg-gray-100 text-gray-600";
}

function getMatiereTags(matiere: string): string[] {
  if (matiere === "Toutes") return ["Histoire", "Géographie", "EMC"];
  return matiere.split("/").map((m) => m.trim());
}

function matchesNiveau(bot: Chatbot, filter: string): boolean {
  if (filter === "Tous") return true;
  return bot.niveau.includes(filter);
}

function matchesMatiere(bot: Chatbot, filter: string): boolean {
  if (filter === "Toutes") return true;
  if (bot.matiere === "Toutes") return true;
  return bot.matiere.toLowerCase().includes(filter.toLowerCase());
}

function matchesPlateforme(bot: Chatbot, filter: string): boolean {
  if (filter === "Toutes") return true;
  return bot.plateforme === filter.toLowerCase();
}

export default function TuteurPage() {
  const [filtreNiveau, setFiltreNiveau] = useState("Tous");
  const [filtreMatiere, setFiltreMatiere] = useState("Toutes");
  const [filtrePlateforme, setFiltrePlateforme] = useState("Toutes");

  const filteredBots = chatbots.filter(
    (bot) =>
      matchesNiveau(bot, filtreNiveau) &&
      matchesMatiere(bot, filtreMatiere) &&
      matchesPlateforme(bot, filtrePlateforme)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-3">Mon tuteur IA</h1>
      <p className="text-gray-600 mb-8 max-w-3xl text-lg">
        Tes chatbots de révision, créés par ton professeur pour t&apos;accompagner
        en histoire-géographie et EMC. Ils sont disponibles sur ChatGPT et
        Gemini&nbsp;: il te faut un <strong>compte gratuit</strong> sur l&apos;une
        de ces plateformes pour les utiliser.
      </p>

      {/* Conseils box — always visible */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 mb-10 border border-blue-100">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <span className="text-2xl">💡</span> Bien utiliser ton tuteur IA
        </h2>
        <ul className="space-y-4">
          {conseilsUtilisation.map((conseil, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 text-xl mt-0.5">{conseil.icon}</span>
              <p className="text-gray-700 leading-relaxed">{conseil.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Filters */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Niveau filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Niveau
            </label>
            <div className="flex flex-wrap gap-2">
              {["Tous", "5e", "4e", "3e"].map((n) => (
                <button
                  key={n}
                  onClick={() => setFiltreNiveau(n)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filtreNiveau === n
                      ? "bg-accent text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Matiere filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Matière
            </label>
            <div className="flex flex-wrap gap-2">
              {["Toutes", "Histoire", "Géographie", "EMC"].map((m) => (
                <button
                  key={m}
                  onClick={() => setFiltreMatiere(m)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filtreMatiere === m
                      ? "bg-accent text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Plateforme filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Plateforme
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Toutes", value: "Toutes" },
                { label: "ChatGPT", value: "chatgpt" },
                { label: "Gemini", value: "gemini" },
              ].map((p) => (
                <button
                  key={p.value}
                  onClick={() => setFiltrePlateforme(p.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filtrePlateforme === p.value
                      ? "bg-accent text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot grid */}
      {filteredBots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBots.map((bot, idx) => (
            <div
              key={`${bot.nom}-${bot.plateforme}-${idx}`}
              className={`group rounded-2xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${getMatiereColor(bot.matiere)}`}
            >
              {/* Top row: icon + badges */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{bot.icon}</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                    bot.plateforme === "chatgpt"
                      ? "bg-[#10A37F]"
                      : "bg-[#4285F4]"
                  }`}
                >
                  {bot.plateforme === "chatgpt" ? (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
                      </svg>
                      ChatGPT
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M12 0L1.608 6v12L12 24l10.392-6V6zm-1.2 16.8h2.4v2.4h-2.4zM12 4.8a4.8 4.8 0 0 1 4.8 4.8c0 2.4-1.8 3.6-2.88 4.32-.48.36-.72.6-.72 1.08h-2.4c0-1.44.84-2.28 1.56-2.88.84-.72 1.44-1.2 1.44-2.52A1.8 1.8 0 0 0 12 7.8a1.8 1.8 0 0 0-1.8 1.8H7.8A4.2 4.2 0 0 1 12 4.8z" />
                      </svg>
                      Gemini
                    </>
                  )}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-foreground mb-1.5 leading-snug">
                {bot.nom}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {bot.description}
              </p>

              {/* Tags: niveau + matière */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                  {bot.niveau}
                </span>
                {getMatiereTags(bot.matiere).map((tag) => (
                  <span
                    key={tag}
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${getMatiereTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA button */}
              <a
                href={bot.lien}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
                  bot.plateforme === "chatgpt"
                    ? "bg-[#10A37F] hover:bg-[#0D8C6D]"
                    : "bg-[#4285F4] hover:bg-[#3367D6]"
                }`}
              >
                Lancer le chatbot
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-gray-100">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">Aucun chatbot ne correspond à ces filtres.</p>
          <button
            onClick={() => {
              setFiltreNiveau("Tous");
              setFiltreMatiere("Toutes");
              setFiltrePlateforme("Toutes");
            }}
            className="mt-3 text-accent hover:underline text-sm font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
