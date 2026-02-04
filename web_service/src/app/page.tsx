import { prisma } from '@/lib/prisma'
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const themes = await prisma.theme.findMany({
    include: { formations: true }
  });

  const stats = await Promise.all([
    prisma.formation.count(),
    prisma.lesson.count(),
    prisma.user.count(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Développez vos compétences linguistiques en entreprise
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Une plateforme moderne et interactive pour l'apprentissage des langues, 
                conçue pour les professionnels exigeants.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/lessons"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Découvrir les formations
                </Link>
                <Link 
                  href="/formateurs"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Nos formateurs
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <Image
                src="/logo.png"
                alt="DingoLingo"
                width={400}
                height={400}
                className="w-80 h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{stats[0]}</div>
              <div className="text-gray-500 mt-1">Formations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{stats[1]}</div>
              <div className="text-gray-500 mt-1">Leçons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{stats[2]}</div>
              <div className="text-gray-500 mt-1">Apprenants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos domaines de formation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explorez nos différentes thématiques et trouvez la formation adaptée à vos besoins professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div 
                key={theme.id} 
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{theme.nom}</h3>
                <p className="text-gray-500 mb-4">{theme.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-500 font-medium">
                    {theme.formations.length} formation{theme.formations.length > 1 ? 's' : ''} disponible{theme.formations.length > 1 ? 's' : ''}
                  </span>
                  <Link 
                    href="/lessons" 
                    className="inline-flex items-center gap-1 text-gray-600 hover:text-orange-500 font-medium text-sm transition-colors"
                  >
                    Explorer
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à améliorer vos compétences linguistiques ?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Connectez-vous dès maintenant et accédez à l'ensemble de nos formations.
          </p>
          <Link 
            href="/login"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-orange-500 px-8 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Se connecter
          </Link>
        </div>
      </section>
    </main>
  );
}