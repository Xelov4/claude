import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface SiteSetting {
  key: string
  value: string
}

export async function GET() {
  try {
    // Récupérer tous les paramètres
    const settings = await prisma.siteSetting.findMany()

    // Transformer en objet clé-valeur
    const settingsObject = settings.reduce(
      (acc: Record<string, string>, setting: SiteSetting) => {
        acc[setting.key] = setting.value
        return acc
      },
      {} as Record<string, string>,
    )

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Mettre à jour ou créer chaque paramètre
    for (const [key, value] of Object.entries(data)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: {
          key,
          value: String(value),
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

