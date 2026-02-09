"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Lightbox from "@/components/Lightbox";

// --- Types ---

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
  type?: string;
  classe?: string;
}

interface PodcastData {
  titre_podcast: string;
  description: string;
  episodes: Episode[];
}

interface Photo {
  fichier: string;
  legende: string;
  date?: string;
}

interface GalerieSection {
  titre: string;
  photos: Photo[];
}

interface PortraitMeta {
  titre: string;
  soustitre: string;
  auteurs: string;
  famille_ou_victime: string;
  dates: string;
  slug: string;
}

interface PoemeMeta {
  titre: string;
  auteur: string;
  type: "creation_eleve" | "corpus";
  date: string;
  slug: string;
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
  contexteContent: string | null;
  podcast: PodcastData | null;
  galerieSections: GalerieSection[];
  portraits: PortraitMeta[];
  poemes: PoemeMeta[];
  textes: TexteMeta[];
}

// --- Helpers ---

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

// --- Section nav items ---
const sectionNav = [
  { id: "projet", label: "Le projet" },
  { id: "contexte", label: "Les Puits de Guerry" },
  { id: "podcast", label: "Podcast" },
  { id: "portraits", label: "Portraits" },
  { id: "poesie", label: "Poesie" },
  { id: "galerie", label: "Galerie" },
  { id: "ressources", label: "Ressources" },
];

// --- Component ---

export default function PasseursClient({
  introContent,
  contexteContent,
  podcast,
  galerieSections,
  portraits,
  poemes,
  textes,
}: Props) {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [contexteOpen, setContexteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-passeurs-bg text-passeurs-fg">
      {/* ===== HERO ===== */}
      <section className="bg-passeurs-dark text-passeurs-light py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-light tracking-wide mb-4 text-white passeurs-smallcaps">
            Passeurs de memoire
          </h1>
          <p className="text-base sm:text-lg text-stone-400 mb-8">
            Projet memoriel des classes de 3e — College Francine Leca — 2025-2026
          </p>
          <blockquote className="max-w-xl mx-auto text-stone-400 italic text-sm sm:text-base leading-relaxed border-l-2 border-passeurs-accent pl-4 text-left">
            &laquo;&nbsp;Celui qui ne se souvient pas de l&apos;histoire est condamne a la revivre.&nbsp;&raquo;
          </blockquote>
        </div>
      </section>

      {/* ===== SECTION NAV ===== */}
      <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <div className="flex gap-1 py-2">
            {sectionNav.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-passeurs-dark hover:bg-stone-100 rounded-md whitespace-nowrap transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* ===== 1. LE PROJET ===== */}
        <section id="projet" className="pt-16 pb-12">
          <h2 className="passeurs-section-title">Le projet</h2>

          {introContent && (
            <div className="passeurs-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {introContent}
              </ReactMarkdown>
            </div>
          )}

          {/* Three parcours cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white border border-stone-200 p-5">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">3e1 — Mme Pasquier</p>
              <h3 className="font-semibold text-passeurs-dark text-sm mb-1">Poesie engagee</h3>
              <p className="text-xs text-stone-500">Etude de poetes de la Shoah et creations originales</p>
            </div>
            <div className="bg-white border border-stone-200 p-5">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">3e2 — Mme Hardy</p>
              <h3 className="font-semibold text-passeurs-dark text-sm mb-1">Une classe, des destins</h3>
              <p className="text-xs text-stone-500">Recherches biographiques sur les victimes</p>
            </div>
            <div className="bg-white border border-stone-200 p-5">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">3e3 — Mme Bouchet</p>
              <h3 className="font-semibold text-passeurs-dark text-sm mb-1">Temoignages et recits</h3>
              <p className="text-xs text-stone-500">Recueil et mise en voix de temoignages</p>
            </div>
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* ===== 2. LES PUITS DE GUERRY ===== */}
        <section id="contexte" className="pt-16 pb-12">
          <h2 className="passeurs-section-title">Les Puits de Guerry</h2>

          <div className="border-l-4 border-passeurs-accent bg-white p-6 sm:p-8">
            <h3 className="font-semibold text-passeurs-dark text-lg mb-4 passeurs-smallcaps">
              La tragedie des Puits de Guerry (ete 1944)
            </h3>

            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Les Puits de Guerry, situes sur la commune de Savigny-en-Septaine (Cher), sont le lieu d&apos;un crime genocidaire perpetre a l&apos;ete 1944.
              </p>
              <p>
                Dans la nuit du 21 au 22 juillet 1944, 71 personnes representant la quasi-totalite de la communaute juive de Saint-Amand-Montrond sont arretees par la Milice et la police allemande. 36 d&apos;entre elles seront assassinees.
              </p>
              <p className="text-stone-500 italic">
                De Isaac Dreyfus, 85 ans, a Marcel Walewick, 16 ans.
              </p>
            </div>

            {/* Accordion */}
            <button
              onClick={() => setContexteOpen(!contexteOpen)}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-passeurs-dark transition-colors"
            >
              <span>{contexteOpen ? "Refermer" : "En savoir plus"}</span>
              <svg
                className={`w-4 h-4 transition-transform ${contexteOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {contexteOpen && contexteContent && (
              <div className="mt-6 pt-6 border-t border-stone-200">
                <div className="passeurs-prose text-sm">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {contexteContent}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* ===== 3. PODCAST ===== */}
        {podcast && podcast.episodes.length > 0 && (
          <>
            <section id="podcast" className="pt-16 pb-12">
              <h2 className="passeurs-section-title">Les Voix des Puits</h2>
              <p className="text-stone-500 text-sm mb-8">
                {podcast.description}
              </p>

              <div className="space-y-6">
                {podcast.episodes.map((ep) => (
                  <article key={ep.numero} className="bg-white border border-stone-200 overflow-hidden">
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

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                          Episode {ep.numero}
                        </span>
                        {ep.type && (
                          <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                            {ep.type}
                          </span>
                        )}
                        {ep.classe && (
                          <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                            {ep.classe}
                          </span>
                        )}
                        <span className="text-xs text-stone-400">{ep.duree}</span>
                        <span className="text-xs text-stone-400">{formatDate(ep.date)}</span>
                      </div>
                      <h3 className="font-semibold text-passeurs-dark mb-2">{ep.titre}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed mb-3">{ep.description}</p>
                      <a
                        href={ep.lien_externe}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-passeurs-dark transition-colors"
                      >
                        Ecouter sur {ep.plateforme === "youtube" ? "YouTube" : "SoundCloud"}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <hr className="border-stone-200" />
          </>
        )}

        {/* ===== 4. PORTRAITS (3e2) ===== */}
        <section id="portraits" className="pt-16 pb-12">
          <h2 className="passeurs-section-title">Une classe, des destins</h2>
          <p className="text-stone-500 text-sm mb-2">
            Recherches biographiques des eleves de 3e2
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mb-8">
            Humaniser les victimes, passer du chiffre au visage, du nombre au prenom. Chaque eleve a mene des recherches pour retracer le parcours d&apos;une victime ou d&apos;une famille.
          </p>

          {portraits.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portraits.map((portrait) => (
                <Link
                  key={portrait.slug}
                  href={`/passeurs-de-memoire/portraits/${portrait.slug}`}
                  className="group block bg-white border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all"
                >
                  <h3 className="font-semibold text-passeurs-dark group-hover:text-passeurs-accent transition-colors">
                    {portrait.titre}
                  </h3>
                  {portrait.dates && (
                    <p className="text-xs text-stone-400 mt-0.5">{portrait.dates}</p>
                  )}
                  {portrait.soustitre && (
                    <p className="text-sm text-stone-500 mt-2 leading-relaxed">{portrait.soustitre}</p>
                  )}
                  <p className="mt-3 text-xs font-medium text-stone-400 group-hover:text-stone-600 transition-colors">
                    Lire le portrait &rarr;
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 italic text-sm">
              Les portraits seront publies au fur et a mesure de l&apos;avancement du projet.
            </p>
          )}
        </section>

        <hr className="border-stone-200" />

        {/* ===== 5. POESIE ENGAGEE (3e1) ===== */}
        <section id="poesie" className="pt-16 pb-12">
          <h2 className="passeurs-section-title">Dire l&apos;indicible</h2>
          <p className="text-stone-500 text-sm mb-2">
            Poesie engagee — Classe de 3e1
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mb-8">
            La poesie comme temoignage et resistance. Les eleves ont etudie les poetes de la Shoah et de la Resistance, puis ont cree leurs propres textes pour porter la memoire des victimes.
          </p>

          {poemes.length > 0 ? (
            <div className="space-y-3">
              {poemes.map((poeme) => (
                <Link
                  key={poeme.slug}
                  href={`/passeurs-de-memoire/poemes/${poeme.slug}`}
                  className="group block bg-white border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-passeurs-dark group-hover:text-passeurs-accent transition-colors italic">
                        {poeme.titre}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">{poeme.auteur}</p>
                    </div>
                    <span className="shrink-0 text-xs px-2 py-0.5 bg-stone-100 text-stone-500 rounded">
                      {poeme.type === "creation_eleve" ? "Creation" : "Corpus"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 italic text-sm">
              Les poemes seront publies au fur et a mesure de l&apos;avancement du projet.
            </p>
          )}
        </section>

        <hr className="border-stone-200" />

        {/* ===== 6. GALERIE ===== */}
        <section id="galerie" className="pt-16 pb-12">
          <h2 className="passeurs-section-title">En images</h2>
          <p className="text-stone-500 text-sm mb-8">
            Les differentes etapes du projet
          </p>

          {galerieSections.length > 0 ? (
            <div className="space-y-10">
              {galerieSections.map((sec, si) => (
                <div key={si}>
                  <h3 className="text-sm font-semibold text-stone-700 mb-3">{sec.titre}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {sec.photos.map((photo, pi) => (
                      <button
                        key={pi}
                        onClick={() => setLightboxPhoto(photo)}
                        className="group relative aspect-[4/3] overflow-hidden bg-stone-200 border border-stone-200 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-stone-400"
                      >
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
                              placeholder.className = "placeholder absolute inset-0 flex items-center justify-center bg-stone-200 text-stone-400";
                              placeholder.innerHTML = '<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>';
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <p className="text-white text-xs leading-snug">{photo.legende}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 italic text-sm">
              Galerie en construction...
            </p>
          )}
        </section>

        <hr className="border-stone-200" />

        {/* ===== TEXTES (legacy) ===== */}
        {textes.length > 0 && (
          <>
            <section className="pt-16 pb-12">
              <h2 className="passeurs-section-title">Temoignages et recits</h2>
              <p className="text-stone-500 text-sm mb-8">
                Textes rediges par les eleves
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {textes.map((texte) => (
                  <Link
                    key={texte.slug}
                    href={`/passeurs-de-memoire/textes/${texte.slug}`}
                    className="group block bg-white border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-semibold text-passeurs-dark mb-1 group-hover:text-passeurs-accent transition-colors text-sm leading-snug">
                      {texte.titre}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                      <span>{texte.auteur}</span>
                      {texte.date && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-stone-300" />
                          <span>{formatDate(texte.date)}</span>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <hr className="border-stone-200" />
          </>
        )}

        {/* ===== 7. RESSOURCES ET PARTENAIRES ===== */}
        <section id="ressources" className="pt-16 pb-12">
          <h2 className="passeurs-section-title">Ressources et partenaires</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-3">Bibliographie indicative</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li>Julien Fargettas, <em>La rafle oubliee : Saint-Amand-Montrond, juillet 1944</em></li>
                <li>Jean-Yves Ribault, <em>Les Puits de Guerry : le massacre de juifs dans le Cher, juillet 1944</em></li>
                <li>Memorial de la Shoah, ressources pedagogiques en ligne</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-3">Partenaires</h3>
              <ul className="space-y-1.5 text-sm text-stone-600">
                <li>Delegation Militaire Departementale du Cher (DMD)</li>
                <li>Direction des Services Departementaux de l&apos;Education Nationale du Cher (DSDEN)</li>
                <li>Musee de la Resistance et de la Deportation du Cher</li>
                <li>Memorial de la Shoah</li>
                <li>Archives departementales du Cher</li>
                <li>DGA Techniques Terrestres</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* ===== FOOTER CITATION ===== */}
      <footer className="bg-passeurs-dark text-stone-400 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <blockquote className="italic text-sm sm:text-base leading-relaxed">
            &laquo;&nbsp;Nous ne sommes pas les derniers temoins, mais les premiers passeurs.&nbsp;&raquo;
          </blockquote>
          <p className="mt-4 text-xs text-stone-500">
            Projet &laquo;&nbsp;Carnet de Passeur de Memoire&nbsp;&raquo; — College Francine Leca, Sancerre — 2025-2026
          </p>
        </div>
      </footer>

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
