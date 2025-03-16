import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Logo } from "../components/logo"

export default function CategoriesPage() {
  // Données simulées pour les catégories et sous-catégories
  const categories = [
    {
      id: 1,
      name: "Vidéo",
      slug: "video",
      description: "Logiciels IA pour la création et l'édition vidéo",
      subcategories: [
        {
          id: 101,
          name: "Création de Vidéos",
          slug: "creation-videos",
          description: "Générez des vidéos à partir de texte ou d'images",
          tools: [
            {
              id: 1,
              name: "VideoGenius AI",
              description: "Créez des vidéos professionnelles rapidement",
              image: "/placeholder.svg?height=64&width=64",
              slug: "videogenius-ai",
            },
            {
              id: 2,
              name: "MontageAI",
              description: "Montage vidéo automatisé intelligent",
              image: "/placeholder.svg?height=64&width=64",
              slug: "montage-ai",
            },
            {
              id: 3,
              name: "ScriptToVideo",
              description: "Transformez vos scripts en vidéos",
              image: "/placeholder.svg?height=64&width=64",
              slug: "script-to-video",
            },
          ],
        },
        {
          id: 102,
          name: "Édition Vidéo",
          slug: "edition-video",
          description: "Éditez vos vidéos avec l'aide de l'IA",
          tools: [
            {
              id: 7,
              name: "EditMaster",
              description: "Éditeur vidéo avec suggestions IA",
              image: "/placeholder.svg?height=64&width=64",
              slug: "edit-master",
            },
            {
              id: 8,
              name: "ColorGrade AI",
              description: "Étalonnage colorimétrique automatique",
              image: "/placeholder.svg?height=64&width=64",
              slug: "colorgrade-ai",
            },
            {
              id: 9,
              name: "AudioSync",
              description: "Synchronisation audio-vidéo parfaite",
              image: "/placeholder.svg?height=64&width=64",
              slug: "audio-sync",
            },
          ],
        },
        {
          id: 103,
          name: "Génération de Contenu",
          slug: "generation-contenu",
          description: "Générez du contenu vidéo original avec l'IA",
          tools: [
            {
              id: 13,
              name: "ContentForge",
              description: "Contenu vidéo basé sur vos idées",
              image: "/placeholder.svg?height=64&width=64",
              slug: "content-forge",
            },
            {
              id: 14,
              name: "StoryAI",
              description: "Histoires visuelles captivantes",
              image: "/placeholder.svg?height=64&width=64",
              slug: "story-ai",
            },
            {
              id: 15,
              name: "ProductVideo",
              description: "Vidéos de présentation de produits",
              image: "/placeholder.svg?height=64&width=64",
              slug: "product-video",
            },
          ],
        },
        {
          id: 104,
          name: "Analyse Vidéo",
          slug: "analyse-video",
          description: "Analysez vos vidéos pour des insights précieux",
          tools: [
            {
              id: 19,
              name: "ViewAnalytics",
              description: "Analysez l'engagement des vidéos",
              image: "/placeholder.svg?height=64&width=64",
              slug: "view-analytics",
            },
            {
              id: 20,
              name: "EmotionDetect",
              description: "Détectez les émotions des spectateurs",
              image: "/placeholder.svg?height=64&width=64",
              slug: "emotion-detect",
            },
            {
              id: 21,
              name: "ContentInsight",
              description: "Insights sur l'efficacité des vidéos",
              image: "/placeholder.svg?height=64&width=64",
              slug: "content-insight",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Audio",
      slug: "audio",
      description: "Logiciels IA pour le traitement et la génération audio",
      subcategories: [
        {
          id: 201,
          name: "Transcription Audio",
          slug: "transcription-audio",
          description: "Convertissez l'audio en texte avec précision",
          tools: [
            {
              id: 25,
              name: "TranscribeGenius",
              description: "Transcription précise multi-langues",
              image: "/placeholder.svg?height=64&width=64",
              slug: "transcribe-genius",
            },
            {
              id: 26,
              name: "AudioText Pro",
              description: "Transcription avec formatage intelligent",
              image: "/placeholder.svg?height=64&width=64",
              slug: "audio-text-pro",
            },
            {
              id: 27,
              name: "VoiceNotes AI",
              description: "Transformez vos notes vocales en texte",
              image: "/placeholder.svg?height=64&width=64",
              slug: "voice-notes-ai",
            },
          ],
        },
        {
          id: 202,
          name: "Génération de Voix",
          slug: "generation-voix",
          description: "Créez des voix naturelles pour vos projets",
          tools: [
            {
              id: 28,
              name: "VoiceClone",
              description: "Clonez votre voix ou créez-en une nouvelle",
              image: "/placeholder.svg?height=64&width=64",
              slug: "voice-clone",
            },
            {
              id: 29,
              name: "NarratorAI",
              description: "Voix off professionnelles pour vos vidéos",
              image: "/placeholder.svg?height=64&width=64",
              slug: "narrator-ai",
            },
            {
              id: 30,
              name: "PodcastVoice",
              description: "Voix naturelles pour vos podcasts",
              image: "/placeholder.svg?height=64&width=64",
              slug: "podcast-voice",
            },
          ],
        },
        {
          id: 203,
          name: "Édition Audio",
          slug: "edition-audio",
          description: "Éditez et améliorez vos fichiers audio",
          tools: [
            {
              id: 31,
              name: "AudioEnhance",
              description: "Améliorez la qualité de vos audios",
              image: "/placeholder.svg?height=64&width=64",
              slug: "audio-enhance",
            },
            {
              id: 32,
              name: "NoiseRemover",
              description: "Supprimez les bruits de fond indésirables",
              image: "/placeholder.svg?height=64&width=64",
              slug: "noise-remover",
            },
            {
              id: 33,
              name: "MixMaster AI",
              description: "Mixage et mastering audio automatisés",
              image: "/placeholder.svg?height=64&width=64",
              slug: "mix-master-ai",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Image",
      slug: "image",
      description: "Logiciels IA pour la création et l'édition d'images",
      subcategories: [
        {
          id: 301,
          name: "Génération d'Images",
          slug: "generation-images",
          description: "Créez des images originales à partir de texte",
          tools: [
            {
              id: 34,
              name: "ImageCreator",
              description: "Générez des images à partir de descriptions",
              image: "/placeholder.svg?height=64&width=64",
              slug: "image-creator",
            },
            {
              id: 35,
              name: "ArtGenius",
              description: "Créez des œuvres d'art numériques",
              image: "/placeholder.svg?height=64&width=64",
              slug: "art-genius",
            },
            {
              id: 36,
              name: "DesignAI",
              description: "Designs graphiques professionnels",
              image: "/placeholder.svg?height=64&width=64",
              slug: "design-ai",
            },
          ],
        },
        {
          id: 302,
          name: "Édition d'Images",
          slug: "edition-images",
          description: "Retouchez et améliorez vos images",
          tools: [
            {
              id: 37,
              name: "PhotoEnhance",
              description: "Améliorez la qualité de vos photos",
              image: "/placeholder.svg?height=64&width=64",
              slug: "photo-enhance",
            },
            {
              id: 38,
              name: "BackgroundRemover",
              description: "Supprimez les arrière-plans en un clic",
              image: "/placeholder.svg?height=64&width=64",
              slug: "background-remover",
            },
            {
              id: 39,
              name: "ColorizeAI",
              description: "Colorisez des images en noir et blanc",
              image: "/placeholder.svg?height=64&width=64",
              slug: "colorize-ai",
            },
          ],
        },
        {
          id: 303,
          name: "Reconnaissance d'Images",
          slug: "reconnaissance-images",
          description: "Analysez et identifiez le contenu des images",
          tools: [
            {
              id: 40,
              name: "ObjectDetect",
              description: "Détectez et identifiez des objets",
              image: "/placeholder.svg?height=64&width=64",
              slug: "object-detect",
            },
            {
              id: 41,
              name: "FaceRecognition",
              description: "Reconnaissance faciale avancée",
              image: "/placeholder.svg?height=64&width=64",
              slug: "face-recognition",
            },
            {
              id: 42,
              name: "ImageAnalytics",
              description: "Analysez le contenu des images",
              image: "/placeholder.svg?height=64&width=64",
              slug: "image-analytics",
            },
          ],
        },
      ],
    },
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
          <span className="text-foreground">Catégories</span>
        </div>
      </div>

      {/* Contenu Principal */}
      <section className="container py-8 pb-16">
        <h1 className="text-3xl font-bold mb-8">Toutes les Catégories</h1>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.id} className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="space-y-8">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="border-t pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-medium">{subcategory.name}</h3>
                        <p className="text-sm text-muted-foreground">{subcategory.description}</p>
                      </div>
                      <Link href={`/categories/${subcategory.slug}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          Voir tous
                          <ArrowRightIcon className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {subcategory.tools.map((tool) => (
                        <Link key={tool.id} href={`/outil/${tool.slug}`}>
                          <Card className="p-4 hover:shadow-md transition-shadow h-full">
                            <div className="flex items-start gap-3">
                              {tool.image && (
                                <div className="relative h-16 w-16">
                                  <Image
                                    src={tool.image}
                                    alt={tool.name}
                                    fill
                                    className="object-contain"
                                    sizes="64px"
                                  />
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium">{tool.name}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">{tool.description}</p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

