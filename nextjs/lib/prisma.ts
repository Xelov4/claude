import { PrismaClient } from '@prisma/client'

// Déclaration pour éviter les multiples instances en développement
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Création d'une instance PrismaClient avec gestion du cache en développement
const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Assignation à l'objet global en développement pour éviter les instances multiples
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Exporter à la fois par défaut et comme export nommé
export { prisma }
export default prisma

