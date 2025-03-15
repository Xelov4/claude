import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  // This would normally come from your database based on the slug
  const toolName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
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
          <Link href="/categories/chat" className="hover:text-foreground transition-colors">
            Chat
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">AI Assistant Pro</span>
        </div>
      </div>

      {/* Tool Header */}
      <section className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="flex items-start gap-4">
              <div className="size-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="AI Assistant Pro logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-bold">AI Assistant Pro</h1>
                  <Badge>Chat</Badge>
                  <div className="flex items-center text-amber-500">
                    <StarIcon className="h-5 w-5 fill-current" />
                    <span className="font-medium ml-1">4.8</span>
                    <span className="text-muted-foreground text-sm ml-1">(124 reviews)</span>
                  </div>
                </div>
                <p className="mt-2 text-lg text-muted-foreground">
                  An advanced AI assistant that helps with writing, research, and creative tasks.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-3">
            <Button className="w-full gap-2" size="lg">
              <ExternalLinkIcon className="h-4 w-4" />
              Visit Website
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-1">
                <BookmarkIcon className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="flex-1 gap-1">
                <ShareIcon className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Tool Details */}
          <div className="w-full md:w-2/3 space-y-10">
            {/* Tool Screenshot */}
            <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="AI Assistant Pro screenshot"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Description</h2>
              <div className="prose prose-sm max-w-none">
                <p>
                  AI Assistant Pro is a cutting-edge artificial intelligence tool powered by GPT-4 technology. It's
                  designed to help users with a wide range of tasks including content creation, research, brainstorming,
                  and more.
                </p>
                <p>
                  With its advanced natural language processing capabilities, AI Assistant Pro can understand complex
                  instructions and generate high-quality, contextually relevant responses. Whether you're a writer
                  looking for creative inspiration, a researcher needing to summarize complex information, or a
                  professional trying to draft emails more efficiently, AI Assistant Pro can help streamline your
                  workflow.
                </p>
                <p>
                  The tool integrates seamlessly with popular platforms and applications, allowing you to enhance your
                  productivity without disrupting your existing processes. Its intuitive interface makes it accessible
                  to users of all technical backgrounds, while its powerful AI engine ensures professional-quality
                  results every time.
                </p>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Connect with AI Assistant Pro</h2>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/company/ai-assistant-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-12 rounded-full bg-[#0077B5] text-white hover:opacity-90 transition-opacity"
                >
                  <LinkedinIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/aiassistantpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-12 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
                >
                  <TwitterIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com/aiassistantpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90 transition-opacity"
                >
                  <InstagramIcon className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Key Features Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Advanced GPT-4 Technology",
                    description: "Powered by the latest GPT-4 model for human-like text generation and understanding.",
                  },
                  {
                    title: "Multi-language Support",
                    description: "Communicate in over 40 languages with high-quality translations and responses.",
                  },
                  {
                    title: "Content Generation",
                    description:
                      "Create blog posts, social media content, emails, and more with customizable tone and style.",
                  },
                  {
                    title: "Research Assistant",
                    description: "Summarize articles, extract key information, and get help with academic research.",
                  },
                  {
                    title: "Memory & Context",
                    description:
                      "The AI remembers previous conversations to provide more relevant and contextual responses.",
                  },
                  {
                    title: "API Access",
                    description:
                      "Integrate AI Assistant Pro into your own applications with our developer-friendly API.",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="p-5">
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

            {/* Key Use Cases Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Content Creation",
                    description:
                      "Generate blog posts, social media content, and marketing copy with customizable tone and style.",
                    image: "/placeholder.svg?height=200&width=400",
                  },
                  {
                    title: "Research Assistance",
                    description:
                      "Summarize articles, extract key information, and get help with academic or professional research.",
                    image: "/placeholder.svg?height=200&width=400",
                  },
                  {
                    title: "Email Writing",
                    description:
                      "Draft professional emails, follow-ups, and responses with appropriate tone and formatting.",
                    image: "/placeholder.svg?height=200&width=400",
                  },
                  {
                    title: "Creative Writing",
                    description:
                      "Get help with story ideas, character development, dialogue, and overcoming writer's block.",
                    image: "/placeholder.svg?height=200&width=400",
                  },
                ].map((useCase, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video bg-muted">
                      <img
                        src={useCase.image || "/placeholder.svg"}
                        alt={useCase.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Related Tools Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((tool) => (
                  <Card key={tool} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="aspect-video relative bg-muted">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Tool thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2">Chat</Badge>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold line-clamp-1">ChatGenius AI</h3>
                        <div className="flex items-center text-amber-500">
                          <StarIcon className="h-4 w-4 fill-current" />
                          <span className="text-xs ml-1">4.6</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        Another powerful AI assistant with focus on conversational abilities and natural language
                        understanding.
                      </p>
                      <div className="flex flex-wrap gap-1 mt-auto mb-3">
                        <Badge variant="secondary" className="text-xs">
                          GPT-4
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Chat
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
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Quick Info */}
            <Card className="p-5">
              <h3 className="font-semibold mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <TagIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pricing</h4>
                    <p className="text-sm text-muted-foreground">Free tier available, Pro plan starts at $19/month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UsersIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Target Audience</h4>
                    <p className="text-sm text-muted-foreground">Writers, Researchers, Students, Professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CalendarIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Last Updated</h4>
                    <p className="text-sm text-muted-foreground">March 10, 2025</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-5">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["GPT-4", "Writing", "Research", "Content Creation", "AI Assistant", "Free", "Productivity"].map(
                  (tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-muted">
                      {tag}
                    </Badge>
                  ),
                )}
              </div>
            </Card>

            {/* For Who */}
            <Card className="p-5">
              <h3 className="font-semibold mb-3">For Who</h3>
              <div className="space-y-3">
                {[
                  { name: "Writers", description: "Content creators looking to streamline their writing process" },
                  {
                    name: "Researchers",
                    description: "Academics and professionals who need to process information quickly",
                  },
                  { name: "Students", description: "Learners who need help with assignments and study materials" },
                  {
                    name: "Professionals",
                    description: "Business people who need to draft emails and documents efficiently",
                  },
                ].map((audience, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <UsersIcon className="h-3 w-3" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{audience.name}</div>
                      <div className="text-xs text-muted-foreground">{audience.description}</div>
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

function SearchIcon({ className }) {
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

function Input(props) {
  return (
    <input
      type="text"
      className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`}
      {...props}
    />
  )
}

