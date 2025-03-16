import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import { Logo } from "./components/logo"
import { AnimatedSearch } from "./components/animated-search"
import prisma from "@/lib/prisma"
import React from "react"
import { 
  Category, 
  Tool, 
  FormattedTool, 
  CategoryWithTools, 
  SearchIconProps, 
  FilterIconProps,
  Tag
} from "./types"

// Cette fonction est exécutée côté serveur à chaque requête
export default async function HomePage() {
  // Récupérer les catégories mises en avant
  const featuredCategories = await prisma.category.findMany({
    where: {
      isVisible: true,
    },
    orderBy: {
      orderPosition: "asc",
    },
    take: 4,
  })

  // Récupérer les outils pour chaque catégorie
  const categoriesWithTools = await Promise.all(
    featuredCategories.map(async (category) => {
      const tools = await prisma.tool.findMany({
        where: {
          OR: [{ categoryId: category.id }, { category: { parentId: category.id } }],
          isVisible: true,
        },
        include: {
          category: true,
          toolTags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          rating: "desc",
        },
        take: 6,
      })

      // Formater les outils
      const formattedTools = tools.map((tool): FormattedTool => ({
        id: tool.id,
        name: tool.name,
        slug: tool.slug,
        description: tool.shortDescription,
        image: tool.imageUrl || "/placeholder.svg?height=200&width=400",
        rating: typeof tool.rating === 'number' ? tool.rating : Number(tool.rating.toString()),
        category: tool.category?.name || "",
        tags: tool.toolTags?.map((t) => t.tag.name) || [],
      }))

      return {
        ...category,
        tools: formattedTools,
      } as CategoryWithTools
    }),
  )

  // Récupérer les tags populaires
  const popularTags = await prisma.tag.findMany({
    take: 5,
  })

  // Récupérer les outils populaires
  const popularTools = await prisma.tool.findMany({
    where: {
      isVisible: true,
      rating: {
        gte: 4.5,
      },
    },
    include: {
      category: true,
      toolTags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      rating: "desc",
    },
    take: 6,
  })

  // Formater les outils populaires
  const formattedPopularTools = popularTools.map((tool): FormattedTool => ({
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    description: tool.shortDescription,
    image: tool.imageUrl || "/placeholder.svg?height=200&width=400",
    rating: typeof tool.rating === 'number' ? tool.rating : Number(tool.rating.toString()),
    category: tool.category?.name || "",
    tags: tool.toolTags?.map((t) => t.tag.name) || [],
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Catégories
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher des logiciels..." className="pl-9 w-full" />
            </div>
            <Button variant="outline" size="icon" className="md:hidden">
              <SearchIcon className="h-4 w-4" />
            </Button>
            <Link href="/soumettre">
              <Button>Soumettre un Logiciel</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Découvrez le Meilleur <span className="text-purple-600">Logiciel IA</span> pour la Vidéo
          </h1>
          <p className="text-xl text-muted-foreground">
            Explorez notre collection de logiciels d'intelligence artificielle pour créer, éditer et analyser vos
            vidéos.
          </p>
          <div className="relative mt-8">
            <AnimatedSearch />
          </div>
        </div>
      </section>

      {/* Nuage de catégories populaires */}
      <section className="container py-6 border-t border-border/40">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {featuredCategories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Badge
                variant="outline"
                className="px-4 py-2 text-base hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Filtres */}
      <section className="container py-6 border-t border-border/40">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtres</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Réinitialiser
              </Button>
            </div>

            {/* Filtre Catégories */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Catégories</h3>
              <div className="space-y-2">
                {featuredCategories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtre Tags */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Tags Populaires</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag: Tag) => (
                  <Badge key={tag.id} variant="outline" className="cursor-pointer hover:bg-muted">
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Voir plus de tags
              </Button>
            </div>

            {/* Filtre Prix */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Prix</h3>
              <div className="space-y-2">
                {["Gratuit", "Freemium", "Payant", "Essai Gratuit"].map((pricing) => (
                  <div key={pricing} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`pricing-${pricing}`}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`pricing-${pricing}`} className="ml-2 text-sm">
                      {pricing}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Logiciels Mis en Avant */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Logiciels Populaires</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  <FilterIcon className="h-4 w-4" />
                  Trier par
                </Button>
                <Button variant="outline" size="icon" className="md:hidden">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {formattedPopularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {categoriesWithTools.map((category) => (
        <section key={category.id} className="container py-12 border-t border-border/40 first:border-0">
          <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
          <p className="text-muted-foreground mb-8 max-w-4xl">
            {category.description ? category.description.substring(0, 150) + '...' : ''}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {category.tools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href={`/categories/${category.slug}`}>
              <Button variant="outline" className="gap-2">
                Voir Plus
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/40">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Video-IA.net</h3>
              <p className="text-sm text-muted-foreground">
                Votre ressource pour découvrir les meilleurs logiciels d'IA pour la vidéo.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                    Catégories
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/soumettre" className="text-muted-foreground hover:text-foreground transition-colors">
                    Soumettre un Logiciel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Catégories Populaires</h3>
              <ul className="space-y-2 text-sm">
                {featuredCategories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/a-propos" className="text-muted-foreground hover:text-foreground transition-colors">
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/soumettre" className="text-muted-foreground hover:text-foreground transition-colors">
                    Soumettre un Logiciel
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Video-IA.net. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/confidentialite"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Politique de Confidentialité
              </Link>
              <Link
                href="/conditions"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Conditions d'Utilisation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ToolCard({ tool }: { tool: FormattedTool }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="aspect-video relative bg-muted">
        <img
          src={tool.image}
          alt={`Aperçu de ${tool.name}`}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2">{tool.category}</Badge>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-1">{tool.name}</h3>
          <div className="flex items-center text-amber-500">
            <StarIcon className="h-4 w-4 fill-current" />
            <span className="text-xs ml-1">{tool.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{tool.description}</p>
        <div className="flex flex-wrap gap-1 mt-auto mb-3">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/outil/${tool.slug}`}>
          <Button variant="outline" size="sm" className="w-full gap-1">
            Voir les Détails
            <ArrowRightIcon className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}

function SearchIcon({ className }: SearchIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`}
      {...props}
    />
  )
}

function FilterIcon({ className }: FilterIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

