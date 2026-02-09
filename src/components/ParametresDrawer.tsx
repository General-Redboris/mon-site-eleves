"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { getProgressionStats, type NiveauStats } from "@/lib/progression";
import ResetProgressionModal from "@/components/ResetProgressionModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const niveauLabels: Record<string, string> = {
  "6e": "6e",
  "5e": "5e",
  "4e": "4e",
  "3e": "3e",
};

export default function ParametresDrawer({ open, onClose }: Props) {
  const { theme, toggleTheme, dys, toggleDys } = useTheme();
  const [stats, setStats] = useState<{
    detailParNiveau: Record<string, NiveauStats>;
    totalCoursVus: number;
    totalQuizReussis: number;
  } | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const loadStats = useCallback(() => {
    const s = getProgressionStats();
    setStats({
      detailParNiveau: s.detailParNiveau,
      totalCoursVus: s.totalCoursVus,
      totalQuizReussis: s.totalQuizReussis,
    });
  }, []);

  useEffect(() => {
    if (open) loadStats();
  }, [open, loadStats]);

  // Fermeture avec la touche Échap
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !resetModalOpen) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, resetModalOpen]);

  // Empêche le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleResetDone() {
    loadStats();
  }

  return (
    <>
      {/* Overlay — ferme le drawer au clic */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — panneau glissant depuis la droite */}
      <div
        className={`fixed top-0 right-0 z-50 h-full bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-300 ease-out w-full sm:w-[380px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Paramètres"
      >
        {/* En-tête du drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Paramètres
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Fermer les paramètres"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu principal */}
        <div className="overflow-y-auto h-[calc(100%-73px)] px-6 py-6 space-y-8">
          {/* Section Affichage */}
          <section>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-5">
              Affichage
            </h3>
            <div className="space-y-5">
              {/* Toggle mode sombre */}
              <div
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                role="menuitemcheckbox"
                aria-checked={theme === "dark"}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">
                    {theme === "dark" ? "☀️" : "🌙"}
                  </span>
                  <div>
                    <p className="text-base font-medium text-foreground">Mode sombre</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Réduit la fatigue visuelle
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                    theme === "dark" ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  role="switch"
                  aria-checked={theme === "dark"}
                  aria-label="Activer ou désactiver le mode sombre"
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      theme === "dark" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle mode Dys */}
              <div
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                role="menuitemcheckbox"
                aria-checked={dys}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-500 dark:text-gray-400" aria-hidden="true">Aa</span>
                  <div>
                    <p className="text-base font-medium text-foreground">Mode lecture Dys</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Police et espacement adaptés
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleDys}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                    dys ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  role="switch"
                  aria-checked={dys}
                  aria-label="Activer ou désactiver le mode Dys"
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      dys ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Séparateur visuel */}
          <div className="border-t border-gray-200 dark:border-gray-700" />

          {/* Section Progression */}
          <section>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-5">
              Ma progression
            </h3>

            {stats && (stats.totalCoursVus > 0 || stats.totalQuizReussis > 0) ? (
              <div className="space-y-2">
                {["6e", "5e", "4e", "3e"].map((niv) => {
                  const detail = stats.detailParNiveau[niv];
                  if (!detail) return null;
                  const hasActivity = detail.coursVus > 0 || detail.quizReussis > 0;
                  return (
                    <div
                      key={niv}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg ${
                        hasActivity
                          ? "bg-gray-50 dark:bg-gray-700/50"
                          : ""
                      }`}
                    >
                      <span className="text-base font-bold text-foreground w-8">
                        {niveauLabels[niv]}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {detail.coursVus} cours vu{detail.coursVus > 1 ? "s" : ""} · {detail.quizReussis} quiz réussi{detail.quizReussis > 1 ? "s" : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                Aucune progression enregistrée pour le moment.
              </p>
            )}

            {/* Bouton de réinitialisation — affiché uniquement si une progression existe */}
            {stats && (stats.totalCoursVus > 0 || stats.totalQuizReussis > 0) && (
              <button
                onClick={() => setResetModalOpen(true)}
                className="mt-5 flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Réinitialiser ma progression
              </button>
            )}
          </section>
        </div>
      </div>

      {/* Modale de confirmation de réinitialisation */}
      <ResetProgressionModal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onReset={handleResetDone}
      />
    </>
  );
}
