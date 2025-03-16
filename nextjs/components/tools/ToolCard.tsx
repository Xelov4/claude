import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, StarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Tool } from "@/types"

// Définition locale du type FormattedTool pour éviter les problèmes d'importation
interface FormattedTool {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  rating: number;
  category: string;
  categorySlug?: string;
  tags: string[];
  reviewCount?: number;
}

interface ToolCardProps {
  tool: FormattedTool | Tool
  featured?: boolean
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  // Déterminer si nous utilisons Tool ou FormattedTool
  const isFormattedTool = 'image' in tool;
  
  // Obtenir les valeurs correctes selon le type
  const imageUrl = isFormattedTool ? (tool as FormattedTool).image : (tool as Tool).imageUrl;
  const description = isFormattedTool ? (tool as FormattedTool).description : (tool as Tool).shortDescription;
  const categoryName = isFormattedTool ? (tool as FormattedTool).category : '';
  const tags = isFormattedTool ? (tool as FormattedTool).tags : [];
  const reviewCount = 'reviewCount' in tool ? tool.reviewCount : undefined;

  return (
    <Card className={`overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow ${featured ? "border-2 border-primary/10" : ""}`}>
      <div className="aspect-video relative bg-muted">
        <Image
          src={imageUrl || "/placeholder.svg?height=200&width=400"}
          alt={`${tool.name} thumbnail`}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute top-2 right-2">{categoryName}</Badge>
        {featured && <Badge variant="secondary" className="absolute top-2 left-2">Featured</Badge>}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-1">{tool.name}</h3>
          <div className="flex items-center text-amber-500">
            <StarIcon className="h-4 w-4 fill-current" />
            <span className="text-xs ml-1">{typeof tool.rating === 'number' ? tool.rating.toFixed(1) : Number(tool.rating.toString()).toFixed(1)}</span>
            {reviewCount && (
              <span className="text-muted-foreground text-xs ml-1">({reviewCount})</span>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto mb-3">
          {tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
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