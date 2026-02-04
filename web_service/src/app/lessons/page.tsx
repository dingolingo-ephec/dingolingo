import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LessonsPage() {
  // Protection: rediriger si non connecté
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const formations = await prisma.formation.findMany({
    include: {
      theme: true,
      formateur: true,
      lessons: {
        orderBy: { order: "asc" },
      },
    },
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
            <span className="text-gray-900">Formations</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Formations disponibles</h1>
          <p className="text-gray-600">Sélectionnez une formation et commencez votre apprentissage.</p>
        </div>

        {formations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-gray-500">Aucune formation disponible pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {formations.map((formation) => (
              <div
                key={formation.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Formation Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1 text-sm text-orange-500 font-medium mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {formation.theme.nom}
                      </span>
                      <h2 className="text-xl font-semibold text-gray-900">{formation.titre}</h2>
                      {formation.description && (
                        <p className="text-gray-500 mt-1">{formation.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {formation.formateur.bio_courte || "Formateur"}
                    </div>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    {formation.lessons.length} leçon{formation.lessons.length > 1 ? 's' : ''}
                  </div>
                  
                  {formation.lessons.length === 0 ? (
                    <p className="text-gray-400 text-sm">Aucune leçon disponible.</p>
                  ) : (
                    <div className="space-y-2">
                      {formation.lessons.map((lesson, index) => (
                        <Link
                          key={lesson.id}
                          href={`/lessons/${lesson.id}`}
                          className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-lg transition-all group"
                        >
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-sm text-gray-400 group-hover:text-orange-500 transition-colors">
                            Commencer
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      ))}
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
