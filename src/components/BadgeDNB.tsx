interface BadgeDNBProps {
  exercice: string;
  bareme: number;
  size?: "sm" | "lg";
}

export default function BadgeDNB({ exercice, bareme, size = "sm" }: BadgeDNBProps) {
  if (size === "lg") {
    return (
      <div className="my-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
        <span className="text-2xl shrink-0">🎯</span>
        <div>
          <span className="font-bold text-red-800 dark:text-red-300 text-lg">DNB — {exercice}</span>
          <p className="text-red-700 dark:text-red-400 text-sm mt-0.5">Barème : {bareme} points</p>
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-bold border border-red-200 dark:border-red-800">
      🎯 DNB — {exercice} — {bareme} pts
    </span>
  );
}
