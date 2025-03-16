import { PrismaClient } from '@prisma/client'

interface ConnectionConfig {
  min: number
  max: number
  timeout: number
}

class DatabaseConnectionManager {
  private static instance: DatabaseConnectionManager
  private prisma: PrismaClient
  private config: ConnectionConfig

  private constructor() {
    this.config = {
      min: Number(process.env.DATABASE_POOL_MIN) || 5,
      max: Number(process.env.DATABASE_POOL_MAX) || 10,
      timeout: 30000 // 30 secondes
    }

    this.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      },
      // Configuration du pool de connexions
      connection: {
        pool: {
          min: this.config.min,
          max: this.config.max,
          idleTimeoutMillis: this.config.timeout
        }
      }
    })
  }

  public static getInstance(): DatabaseConnectionManager {
    if (!DatabaseConnectionManager.instance) {
      DatabaseConnectionManager.instance = new DatabaseConnectionManager()
    }
    return DatabaseConnectionManager.instance
  }

  public getClient(): PrismaClient {
    return this.prisma
  }

  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect()
  }

  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect()
      console.log('Connexion à la base de données établie avec succès')
    } catch (error) {
      console.error('Erreur de connexion à la base de données:', error)
      throw error
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      console.error('Erreur lors du contrôle de santé de la base de données:', error)
      return false
    }
  }
}

export const dbManager = DatabaseConnectionManager.getInstance()
export const prisma = dbManager.getClient()

