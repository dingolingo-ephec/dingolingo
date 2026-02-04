import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import * as dotenv from 'dotenv'
import path from 'path'

// On charge manuellement le .env.local pour le script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Configuration de la connexion Postgres
const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Initialisation du client avec l'adapter (Obligatoire en Prisma 7)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('--- Début du Seed ---')

  // Nettoyage
  await prisma.exercise.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.formation.deleteMany()
  await prisma.theme.deleteMany()
  await prisma.formateur.deleteMany()

  // Création des données
  const theme = await prisma.theme.create({
    data: { nom: 'Langues', description: 'Apprentissage Duolingo-style' }
  })

  const formateur = await prisma.formateur.create({
    data: { ad_guid: 'admin-1', bio_courte: 'Nicolas H.' }
  })

  const formation = await prisma.formation.create({
    data: {
      titre: 'Anglais Voyage',
      theme_id: theme.id,
      formateur_id: formateur.id
    }
  })

  const lesson = await prisma.lesson.create({
    data: {
      title: 'Les bases',
      order: 1,
      formation_id: formation.id
    }
  })

  await prisma.exercise.create({
    data: {
      lesson_id: lesson.id,
      type: 'MULTIPLE_CHOICE',
      question: 'Translate "Hello"',
      answer: 'Bonjour',
      options: ['Bonjour', 'Merci', 'Au revoir'] as Prisma.JsonArray
    }
  })

  console.log('--- Seed terminé avec succès ! ---')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end() // Très important pour fermer la connexion proprement
  })