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

  // Nettoyage (ordre important pour les FK)
  await prisma.lessonProgress.deleteMany()
  await prisma.suiviPeda.deleteMany()
  await prisma.exercise.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.formation.deleteMany()
  await prisma.theme.deleteMany()
  await prisma.formateur.deleteMany()
  await prisma.user.deleteMany()
  await prisma.role.deleteMany()

  console.log('✓ Tables nettoyées')

  // Création des rôles
  const roles = await Promise.all([
    prisma.role.create({ data: { id: 1, name: 'student', description: 'Élève / Apprenant' } }),
    prisma.role.create({ data: { id: 2, name: 'admin', description: 'Administrateur IT' } }),
    prisma.role.create({ data: { id: 3, name: 'formateur', description: 'Formateur' } }),
    prisma.role.create({ data: { id: 4, name: 'direction', description: 'Direction' } }),
    prisma.role.create({ data: { id: 5, name: 'secretariat', description: 'Secrétariat' } }),
  ])

  console.log(`✓ ${roles.length} rôles créés`)

  // Création des données
  const theme = await prisma.theme.create({
    data: { nom: 'Langues', description: 'Apprentissage Duolingo-style' }
  })

  const formateur = await prisma.formateur.create({
    data: { ad_guid: 'formateur-1', bio_courte: 'Nicolas H.' }
  })

  const formation = await prisma.formation.create({
    data: {
      titre: 'Anglais Voyage',
      description: 'Apprenez les bases de l\'anglais pour voyager',
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

  // Créer plusieurs exercices pour la leçon
  await prisma.exercise.createMany({
    data: [
      {
        lesson_id: lesson.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Translate "Hello"',
        answer: 'Bonjour',
        options: ['Bonjour', 'Merci', 'Au revoir'] as Prisma.JsonArray
      },
      {
        lesson_id: lesson.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Translate "Goodbye"',
        answer: 'Au revoir',
        options: ['Bonjour', 'Merci', 'Au revoir'] as Prisma.JsonArray
      },
      {
        lesson_id: lesson.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Translate "Thank you"',
        answer: 'Merci',
        options: ['Bonjour', 'Merci', 'S\'il vous plaît'] as Prisma.JsonArray
      },
      {
        lesson_id: lesson.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Translate "Please"',
        answer: 'S\'il vous plaît',
        options: ['Pardon', 'Merci', 'S\'il vous plaît'] as Prisma.JsonArray
      },
      {
        lesson_id: lesson.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Translate "Yes"',
        answer: 'Oui',
        options: ['Non', 'Oui', 'Peut-être'] as Prisma.JsonArray
      }
    ]
  })

  console.log('✓ Thème, formation et 5 exercices créés')

  // Créer une 2ème leçon
  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'À l\'aéroport',
      order: 2,
      formation_id: formation.id
    }
  })

  await prisma.exercise.createMany({
    data: [
      {
        lesson_id: lesson2.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Translate "Where is the gate?"',
        answer: 'Où est la porte d\'embarquement ?',
        options: ['Où est la sortie ?', 'Où est la porte d\'embarquement ?', 'Où sont les toilettes ?'] as Prisma.JsonArray
      },
      {
        lesson_id: lesson2.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Translate "Passport"',
        answer: 'Passeport',
        options: ['Billet', 'Passeport', 'Visa'] as Prisma.JsonArray
      },
      {
        lesson_id: lesson2.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Translate "Boarding pass"',
        answer: 'Carte d\'embarquement',
        options: ['Carte d\'embarquement', 'Carte de crédit', 'Carte d\'identité'] as Prisma.JsonArray
      }
    ]
  })

  console.log('✓ 2ème leçon avec 3 exercices créée')

  console.log('--- Seed terminé avec succès ! ---')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })