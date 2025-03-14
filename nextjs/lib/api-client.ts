type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: any
  headers?: Record<string, string>
  cache?: RequestCache
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

/**
 * Fetch API helper with error handling and response parsing
 */
export async function fetchApi<T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, cache = "default", next } = options

  // Base API URL - use the app URL or default to local
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  // Ensure endpoint starts with /api/
  const apiEndpoint = endpoint.startsWith("/api/") ? endpoint : `/api/${endpoint}`

  const url = `${baseUrl}${apiEndpoint}`

  // Configure request options
  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache,
    next,
  }

  // Add body for non-GET requests
  if (method !== "GET" && body) {
    requestOptions.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, requestOptions)

    // Check if the request was successful
    if (!response.ok) {
      // Try to parse error response
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { error: response.statusText }
      }

      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    // Parse the JSON response
    const data = await response.json()
    return data as T
  } catch (error: any) {
    // Re-throw with more context
    console.error(`API Error (${endpoint}):`, error)
    throw new Error(`API Error: ${error.message}`)
  }
}

/**
 * Specialized functions for different HTTP methods
 */
export const api = {
  get: <T = any>(endpoint: string, options: Omit<ApiOptions, "method" | "body"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body: any, options: Omit<ApiOptions, "method" | "body"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "POST", body }),

  put: <T = any>(endpoint: string, body: any, options: Omit<ApiOptions, "method" | "body"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "PUT", body }),

  delete: <T = any>(endpoint: string, options: Omit<ApiOptions, "method"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "DELETE" }),
}

