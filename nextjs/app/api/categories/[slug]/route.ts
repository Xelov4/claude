import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

interface FormattedTool {
  id: number
  name: string
  slug: string
  description: string
  image: string | null
  rating: number
  tags: string[]
}

interface CategoryWithTools {
  id: number
  name: string
  slug: string
  description: string | null
  parentId: number | null
  orderPosition: number
  isVisible: boolean
  metaTitle: string | null
  metaDescription: string | null
  createdAt: Date
  updatedAt: Date
  parent: {
    id: number
    name: string
    slug: string
  } | null
  subcategories: {
    id: number
    name: string
    slug: string
    description: string | null
    orderPosition: number
  }[]
  tools: FormattedTool[]
}

interface ToolWithTags {
  id: number
  name: string
  slug: string
  shortDescription: string
  imageUrl: string | null
  rating: any // Prisma Decimal type
  toolTags: {
    tag: {
      name: string
    }
  }[]
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<CategoryWithTools | { error: string }>> {
  try {
    const slug = params.slug

    // Récupérer la catégorie avec ses sous-catégories
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        subcategories: {
          where: { isVisible: true },
          orderBy: { orderPosition: "asc" },
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
        isVisible: true,
      },
      include: {
        toolTags: {
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
    const formattedTools: FormattedTool[] = tools.map((tool: ToolWithTags) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.shortDescription,
      image: tool.imageUrl,
      rating: Number(tool.rating),
      tags: tool.toolTags.map((t: { tag: { name: string } }) => t.tag.name),
    }))

    // Construire la réponse
    const response: CategoryWithTools = {
      ...category,
      tools: formattedTools,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

interface CategoryUpdateData {
  name: string
  description?: string | null
  order?: number
  visible?: boolean
  parentId?: number | null
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    const slug = params.slug
    const data: CategoryUpdateData = await request.json()

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
        orderPosition: data.order,
        isVisible: data.visible,
        parentId: data.parentId,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
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

