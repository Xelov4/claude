FROM node:18-alpine AS base

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de définition de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers de l'application
COPY . ./

# Générer le client Prisma
RUN npx prisma generate

# Builder l'application
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]