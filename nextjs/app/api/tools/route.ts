import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const featured = searchParams.get("featured") === "true"
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    if (limit > 100) {
      return NextResponse.json({ error: "Limit cannot exceed 100" }, { status: 400 })
    }

    // Construire la requête avec les filtres
    const where: any = { isVisible: true }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (tag) {
      where.toolTags = {
        some: {
          tag: {
            slug: tag,
          },
        },
      }
    }

    if (featured) {
      where.isFeatured = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { shortDescription: { contains: search } },
        { longDescription: { contains: search } },
      ]
    }

    // Récupérer les outils avec une seule requête
    const [tools, total] = await Promise.all([
      prisma.tool.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          toolTags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          rating: "desc",
        },
      }),
      prisma.tool.count({ where }),
    ])

    // Transformer les données pour le format de réponse (optimisé)
    const formattedTools = tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.shortDescription,
      image: tool.imageUrl,
      rating: tool.rating,
      category: tool.category.name,
      categorySlug: tool.category.slug,
      tags: tool.toolTags.map((t) => t.tag.name),
    }))

    return NextResponse.json(
      {
        tools: formattedTools,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      {
        headers: {
          // Cache for 5 minutes, revalidate if needed
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching tools:", error)
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation des données
    if (!data.name || !data.slug || !data.shortDescription || !data.categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Vérifier si un slug existant
    const existingTool = await prisma.tool.findUnique({
      where: { slug: data.slug },
    })

    if (existingTool) {
      return NextResponse.json({ error: "A tool with this slug already exists" }, { status: 409 })
    }

    // Créer l'outil
    const tool = await prisma.tool.create({
      data: {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription || "",
        logoUrl: data.logoUrl,
        imageUrl: data.imageUrl,
        websiteUrl: data.websiteUrl,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        categoryId: data.categoryId,
        pricingType: data.pricingType || "Gratuit",
        priceDetails: data.priceDetails,
        lastUpdated: data.lastUpdated || new Date(),
        isFeatured: data.isFeatured || false,
        twitterUrl: data.twitterUrl,
        linkedinUrl: data.linkedinUrl,
        instagramUrl: data.instagramUrl,
        isVisible: data.isVisible !== undefined ? data.isVisible : true,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      },
    })

    // Gérer les features si fournies
    if (data.features && Array.isArray(data.features)) {
      await Promise.all(
        data.features.map((feature: any, index: number) =>
          prisma.feature.create({
            data: {
              toolId: tool.id,
              title: feature.title,
              description: feature.description || "",
              orderPosition: feature.orderPosition || index,
            },
          }),
        ),
      )
    }

    // Gérer les use cases si fournis
    if (data.useCases && Array.isArray(data.useCases)) {
      await Promise.all(
        data.useCases.map((useCase: any, index: number) =>
          prisma.useCase.create({
            data: {
              toolId: tool.id,
              title: useCase.title,
              description: useCase.description || "",
              imageUrl: useCase.imageUrl,
              orderPosition: useCase.orderPosition || index,
            },
          }),
        ),
      )
    }

    // Gérer les tags de manière transactionnelle
    if (data.tags && Array.isArray(data.tags)) {
      await prisma.$transaction(
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
              toolId: tool.id,
              tagId: tag.id,
            },
          })
        }),
      )
    }

    // Gérer les publics cibles
    if (data.audiences && Array.isArray(data.audiences)) {
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
              toolId: tool.id,
              audienceId: targetAudience.id,
              description: audience.description || "",
            },
          })
        }),
      )
    }

    return NextResponse.json(tool, { status: 201 })
  } catch (error) {
    console.error("Error creating tool:", error)
    return NextResponse.json({ error: "Failed to create tool" }, { status: 500 })
  }
}

