import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Récupérer l'outil avec toutes ses relations
    const tool = await prisma.tool.findUnique({
      where: { slug },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        features: {
          orderBy: {
            orderPosition: "asc",
          },
        },
        useCases: {
          orderBy: {
            orderPosition: "asc",
          },
        },
        reviews: {
          where: { isVisible: true },
          orderBy: { reviewDate: "desc" },
        },
        toolTags: {
          include: {
            tag: true,
          },
        },
        toolAudiences: {
          include: {
            audience: true,
          },
        },
      },
    })

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    // Formater les données pour la réponse
    const formattedTool = {
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.shortDescription,
      longDescription: tool.longDescription,
      logo: tool.logoUrl,
      image: tool.imageUrl,
      rating: tool.rating,
      reviewCount: tool.reviewCount,
      pricing: tool.pricingType,
      priceDetails: tool.priceDetails,
      website: tool.websiteUrl,
      socialMedia: {
        twitter: tool.twitterUrl,
        linkedin: tool.linkedinUrl,
        instagram: tool.instagramUrl,
      },
      lastUpdated: tool.lastUpdated,
      category: {
        id: tool.category.id,
        name: tool.category.name,
        slug: tool.category.slug,
        parentCategory: tool.category.parent
          ? {
              id: tool.category.parent.id,
              name: tool.category.parent.name,
              slug: tool.category.parent.slug,
            }
          : null,
      },
      features: tool.features.map((feature) => ({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        orderPosition: feature.orderPosition,
      })),
      useCases: tool.useCases.map((useCase) => ({
        id: useCase.id,
        title: useCase.title,
        description: useCase.description,
        image: useCase.imageUrl,
        orderPosition: useCase.orderPosition,
      })),
      reviews: tool.reviews.map((review) => ({
        id: review.id,
        name: review.userName,
        rating: review.rating,
        comment: review.comment,
        date: review.reviewDate,
        isVerified: review.isVerified,
      })),
      targetAudiences: tool.toolAudiences.map((ta) => ({
        id: ta.audience.id,
        name: ta.audience.name,
        description: ta.description,
      })),
      tags: tool.toolTags.map((t) => t.tag.name),
    }

    return NextResponse.json(formattedTool)
  } catch (error) {
    console.error("Error fetching tool:", error)
    return NextResponse.json({ error: "Failed to fetch tool" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const data = await request.json()

    // Vérifier si l'outil existe
    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    })

    if (!existingTool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    // Mettre à jour l'outil
    const updatedTool = await prisma.tool.update({
      where: { slug },
      data: {
        name: data.name,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        logoUrl: data.logoUrl,
        imageUrl: data.imageUrl,
        websiteUrl: data.websiteUrl,
        rating: data.rating,
        reviewCount: data.reviewCount,
        pricingType: data.pricingType,
        priceDetails: data.priceDetails,
        lastUpdated: new Date(),
        isFeatured: data.isFeatured,
        twitterUrl: data.twitterUrl,
        linkedinUrl: data.linkedinUrl,
        instagramUrl: data.instagramUrl,
        isVisible: data.isVisible,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        categoryId: data.categoryId,
      },
    })

    // Mettre à jour les fonctionnalités
    if (data.features) {
      // Supprimer les anciennes fonctionnalités
      await prisma.feature.deleteMany({
        where: { toolId: existingTool.id },
      })

      // Créer les nouvelles fonctionnalités
      await Promise.all(
        data.features.map((feature: any, index: number) =>
          prisma.feature.create({
            data: {
              toolId: existingTool.id,
              title: feature.title,
              description: feature.description || "",
              orderPosition: feature.orderPosition || index,
            },
          }),
        ),
      )
    }

    // Mettre à jour les cas d'utilisation
    if (data.useCases) {
      // Supprimer les anciens cas d'utilisation
      await prisma.useCase.deleteMany({
        where: { toolId: existingTool.id },
      })

      // Créer les nouveaux cas d'utilisation
      await Promise.all(
        data.useCases.map((useCase: any, index: number) =>
          prisma.useCase.create({
            data: {
              toolId: existingTool.id,
              title: useCase.title,
              description: useCase.description || "",
              imageUrl: useCase.imageUrl,
              orderPosition: useCase.orderPosition || index,
            },
          }),
        ),
      )
    }

    // Mettre à jour les publics cibles
    if (data.audiences) {
      // Supprimer les anciennes associations
      await prisma.toolAudience.deleteMany({
        where: { toolId: existingTool.id },
      })

      // Créer les nouvelles associations
      await Promise.all(
        data.audiences.map(async (audience: any) => {
          // Trouver ou créer le public cible
          const targetAudience = await prisma.targetAudience.upsert({
            where: { name: audience.name },
            update: {},
            create: {
              name: audience.name,
              slug: audience.name.toLowerCase().replace(/\s+/g, "-"),
            },
          })

          // Associer le public cible à l'outil
          return prisma.toolAudience.create({
            data: {
              toolId: existingTool.id,
              audienceId: targetAudience.id,
              description: audience.description || "",
            },
          })
        }),
      )
    }

    // Mettre à jour les tags
    if (data.tags) {
      // Supprimer les anciennes associations de tags
      await prisma.toolTag.deleteMany({
        where: { toolId: existingTool.id },
      })

      // Créer les nouvelles associations de tags
      await Promise.all(
        data.tags.map(async (tagName: string) => {
          // Trouver ou créer le tag
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: {
              name: tagName,
              slug: tagName.toLowerCase().replace(/\s+/g, "-"),
            },
          })

          // Associer le tag à l'outil
          return prisma.toolTag.create({
            data: {
              toolId: existingTool.id,
              tagId: tag.id,
            },
          })
        }),
      )
    }

    return NextResponse.json(updatedTool)
  } catch (error) {
    console.error("Error updating tool:", error)
    return NextResponse.json({ error: "Failed to update tool" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Vérifier si l'outil existe
    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    })

    if (!existingTool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    // Supprimer l'outil (les relations seront supprimées automatiquement grâce aux contraintes onDelete: Cascade)
    await prisma.tool.delete({
      where: { slug },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting tool:", error)
    return NextResponse.json({ error: "Failed to delete tool" }, { status: 500 })
  }
}

