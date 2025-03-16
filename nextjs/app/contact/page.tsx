import { Button } from "@/components/ui/button"
import { Input as InputUI } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Logo } from "../components/logo"
import React from "react"
import { SearchIconProps } from "../types"

// Déclaration de module pour lucide-react
declare module 'lucide-react';

export default function ContactPage() {
  // Ces données seraient normalement chargées depuis une API ou une base de données
  const contactInfo = {
    address: "123 Avenue de l'Innovation, 75001 Paris, France",
    email: "contact@video-ia.net",
    phone: "+33 1 23 45 67 89",
    socialMedia: {
      twitter: "https://twitter.com/videoianet",
      linkedin: "https://linkedin.com/company/video-ia-net",
      instagram: "https://instagram.com/videoianet",
    },
    hours: "Du lundi au vendredi, de 9h à 18h",
  }

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
              <InputUI placeholder="Rechercher des logiciels..." className="pl-9 w-full" />
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
          <span className="text-foreground">Contact</span>
        </div>
      </div>

      {/* Contenu Principal */}
      <section className="container py-8 pb-16">
        <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Vous avez des questions, des suggestions ou besoin d'assistance ? N'hésitez pas à nous contacter. Notre équipe
          est là pour vous aider.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nom complet
                </label>
                <InputUI id="name" placeholder="Votre nom" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <InputUI id="email" type="email" placeholder="votre.email@exemple.com" required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Sujet
                </label>
                <InputUI id="subject" placeholder="Sujet de votre message" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="Votre message..." className="min-h-[150px]" required />
              </div>
              <Button type="submit" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </Card>

          {/* Informations de contact */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Nos coordonnées</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-muted-foreground">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Heures d'ouverture</h2>
              <p className="text-muted-foreground">{contactInfo.hours}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Suivez-nous</h2>
              <div className="flex gap-4">
                <a
                  href={contactInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-10 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a
                  href={contactInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-10 rounded-full bg-[#0077B5] text-white hover:opacity-90 transition-opacity"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a
                  href={contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90 transition-opacity"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
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

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

