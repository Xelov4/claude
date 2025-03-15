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
        slug: submission.slug,
        description: submission.description,
        longDescription: submission.longDescription || "",
        logo: submission.logo,
        image: submission.image,
        pricing: submission.pricing,
        priceDetails: submission.priceDetails,
        website: submission.website,
        twitterUrl: submission.twitterUrl,
        linkedinUrl: submission.linkedinUrl,
        instagramUrl: submission.instagramUrl,
        categoryId: submission.categoryId,
        approved: true,
      },
    })

    // Ajouter les tags
    const tags = JSON.parse(submission.tags || "[]")
    for (const tagName of tags) {
      // Trouver ou créer le tag
      let tag = await prisma.tag.findUnique({
        where: { name: tagName },
      })

      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagName,
            slug: tagName.toLowerCase().replace(/\s+/g, "-"),
          },
        })
      }

      // Associer le tag à l'outil
      await prisma.toolTag.create({
        data: {
          toolId: tool.id,
          tagId: tag.id,
        },
      })
    }

    // Mettre à jour le statut de la soumission
    await prisma.toolSubmission.update({
      where: { id },
      data: {
        status: "approved",
      },
    })

    return NextResponse.json({ success: true, tool })
  } catch (error) {
    console.error("Error approving submission:", error)
    return NextResponse.json({ error: "Failed to approve submission" }, { status: 500 })
  }
}

