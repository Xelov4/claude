import { PrismaClient } from '@prisma/client'
import prisma from './prisma'

export async function migrate() {
  try {
    // Vérifier la connexion à la base de données
    const isHealthy = await healthCheck()
    if (!isHealthy) {
      throw new Error('La base de données n\'est pas accessible')
    }

    // Exécuter les migrations
    console.log('Début des migrations...')
    
    // Ici, vous pouvez ajouter des migrations spécifiques si nécessaire
    // Par exemple, mettre à jour des champs, ajouter des index, etc.
    
    // Exemple de migration : Ajout d'un index sur le champ slug des outils
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
    `

    // Exemple de migration : Ajout d'un index sur le champ category_id des outils
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);
    `

    // Exemple de migration : Ajout d'un index sur les dates de création
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_tools_created ON tools(created_at);
    `

    console.log('Migrations terminées avec succès')
  } catch (error) {
    console.error('Erreur lors des migrations:', error)
    throw error
  }
}

export async function rollback() {
  try {
    // Vérifier la connexion à la base de données
    const isHealthy = await healthCheck()
    if (!isHealthy) {
      throw new Error('La base de données n\'est pas accessible')
    }

    // Exécuter les rollbacks
    console.log('Début du rollback...')
    
    // Ici, vous pouvez ajouter des rollbacks spécifiques si nécessaire
    // Par exemple, supprimer des index, revenir à un état précédent, etc.
    
    // Exemple de rollback : Suppression des index
    await prisma.$executeRaw`
      DROP INDEX IF EXISTS idx_tools_slug ON tools;
    `

    await prisma.$executeRaw`
      DROP INDEX IF EXISTS idx_tools_category ON tools;
    `

    await prisma.$executeRaw`
      DROP INDEX IF EXISTS idx_tools_created ON tools;
    `

    console.log('Rollback terminé avec succès')
  } catch (error) {
    console.error('Erreur lors du rollback:', error)
    throw error
  }
}

export async function seed() {
  try {
    // Vérifier la connexion à la base de données
    const isHealthy = await healthCheck()
    if (!isHealthy) {
      throw new Error('La base de données n\'est pas accessible')
    }

    console.log('Début du seeding...')

    // Exemple de seeding : Ajout de catégories par défaut
    await prisma.category.createMany({
      skipDuplicates: true,
      data: [
        {
          name: 'Vidéo IA',
          slug: 'video-ia',
          description: 'Outils d\'IA pour la vidéo',
        },
        {
          name: 'Génération vidéo',
          slug: 'generation-video',
          description: 'Outils de génération de vidéos par IA',
        },
        {
          name: 'Édition vidéo',
          slug: 'edition-video',
          description: 'Outils d\'édition vidéo assistée par IA',
        },
      ],
    })

    console.log('Seeding terminé avec succès')
  } catch (error) {
    console.error('Erreur lors du seeding:', error)
    throw error
  }
}

// Fonction utilitaire pour vérifier la santé de la base de données
async function healthCheck(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Erreur lors du contrôle de santé de la base de données:', error)
    return false
  }
} 