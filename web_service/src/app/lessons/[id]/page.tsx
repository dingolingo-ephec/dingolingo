import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import QuizEngine from "@/components/QuizEngine";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  // Protection: rediriger si non connecté
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const lessonId = parseInt(id);
  
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { 
      exercises: true,
      formation: true
    }
  });

  if (!lesson) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-3xl mx-auto px-4">
          <Link 
            href="/lessons" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux formations
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">{lesson.title}</h1>
          <p className="text-sm text-gray-500">{lesson.formation.titre}</p>
        </div>
      </div>
      
      <QuizEngine exercises={lesson.exercises} lessonId={lessonId} />
    </main>
  );
}