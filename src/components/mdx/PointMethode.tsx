import Link from "next/link";

interface Props {
  slug: string;
  niveau?: string;
  label: string;
}

export default function PointMethode({ slug, niveau = "6e", label }: Props) {
  return (
    <div className="my-4 p-4 bg-emc-light rounded-xl border border-emc/10">
      <div className="flex items-center gap-2">
        <span className="text-lg">📋</span>
        <p className="text-sm font-medium text-emc">Point méthode</p>
      </div>
      <Link
        href={`/methodes/${niveau}/${slug}`}
        className="inline-block mt-2 text-sm font-semibold text-emc hover:underline"
      >
        {"→ " + label}
      </Link>
    </div>
  );
}
