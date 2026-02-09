import { getBrevetCatalogue } from "@/lib/brevet";
import BrevetListClient from "./BrevetListClient";

export const metadata = {
  title: "Sujets de brevet | S'entraîner | Histoire-Géo Sancerre",
};

export default function BrevetListPage() {
  const catalogue = getBrevetCatalogue();
  return <BrevetListClient sujets={catalogue.sujets} />;
}
