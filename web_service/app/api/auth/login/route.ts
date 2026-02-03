import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // On essaye juste de voir si ça répond
  try {
    const body = await request.json();
    console.log("Données reçues :", body); // Ça s'affichera dans les logs Docker

    return NextResponse.json({ 
      success: true, 
      message: "L'API répond enfin !",
      user: "Admin de Test" 
    });
  } catch (err) {
    return NextResponse.json({ error: "Erreur de lecture JSON" }, { status: 400 });
  }
}