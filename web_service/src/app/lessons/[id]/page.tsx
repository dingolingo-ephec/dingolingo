import { prisma } from "@/lib/prisma";
import QuizEngine from "@/components/QuizEngine";
import { notFound } from "next/navigation";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const lesson = await prisma.lesson.findUnique({
    where: { id: parseInt(id) },
    include: { exercises: true }
  });

  if (!lesson) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* On n'affiche plus le titre ici, le QuizEngine s'occupe de tout */}
      <QuizEngine exercises={lesson.exercises} />
    </main>
  );
}