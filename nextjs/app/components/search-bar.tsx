"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export function SearchBar({
  initialValue = "",
  className = "",
  placeholder = "Rechercher des logiciels...",
  onSearch,
}: {
  initialValue?: string
  className?: string
  placeholder?: string
  onSearch?: (query: string) => void
}) {
  const [query, setQuery] = useState(initialValue)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (onSearch) {
      onSearch(query)
      return
    }

    if (query.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      })
    }
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-9 w-full"
        disabled={isPending}
      />
      <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2" disabled={isPending}>
        {isPending ? "Recherche..." : "Rechercher"}
      </Button>
    </form>
  )
}

