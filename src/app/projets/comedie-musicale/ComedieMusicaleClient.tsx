"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GaleriePhoto, { type Album } from "@/components/GaleriePhoto";

// ---------- Types ----------
interface EquipeMembre {
  role: string;
  nom: string;
}

interface TextePiece {
  url: string | null;
  format: "pdf" | "gdoc";
  label: string;
}

interface ComedieMusicaleClientProps {
  titre: string;
  sous_titre: string;
  annee: string;
  date_spectacle: string;
  lieu: string;
  description: string;
  texte_piece: TextePiece;
  equipe: EquipeMembre[];
  content: string;
  galerieTitre: string;
  galerieAlbums: Album[];
}

// ---------- Compte à rebours ----------
function CompteARebours({ dateSpectacle }: { dateSpectacle: string }) {
  const target = new Date(dateSpectacle);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return (
      <p className="text-lg font-semibold text-accent">
        Le spectacle a eu lieu !
      </p>
    );
  }

  const jours = Math.floor(diff / (1000 * 60 * 60 * 24));

  return (
    <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-full text-sm font-semibold">
      <span>🎭</span>
      <span>J-{jours} avant le spectacle</span>
    </div>
  );
}

// ---------- Bouton texte de la pièce ----------
function BoutonTextePiece({ textePiece }: { textePiece: TextePiece }) {
  if (!textePiece.url) return null;

  const icone = textePiece.format === "gdoc" ? "📄" : "📜";

  return (
    <a
      href={textePiece.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-base"
    >
      <span className="text-xl">{icone}</span>
      <span>{textePiece.label}</span>
      <span className="text-lg">&rarr;</span>
    </a>
  );
}

// ---------- Composant principal ----------
export default function ComedieMusicaleClient({
  titre,
  sous_titre,
  annee,
  date_spectacle,
  lieu,
  description,
  texte_piece,
  equipe,
  content,
  galerieTitre,
  galerieAlbums,
}: ComedieMusicaleClientProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* En-tête / Hero */}
      <div className="mb-10">
        {/* Badge année */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {annee}
          </span>
          <CompteARebours dateSpectacle={date_spectacle} />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          🎬 {titre}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          {sous_titre}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          📍 {lieu}
        </p>

        {/* Bouton texte de la pièce (affiché seulement si url non null) */}
        <BoutonTextePiece textePiece={texte_piece} />
      </div>

      {/* Contenu markdown */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      {/* Équipe */}
      {equipe.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            🎭 L&apos;équipe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {equipe.map((membre, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {membre.role}
                </p>
                <p className="text-base font-semibold text-foreground">
                  {membre.nom}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Galerie photo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          📸 Galerie
        </h2>
        <GaleriePhoto albums={galerieAlbums} titre={galerieTitre} />
      </section>
    </div>
  );
}
