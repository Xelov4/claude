import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">AI Tools Directory</h3>
            <p className="text-sm text-muted-foreground">
              Votre ressource incontournable pour découvrir les meilleurs outils d'IA adaptés à vos besoins.
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
                <Link href="/tags" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tags
                </Link>
              </li>
              <li>
                <Link href="/for-who" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pour Qui
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Catégories Populaires</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                  Chat
                </Link>
              </li>
              <li>
                <Link href="/categories/art-generation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Génération d'Art
                </Link>
              </li>
              <li>
                <Link href="/categories/content-creation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Création de Contenu
                </Link>
              </li>
              <li>
                <Link href="/categories/productivity" className="text-muted-foreground hover:text-foreground transition-colors">
                  Productivité
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                  Soumettre un Outil
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Tools Directory. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Conditions d'Utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 