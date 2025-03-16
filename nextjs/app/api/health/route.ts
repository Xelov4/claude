import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Skip database check during build if SKIP_DB_CHECK is set
    if (process.env.SKIP_DB_CHECK === 'true') {
      return NextResponse.json(
        {
          status: "ok",
          timestamp: new Date().toISOString(),
          database: "skipped",
          environment: process.env.NODE_ENV,
        },
        { status: 200 },
      )
    }

    // Simple database connection test
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        database: "connected",
        environment: process.env.NODE_ENV,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Health check failed:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

