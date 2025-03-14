"use client"

import { useState, useEffect, useCallback } from "react"
import { api } from "@/lib/api-client"

type QueryState<T> = {
  data: T | null
  isLoading: boolean
  error: Error | null
}

type QueryOptions = {
  enabled?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

/**
 * Custom hook for fetching data from API endpoints
 */
export function useApiQuery<T = any>(endpoint: string, options: QueryOptions = {}) {
  const { enabled = true, onSuccess, onError } = options
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    isLoading: enabled,
    error: null,
  })

  const fetchData = useCallback(async () => {
    if (!enabled) return

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const data = await api.get<T>(endpoint)
      setState({ data, isLoading: false, error: null })
      if (onSuccess) onSuccess(data)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setState({ data: null, isLoading: false, error })
      if (onError) onError(error)
    }
  }, [endpoint, enabled, onSuccess, onError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Function to manually refetch data
  const refetch = useCallback(() => {
    return fetchData()
  }, [fetchData])

  return {
    ...state,
    refetch,
  }
}

/**
 * Hook for mutations (POST, PUT, DELETE)
 */
export function useApiMutation<T = any, P = any>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE" = "POST",
  options: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
  } = {},
) {
  const { onSuccess, onError } = options
  const [state, setState] = useState<{
    isLoading: boolean
    error: Error | null
    data: T | null
  }>({
    isLoading: false,
    error: null,
    data: null,
  })

  const mutate = useCallback(
    async (payload?: P) => {
      setState({ isLoading: true, error: null, data: null })

      try {
        let data: T

        if (method === "DELETE") {
          data = await api.delete<T>(endpoint)
        } else if (method === "PUT") {
          data = await api.put<T>(endpoint, payload)
        } else {
          data = await api.post<T>(endpoint, payload)
        }

        setState({ isLoading: false, error: null, data })
        if (onSuccess) onSuccess(data)
        return data
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setState({ isLoading: false, error, data: null })
        if (onError) onError(error)
        throw error
      }
    },
    [endpoint, method, onSuccess, onError],
  )

  return {
    mutate,
    ...state,
  }
}

