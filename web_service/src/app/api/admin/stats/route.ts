import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Vérifier la session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    
    // 2. Vérifier que c'est un admin (role_id = 2)
    if (session.role_id !== 2) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    // 3. Récupérer les statistiques
    const [
      totalUsers,
      totalFormations,
      totalLessons,
      totalExercises,
      completedLessons,
      recentProgress
    ] = await Promise.all([
      prisma.user.count(),
      prisma.formation.count(),
      prisma.lesson.count(),
      prisma.exercise.count(),
      prisma.lessonProgress.count({ where: { completed: true } }),
      prisma.lessonProgress.findMany({
        take: 10,
        orderBy: { updatedAt: 'desc' },
        include: {
          user: true,
          lesson: {
            include: { formation: true }
          }
        }
      })
    ]);

    // 4. Calculer le score moyen
    const avgScore = await prisma.lessonProgress.aggregate({
      _avg: { score: true },
      where: { completed: true }
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalFormations,
        totalLessons,
        totalExercises,
        completedLessons,
        averageScore: Math.round(avgScore._avg.score || 0),
      },
      recentProgress: recentProgress.map(p => ({
        id: p.id,
        userName: p.user.ad_guid,
        lessonTitle: p.lesson.title,
        formationTitle: p.lesson.formation.titre,
        score: p.score,
        completed: p.completed,
        updatedAt: p.updatedAt,
      }))
    });

  } catch (error: any) {
    console.error("Erreur Admin Stats:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
