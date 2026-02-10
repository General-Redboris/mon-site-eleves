interface BadgeMnemoniqueProps {
  acronyme: string;
  signification: string;
  size?: "sm" | "lg";
}

export default function BadgeMnemonique({ acronyme, signification, size = "sm" }: BadgeMnemoniqueProps) {
  if (size === "lg") {
    return (
      <div className="my-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-xl p-4 flex items-center gap-3">
        <span className="text-2xl shrink-0">🔑</span>
        <div>
          <span className="font-bold text-amber-900 dark:text-amber-200 text-xl">{acronyme}</span>
          <p className="text-amber-800 dark:text-amber-300 text-sm mt-0.5">{signification}</p>
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-700">
      🔑 {acronyme}
    </span>
  );
}
