import { defineConfig } from '@prisma/config';

// En développement local, charger .env.local si le fichier existe
// En production Docker, les variables sont déjà dans process.env via env_file
if (process.env.NODE_ENV !== 'production') {
  try {
    const dotenv = await import('dotenv');
    const path = await import('path');
    dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
  } catch {
    // dotenv non disponible ou fichier absent, on continue avec process.env
  }
}

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: 'npx ts-node ./prisma/seed.ts',
  },
});