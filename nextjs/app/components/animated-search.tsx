"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input as ShadcnInput } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function AnimatedSearch() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [dotCount, setDotCount] = useState(0)
  const [inputValue, setInputValue] = useState("")

  const placeholders = [
    "Je souhaite créer une vidéo explicative...",
    "Je dois absolument améliorer la qualité de mon audio...",
    "Cette vidéo doit être montée rapidement...",
    "Je recherche un logiciel pour générer des sous-titres...",
  ]

  useEffect(() => {
    // Changer le placeholder toutes les 3 secondes
    const placeholderInterval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length)
      setDotCount(0)
    }, 3000)

    // Animer les points de suspension toutes les 500ms
    const dotInterval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4)
    }, 500)

    return () => {
      clearInterval(placeholderInterval)
      clearInterval(dotInterval)
    }
  }, [placeholders.length])

  const currentPlaceholder = placeholders[placeholderIndex]
  const dots = ".".repeat(dotCount)
  const displayText = currentPlaceholder.replace(/\.\.\.$/, "") + dots

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-600" />
        <ShadcnInput
          placeholder={displayText}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10 h-12 text-base border-2 border-purple-600 focus:ring-purple-600 transition-all duration-300 shadow-sm focus:shadow-md"
        />
        <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-10 bg-purple-600 hover:bg-purple-700">
          Rechercher
        </Button>
      </div>
    </div>
  )
}

