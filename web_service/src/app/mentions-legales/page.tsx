import Link from "next/link";

export const metadata = {
  title: "Mentions Légales - DingoLingo",
  description: "Mentions légales et politique de confidentialité de DingoLingo",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">Mentions légales</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions légales</h1>
          <p className="text-gray-600">Informations légales et politique de confidentialité.</p>
        </div>

        <div className="space-y-6">
          {/* Éditeur */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Éditeur du site</h2>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>DingoLingo</strong> - Plateforme d'apprentissage de langues
            </p>
            <p className="text-gray-500">
              Ce site est développé dans le cadre d'un projet pédagogique à l'EPHEC.
            </p>
          </section>

          {/* Hébergement */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Hébergement</h2>
            </div>
            <p className="text-gray-600">
              Ce site est hébergé sur l'infrastructure de l'EPHEC (Louvain-la-Neuve, Belgique).
            </p>
          </section>

          {/* RGPD */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Protection des données (RGPD)</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Données collectées</h3>
                <p className="text-gray-600 mb-3">
                  Nous collectons uniquement les données nécessaires au fonctionnement du service :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Identifiant de connexion (via Active Directory)
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Progression dans les formations
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Scores obtenus aux exercices
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Finalité du traitement</h3>
                <p className="text-gray-600">
                  Les données sont utilisées exclusivement pour le suivi pédagogique des formations.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Durée de conservation</h3>
                <p className="text-gray-600">
                  Les données sont conservées pendant la durée de la formation et sont supprimées 
                  à la fin du projet pédagogique.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Vos droits</h3>
                <p className="text-gray-600 mb-3">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Droit d'accès
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Droit de rectification
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Droit à l'effacement
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Droit à la portabilité
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Droit d'opposition
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Politique des cookies</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Ce site utilise uniquement des cookies techniques essentiels au fonctionnement :
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-3 font-medium text-gray-900">Cookie</th>
                    <th className="pb-3 font-medium text-gray-900">Finalité</th>
                    <th className="pb-3 font-medium text-gray-900">Durée</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr>
                    <td className="py-3 font-mono text-orange-600 text-xs">user_session</td>
                    <td className="py-3">Authentification utilisateur</td>
                    <td className="py-3">7 jours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm mt-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Aucun cookie tiers ou de tracking n'est utilisé sur ce site.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
            </div>
            <p className="text-gray-600">
              Pour toute question concernant vos données personnelles, contactez l'équipe IT 
              via les canaux internes de l'entreprise.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
