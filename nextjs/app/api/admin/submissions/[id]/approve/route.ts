import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Récupérer la soumission
    const submission = await prisma.toolSubmission.findUnique({
      where: { id },
    })

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    // Créer l'outil à partir de la soumission
    const tool = await prisma.tool.create({
      data: {
        name: submission.name,
        slug: submission.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        shortDescription: submission.description,
        longDescription: "",
        websiteUrl: submission.websiteUrl,
        pricingType: "Gratuit", // Valeur par défaut
        categoryId: 1, // Catégorie par défaut
        isVisible: true,
      },
    })

    // Mettre à jour le statut de la soumission
    await prisma.toolSubmission.update({
      where: { id },
      data: {
        status: "Approved",
      },
    })

    return NextResponse.json({ success: true, tool })
  } catch (error) {
    console.error("Error approving submission:", error)
    return NextResponse.json({ error: "Failed to approve submission" }, { status: 500 })
  }
}

