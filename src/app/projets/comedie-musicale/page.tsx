import { getComedieMusicaleData, getComedieMusicaleGalerie } from "@/lib/projets";
import ComedieMusicaleClient from "./ComedieMusicaleClient";

export const metadata = {
  title: "Comédie musicale | Chronogéo",
  description:
    "L'Odyssée : une aventure qui swingue — Comédie musicale des élèves de 5e du Collège Francine Leca",
};

export default function ComedieMusicale() {
  const data = getComedieMusicaleData();
  const galerie = getComedieMusicaleGalerie();

  return (
    <ComedieMusicaleClient
      titre={data.titre}
      sous_titre={data.sous_titre}
      annee={data.annee}
      date_spectacle={data.date_spectacle}
      lieu={data.lieu}
      description={data.description}
      texte_piece={data.texte_piece}
      equipe={data.equipe}
      content={data.content}
      galerieTitre={galerie.titre}
      galerieAlbums={galerie.albums}
    />
  );
}
