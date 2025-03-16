import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ArrowRightIcon, SearchIcon, FilterIcon, StarIcon, CheckIcon, ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

export default function TagPage({ params }: { params: { slug: string } }) {
  // This would normally come from your database
  const tagName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header - Same as homepage */}
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
            <Button>Submit Tool</Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tags" className="hover:text-foreground transition-colors">
            Tags
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{tagName}</span>
        </div>
      </div>

      {/* Tag Header */}
      <section className="container py-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-3">AI Tools Tagged with "{tagName}"</h1>
          <p className="text-lg text-muted-foreground">
            Explore the best AI tools that use {tagName.toLowerCase()} technology to enhance your workflow.
          </p>
        </div>
      </section>

      {/* Related Tags */}
      <section className="container pb-8">
        <h2 className="text-lg font-medium mb-3">Related Tags</h2>
        <div className="flex flex-wrap gap-2">
          {["Natural Language Processing", "Machine Learning", "Text Generation", "AI Assistant", "Chatbot"].map(
            (relatedTag) => (
              <Link href={`/tags/${relatedTag.toLowerCase().replace(/\s+/g, "-")}`} key={relatedTag}>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted px-3 py-1 text-sm">
                  {relatedTag}
                </Badge>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* Featured Tool */}
      <section className="container pb-12">
        <Card className="overflow-hidden border-2 border-primary/10">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 bg-muted relative">
              <div className="relative w-full h-full">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Featured tool screenshot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-3/5 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Tool logo"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">AI Assistant Pro</h2>
                    <Badge>Featured</Badge>
                  </div>
                  <div className="flex items-center text-amber-500">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span className="text-xs ml-1">4.8</span>
                    <span className="text-muted-foreground text-xs ml-1">(124 reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                An advanced AI assistant that helps with writing, research, and creative tasks using the latest GPT-4
                technology.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {[
                  "Advanced GPT-4 powered responses",
                  "Multi-language support",
                  "Content generation",
                  "Research assistance",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <CheckIcon className="h-3 w-3" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                <Badge variant="secondary" className="text-xs">
                  GPT-4
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Writing
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Free
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button className="gap-1" size="sm">
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                  Visit Website
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  View Details
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Main Content */}
      <section className="container pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Reset
              </Button>
            </div>

            {/* Categories Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="space-y-2">
                {["Chat", "Art Generation", "Content Creation", "Productivity", "Research"].map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Show more
              </Button>
            </div>

            {/* For Who Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">For Who</h3>
              <div className="space-y-2">
                {["Developers", "Designers", "Writers", "Marketers", "Students"].map((who) => (
                  <div key={who} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`who-${who}`}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`who-${who}`} className="ml-2 text-sm">
                      {who}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Show more
              </Button>
            </div>

            {/* Pricing Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Pricing</h3>
              <div className="space-y-2">
                {["Free", "Freemium", "Paid", "Free Trial"].map((pricing) => (
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

          {/* Tools Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{tagName} Tools</h2>
                <p className="text-sm text-muted-foreground mt-1">Showing 1-12 of 78 tools</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  <FilterIcon className="h-4 w-4" />
                  Sort by
                </Button>
                <Button variant="outline" size="icon" className="md:hidden">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <ToolCard key={index} />
                ))}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ArrowRightIcon className="h-4 w-4 rotate-180" />
                </Button>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  3
                </Button>
                <span className="mx-1">...</span>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  8
                </Button>
                <Button variant="outline" size="icon">
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tag Description */}
      <section className="container pb-16 border-t border-border/40 pt-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About {tagName} Technology</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              {tagName} technology represents one of the most significant advancements in artificial intelligence in
              recent years. This powerful language model has revolutionized how AI tools can understand and generate
              human-like text, making it possible to create more intuitive and helpful applications.
            </p>
            <p>
              AI tools that leverage {tagName} technology can save users significant time and effort by automating
              complex tasks that would otherwise require extensive manual work. From generating high-quality content to
              providing insightful analysis of large text datasets, these tools dramatically increase productivity
              across various industries.
            </p>
            <p>
              The efficiency gains from using {tagName}-powered AI tools are substantial. Tasks that might have taken
              hours or even days can now be completed in minutes, allowing professionals to focus on more strategic and
              creative aspects of their work. This time-saving capability is particularly valuable in fast-paced
              environments where quick turnaround times are essential.
            </p>
            <p>
              As {tagName} technology continues to evolve, we can expect even more sophisticated applications that
              further enhance productivity and creativity, making it an essential component of modern digital workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Same as homepage */}
      <footer className="border-t border-border/40 bg-muted/40">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">AI Tools Directory</h3>
              <p className="text-sm text-muted-foreground">
                Your go-to resource for discovering the best AI tools for your needs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/tags" className="text-muted-foreground hover:text-foreground transition-colors">
                    Tags
                  </Link>
                </li>
                <li>
                  <Link href="/for-who" className="text-muted-foreground hover:text-foreground transition-colors">
                    For Who
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Popular Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/categories/chat"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/art-generation"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Art Generation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/content-creation"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Content Creation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/productivity"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Productivity
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                    Submit a Tool
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Tools Directory. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ToolCard() {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="aspect-video relative bg-muted">
        <img src="/placeholder.svg?height=200&width=400" alt="Tool thumbnail" className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2">Chat</Badge>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-1">AI Assistant Pro</h3>
          <div className="flex items-center text-amber-500">
            <StarIcon className="h-4 w-4 fill-current" />
            <span className="text-xs ml-1">4.8</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          An advanced AI assistant that helps with writing, research, and creative tasks using the latest GPT-4
          technology.
        </p>
        <div className="flex flex-wrap gap-1 mt-auto mb-3">
          <Badge variant="secondary" className="text-xs">
            GPT-4
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Writing
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Free
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="w-full gap-1">
          View Details
          <ArrowRightIcon className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  )
}

