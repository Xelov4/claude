import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation des données
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Créer le message de contact
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error creating contact message:", error)
    return NextResponse.json({ error: "Failed to create contact message" }, { status: 500 })
  }
}

