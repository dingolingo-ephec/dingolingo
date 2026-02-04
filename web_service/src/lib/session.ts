import { cookies } from 'next/headers';

export interface UserSession {
  id: number;
  name: string;
  role_id: number;
}

/**
 * Récupère la session utilisateur depuis le cookie (côté serveur)
 */
export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');
    
    if (!sessionCookie?.value) {
      return null;
    }

    return JSON.parse(sessionCookie.value) as UserSession;
  } catch {
    return null;
  }
}

/**
 * Vérifie si l'utilisateur est connecté
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Vérifie si l'utilisateur est admin (role_id = 2)
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session?.role_id === 2;
}
