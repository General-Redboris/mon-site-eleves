import {
  getChansonsData,
  getAllThemes,
  getAllAnnesScolaires,
} from "@/lib/chansons";
import ChansonsClient from "./ChansonsClient";

export const metadata = {
  title: "Nos chansons | Histoire-Géo Sancerre",
  description:
    "Chansons créées par Nicolas et par les élèves du Collège Francine Leca — Écoute et partage !",
};

export default function ChansonsPage() {
  const data = getChansonsData();
  const themes = getAllThemes();
  const annees = getAllAnnesScolaires();

  return (
    <ChansonsClient
      chansons={data.chansons}
      themes={themes}
      annees={annees}
    />
  );
}
