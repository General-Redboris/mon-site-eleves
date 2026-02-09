import { getAllRessources } from "@/lib/ressources";
import RessourcesClient from "./RessourcesClient";

export default function RessourcesPage() {
  const ressources = getAllRessources();
  return <RessourcesClient ressources={ressources} />;
}
