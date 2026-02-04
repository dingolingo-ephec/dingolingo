import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyLDAPCredentials, ROLES } from '../../../../lib/ldap';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 1. Vérifier les accès sur l'AD (ou Mock)
    const ldapUser = await verifyLDAPCredentials(username, password);

    // 2. Déterminer le rôle (admin si flag isAdmin ou username === 'admin')
    const roleId = ldapUser.isAdmin ? ROLES.ADMIN : ROLES.STUDENT;

    // 3. Synchroniser l'utilisateur AD avec la DB locale
    const user = await prisma.user.upsert({
      where: { ad_guid: username },
      update: { role_id: roleId },
      create: {
        ad_guid: username,
        role_id: roleId,
      },
    });

    // 4. Créer le cookie de session sécurisé
    const sessionData = {
      id: user.id,
      name: ldapUser.displayName,
      role_id: user.role_id,
    };

    const cookieStore = await cookies();
    cookieStore.set('user_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    });

    return NextResponse.json({ 
      success: true, 
      user: ldapUser.displayName,
      db_id: user.id,
      role: user.role_id === ROLES.ADMIN ? 'admin' : 'student',
      message: "Authentification réussie"
    });

  } catch (error: any) {
    console.error("Erreur Auth:", error);
    return NextResponse.json({ error: "Authentification échouée" }, { status: 401 });
  }
}