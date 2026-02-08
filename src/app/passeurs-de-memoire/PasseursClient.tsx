"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Lightbox from "@/components/Lightbox";

interface Episode {
  numero: number;
  titre: string;
  description: string;
  duree: string;
  date: string;
  annee_scolaire: string;
  plateforme: "youtube" | "soundcloud";
  embed_id: string;
  lien_externe: string;
}

interface PodcastData {
  titre_podcast: string;
  description: string;
  episodes: Episode[];
}

interface Photo {
  fichier: string;
  legende: string;
  annee_scolaire: string;
}

interface TexteMeta {
  titre: string;
  auteur: string;
  annee_scolaire: string;
  date: string;
  slug: string;
}

interface Props {
  introContent: string;
  podcast: PodcastData | null;
  photos: Photo[];
  textes: TexteMeta[];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function PasseursClient({
  introContent,
  podcast,
  photos,
  textes,
}: Props) {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero — sober, dark tones */}
      <section className="bg-stone-900 text-stone-100 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
            Passeurs de mémoire
          </h1>
          <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto">
            Le devoir de mémoire porté par les élèves du Collège Francine Leca
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Introduction */}
        {introContent && (
          <section className="mb-16">
            <div className="prose max-w-none text-stone-700 leading-relaxed text-base sm:text-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {introContent}
              </ReactMarkdown>
            </div>
          </section>
        )}

        <hr className="border-stone-200 mb-16" />

        {/* Section 1 — Podcast */}
        {podcast && podcast.episodes.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              La Voix des Puits
            </h2>
            <p className="text-stone-500 mb-8 text-base">
              Le podcast des élèves
            </p>

            <div className="space-y-8">
              {podcast.episodes.map((ep) => (
                <article
                  key={ep.numero}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm"
                >
                  {/* Embed */}
                  <div className="aspect-video bg-stone-100">
                    {ep.plateforme === "youtube" ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${ep.embed_id}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowFullScreen
                        title={ep.titre}
                      />
                    ) : (
                      <iframe
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(ep.embed_id)}&color=%234a4a4a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
                        className="w-full h-full"
                        allow="autoplay"
                        title={ep.titre}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                        Épisode {ep.numero}
                      </span>
                      <span className="text-xs text-stone-400">
                        {ep.duree}
                      </span>
                      <span className="text-xs text-stone-400">
                        {formatDate(ep.date)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">
                      {ep.titre}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-4">
                      {ep.description}
                    </p>
                    <a
                      href={ep.lien_externe}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      Écouter sur{" "}
                      {ep.plateforme === "youtube" ? "YouTube" : "SoundCloud"}
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
                </article>
              ))}
            </div>
          </section>
        )}

        <hr className="border-stone-200 mb-16" />

        {/* Section 2 — Galerie photos */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            Galerie photos
          </h2>
          <p className="text-stone-500 mb-8 text-base">
            Images des visites, cérémonies et moments du projet
          </p>

          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxPhoto(photo)}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-200 border border-stone-200 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  {/* Placeholder / real image */}
                  <img
                    src={`/images/passeurs-de-memoire/${photo.fichier}`}
                    alt={photo.legende}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector(".placeholder")) {
                        const placeholder = document.createElement("div");
                        placeholder.className =
                          "placeholder absolute inset-0 flex items-center justify-center bg-stone-200 text-stone-400";
                        placeholder.innerHTML =
                          '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>';
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                  {/* Overlay with caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs leading-snug">
                      {photo.legende}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 italic text-sm">
              Galerie en construction...
            </p>
          )}
        </section>

        <hr className="border-stone-200 mb-16" />

        {/* Section 3 — Textes d'élèves */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            Productions des élèves
          </h2>
          <p className="text-stone-500 mb-8 text-base">
            Témoignages, réflexions et comptes-rendus rédigés par les élèves
          </p>

          {textes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {textes.map((texte) => (
                <Link
                  key={texte.slug}
                  href={`/passeurs-de-memoire/textes/${texte.slug}`}
                  className="group block bg-white rounded-xl border border-stone-200 p-6 hover:shadow-md hover:border-stone-300 transition-all"
                >
                  <h3 className="font-bold text-stone-900 mb-2 group-hover:text-stone-700 transition-colors text-lg leading-snug">
                    {texte.titre}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                    <span>{texte.auteur}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span>{texte.annee_scolaire}</span>
                    {texte.date && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-stone-300" />
                        <span>{formatDate(texte.date)}</span>
                      </>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-stone-500 font-medium group-hover:text-stone-600 transition-colors">
                    Lire le texte &rarr;
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 italic text-sm">
              Les textes arrivent bientôt...
            </p>
          )}
        </section>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          src={`/images/passeurs-de-memoire/${lightboxPhoto.fichier}`}
          alt={lightboxPhoto.legende}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </div>
  );
}
