import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  StarIcon,
  CheckIcon,
  TagIcon,
  UsersIcon,
  CalendarIcon,
  ShareIcon,
  BookmarkIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react"
import Link from "next/link"
import { Logo } from "@/app/components/logo"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ReviewSection } from "./review-section"

interface SimilarTool {
  id: number
  name: string
  shortDescription: string
  description: string
  imageUrl: string
  slug: string
  rating: number
  category: {
    name: string
  }
  toolTags: {
    tag: {
      name: string
    }
  }[]
}

interface Feature {
  id: number
  title: string
  description: string | null
}

interface UseCase {
  id: number
  title: string
  description: string | null
  imageUrl: string | null
}

interface Tag {
  name: string
  slug: string
}

interface TargetAudience {
  audience: {
    name: string
  }
  description: string | null
  audienceId: number
}

interface FormattedSimilarTool {
  id: number
  name: string
  description: string
  image: string
  slug: string
  rating: number
  category: string
  tags: string[]
}

export default async function ToolDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  try {
    // Récupérer l'outil avec toutes ses relations
    const tool = await prisma.tool.findUnique({
      where: { slug },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        features: {
          orderBy: {
            orderPosition: "asc",
          },
        },
        useCases: {
          orderBy: {
            orderPosition: "asc",
          },
        },
        reviews: {
          where: { isVisible: true },
          orderBy: { reviewDate: "desc" },
          take: 10, // Limit initial reviews for performance
        },
        toolTags: {
          include: {
            tag: true,
          },
        },
        toolAudiences: {
          include: {
            audience: true,
          },
        },
      },
    })

    // Si l'outil n'existe pas, retourner une page 404
    if (!tool) {
      return notFound()
    }

    // Récupérer les outils similaires (même catégorie)
    const similarTools = await prisma.tool.findMany({
      where: {
        categoryId: tool.categoryId,
        id: {
          not: tool.id,
        },
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
      take: 3,
    })

    // Formater les outils similaires
    const formattedSimilarTools: FormattedSimilarTool[] = similarTools.map((similarTool: any) => ({
      id: similarTool.id,
      name: similarTool.name,
      description: similarTool.shortDescription,
      image: similarTool.imageUrl || "/placeholder.svg?height=200&width=400",
      slug: similarTool.slug,
      rating: similarTool.rating,
      category: similarTool.category.name,
      tags: similarTool.toolTags.map((t: any) => t.tag.name),
    }))

    // Vérifier si l'outil a des réseaux sociaux
    const hasSocialMedia = tool.twitterUrl || tool.linkedinUrl || tool.instagramUrl

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

        {/* Fil d'Ariane */}
        <div className="container py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            {tool.category.parent && (
              <>
                <Link
                  href={`/categories/${tool.category.parent.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {tool.category.parent.name}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <Link href={`/categories/${tool.category.slug}`} className="hover:text-foreground transition-colors">
              {tool.category.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{tool.name}</span>
          </div>
        </div>

        {/* En-tête de l'Outil */}
        <section className="container py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <div className="flex items-start gap-4">
                <div className="size-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={tool.logoUrl || "/placeholder.svg?height=64&width=64"}
                      alt={`Logo de ${tool.name}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-bold">{tool.name}</h1>
                    <Badge>{tool.category.name}</Badge>
                    <div className="flex items-center text-amber-500">
                      <StarIcon className="h-5 w-5 fill-current" />
                      <span className="font-medium ml-1">{tool.rating.toString()}</span>
                      <span className="text-muted-foreground text-sm ml-1">({tool.reviewCount} avis)</span>
                    </div>
                  </div>
                  <p className="mt-2 text-lg text-muted-foreground">{tool.shortDescription}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-3">
              <Button className="w-full gap-2" size="lg" asChild>
                <a href={tool.websiteUrl || "#"} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon className="h-4 w-4" />
                  Visiter le Site Web
                </a>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1">
                  <BookmarkIcon className="h-4 w-4" />
                  Sauvegarder
                </Button>
                <Button variant="outline" className="flex-1 gap-1">
                  <ShareIcon className="h-4 w-4" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contenu Principal */}
        <section className="container pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Colonne Gauche - Détails de l'Outil */}
            <div className="w-full md:w-2/3 space-y-10">
              {/* Capture d'écran de l'Outil */}
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={tool.imageUrl || "/placeholder.svg?height=400&width=800"}
                    alt={`Capture d'écran de ${tool.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                </div>
              </div>

              {/* Section Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Description</h2>
                <div className="prose prose-sm max-w-none">
                  {tool.longDescription?.split("\n\n").map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Section Réseaux Sociaux */}
              {hasSocialMedia && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Suivez {tool.name}</h2>
                  <div className="flex gap-4">
                    {tool.linkedinUrl && (
                      <a
                        href={tool.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center size-12 rounded-full bg-[#0077B5] text-white hover:opacity-90 transition-opacity"
                      >
                        <LinkedinIcon className="h-6 w-6" />
                      </a>
                    )}
                    {tool.twitterUrl && (
                      <a
                        href={tool.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center size-12 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
                      >
                        <TwitterIcon className="h-6 w-6" />
                      </a>
                    )}
                    {tool.instagramUrl && (
                      <a
                        href={tool.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90 transition-opacity"
                      >
                        <InstagramIcon className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Section Fonctionnalités Clés */}
              {tool.features.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Fonctionnalités Clés</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {tool.features.map((feature: Feature) => (
                      <Card key={feature.id} className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                            <CheckIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Section Cas d'Utilisation */}
              {tool.useCases.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Cas d'Utilisation</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tool.useCases.map((useCase: UseCase) => (
                      <Card key={useCase.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted">
                          <div className="relative w-full h-full">
                            <Image
                              src={useCase.imageUrl || "/placeholder.svg?height=200&width=400"}
                              alt={useCase.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 66vw"
                              priority
                            />
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold mb-2">{useCase.title}</h3>
                          <p className="text-sm text-muted-foreground">{useCase.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Section Avis */}
              <ReviewSection toolId={tool.id} toolSlug={tool.slug} initialReviews={tool.reviews} />

              {/* Section Outils Similaires */}
              {formattedSimilarTools.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Logiciels Similaires</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formattedSimilarTools.map((similarTool: FormattedSimilarTool) => (
                      <Card
                        key={similarTool.id}
                        className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-video relative bg-muted">
                          <div className="relative w-full h-full">
                            <Image
                              src={similarTool.image || "/placeholder.svg?height=200&width=400"}
                              alt={`Aperçu de ${similarTool.name}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 66vw"
                              priority
                            />
                          </div>
                          <Badge className="absolute top-2 right-2">{similarTool.category}</Badge>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold line-clamp-1">{similarTool.name}</h3>
                            <div className="flex items-center text-amber-500">
                              <StarIcon className="h-4 w-4 fill-current" />
                              <span className="text-xs ml-1">{similarTool.rating.toString()}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{similarTool.description}</p>
                          <div className="flex flex-wrap gap-1 mt-auto mb-3">
                            {similarTool.tags.slice(0, 3).map((tag: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Link href={`/outil/${similarTool.slug}`}>
                            <Button variant="outline" size="sm" className="w-full gap-1">
                              Voir les Détails
                              <ArrowRightIcon className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Colonne Droite - Barre Latérale */}
            <div className="w-full md:w-1/3 space-y-6 md:sticky md:top-20 md:self-start">
              {/* Informations Rapides */}
              <Card className="p-5">
                <h3 className="font-semibold mb-4">Informations Rapides</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <TagIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Tarification</h4>
                      <p className="text-sm text-muted-foreground">{tool.priceDetails || tool.pricingType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <UsersIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Cible</h4>
                      <p className="text-sm text-muted-foreground">
                        {tool.toolAudiences.map((ta: TargetAudience) => ta.audience.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Dernière Mise à Jour</h4>
                      <p className="text-sm text-muted-foreground">
                        {tool.lastUpdated ? new Date(tool.lastUpdated).toLocaleDateString("fr-FR") : "Non spécifiée"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tags */}
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.toolTags.map((tag: { tag: Tag }, index: number) => (
                    <Link key={index} href={`/tags/${tag.tag.slug}`}>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-muted">
                        {tag.tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Pour Qui */}
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Cible</h3>
                <div className="space-y-3">
                  {tool.toolAudiences.map((ta: TargetAudience) => (
                    <div key={ta.audienceId} className="flex items-start gap-3">
                      <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                        <UsersIcon className="h-3 w-3" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{ta.audience.name}</div>
                        <div className="text-xs text-muted-foreground">{ta.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

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
                  <li>
                    <Link
                      href="/categories/creation-videos"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Création de Vidéos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/edition-video"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Édition Vidéo
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/generation-contenu"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Génération de Contenu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/analyse-video"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Analyse Vidéo
                    </Link>
                  </li>
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
  } catch (error) {
    console.error("Error loading tool details:", error)
    return notFound()
  }
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  // Ajout de propriétés spécifiques si nécessaire
}

function Input(props: InputProps) {
  return (
    <input
      type="text"
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  )
}

