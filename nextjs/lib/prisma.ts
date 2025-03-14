import { PrismaClient } from "@prisma/client"

// Environment variables with defaults for development
const databaseUrl = process.env.DATABASE_URL || "mysql://user:password@localhost:3306/videoianet"

// Configuration options for Prisma Client
const prismaClientOptions = {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  // Log queries only in development
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
}

// PrismaClient est attaché au scope global en développement pour éviter
// d'épuiser la limite de connexions à la base de données
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

