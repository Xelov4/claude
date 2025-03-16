import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimit } from "@/lib/api"

export async function middleware(request: NextRequest) {
  // Vérifier le rate limiting
  if (rateLimit(request)) {
    return new NextResponse(
      JSON.stringify({
        error: "Trop de requêtes. Veuillez réessayer plus tard.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      }
    )
  }

  // Ajouter des en-têtes de sécurité
  const response = NextResponse.next()

  // Protection contre le clickjacking
  response.headers.set("X-Frame-Options", "DENY")
  
  // Protection XSS
  response.headers.set("X-XSS-Protection", "1; mode=block")
  
  // Protection contre le MIME sniffing
  response.headers.set("X-Content-Type-Options", "nosniff")
  
  // Politique de sécurité du contenu
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "img-src 'self' data: https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "frame-ancestors 'none'",
    ].join("; ")
  )

  // Politique de référencement
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // En-têtes CORS pour les requêtes préflight
  if (request.method === "OPTIONS") {
    response.headers.set("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_APP_URL || "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.set("Access-Control-Max-Age", "86400")
  }

  return response
}

export const config = {
  matcher: [
    // Appliquer le middleware à toutes les routes d'API
    "/api/:path*",
    // Exclure les ressources statiques et les images
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
} 