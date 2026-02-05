import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function FormateursPage() {
  const formateurs = await prisma.formateur.findMany({
    include: {
      formations: {
        include: {
          theme: true,
          lessons: {
            orderBy: { order: 'asc' },
            take: 1,
            select: { id: true }
          },
          _count: {
            select: { lessons: true }
          }
        }
      }
    }
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">Formateurs</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nos formateurs</h1>
          <p className="text-gray-600">Découvrez notre équipe de formateurs experts en langues.</p>
        </div>

        {formateurs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500">Aucun formateur disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formateurs.map((formateur) => (
              <div
                key={formateur.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                      {formateur.bio_courte?.charAt(0).toUpperCase() || "F"}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {formateur.bio_courte || `Formateur #${formateur.id}`}
                      </h2>
                      <p className="text-sm text-gray-500">Formateur</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {formateur.formations.length} formation{formateur.formations.length > 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Formations */}
                  {formateur.formations.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {formateur.formations.map((formation) => {
                        const firstLessonId = formation.lessons[0]?.id;
                        const href = firstLessonId ? `/lessons/${firstLessonId}` : '/lessons';
                        
                        return (
                          <Link
                            key={formation.id}
                            href={href}
                            className="block p-3 bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-lg transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                                  {formation.titre}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {formation.theme.nom} · {formation._count.lessons} leçon{formation._count.lessons > 1 ? 's' : ''}
                                </div>
                              </div>
                              <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
