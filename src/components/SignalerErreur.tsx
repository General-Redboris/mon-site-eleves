import { CONTACT_EMAIL } from "@/config/site";

interface Props {
  pageTitle: string;
}

export default function SignalerErreur({ pageTitle }: Props) {
  const subject = encodeURIComponent(`Erreur sur le site — ${pageTitle}`);
  const body = encodeURIComponent(
    `Bonjour,\n\nJ'ai repéré une erreur sur la page « ${pageTitle} ».\n\nDescription de l'erreur :\n`
  );

  return (
    <a
      href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
      className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-accent transition-colors"
    >
      <span>📝</span>
      <span>Une erreur ? Préviens M. Blondelet</span>
    </a>
  );
}
