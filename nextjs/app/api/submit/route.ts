import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation des données
    if (
      !data.name ||
      !data.website ||
      !data.description ||
      !data.categoryId ||
      !data.submitterName ||
      !data.submitterEmail
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Générer le slug s'il n'est pas fourni
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, "-")

    // Vérifier si un outil avec ce slug existe déjà
    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    })

    if (existingTool) {
      return NextResponse.json({ error: "A tool with this name already exists" }, { status: 400 })
    }

    // Créer la soumission d'outil
    const submission = await prisma.toolSubmission.create({
      data: {
        name: data.name,
        description: data.description,
        websiteUrl: data.website,
        submitterName: data.submitterName,
        submitterEmail: data.submitterEmail,
        status: "Pending"
      }
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error("Error creating tool submission:", error)
    return NextResponse.json({ error: "Failed to create tool submission" }, { status: 500 })
  }
}

