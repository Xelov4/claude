import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Récupérer le tag
    const tag = await prisma.tag.findUnique({
      where: { slug },
    })

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    // Récupérer les outils avec ce tag
    const toolTags = await prisma.toolTag.findMany({
      where: {
        tag: {
          slug,
        },
      },
      include: {
        tool: {
          include: {
            category: true,
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
    })

    // Formater les outils pour la réponse
    const tools = toolTags.map((toolTag) => ({
      id: toolTag.tool.id,
      name: toolTag.tool.name,
      slug: toolTag.tool.slug,
      description: toolTag.tool.description,
      image: toolTag.tool.image,
      rating: toolTag.tool.rating,
      category: toolTag.tool.category.name,
      categorySlug: toolTag.tool.category.slug,
      tags: toolTag.tool.tags.map((t) => t.tag.name),
    }))

    // Construire la réponse
    const response = {
      ...tag,
      tools,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching tag:", error)
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const data = await request.json()

    // Vérifier si le tag existe
    const existingTag = await prisma.tag.findUnique({
      where: { slug },
    })

    if (!existingTag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    // Mettre à jour le tag
    const updatedTag = await prisma.tag.update({
      where: { slug },
      data: {
        name: data.name,
        featured: data.featured,
      },
    })

    return NextResponse.json(updatedTag)
  } catch (error) {
    console.error("Error updating tag:", error)
    return NextResponse.json({ error: "Failed to update tag" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Vérifier si le tag existe
    const existingTag = await prisma.tag.findUnique({
      where: { slug },
    })

    if (!existingTag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    // Supprimer le tag (les relations seront supprimées automatiquement grâce aux contraintes onDelete: Cascade)
    await prisma.tag.delete({
      where: { slug },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting tag:", error)
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 })
  }
}

