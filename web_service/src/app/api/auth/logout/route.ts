import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Supprimer le cookie de session
    cookieStore.delete('user_session');

    return NextResponse.json({ 
      success: true, 
      message: "Déconnexion réussie" 
    });

  } catch (error: any) {
    console.error("Erreur Logout:", error);
    return NextResponse.json({ error: "Erreur lors de la déconnexion" }, { status: 500 });
  }
}
