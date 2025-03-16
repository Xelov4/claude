import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Logo } from "../components/logo"

export default function SubmitToolPage() {
  // Données simulées pour les catégories et sous-catégories
  const categories = [
    {
      id: 1,
      name: "Vidéo",
      slug: "video",
      subcategories: [
        { id: 101, name: "Création de Vidéos", slug: "creation-videos" },
        { id: 102, name: "Édition Vidéo", slug: "edition-video" },
        { id: 103, name: "Génération de Contenu", slug: "generation-contenu" },
        { id: 104, name: "Analyse Vidéo", slug: "analyse-video" },
      ],
    },
    {
      id: 2,
      name: "Audio",
      slug: "audio",
      subcategories: [
        { id: 201, name: "Transcription Audio", slug: "transcription-audio" },
        { id: 202, name: "Génération de Voix", slug: "generation-voix" },
        { id: 203, name: "Édition Audio", slug: "edition-audio" },
      ],
    },
    {
      id: 3,
      name: "Image",
      slug: "image",
      subcategories: [
        { id: 301, name: "Génération d'Images", slug: "generation-images" },
        { id: 302, name: "Édition d'Images", slug: "edition-images" },
        { id: 303, name: "Reconnaissance d'Images", slug: "reconnaissance-images" },
      ],
    },
  ]

  // Données simulées pour les tags
  const tags = [
    "IA Générative",
    "Montage",
    "Gratuit",
    "Premium",
    "Animation",
    "Voix Off",
    "Sous-titres",
    "Effets Spéciaux",
    "Marketing",
    "Éducation",
    "Entreprise",
    "Réseaux Sociaux",
  ]

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
            <Button>Soumettre un Logiciel</Button>
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
          <span className="text-foreground">Soumettre un Logiciel</span>
        </div>
      </div>

      {/* Contenu Principal */}
      <section className="container py-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Soumettre un Logiciel IA</h1>
          <p className="text-muted-foreground mb-8">
            Partagez un logiciel IA innovant avec notre communauté. Veuillez remplir le formulaire ci-dessous avec
            autant de détails que possible.
          </p>

          <Card className="p-6">
            <form className="space-y-8">
              {/* Informations de base */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Informations de base</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      Nom du logiciel <span className="text-pink-500 italic text-xs">*obligatoire</span>
                    </Label>
                    <Input id="name" placeholder="Nom du logiciel" required className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="website">
                      Site web <span className="text-pink-500 italic text-xs">*obligatoire</span>
                    </Label>
                    <Input id="website" type="url" placeholder="https://..." required className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="short-description">Description courte</Label>
                    <Input
                      id="short-description"
                      placeholder="Une brève description du logiciel (max 150 caractères)"
                      maxLength={150}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="long-description">Description détaillée</Label>
                    <Textarea
                      id="long-description"
                      placeholder="Décrivez en détail ce que fait le logiciel, ses fonctionnalités principales et ses avantages"
                      className="mt-1 min-h-[150px]"
                    />
                  </div>
                </div>
              </div>

              {/* Catégorisation */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Catégorisation</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category">
                      Catégorie principale <span className="text-pink-500 italic text-xs">*obligatoire</span>
                    </Label>
                    <Select required>
                      <SelectTrigger id="category" className="mt-1">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subcategory">
                      Sous-catégorie <span className="text-pink-500 italic text-xs">*obligatoire</span>
                    </Label>
                    <Select required>
                      <SelectTrigger id="subcategory" className="mt-1">
                        <SelectValue placeholder="Sélectionner une sous-catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .flatMap((category) => category.subcategories)
                          .map((subcategory) => (
                            <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                              {subcategory.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>
                      Tags <span className="text-pink-500 italic text-xs">*obligatoire</span>
                    </Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox id={`tag-${tag}`} />
                          <label
                            htmlFor={`tag-${tag}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Label htmlFor="custom-tags" className="text-sm">
                        Ajouter des tags personnalisés (séparés par des virgules)
                      </Label>
                      <Input id="custom-tags" placeholder="IA, Vidéo, etc." className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations complémentaires */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Informations complémentaires</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pricing">Modèle de tarification</Label>
                    <Select>
                      <SelectTrigger id="pricing" className="mt-1">
                        <SelectValue placeholder="Sélectionner un modèle de tarification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Gratuit</SelectItem>
                        <SelectItem value="freemium">Freemium</SelectItem>
                        <SelectItem value="paid">Payant</SelectItem>
                        <SelectItem value="trial">Essai gratuit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price-details">Détails de tarification</Label>
                    <Input
                      id="price-details"
                      placeholder="Ex: Gratuit pour 3 vidéos/mois, 19€/mois pour la version Pro"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Public cible</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {[
                        "Créateurs de contenu",
                        "Marketeurs",
                        "Entrepreneurs",
                        "Éducateurs",
                        "Développeurs",
                        "Designers",
                        "Étudiants",
                        "Entreprises",
                      ].map((audience) => (
                        <div key={audience} className="flex items-center space-x-2">
                          <Checkbox id={`audience-${audience}`} />
                          <label
                            htmlFor={`audience-${audience}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {audience}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="logo">Logo du logiciel</Label>
                    <Input id="logo" type="file" accept="image/*" className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Format carré recommandé, taille minimale 200x200px
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="screenshot">Capture d'écran principale</Label>
                    <Input id="screenshot" type="file" accept="image/*" className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Format 16:9 recommandé, taille minimale 1280x720px
                    </p>
                  </div>

                  <div>
                    <Label>Réseaux sociaux</Label>
                    <div className="space-y-2 mt-1">
                      <div>
                        <Label htmlFor="twitter" className="text-sm">
                          Twitter/X
                        </Label>
                        <Input id="twitter" placeholder="https://twitter.com/..." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="linkedin" className="text-sm">
                          LinkedIn
                        </Label>
                        <Input id="linkedin" placeholder="https://linkedin.com/company/..." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="instagram" className="text-sm">
                          Instagram
                        </Label>
                        <Input id="instagram" placeholder="https://instagram.com/..." className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations de contact */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Vos informations</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="submitter-name">
                      Votre nom <span className="text-pink-500 italic text-xs">*obligatoire</span>
                    </Label>
                    <Input id="submitter-name" required className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="submitter-email">
                      Votre email <span className="text-pink-500 italic text-xs">*obligatoire</span>
                    </Label>
                    <Input id="submitter-email" type="email" required className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Nous vous contacterons à cette adresse si nous avons besoin d'informations supplémentaires
                    </p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required className="mt-1" />
                    <div>
                      <Label htmlFor="terms" className="font-medium text-sm">
                        J'accepte les conditions d'utilisation{" "}
                        <span className="text-pink-500 italic text-xs">*obligatoire</span>
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        En soumettant ce formulaire, vous confirmez que vous avez le droit de partager ces informations
                        et que le logiciel respecte nos{" "}
                        <Link href="/conditions" className="underline hover:text-foreground">
                          conditions d'utilisation
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Soumettre le logiciel pour examen
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Votre soumission sera examinée par notre équipe avant d'être publiée. Ce processus peut prendre jusqu'à 48
              heures.
            </p>
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
}

// Définir le composant SearchIcon avec un type explicite pour className
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

