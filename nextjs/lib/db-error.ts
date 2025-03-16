import { 
  Prisma,
  PrismaClient
} from '@prisma/client'

export class DatabaseError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export function handleDatabaseError(error: unknown): never {
  // Vérification du type PrismaClientKnownRequestError
  if (
    error instanceof Error &&
    error.constructor.name === 'PrismaClientKnownRequestError' &&
    'code' in error &&
    'meta' in error &&
    typeof error.code === 'string'
  ) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError

    // Erreurs de contraintes uniques
    if (prismaError.code === 'P2002') {
      throw new DatabaseError(
        'UNIQUE_CONSTRAINT',
        'Une entrée avec ces données existe déjà.',
        prismaError.meta
      )
    }

    // Erreurs de clés étrangères
    if (prismaError.code === 'P2003') {
      throw new DatabaseError(
        'FOREIGN_KEY_CONSTRAINT',
        'La référence spécifiée n\'existe pas.',
        prismaError.meta
      )
    }

    // Erreurs d'enregistrement non trouvé
    if (prismaError.code === 'P2025') {
      throw new DatabaseError(
        'NOT_FOUND',
        'L\'enregistrement demandé n\'existe pas.',
        prismaError.meta
      )
    }
  }

  // Vérification du type PrismaClientValidationError
  if (
    error instanceof Error &&
    error.constructor.name === 'PrismaClientValidationError'
  ) {
    throw new DatabaseError(
      'VALIDATION_ERROR',
      'Les données fournies ne sont pas valides.',
      error.message
    )
  }

  if (error instanceof Error) {
    throw new DatabaseError(
      'UNKNOWN_ERROR',
      'Une erreur inattendue s\'est produite.',
      error.message
    )
  }

  throw new DatabaseError(
    'UNKNOWN_ERROR',
    'Une erreur inattendue s\'est produite.',
    error
  )
} 