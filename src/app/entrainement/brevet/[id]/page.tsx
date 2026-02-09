import Link from "next/link";
import {
  getBrevetCatalogue,
  getSujetContent,
  getCorrigeContent,
} from "@/lib/brevet";
import { notFound } from "next/navigation";
import BrevetSujetClient from "./BrevetSujetClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BrevetSujetPage({ params }: Props) {
  const { id } = await params;
  const catalogue = getBrevetCatalogue();
  const sujet = catalogue.sujets.find((s) => s.id === id);

  if (!sujet) {
    notFound();
  }

  const sujetContent =
    sujet.sujet_format === "markdown"
      ? getSujetContent(sujet.sujet_fichier)
      : null;

  const corrigeContent =
    sujet.corrige_format === "markdown"
      ? getCorrigeContent(sujet.corrige_fichier)
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/entrainement/brevet" className="hover:text-accent">
          Sujets de brevet
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{sujet.session}</span>
      </nav>

      <BrevetSujetClient
        sujet={sujet}
        sujetContent={sujetContent}
        corrigeContent={corrigeContent}
      />

      <div className="mt-8 text-center">
        <Link
          href="/entrainement/brevet"
          className="text-accent hover:underline font-medium"
        >
          &larr; Retour aux sujets de brevet
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const catalogue = getBrevetCatalogue();
  return catalogue.sujets.map((s) => ({ id: s.id }));
}
