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

// PrismaClient is attached to the global scope in development to avoid
// exhausting the connection pool during development with fast refreshes
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

