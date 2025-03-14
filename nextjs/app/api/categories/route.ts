import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"
    const parentOnly = searchParams.get("parentOnly") === "true"

    // Construire la requête avec les filtres
    const where: any = { visible: true }

    if (parentOnly) {
      where.parentId = null
    }

    if (featured) {
      where.featured = true
    }

    // Récupérer les catégories
    const categories = await prisma.category.findMany({
      where,
      include: {
        subcategories: {
          where: { visible: true },
        },
        parent: true,
      },
      orderBy: {
        order: "asc",
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation des données
    if (!data.name || !data.slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Créer la catégorie
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || "",
        order: data.order || 0,
        visible: data.visible !== undefined ? data.visible : true,
        featured: data.featured || false,
        parentId: data.parentId || null,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

