"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

// ---------- Types ----------
export interface Photo {
  src: string;
  alt: string;
  legende: string;
  date: string;
}

export interface Album {
  id: string;
  titre: string;
  description: string;
  photos: Photo[];
}

interface GaleriePhotoProps {
  albums: Album[];
  titre?: string;
}

// ---------- Composant Lightbox ----------
function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Coordonnées tactiles pour le swipe
  const touchStartX = useRef<number | null>(null);

  const photo = photos[currentIndex];

  // Focus trap + navigation clavier
  useEffect(() => {
    // Focus le bouton fermer à l'ouverture
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      // Focus trap : empêcher le focus de sortir du dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusableEls = dialogRef.current.querySelectorAll<HTMLElement>(
          "button, [tabindex]"
        );
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Bloquer le scroll en arrière-plan
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  // Gestion du swipe tactile
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    // Seuil de 50px pour déclencher le swipe
    if (diff > 50) onPrev();
    if (diff < -50) onNext();
    touchStartX.current = null;
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo : ${photo.alt}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85"
      onClick={(e) => {
        // Fermer au clic sur le fond sombre
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Bouton fermer */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors"
        aria-label="Fermer la lightbox"
      >
        &times;
      </button>

      {/* Flèche précédente */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
          aria-label="Photo précédente"
        >
          &#8249;
        </button>
      )}

      {/* Flèche suivante */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
          aria-label="Photo suivante"
        >
          &#8250;
        </button>
      )}

      {/* Image + légende */}
      <div className="flex flex-col items-center max-w-[90vw] max-h-[90vh]">
        <div className="relative w-full flex items-center justify-center">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={1200}
            height={800}
            className="max-h-[75vh] w-auto object-contain rounded-lg"
            priority
          />
        </div>
        <div className="mt-3 text-center text-white px-4">
          <p className="text-sm md:text-base">{photo.legende}</p>
          {photo.date && (
            <p className="text-xs text-gray-400 mt-1">
              {new Date(photo.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------- Composant principal ----------
export default function GaleriePhoto({ albums, titre }: GaleriePhotoProps) {
  // Toutes les photos de tous les albums
  const allPhotos = albums.flatMap((a) => a.photos);
  const totalPhotos = allPhotos.length;

  // Album sélectionné (null = toutes les photos)
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Photos filtrées selon l'album sélectionné
  const displayedPhotos =
    selectedAlbum === null
      ? allPhotos
      : albums.find((a) => a.id === selectedAlbum)?.photos || [];

  // Navigation lightbox
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? displayedPhotos.length - 1 : prev - 1;
    });
  }, [displayedPhotos.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === displayedPhotos.length - 1 ? 0 : prev + 1;
    });
  }, [displayedPhotos.length]);

  // État vide : aucune photo dans aucun album
  if (totalPhotos === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-4xl mb-4">📸</p>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Les photos arrivent bientôt ! Revenez après les premières répétitions 📸
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Titre optionnel */}
      {titre && (
        <h2 className="text-2xl font-bold text-foreground mb-6">{titre}</h2>
      )}

      {/* Onglets de filtrage par album */}
      {albums.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedAlbum(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedAlbum === null
                ? "bg-accent text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Toutes les photos ({totalPhotos})
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbum(album.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedAlbum === album.id
                  ? "bg-accent text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {album.titre} ({album.photos.length})
            </button>
          ))}
        </div>
      )}

      {/* Grille de photos */}
      {displayedPhotos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          Pas encore de photos dans cet album.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayedPhotos.map((photo, index) => (
            <button
              key={`${photo.src}-${index}`}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`Voir la photo : ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay légende au survol */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs leading-snug line-clamp-2">
                  {photo.legende}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && displayedPhotos.length > 0 && (
        <Lightbox
          photos={displayedPhotos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
}
