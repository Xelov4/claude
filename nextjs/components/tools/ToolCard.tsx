import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, StarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Tool } from "@/types"

interface ToolCardProps {
  tool: Tool
  featured?: boolean
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  return (
    <Card className={`overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow ${featured ? "border-2 border-primary/10" : ""}`}>
      <div className="aspect-video relative bg-muted">
        <Image
          src={tool.image || "/placeholder.svg?height=200&width=400"}
          alt={`${tool.name} thumbnail`}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute top-2 right-2">{tool.category}</Badge>
        {featured && <Badge variant="secondary" className="absolute top-2 left-2">Featured</Badge>}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-1">{tool.name}</h3>
          <div className="flex items-center text-amber-500">
            <StarIcon className="h-4 w-4 fill-current" />
            <span className="text-xs ml-1">{tool.rating.toFixed(1)}</span>
            {tool.reviewCount && (
              <span className="text-muted-foreground text-xs ml-1">({tool.reviewCount})</span>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {tool.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto mb-3">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tool.tags.length - 3}
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm" className="w-full gap-1" asChild>
          <Link href={`/tool/${tool.slug}`}>
            Voir les Détails
            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    </Card>
  )
} 