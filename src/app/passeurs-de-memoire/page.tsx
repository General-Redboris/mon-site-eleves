import {
  getPasseursIntro,
  getContexteHistorique,
  getPodcastData,
  getGalerieData,
  getAllPortraits,
  getAllPoemes,
  getAllTextes,
} from "@/lib/passeurs";
import PasseursClient from "./PasseursClient";

export const metadata = {
  title: "Passeurs de memoire | Histoire-Geo Sancerre",
  description:
    "Projet memoriel des classes de 3e du College Francine Leca autour de la tragedie des Puits de Guerry (ete 1944).",
};

export default function PasseursPage() {
  const intro = getPasseursIntro();
  const contexte = getContexteHistorique();
  const podcast = getPodcastData();
  const galerie = getGalerieData();
  const portraits = getAllPortraits();
  const poemes = getAllPoemes();
  const textes = getAllTextes();

  return (
    <PasseursClient
      introContent={intro?.content || ""}
      contexteContent={contexte?.content || null}
      podcast={podcast}
      galerieSections={galerie.sections}
      portraits={portraits}
      poemes={poemes}
      textes={textes}
    />
  );
}
