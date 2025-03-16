import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"

    // Construire la requête avec les filtres
    const where: any = {}

    if (featured) {
      where.featured = true
    }

    // Récupérer les tags
    const tags = await prisma.tag.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(tags)
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation des données
    if (!data.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Générer le slug s'il n'est pas fourni
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, "-")

    // Créer le tag
    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        slug,
      },
    })

    return NextResponse.json(tag)
  } catch (error) {
    console.error("Error creating tag:", error)
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 })
  }
}

