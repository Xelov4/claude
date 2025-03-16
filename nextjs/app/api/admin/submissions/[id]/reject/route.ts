import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID invalide" },
        { status: 400 }
      )
    }

    const submission = await prisma.toolSubmission.update({
      where: { id },
      data: {
        status: "Rejected",
      },
    })

    return NextResponse.json(submission)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors du rejet de la soumission" },
      { status: 500 }
    )
  }
}

