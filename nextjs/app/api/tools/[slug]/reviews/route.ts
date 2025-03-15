import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    // Récupérer l'outil
    const tool = await prisma.tool.findUnique({
      where: { slug },
    })

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    // Récupérer les avis visibles
    const reviews = await prisma.review.findMany({
      where: {
        toolId: tool.id,
        isVisible: true,
      },
      orderBy: {
        reviewDate: "desc",
      },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const data = await request.json()

    // Validation des données
    if (!data.userName || !data.rating || !data.comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Vérifier les caractères spéciaux et liens dans le commentaire
    const regex = /[<>{}[\]\\/^~`|]/g
    const hasSpecialChars = regex.test(data.comment)
    const hasLinks = /(http|https|www\.)/i.test(data.comment)

    if (hasSpecialChars || hasLinks) {
      return NextResponse.json({ error: "Special characters and links are not allowed in comments" }, { status: 400 })
    }

    // Récupérer l'outil
    const tool = await prisma.tool.findUnique({
      where: { slug },
    })

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    // Créer l'avis
    const review = await prisma.review.create({
      data: {
        userName: data.userName,
        rating: data.rating,
        comment: data.comment,
        toolId: tool.id,
        // Par défaut, les avis ne sont pas vérifiés et sont en attente de modération
        isVerified: false,
        isVisible: false,
        reviewDate: new Date(),
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}

