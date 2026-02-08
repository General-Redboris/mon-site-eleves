export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Histoire-Géo Sancerre
            </h3>
            <p>
              Plateforme de révision pour les élèves du Collège Francine Leca.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Sections
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="/cours" className="hover:text-accent transition-colors">
                  Mes cours
                </a>
              </li>
              <li>
                <a href="/methodes" className="hover:text-accent transition-colors">
                  Méthodes
                </a>
              </li>
              <li>
                <a href="/entrainement" className="hover:text-accent transition-colors">
                  S&apos;entraîner
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Enseignant
            </h3>
            <p>Nicolas — Histoire-Géographie-EMC</p>
            <p>Collège Francine Leca, Sancerre</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Histoire-Géo Sancerre. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
