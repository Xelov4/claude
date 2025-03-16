export const siteConfig = {
  name: "AI Tools Directory",
  description: "Votre ressource incontournable pour découvrir les meilleurs outils d'IA adaptés à vos besoins.",
  url: "https://www.video-ia.net",
  ogImage: "https://www.video-ia.net/og.jpg",
  links: {
    twitter: "https://twitter.com/video_ia_net",
    github: "https://github.com/video-ia",
  },
  creator: "AI Tools Directory",
  keywords: [
    "AI",
    "intelligence artificielle",
    "outils IA",
    "productivité",
    "créativité",
    "automatisation",
    "machine learning",
    "deep learning",
  ],
  defaultPerPage: 12,
  maxDescriptionLength: 160,
  maxTitleLength: 60,
} as const

export const navItems = [
  { title: "Accueil", href: "/" },
  { title: "Catégories", href: "/categories" },
  { title: "Tags", href: "/tags" },
  { title: "Pour Qui", href: "/for-who" },
] as const

export const footerCategories = [
  { title: "Chat", href: "/categories/chat" },
  { title: "Génération d'Art", href: "/categories/art-generation" },
  { title: "Création de Contenu", href: "/categories/content-creation" },
  { title: "Productivité", href: "/categories/productivity" },
] as const

export const footerLinks = [
  { title: "À Propos", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Soumettre un Outil", href: "/submit" },
  { title: "Politique de Confidentialité", href: "/privacy" },
  { title: "Conditions d'Utilisation", href: "/terms" },
] as const 