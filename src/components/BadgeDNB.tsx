interface BadgeDNBProps {
  exercice: string;
  bareme: number;
}

export default function BadgeDNB({ exercice, bareme }: BadgeDNBProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
      🎯 DNB — {exercice} — {bareme} pts
    </span>
  );
}
