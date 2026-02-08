import Link from "next/link";
import { getAllMethods } from "@/lib/courses";

export default function MethodesPage() {
  const methods = getAllMethods();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Fiches méthode</h1>
      <p className="text-gray-600 mb-8">
        Les méthodes essentielles pour réussir en histoire-géographie et EMC.
      </p>

      {methods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {methods.map((m) => (
            <Link
              key={m.slug}
              href={`/methodes/${m.slug}`}
              className="group block bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-geographie hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-2">🧭</div>
              <h3 className="font-bold text-lg group-hover:text-geographie transition-colors">
                {m.titre}
              </h3>
              {m.description && (
                <p className="text-sm text-gray-500 mt-2">{m.description}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
          <div className="text-4xl mb-3">🧭</div>
          <p>Les fiches méthode arrivent bientôt !</p>
        </div>
      )}
    </div>
  );
}
