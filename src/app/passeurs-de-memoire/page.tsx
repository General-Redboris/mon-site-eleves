import Link from "next/link";
import {
  getPasseursIntro,
  getPodcastData,
  getGalerieData,
  getAllTextes,
} from "@/lib/passeurs";
import PasseursClient from "./PasseursClient";

export const metadata = {
  title: "Passeurs de mémoire | Histoire-Géo Sancerre",
  description:
    "Le devoir de mémoire porté par les élèves du Collège Francine Leca — Podcast, galerie photos et productions d'élèves.",
};

export default function PasseursPage() {
  const intro = getPasseursIntro();
  const podcast = getPodcastData();
  const galerie = getGalerieData();
  const textes = getAllTextes();

  return (
    <PasseursClient
      introContent={intro?.content || ""}
      podcast={podcast}
      photos={galerie.photos}
      textes={textes}
    />
  );
}
