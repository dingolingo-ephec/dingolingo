# Utilisation d'une image légère de Node.js
FROM node:20-alpine

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du reste des fichiers
COPY . .
# ... après le COPY . .
RUN npx prisma generate
RUN npm run build
# ...

# Build de l'application Next.js
RUN npm run build

# Exposition du port 3000
EXPOSE 3000

# Lancement de l'application
CMD ["npm", "start"]