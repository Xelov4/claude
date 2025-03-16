import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Récupérer les soumissions en attente
    const submissions = await prisma.toolSubmission.findMany({
      where: {
        status: "Pending",
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}

