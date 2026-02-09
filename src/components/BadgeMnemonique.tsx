interface BadgeMnemoniqueProps {
  acronyme: string;
  signification: string;
  size?: "sm" | "lg";
}

export default function BadgeMnemonique({ acronyme, signification, size = "sm" }: BadgeMnemoniqueProps) {
  if (size === "lg") {
    return (
      <div className="my-4 bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-center gap-3">
        <span className="text-xl">🔑</span>
        <div>
          <span className="font-bold text-amber-900 text-lg">{acronyme}</span>
          <span className="text-amber-800 ml-2">— {signification}</span>
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
      🔑 {acronyme}
    </span>
  );
}
