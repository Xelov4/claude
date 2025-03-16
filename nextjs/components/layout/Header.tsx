import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-foreground/80 flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span className="font-semibold text-xl">AI Tools Directory</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </Link>
            <Link href="/tags" className="text-muted-foreground hover:text-foreground transition-colors">
              Tags
            </Link>
            <Link href="/for-who" className="text-muted-foreground hover:text-foreground transition-colors">
              For Who
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tools..." className="pl-9 w-full" />
          </div>
          <Button variant="outline" size="icon" className="md:hidden">
            <SearchIcon className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/submit">Submit Tool</Link>
          </Button>
        </div>
      </div>
    </header>
  )
} 