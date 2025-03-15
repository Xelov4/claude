import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Récupérer la catégorie avec ses sous-catégories
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        subcategories: {
          where: { visible: true },
          orderBy: { order: "asc" },
        },
        parent: true,
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Récupérer les outils de cette catégorie
    const tools = await prisma.tool.findMany({
      where: {
        categoryId: category.id,
        approved: true,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        rating: "desc",
      },
    })

    // Formater les outils pour la réponse
    const formattedTools = tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      image: tool.image,
      rating: tool.rating,
      tags: tool.tags.map((t) => t.tag.name),
    }))

    // Construire la réponse
    const response = {
      ...category,
      tools: formattedTools,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const data = await request.json()

    // Vérifier si la catégorie existe
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Mettre à jour la catégorie
    const updatedCategory = await prisma.category.update({
      where: { slug },
      data: {
        name: data.name,
        description: data.description,
        order: data.order,
        visible: data.visible,
        featured: data.featured,
        parentId: data.parentId,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Vérifier si la catégorie existe
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Vérifier si la catégorie a des outils
    const toolsCount = await prisma.tool.count({
      where: { categoryId: existingCategory.id },
    })

    if (toolsCount > 0) {
      return NextResponse.json({ error: "Cannot delete category with tools" }, { status: 400 })
    }

    // Supprimer la catégorie
    await prisma.category.delete({
      where: { slug },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

