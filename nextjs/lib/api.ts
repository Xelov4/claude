import { type NextRequest } from "next/server"

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function handleApiError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof ApiError) {
    return new Response(
      JSON.stringify({
        error: error.message,
        errors: error.errors,
      }),
      {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  return new Response(
    JSON.stringify({
      error: "Une erreur inattendue s'est produite",
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }
  )
}

export async function validateRequest<T>(
  request: NextRequest,
  schema: { parse: (data: unknown) => T }
): Promise<T> {
  try {
    const data = await request.json()
    return schema.parse(data)
  } catch (error) {
    throw new ApiError(400, "Données de requête invalides", {
      validation: ["Le format des données est incorrect"],
    })
  }
}

export function rateLimit(request: NextRequest) {
  const MAX_REQUESTS = Number(process.env.API_RATE_LIMIT) || 100
  const WINDOW_MS = Number(process.env.API_RATE_LIMIT_WINDOW_MS) || 60000

  // Ici, vous devriez implémenter une vraie solution de rate limiting
  // avec Redis ou un autre système de stockage
  // Ceci est juste un exemple basique
  const ip = request.headers.get("x-forwarded-for") || "unknown"
  const now = Date.now()
  const key = `rate-limit:${ip}`

  // Pour l'exemple, on ne bloque jamais
  // Dans une vraie implémentation, vérifiez le nombre de requêtes
  // et bloquez si nécessaire
  return false
}

export function cors(response: Response) {
  const headers = new Headers(response.headers)
  headers.set("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_APP_URL || "*")
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  headers.set("Access-Control-Max-Age", "86400")

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
} 