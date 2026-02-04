# 🦤 DingoLingo - Plateforme d'apprentissage de langues

## 📋 Description

DingoLingo est une plateforme d'apprentissage de langues style Duolingo, développée dans le cadre du projet Réseau d'Entreprise 3TI à l'EPHEC.

## 🛠️ Stack Technique

| Technologie | Version | Description |
|-------------|---------|-------------|
| **Next.js** | 16.1.6 | Framework React avec SSR |
| **React** | 19.2.3 | Bibliothèque UI |
| **Prisma** | 7.3.0 | ORM pour PostgreSQL |
| **PostgreSQL** | 15 | Base de données |
| **Tailwind CSS** | 4.x | Framework CSS |
| **Docker** | - | Conteneurisation |
| **LDAP/AD** | - | Authentification |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    REVERSE PROXY (Nginx)                     │
│                    + Certificats SSL                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DOCKER COMPOSE                            │
│  ┌─────────────────────┐    ┌─────────────────────┐         │
│  │   nextjs_app:3000   │◄──►│  postgres_db:5432   │         │
│  │   (Application)     │    │   (Base de données) │         │
│  └─────────────────────┘    └─────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ACTIVE DIRECTORY / LDAP                   │
│                    (Authentification)                        │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Structure du projet

```
web_service/
├── prisma/
│   ├── schema.prisma      # Schéma de la base de données
│   └── seed.ts            # Données de test
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/     # POST /api/auth/login
│   │   │   │   └── logout/    # POST /api/auth/logout
│   │   │   ├── progress/      # POST/GET /api/progress
│   │   │   └── admin/
│   │   │       └── stats/     # GET /api/admin/stats
│   │   ├── admin/             # Panel admin (protégé)
│   │   ├── formateurs/        # Liste des formateurs
│   │   ├── lessons/           # Formations et quiz
│   │   ├── login/             # Page de connexion
│   │   ├── mentions-legales/  # RGPD et mentions légales
│   │   └── page.tsx           # Page d'accueil
│   ├── components/
│   │   ├── Navbar.tsx         # Barre de navigation
│   │   ├── NavbarWrapper.tsx  # Wrapper SSR pour Navbar
│   │   ├── Footer.tsx         # Pied de page
│   │   └── QuizEngine.tsx     # Moteur de quiz
│   └── lib/
│       ├── ldap.ts            # Authentification LDAP
│       ├── prisma.ts          # Client Prisma
│       └── session.ts         # Gestion des sessions
├── docker-compose.yml         # Orchestration Docker
├── Dockerfile                 # Build de l'application
└── .env.local                 # Variables d'environnement
```

## 🚀 Installation & Déploiement

### Prérequis

- Docker & Docker Compose
- Node.js 20+ (pour le développement local)

### Variables d'environnement (.env.local)

```env
# Base de données
DATABASE_URL=postgresql://admin:mysecretpassword@db:5432/formation_db

# LDAP/AD
LDAP_URL=ldap://votre-serveur-ad:389
LDAP_BASE_DN=dc=entreprise,dc=local

# Mode Mock (pour les tests sans AD)
NEXT_PUBLIC_MOCK_AUTH=true
```

### Démarrage avec Docker

```bash
# Build et démarrage
docker compose up --build -d

# Voir les logs
docker compose logs -f app

# Appliquer les migrations Prisma
docker compose exec app npx prisma db push

# Peupler la base de données
docker compose exec app npx ts-node prisma/seed.ts
```

### Accès

- **Application** : http://localhost:3000
- **Base de données** : localhost:5432

## 👥 Système de rôles

| ID | Rôle | Description | Accès |
|----|------|-------------|-------|
| 1 | `student` | Élève / Apprenant | Formations, Quiz |
| 2 | `admin` | Administrateur IT | Tout + Panel Admin |
| 3 | `formateur` | Formateur | Formations (lecture) |
| 4 | `direction` | Direction | Tout (lecture) |
| 5 | `secretariat` | Secrétariat | Formations (lecture) |

## 🔐 Sécurité

### Headers HTTP

Le middleware Next.js ajoute automatiquement les headers suivants :

- `X-Frame-Options: DENY` - Protection contre le clickjacking
- `X-Content-Type-Options: nosniff` - Protection contre le MIME sniffing
- `X-XSS-Protection: 1; mode=block` - Protection XSS
- `Content-Security-Policy` - Politique de sécurité du contenu
- `Strict-Transport-Security` - HSTS (en production)

### Authentification

- Cookie `user_session` : httpOnly, secure, sameSite=lax
- Expiration : 7 jours
- Synchronisation avec Active Directory

### Protection des routes

- `/admin` : Accessible uniquement si `role_id = 2`
- `/api/admin/*` : Vérifie le rôle dans le cookie

## 📊 Base de données

### Modèle de données

```
Role 1──n User 1──n LessonProgress
                 1──n SuiviPeda

Theme 1──n Formation 1──n Lesson 1──n Exercise
                      n──1 Formateur
```

### Tables principales

- **Role** : Définition des rôles utilisateurs
- **User** : Utilisateurs synchronisés depuis l'AD
- **Theme** : Catégories de formations (Langues, etc.)
- **Formation** : Cours disponibles
- **Lesson** : Leçons d'une formation
- **Exercise** : Questions à choix multiples
- **LessonProgress** : Suivi de progression par utilisateur

## 🧪 Tests

### Comptes de test (Mode Mock)

| Username | Password | Rôle |
|----------|----------|------|
| admin | admin | Administrateur |
| *n'importe quoi* | test | Élève |

### Tester les API

```powershell
# Login
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"username":"admin","password":"admin"}'

# Progression
Invoke-RestMethod -Uri "http://localhost:3000/api/progress" -Method GET
```

## 📝 RGPD

La page `/mentions-legales` contient :
- Informations sur l'éditeur
- Politique de confidentialité
- Données collectées et leur finalité
- Droits des utilisateurs
- Politique des cookies

## 🔄 Scaling

Pour augmenter la capacité, modifier `docker-compose.yml` :

```yaml
services:
  app:
    deploy:
      replicas: 3
```

Et ajouter un load balancer (Nginx, Traefik) devant les replicas.

## 📚 Documentation supplémentaire

- [Prisma](https://www.prisma.io/docs)
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Projet EPHEC 3TI - Réseau d'Entreprise 2025-2026**
