import { PrismaClient, PricingType } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  try {
    // Check if database already has data
    const categoriesCount = await prisma.category.count()
    if (categoriesCount > 0) {
      console.log("Database already seeded, skipping.")
      return
    }

    // Créer les catégories principales
    const videoCategory = await prisma.category.create({
      data: {
        name: "Vidéo",
        slug: "video",
        description: "Logiciels IA pour la création et l'édition vidéo",
        orderPosition: 1,
        isVisible: true,
        metaTitle: "Logiciels IA pour la Vidéo | Video-IA.net",
        metaDescription:
          "Découvrez les meilleurs logiciels d'intelligence artificielle pour la création et l'édition vidéo.",
      },
    })

    const audioCategory = await prisma.category.create({
      data: {
        name: "Audio",
        slug: "audio",
        description: "Logiciels IA pour le traitement et la génération audio",
        orderPosition: 2,
        isVisible: true,
        metaTitle: "Logiciels IA pour l'Audio | Video-IA.net",
        metaDescription:
          "Explorez les outils d'IA pour le traitement audio, la transcription et la génération de voix.",
      },
    })

    const imageCategory = await prisma.category.create({
      data: {
        name: "Image",
        slug: "image",
        description: "Logiciels IA pour la création et l'édition d'images",
        orderPosition: 3,
        isVisible: true,
        metaTitle: "Logiciels IA pour l'Image | Video-IA.net",
        metaDescription: "Trouvez les meilleurs outils d'IA pour la génération et l'édition d'images.",
      },
    })

    // Créer les sous-catégories
    const creationVideosCategory = await prisma.category.create({
      data: {
        name: "Création de Vidéos",
        slug: "creation-videos",
        description: "Générez des vidéos à partir de texte ou d'images",
        orderPosition: 1,
        isVisible: true,
        parentId: videoCategory.id,
        metaTitle: "Création de Vidéos avec l'IA | Video-IA.net",
        metaDescription: "Outils d'IA pour générer des vidéos à partir de texte, d'images ou de prompts.",
      },
    })

    const editionVideoCategory = await prisma.category.create({
      data: {
        name: "Édition Vidéo",
        slug: "edition-video",
        description: "Éditez vos vidéos avec l'aide de l'IA",
        orderPosition: 2,
        isVisible: true,
        parentId: videoCategory.id,
        metaTitle: "Édition Vidéo avec l'IA | Video-IA.net",
        metaDescription: "Logiciels d'IA pour simplifier et améliorer l'édition de vos vidéos.",
      },
    })

    const generationContenuCategory = await prisma.category.create({
      data: {
        name: "Génération de Contenu",
        slug: "generation-contenu",
        description: "Générez du contenu vidéo original avec l'IA",
        orderPosition: 3,
        isVisible: true,
        parentId: videoCategory.id,
        metaTitle: "Génération de Contenu Vidéo | Video-IA.net",
        metaDescription: "Outils d'IA pour créer du contenu vidéo original et engageant.",
      },
    })

    const analyseVideoCategory = await prisma.category.create({
      data: {
        name: "Analyse Vidéo",
        slug: "analyse-video",
        description: "Analysez vos vidéos pour des insights précieux",
        orderPosition: 4,
        isVisible: true,
        parentId: videoCategory.id,
        metaTitle: "Analyse Vidéo avec l'IA | Video-IA.net",
        metaDescription: "Outils d'IA pour analyser vos vidéos et obtenir des insights précieux.",
      },
    })

    // Créer les tags
    const tags = await Promise.all([
      prisma.tag.create({ data: { name: "IA Générative", slug: "ia-generative" } }),
      prisma.tag.create({ data: { name: "Montage", slug: "montage" } }),
      prisma.tag.create({ data: { name: "Gratuit", slug: "gratuit" } }),
      prisma.tag.create({ data: { name: "Premium", slug: "premium" } }),
      prisma.tag.create({ data: { name: "Animation", slug: "animation" } }),
      prisma.tag.create({ data: { name: "Voix Off", slug: "voix-off" } }),
      prisma.tag.create({ data: { name: "Sous-titres", slug: "sous-titres" } }),
      prisma.tag.create({ data: { name: "Effets Spéciaux", slug: "effets-speciaux" } }),
      prisma.tag.create({ data: { name: "Marketing", slug: "marketing" } }),
      prisma.tag.create({ data: { name: "Éducation", slug: "education" } }),
      prisma.tag.create({ data: { name: "Entreprise", slug: "entreprise" } }),
      prisma.tag.create({ data: { name: "Réseaux Sociaux", slug: "reseaux-sociaux" } }),
    ])

    // Créer les publics cibles
    const audiences = await Promise.all([
      prisma.targetAudience.create({ data: { name: "Créateurs de Contenu", slug: "createurs-de-contenu" } }),
      prisma.targetAudience.create({ data: { name: "Marketeurs", slug: "marketeurs" } }),
      prisma.targetAudience.create({ data: { name: "Entreprises", slug: "entreprises" } }),
      prisma.targetAudience.create({ data: { name: "Éducateurs", slug: "educateurs" } }),
      prisma.targetAudience.create({ data: { name: "Vidéastes", slug: "videastes" } }),
    ])

    // Créer un outil exemple
    const videoGeniusAI = await prisma.tool.create({
      data: {
        name: "VideoGenius AI",
        slug: "videogenius-ai",
        shortDescription: "Créez des vidéos professionnelles à partir de texte en quelques minutes",
        longDescription: `VideoGenius AI est un outil de création vidéo révolutionnaire alimenté par l'intelligence artificielle. Il permet aux utilisateurs de transformer facilement du texte en vidéos professionnelles de haute qualité en quelques minutes seulement.

Grâce à ses capacités avancées de traitement du langage naturel, VideoGenius AI peut comprendre vos instructions et générer des séquences vidéo pertinentes, des animations et des transitions fluides. Que vous soyez un créateur de contenu, un marketeur ou un entrepreneur, cet outil vous permet de produire rapidement des vidéos engageantes sans compétences techniques particulières.

L'interface intuitive de VideoGenius AI rend la création vidéo accessible à tous, tandis que son moteur d'IA puissant garantit des résultats de qualité professionnelle à chaque fois. Vous pouvez personnaliser le style, le ton et le format de vos vidéos pour répondre à vos besoins spécifiques.`,
        logoUrl: "/placeholder.svg?height=64&width=64",
        imageUrl: "/placeholder.svg?height=400&width=800",
        websiteUrl: "https://videogenius-ai.example.com",
        rating: 4.8,
        reviewCount: 124,
        categoryId: creationVideosCategory.id,
        pricingType: PricingType.Freemium,
        priceDetails: "Version gratuite disponible, forfait Pro à partir de 19€/mois",
        lastUpdated: new Date("2025-03-10"),
        isFeatured: true,
        twitterUrl: "https://twitter.com/videogeniusai",
        linkedinUrl: "https://linkedin.com/company/videogenius-ai",
        instagramUrl: "https://instagram.com/videogeniusai",
        isVisible: true,
        metaTitle: "VideoGenius AI - Création de Vidéos par IA | Video-IA.net",
        metaDescription:
          "Créez des vidéos professionnelles à partir de texte en quelques minutes avec VideoGenius AI, un outil d'IA puissant et intuitif.",
      },
    })

    // Ajouter des fonctionnalités
    await Promise.all([
      prisma.feature.create({
        data: {
          toolId: videoGeniusAI.id,
          title: "Génération de Vidéo à partir de Texte",
          description: "Transformez vos scripts et textes en vidéos professionnelles en quelques clics.",
          orderPosition: 1,
        },
      }),
      prisma.feature.create({
        data: {
          toolId: videoGeniusAI.id,
          title: "Bibliothèque de Médias Intégrée",
          description: "Accédez à des millions d'images, vidéos et sons libres de droits pour vos créations.",
          orderPosition: 2,
        },
      }),
      prisma.feature.create({
        data: {
          toolId: videoGeniusAI.id,
          title: "Voix Off IA",
          description: "Générez des narrations naturelles dans plus de 30 langues différentes.",
          orderPosition: 3,
        },
      }),
    ])

    // Ajouter des cas d'utilisation
    await Promise.all([
      prisma.useCase.create({
        data: {
          toolId: videoGeniusAI.id,
          title: "Marketing Digital",
          description: "Créez rapidement des publicités vidéo et du contenu promotionnel pour vos campagnes marketing.",
          imageUrl: "/placeholder.svg?height=200&width=400",
          orderPosition: 1,
        },
      }),
      prisma.useCase.create({
        data: {
          toolId: videoGeniusAI.id,
          title: "Réseaux Sociaux",
          description: "Générez du contenu vidéo engageant et optimisé pour différentes plateformes sociales.",
          imageUrl: "/placeholder.svg?height=200&width=400",
          orderPosition: 2,
        },
      }),
    ])

    // Associer les tags à l'outil
    await Promise.all([
      prisma.toolTag.create({ data: { toolId: videoGeniusAI.id, tagId: tags[0].id } }), // IA Générative
      prisma.toolTag.create({ data: { toolId: videoGeniusAI.id, tagId: tags[1].id } }), // Montage
      prisma.toolTag.create({ data: { toolId: videoGeniusAI.id, tagId: tags[2].id } }), // Gratuit
      prisma.toolTag.create({ data: { toolId: videoGeniusAI.id, tagId: tags[8].id } }), // Marketing
    ])

    // Associer les publics cibles à l'outil
    await Promise.all([
      prisma.toolAudience.create({
        data: {
          toolId: videoGeniusAI.id,
          audienceId: audiences[0].id, // Créateurs de Contenu
          description: "Youtubers et influenceurs cherchant à produire du contenu rapidement",
        },
      }),
      prisma.toolAudience.create({
        data: {
          toolId: videoGeniusAI.id,
          audienceId: audiences[1].id, // Marketeurs
          description: "Professionnels du marketing digital ayant besoin de vidéos promotionnelles",
        },
      }),
    ])

    // Ajouter des avis
    await Promise.all([
      prisma.review.create({
        data: {
          toolId: videoGeniusAI.id,
          userName: "Jean Dupont",
          rating: 5,
          comment: "Un logiciel incroyable qui m'a fait gagner énormément de temps. Je recommande vivement !",
          isVerified: true,
          isVisible: true,
          reviewDate: new Date("2025-02-15"),
        },
      }),
      prisma.review.create({
        data: {
          toolId: videoGeniusAI.id,
          userName: "Marie Martin",
          rating: 4,
          comment: "Très bon outil, facile à utiliser. Quelques fonctionnalités pourraient être améliorées.",
          isVerified: true,
          isVisible: true,
          reviewDate: new Date("2025-02-20"),
        },
      }),
    ])

    // Add site settings
    await Promise.all([
      prisma.siteSetting.create({
        data: {
          key: "site_name",
          value: "Video-IA.net",
        },
      }),
      prisma.siteSetting.create({
        data: {
          key: "site_description",
          value: "Votre ressource pour découvrir les meilleurs logiciels d'IA pour la vidéo",
        },
      }),
      prisma.siteSetting.create({
        data: {
          key: "contact_email",
          value: "contact@video-ia.net",
        },
      }),
    ])

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

