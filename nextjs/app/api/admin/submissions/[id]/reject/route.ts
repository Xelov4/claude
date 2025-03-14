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

    // Mettre à jour le statut de la soumission
    await prisma.toolSubmission.update({
      where: { id },
      data: {
        status: "rejected",
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error rejecting submission:", error)
    return NextResponse.json({ error: "Failed to reject submission" }, { status: 500 })
  }
}

