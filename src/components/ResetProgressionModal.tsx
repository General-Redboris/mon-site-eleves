"use client";

import { useState, useEffect } from "react";
import { resetProgression } from "@/lib/progression";

interface Props {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
}

export default function ResetProgressionModal({ open, onClose, onReset }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Reset confirmed state when modal closes
  useEffect(() => {
    if (!open) setConfirmed(false);
  }, [open]);

  if (!open) return null;

  function handleReset() {
    resetProgression();
    setConfirmed(true);
    onReset();
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 1500);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {confirmed ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✓</div>
            <p className="font-semibold text-foreground">
              Progression réinitialisée
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Réinitialiser ta progression ?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Tous tes cours vus et quiz réussis seront effacés. Cette action est irréversible.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Tes préférences d&apos;affichage (mode sombre, mode Dys) ne seront pas modifiées.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
