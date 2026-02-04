FROM node:20-alpine

# Outils système nécessaires
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

COPY package*.json ./

# On repasse sur install pour régénérer le lockfile proprement
RUN npm install

# FORÇAGE DES BINAIRES NATIFS POUR ALPINE (MUSL)
RUN npm install lightningcss-linux-x64-musl @tailwindcss/oxide-linux-x64-musl

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]