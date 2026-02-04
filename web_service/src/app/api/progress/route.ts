import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // 1. Vérifier la session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    const userId = session.id;

    // 2. Récupérer les données de progression
    const { lessonId, score, completed } = await request.json();

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId requis" }, { status: 400 });
    }

    // 3. Créer ou mettre à jour la progression
    const progress = await prisma.lessonProgress.upsert({
      where: {
        user_id_lesson_id: {
          user_id: userId,
          lesson_id: lessonId,
        },
      },
      update: {
        score: score ?? 0,
        completed: completed ?? false,
      },
      create: {
        user_id: userId,
        lesson_id: lessonId,
        score: score ?? 0,
        completed: completed ?? false,
      },
    });

    return NextResponse.json({ 
      success: true, 
      progress,
      message: completed ? "Leçon terminée !" : "Progression sauvegardée"
    });

  } catch (error: any) {
    console.error("Erreur Progress:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// GET : Récupérer la progression d'un utilisateur
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    const userId = session.id;

    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get('lessonId');

    if (lessonId) {
      // Progression d'une leçon spécifique
      const progress = await prisma.lessonProgress.findUnique({
        where: {
          user_id_lesson_id: {
            user_id: userId,
            lesson_id: parseInt(lessonId),
          },
        },
      });
      return NextResponse.json({ progress });
    }

    // Toutes les progressions de l'utilisateur
    const allProgress = await prisma.lessonProgress.findMany({
      where: { user_id: userId },
      include: { lesson: true },
    });

    return NextResponse.json({ progress: allProgress });

  } catch (error: any) {
    console.error("Erreur GET Progress:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
