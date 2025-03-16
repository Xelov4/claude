import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tools Directory - Découvrez les Meilleurs Outils d'IA",
  description: "Explorez notre catalogue d'outils d'intelligence artificielle soigneusement sélectionnés pour améliorer votre productivité et votre créativité.",
  keywords: "AI tools, intelligence artificielle, outils IA, productivité, créativité",
  authors: [{ name: "AI Tools Directory" }],
  creator: "AI Tools Directory",
  publisher: "AI Tools Directory",
  robots: "index, follow",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewport: "width=device-width, initial-scale=1",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 bg-gradient-to-b from-background to-background/80">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
