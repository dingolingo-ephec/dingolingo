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

  // ============================================
  // CRÉATION DES THÈMES
  // ============================================
  const themeLangues = await prisma.theme.create({
    data: { nom: 'Langues', description: 'Apprentissage des langues étrangères style Duolingo' }
  })

  const themeBusiness = await prisma.theme.create({
    data: { nom: 'Business', description: 'Communication professionnelle en langues étrangères' }
  })

  const themeTechnique = await prisma.theme.create({
    data: { nom: 'Technique', description: 'Vocabulaire technique et IT en langues étrangères' }
  })

  console.log('✓ 3 thèmes créés')

  // ============================================
  // CRÉATION DES FORMATEURS (Équipe 3TI)
  // ============================================
  const formateurs = await Promise.all([
    prisma.formateur.create({ data: { ad_guid: 'khasan.aktamirov', bio_courte: 'Khasan AKTAMIROV - Spécialiste Anglais Business' } }),
    prisma.formateur.create({ data: { ad_guid: 'rayane.benlhaj', bio_courte: 'Rayane BEN LHAJ - Expert Espagnol & Arabe' } }),
    prisma.formateur.create({ data: { ad_guid: 'xavier.devis', bio_courte: 'Xavier DEVIS - Formateur Allemand Technique' } }),
    prisma.formateur.create({ data: { ad_guid: 'mohamed.elmazani', bio_courte: 'Mohamed Mokhtar EL MAZANI - Spécialiste Arabe' } }),
    prisma.formateur.create({ data: { ad_guid: 'liam.gerard', bio_courte: 'Liam GÉRARD - Expert Néerlandais Business' } }),
    prisma.formateur.create({ data: { ad_guid: 'quentin.henrard', bio_courte: 'Quentin HENRARD - Formateur Italien' } }),
    prisma.formateur.create({ data: { ad_guid: 'nicolas.hoedenaeken', bio_courte: 'Nicolas HOEDENAEKEN - Lead Formateur Anglais' } }),
    prisma.formateur.create({ data: { ad_guid: 'corentin.mertens', bio_courte: 'Corentin MERTENS - Expert Portugais' } }),
    prisma.formateur.create({ data: { ad_guid: 'arno.starkel', bio_courte: 'Arno STÄRKEL - Spécialiste Allemand' } }),
    prisma.formateur.create({ data: { ad_guid: 'martin.stocq', bio_courte: 'Martin STOCQ - Formateur Japonais' } }),
    prisma.formateur.create({ data: { ad_guid: 'yann.vandermeulen', bio_courte: 'Yann VANDERMEULEN - Expert Chinois Mandarin' } }),
    prisma.formateur.create({ data: { ad_guid: 'clement.vier', bio_courte: 'Clément VIER - Spécialiste Russe' } }),
    prisma.formateur.create({ data: { ad_guid: 'julien.willems', bio_courte: 'Julien WILLEMS - Formateur Espagnol' } }),
    prisma.formateur.create({ data: { ad_guid: 'saad.zebiri', bio_courte: 'Saâd ZEBIRI - Expert Anglais Technique IT' } }),
  ])

  console.log(`✓ ${formateurs.length} formateurs créés`)

  // ============================================
  // FORMATIONS ANGLAIS
  // ============================================
  
  // Formation 1: Anglais Voyage (Nicolas)
  const anglaisVoyage = await prisma.formation.create({
    data: {
      titre: 'Anglais Voyage',
      description: 'Apprenez les bases de l\'anglais pour voyager sereinement',
      theme_id: themeLangues.id,
      formateur_id: formateurs[6].id // Nicolas
    }
  })

  const lessonAnglais1 = await prisma.lesson.create({
    data: { title: 'Les bases', order: 1, formation_id: anglaisVoyage.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonAnglais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Hello"', answer: 'Bonjour', options: ['Bonjour', 'Merci', 'Au revoir'] as Prisma.JsonArray },
      { lesson_id: lessonAnglais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Goodbye"', answer: 'Au revoir', options: ['Bonjour', 'Merci', 'Au revoir'] as Prisma.JsonArray },
      { lesson_id: lessonAnglais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Thank you"', answer: 'Merci', options: ['Bonjour', 'Merci', 'S\'il vous plaît'] as Prisma.JsonArray },
      { lesson_id: lessonAnglais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Please"', answer: 'S\'il vous plaît', options: ['Pardon', 'Merci', 'S\'il vous plaît'] as Prisma.JsonArray },
      { lesson_id: lessonAnglais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Yes"', answer: 'Oui', options: ['Non', 'Oui', 'Peut-être'] as Prisma.JsonArray }
    ]
  })

  const lessonAnglais2 = await prisma.lesson.create({
    data: { title: 'À l\'aéroport', order: 2, formation_id: anglaisVoyage.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonAnglais2.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Where is the gate?"', answer: 'Où est la porte ?', options: ['Où est la sortie ?', 'Où est la porte ?', 'Où sont les toilettes ?'] as Prisma.JsonArray },
      { lesson_id: lessonAnglais2.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Passport"', answer: 'Passeport', options: ['Billet', 'Passeport', 'Visa'] as Prisma.JsonArray },
      { lesson_id: lessonAnglais2.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Boarding pass"', answer: 'Carte d\'embarquement', options: ['Carte d\'embarquement', 'Carte de crédit', 'Carte d\'identité'] as Prisma.JsonArray },
      { lesson_id: lessonAnglais2.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Flight"', answer: 'Vol', options: ['Vol', 'Train', 'Bus'] as Prisma.JsonArray },
      { lesson_id: lessonAnglais2.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Luggage"', answer: 'Bagages', options: ['Bagages', 'Valise', 'Sac'] as Prisma.JsonArray }
    ]
  })

  // Formation 2: Anglais Business (Khasan)
  const anglaisBusiness = await prisma.formation.create({
    data: {
      titre: 'Anglais Business',
      description: 'Maîtrisez l\'anglais professionnel pour les réunions et négociations',
      theme_id: themeBusiness.id,
      formateur_id: formateurs[0].id // Khasan
    }
  })

  const lessonBusiness1 = await prisma.lesson.create({
    data: { title: 'Réunions professionnelles', order: 1, formation_id: anglaisBusiness.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonBusiness1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Meeting"', answer: 'Réunion', options: ['Réunion', 'Rendez-vous', 'Conférence'] as Prisma.JsonArray },
      { lesson_id: lessonBusiness1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Deadline"', answer: 'Date limite', options: ['Date limite', 'Début', 'Fin'] as Prisma.JsonArray },
      { lesson_id: lessonBusiness1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Budget"', answer: 'Budget', options: ['Budget', 'Coût', 'Prix'] as Prisma.JsonArray },
      { lesson_id: lessonBusiness1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Schedule"', answer: 'Planning', options: ['Planning', 'Agenda', 'Calendrier'] as Prisma.JsonArray },
      { lesson_id: lessonBusiness1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Stakeholder"', answer: 'Partie prenante', options: ['Client', 'Partie prenante', 'Employé'] as Prisma.JsonArray }
    ]
  })

  // Formation 3: Anglais IT (Saâd)
  const anglaisIT = await prisma.formation.create({
    data: {
      titre: 'Anglais Technique IT',
      description: 'Vocabulaire anglais spécialisé pour les professionnels de l\'IT',
      theme_id: themeTechnique.id,
      formateur_id: formateurs[13].id // Saâd
    }
  })

  const lessonIT1 = await prisma.lesson.create({
    data: { title: 'Vocabulaire développement', order: 1, formation_id: anglaisIT.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonIT1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Bug"', answer: 'Bogue / Erreur', options: ['Bogue / Erreur', 'Fonctionnalité', 'Mise à jour'] as Prisma.JsonArray },
      { lesson_id: lessonIT1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Deploy"', answer: 'Déployer', options: ['Déployer', 'Développer', 'Débugger'] as Prisma.JsonArray },
      { lesson_id: lessonIT1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Framework"', answer: 'Cadriciel', options: ['Cadriciel', 'Librairie', 'Module'] as Prisma.JsonArray },
      { lesson_id: lessonIT1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Repository"', answer: 'Dépôt', options: ['Dépôt', 'Serveur', 'Base de données'] as Prisma.JsonArray },
      { lesson_id: lessonIT1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Pull request"', answer: 'Demande de fusion', options: ['Demande de fusion', 'Demande d\'accès', 'Téléchargement'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS ESPAGNOL
  // ============================================
  
  const espagnolDebutant = await prisma.formation.create({
    data: {
      titre: 'Espagnol Débutant',
      description: 'Apprenez les bases de l\'espagnol',
      theme_id: themeLangues.id,
      formateur_id: formateurs[12].id // Julien
    }
  })

  const lessonEspagnol1 = await prisma.lesson.create({
    data: { title: 'Salutations', order: 1, formation_id: espagnolDebutant.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonEspagnol1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Buenos días"', answer: 'Bonjour (matin)', options: ['Bonjour (matin)', 'Bonsoir', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonEspagnol1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Gracias"', answer: 'Merci', options: ['Merci', 'S\'il vous plaît', 'De rien'] as Prisma.JsonArray },
      { lesson_id: lessonEspagnol1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "¿Cómo estás?"', answer: 'Comment vas-tu ?', options: ['Comment vas-tu ?', 'Comment t\'appelles-tu ?', 'D\'où viens-tu ?'] as Prisma.JsonArray },
      { lesson_id: lessonEspagnol1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Adiós"', answer: 'Au revoir', options: ['Au revoir', 'Bonjour', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonEspagnol1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Por favor"', answer: 'S\'il vous plaît', options: ['S\'il vous plaît', 'Merci', 'Excusez-moi'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS ALLEMAND
  // ============================================
  
  const allemandDebutant = await prisma.formation.create({
    data: {
      titre: 'Allemand Débutant',
      description: 'Découvrez les bases de la langue allemande',
      theme_id: themeLangues.id,
      formateur_id: formateurs[8].id // Arno
    }
  })

  const lessonAllemand1 = await prisma.lesson.create({
    data: { title: 'Premières phrases', order: 1, formation_id: allemandDebutant.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonAllemand1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Guten Tag"', answer: 'Bonjour', options: ['Bonjour', 'Bonsoir', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonAllemand1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Danke"', answer: 'Merci', options: ['Merci', 'S\'il vous plaît', 'Au revoir'] as Prisma.JsonArray },
      { lesson_id: lessonAllemand1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Bitte"', answer: 'S\'il vous plaît / De rien', options: ['S\'il vous plaît / De rien', 'Merci', 'Excusez-moi'] as Prisma.JsonArray },
      { lesson_id: lessonAllemand1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Auf Wiedersehen"', answer: 'Au revoir', options: ['Au revoir', 'Bonjour', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonAllemand1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Ja / Nein"', answer: 'Oui / Non', options: ['Oui / Non', 'Peut-être', 'Jamais'] as Prisma.JsonArray }
    ]
  })

  const allemandTechnique = await prisma.formation.create({
    data: {
      titre: 'Allemand Technique',
      description: 'Vocabulaire technique allemand pour l\'industrie',
      theme_id: themeTechnique.id,
      formateur_id: formateurs[2].id // Xavier
    }
  })

  const lessonAllemandTech1 = await prisma.lesson.create({
    data: { title: 'Vocabulaire industriel', order: 1, formation_id: allemandTechnique.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonAllemandTech1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Die Maschine"', answer: 'La machine', options: ['La machine', 'L\'outil', 'Le moteur'] as Prisma.JsonArray },
      { lesson_id: lessonAllemandTech1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Der Computer"', answer: 'L\'ordinateur', options: ['L\'ordinateur', 'Le clavier', 'L\'écran'] as Prisma.JsonArray },
      { lesson_id: lessonAllemandTech1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Die Qualität"', answer: 'La qualité', options: ['La qualité', 'La quantité', 'Le prix'] as Prisma.JsonArray },
      { lesson_id: lessonAllemandTech1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Das Projekt"', answer: 'Le projet', options: ['Le projet', 'Le problème', 'Le produit'] as Prisma.JsonArray },
      { lesson_id: lessonAllemandTech1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Die Entwicklung"', answer: 'Le développement', options: ['Le développement', 'La recherche', 'L\'analyse'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS NÉERLANDAIS
  // ============================================
  
  const neerlandaisBusiness = await prisma.formation.create({
    data: {
      titre: 'Néerlandais Business',
      description: 'Le néerlandais professionnel pour le marché belge et néerlandais',
      theme_id: themeBusiness.id,
      formateur_id: formateurs[4].id // Liam
    }
  })

  const lessonNL1 = await prisma.lesson.create({
    data: { title: 'Au bureau', order: 1, formation_id: neerlandaisBusiness.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonNL1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Goedemorgen"', answer: 'Bonjour (matin)', options: ['Bonjour (matin)', 'Bonsoir', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonNL1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Vergadering"', answer: 'Réunion', options: ['Réunion', 'Bureau', 'Entreprise'] as Prisma.JsonArray },
      { lesson_id: lessonNL1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Dank u wel"', answer: 'Merci beaucoup', options: ['Merci beaucoup', 'S\'il vous plaît', 'De rien'] as Prisma.JsonArray },
      { lesson_id: lessonNL1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Tot ziens"', answer: 'Au revoir', options: ['Au revoir', 'À bientôt', 'Bonjour'] as Prisma.JsonArray },
      { lesson_id: lessonNL1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Het kantoor"', answer: 'Le bureau', options: ['Le bureau', 'La maison', 'L\'usine'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS ITALIEN
  // ============================================
  
  const italienDebutant = await prisma.formation.create({
    data: {
      titre: 'Italien Débutant',
      description: 'Apprenez les bases de l\'italien',
      theme_id: themeLangues.id,
      formateur_id: formateurs[5].id // Quentin
    }
  })

  const lessonItalien1 = await prisma.lesson.create({
    data: { title: 'Salutations italiennes', order: 1, formation_id: italienDebutant.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonItalien1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Ciao"', answer: 'Salut', options: ['Salut', 'Au revoir', 'Merci'] as Prisma.JsonArray },
      { lesson_id: lessonItalien1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Buongiorno"', answer: 'Bonjour', options: ['Bonjour', 'Bonsoir', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonItalien1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Grazie"', answer: 'Merci', options: ['Merci', 'S\'il vous plaît', 'De rien'] as Prisma.JsonArray },
      { lesson_id: lessonItalien1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Arrivederci"', answer: 'Au revoir', options: ['Au revoir', 'Bonjour', 'Salut'] as Prisma.JsonArray },
      { lesson_id: lessonItalien1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Per favore"', answer: 'S\'il vous plaît', options: ['S\'il vous plaît', 'Merci', 'Excusez-moi'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS PORTUGAIS
  // ============================================
  
  const portugaisDebutant = await prisma.formation.create({
    data: {
      titre: 'Portugais Débutant',
      description: 'Découvrez le portugais brésilien et européen',
      theme_id: themeLangues.id,
      formateur_id: formateurs[7].id // Corentin
    }
  })

  const lessonPortugais1 = await prisma.lesson.create({
    data: { title: 'Premières phrases', order: 1, formation_id: portugaisDebutant.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonPortugais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Olá"', answer: 'Bonjour / Salut', options: ['Bonjour / Salut', 'Au revoir', 'Merci'] as Prisma.JsonArray },
      { lesson_id: lessonPortugais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Obrigado/a"', answer: 'Merci', options: ['Merci', 'S\'il vous plaît', 'De rien'] as Prisma.JsonArray },
      { lesson_id: lessonPortugais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Tchau"', answer: 'Salut / Au revoir', options: ['Salut / Au revoir', 'Bonjour', 'Bienvenue'] as Prisma.JsonArray },
      { lesson_id: lessonPortugais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Por favor"', answer: 'S\'il vous plaît', options: ['S\'il vous plaît', 'Merci', 'Pardon'] as Prisma.JsonArray },
      { lesson_id: lessonPortugais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Bom dia"', answer: 'Bonjour (matin)', options: ['Bonjour (matin)', 'Bonsoir', 'Bonne nuit'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS JAPONAIS
  // ============================================
  
  const japonaisDebutant = await prisma.formation.create({
    data: {
      titre: 'Japonais Débutant',
      description: 'Initiez-vous à la langue japonaise',
      theme_id: themeLangues.id,
      formateur_id: formateurs[9].id // Martin
    }
  })

  const lessonJaponais1 = await prisma.lesson.create({
    data: { title: 'Expressions de base', order: 1, formation_id: japonaisDebutant.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonJaponais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "こんにちは (Konnichiwa)"', answer: 'Bonjour', options: ['Bonjour', 'Au revoir', 'Merci'] as Prisma.JsonArray },
      { lesson_id: lessonJaponais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "ありがとう (Arigatou)"', answer: 'Merci', options: ['Merci', 'S\'il vous plaît', 'Pardon'] as Prisma.JsonArray },
      { lesson_id: lessonJaponais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "さようなら (Sayounara)"', answer: 'Au revoir', options: ['Au revoir', 'Bonjour', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonJaponais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "はい / いいえ (Hai / Iie)"', answer: 'Oui / Non', options: ['Oui / Non', 'Peut-être', 'Jamais'] as Prisma.JsonArray },
      { lesson_id: lessonJaponais1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "すみません (Sumimasen)"', answer: 'Excusez-moi', options: ['Excusez-moi', 'Merci', 'Au revoir'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS CHINOIS
  // ============================================
  
  const chinoisDebutant = await prisma.formation.create({
    data: {
      titre: 'Chinois Mandarin Débutant',
      description: 'Apprenez les bases du mandarin',
      theme_id: themeLangues.id,
      formateur_id: formateurs[10].id // Yann
    }
  })

  const lessonChinois1 = await prisma.lesson.create({
    data: { title: 'Expressions essentielles', order: 1, formation_id: chinoisDebutant.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonChinois1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "你好 (Nǐ hǎo)"', answer: 'Bonjour', options: ['Bonjour', 'Au revoir', 'Merci'] as Prisma.JsonArray },
      { lesson_id: lessonChinois1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "谢谢 (Xièxiè)"', answer: 'Merci', options: ['Merci', 'S\'il vous plaît', 'Pardon'] as Prisma.JsonArray },
      { lesson_id: lessonChinois1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "再见 (Zàijiàn)"', answer: 'Au revoir', options: ['Au revoir', 'Bonjour', 'Bienvenue'] as Prisma.JsonArray },
      { lesson_id: lessonChinois1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "是 / 不是 (Shì / Bù shì)"', answer: 'Oui / Non', options: ['Oui / Non', 'Peut-être', 'Bien sûr'] as Prisma.JsonArray },
      { lesson_id: lessonChinois1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "请 (Qǐng)"', answer: 'S\'il vous plaît', options: ['S\'il vous plaît', 'Merci', 'Pardon'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS ARABE
  // ============================================
  
  const arabeDebutant = await prisma.formation.create({
    data: {
      titre: 'Arabe Débutant',
      description: 'Initiez-vous à la langue arabe',
      theme_id: themeLangues.id,
      formateur_id: formateurs[3].id // Mohamed
    }
  })

  const lessonArabe1 = await prisma.lesson.create({
    data: { title: 'Salutations arabes', order: 1, formation_id: arabeDebutant.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonArabe1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "مرحبا (Marhaba)"', answer: 'Bonjour / Bienvenue', options: ['Bonjour / Bienvenue', 'Au revoir', 'Merci'] as Prisma.JsonArray },
      { lesson_id: lessonArabe1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "شكرا (Shukran)"', answer: 'Merci', options: ['Merci', 'S\'il vous plaît', 'Pardon'] as Prisma.JsonArray },
      { lesson_id: lessonArabe1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "مع السلامة (Ma\'a salama)"', answer: 'Au revoir', options: ['Au revoir', 'Bonjour', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonArabe1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "نعم / لا (Na\'am / La)"', answer: 'Oui / Non', options: ['Oui / Non', 'Peut-être', 'Jamais'] as Prisma.JsonArray },
      { lesson_id: lessonArabe1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "من فضلك (Min fadlik)"', answer: 'S\'il vous plaît', options: ['S\'il vous plaît', 'Merci', 'Excusez-moi'] as Prisma.JsonArray }
    ]
  })

  // ============================================
  // FORMATIONS RUSSE
  // ============================================
  
  const russeDebutant = await prisma.formation.create({
    data: {
      titre: 'Russe Débutant',
      description: 'Découvrez les bases de la langue russe',
      theme_id: themeLangues.id,
      formateur_id: formateurs[11].id // Clément
    }
  })

  const lessonRusse1 = await prisma.lesson.create({
    data: { title: 'Premières phrases russes', order: 1, formation_id: russeDebutant.id }
  })

  await prisma.exercise.createMany({
    data: [
      { lesson_id: lessonRusse1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Привет (Privet)"', answer: 'Salut', options: ['Salut', 'Au revoir', 'Merci'] as Prisma.JsonArray },
      { lesson_id: lessonRusse1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Спасибо (Spasibo)"', answer: 'Merci', options: ['Merci', 'S\'il vous plaît', 'De rien'] as Prisma.JsonArray },
      { lesson_id: lessonRusse1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "До свидания (Do svidaniya)"', answer: 'Au revoir', options: ['Au revoir', 'Bonjour', 'Bonne nuit'] as Prisma.JsonArray },
      { lesson_id: lessonRusse1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Да / Нет (Da / Nyet)"', answer: 'Oui / Non', options: ['Oui / Non', 'Peut-être', 'Jamais'] as Prisma.JsonArray },
      { lesson_id: lessonRusse1.id, type: 'MULTIPLE_CHOICE', question: 'Translate "Пожалуйста (Pozhaluysta)"', answer: 'S\'il vous plaît / De rien', options: ['S\'il vous plaît / De rien', 'Merci', 'Pardon'] as Prisma.JsonArray }
    ]
  })

  console.log('✓ 14 formations avec leçons et exercices créées')

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