"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, Save, Plus, Trash2 } from "lucide-react"
import { Logo } from "@/app/components/logo"

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("homepage")

  // Données simulées pour les catégories
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Création de Vidéos",
      slug: "creation-videos",
      description:
        "Les outils de création de vidéos alimentés par l'IA révolutionnent la façon dont nous produisons du contenu vidéo...",
      order: 1,
      visible: true,
    },
    {
      id: 2,
      name: "Édition Vidéo",
      slug: "edition-video",
      description:
        "L'édition vidéo assistée par intelligence artificielle transforme radicalement le processus de post-production...",
      order: 2,
      visible: true,
    },
    {
      id: 3,
      name: "Génération de Contenu",
      slug: "generation-contenu",
      description:
        "La génération de contenu vidéo par IA représente une avancée majeure pour les créateurs et les entreprises...",
      order: 3,
      visible: true,
    },
    {
      id: 4,
      name: "Analyse Vidéo",
      slug: "analyse-video",
      description: "L'analyse vidéo propulsée par l'intelligence artificielle offre des capacités sans précédent...",
      order: 4,
      visible: true,
    },
  ])

  // Données simulées pour les outils
  const [tools, setTools] = useState([
    {
      id: 1,
      name: "VideoGenius AI",
      slug: "videogenius-ai",
      description: "Créez des vidéos professionnelles à partir de texte en quelques minutes",
      longDescription:
        "VideoGenius AI est un outil révolutionnaire qui utilise l'intelligence artificielle pour transformer vos textes en vidéos professionnelles...",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.8,
      categoryId: 1,
      tags: ["IA Générative", "Montage", "Gratuit"],
      featured: true,
      pricing: "Freemium",
      website: "https://videogenius-ai.example.com",
    },
    {
      id: 2,
      name: "MontageAI",
      slug: "montage-ai",
      description: "Montage vidéo automatisé avec des transitions intelligentes",
      longDescription:
        "MontageAI est un outil d'édition vidéo qui utilise l'intelligence artificielle pour automatiser le processus de montage...",
      image: "/placeholder.svg?height=200&width=400",
      rating: 4.6,
      categoryId: 1,
      tags: ["Montage", "Transitions", "Premium"],
      featured: false,
      pricing: "Payant",
      website: "https://montage-ai.example.com",
    },
    // Autres outils...
  ])

  // Fonction pour réordonner les catégories
  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(categories)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Mettre à jour l'ordre
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setCategories(updatedItems)
  }

  // État pour l'outil sélectionné
  const [selectedTool, setSelectedTool] = useState(null)

  // État pour la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <div className="text-lg font-semibold">Administration</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Panneau d'Administration</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={activeSection === "homepage" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("homepage")}
                >
                  Page d'Accueil
                </Button>
                <Button
                  variant={activeSection === "tools" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("tools")}
                >
                  Outils
                </Button>
                <Button
                  variant={activeSection === "categories" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("categories")}
                >
                  Catégories
                </Button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-4">
            {/* Page d'Accueil */}
            {activeSection === "homepage" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Gestion de la Page d'Accueil</h2>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="categories-order">
                    <AccordionTrigger>Ordre des Catégories</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Faites glisser les catégories pour modifier leur ordre d'affichage sur la page d'accueil.
                      </p>

                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="categories">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                              {categories
                                .sort((a, b) => a.order - b.order)
                                .map((category, index) => (
                                  <Draggable key={category.id} draggableId={category.id.toString()} index={index}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="flex items-center p-3 border rounded-md bg-white"
                                      >
                                        <div {...provided.dragHandleProps} className="mr-2">
                                          <GripVertical className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium">{category.name}</div>
                                          <div className="text-sm text-muted-foreground">
                                            Position: {category.order}
                                          </div>
                                        </div>
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            checked={category.visible}
                                            onChange={() => {
                                              const updatedCategories = categories.map((c) =>
                                                c.id === category.id ? { ...c, visible: !c.visible } : c,
                                              )
                                              setCategories(updatedCategories)
                                            }}
                                            className="mr-2"
                                          />
                                          <span className="text-sm">Visible</span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>

                      <Button className="mt-4">Enregistrer l'Ordre</Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="hero-section">
                    <AccordionTrigger>Section Héro</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Titre Principal</label>
                          <Input defaultValue="Découvrez les Meilleurs Outils IA pour la Vidéo" className="w-full" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Sous-titre</label>
                          <Input
                            defaultValue="Explorez notre collection d'outils d'intelligence artificielle pour créer, éditer et analyser vos vidéos."
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Texte du Bouton</label>
                          <Input defaultValue="Rechercher" className="w-full" />
                        </div>

                        <Button>
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer les Modifications
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="category-content">
                    <AccordionTrigger>Contenu des Catégories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Sélectionner une Catégorie</label>
                          <Select
                            onValueChange={(value) => {
                              const category = categories.find((c) => c.id === Number.parseInt(value))
                              setSelectedCategory(category)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir une catégorie" />
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

                        {selectedCategory && (
                          <div className="space-y-4 border p-4 rounded-md">
                            <div>
                              <label className="block text-sm font-medium mb-1">Nom de la Catégorie</label>
                              <Input
                                value={selectedCategory.name}
                                onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">Description</label>
                              <Textarea
                                value={selectedCategory.description}
                                onChange={(e) =>
                                  setSelectedCategory({ ...selectedCategory, description: e.target.value })
                                }
                                className="w-full min-h-[100px]"
                              />
                            </div>

                            <Button
                              onClick={() => {
                                const updatedCategories = categories.map((c) =>
                                  c.id === selectedCategory.id ? selectedCategory : c,
                                )
                                setCategories(updatedCategories)
                              }}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Enregistrer les Modifications
                            </Button>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )}

            {/* Outils */}
            {activeSection === "tools" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Gestion des Outils</h2>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tools-list">
                    <AccordionTrigger>Liste des Outils</AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-4">
                        <Input placeholder="Rechercher un outil..." className="w-full" />
                      </div>

                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nom</TableHead>
                              <TableHead>Catégorie</TableHead>
                              <TableHead>Note</TableHead>
                              <TableHead>Mis en Avant</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tools.map((tool) => (
                              <TableRow key={tool.id}>
                                <TableCell className="font-medium">{tool.name}</TableCell>
                                <TableCell>
                                  {categories.find((c) => c.id === tool.categoryId)?.name || "Non catégorisé"}
                                </TableCell>
                                <TableCell>{tool.rating}</TableCell>
                                <TableCell>{tool.featured ? "Oui" : "Non"}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedTool(tool)}>
                                    Modifier
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un Nouvel Outil
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tool-edit">
                    <AccordionTrigger>Modifier un Outil</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Sélectionner un Outil</label>
                          <Select
                            value={selectedTool?.id.toString()}
                            onValueChange={(value) => {
                              const tool = tools.find((t) => t.id === Number.parseInt(value))
                              setSelectedTool(tool)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir un outil" />
                            </SelectTrigger>
                            <SelectContent>
                              {tools.map((tool) => (
                                <SelectItem key={tool.id} value={tool.id.toString()}>
                                  {tool.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedTool && (
                          <div className="space-y-4 border p-4 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Nom de l'Outil</label>
                                <Input
                                  value={selectedTool.name}
                                  onChange={(e) => setSelectedTool({ ...selectedTool, name: e.target.value })}
                                  className="w-full"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-1">Slug</label>
                                <Input
                                  value={selectedTool.slug}
                                  onChange={(e) => setSelectedTool({ ...selectedTool, slug: e.target.value })}
                                  className="w-full"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">Description Courte</label>
                              <Input
                                value={selectedTool.description}
                                onChange={(e) => setSelectedTool({ ...selectedTool, description: e.target.value })}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">Description Longue</label>
                              <Textarea
                                value={selectedTool.longDescription}
                                onChange={(e) => setSelectedTool({ ...selectedTool, longDescription: e.target.value })}
                                className="w-full min-h-[150px]"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Catégorie</label>
                                <Select
                                  value={selectedTool.categoryId.toString()}
                                  onValueChange={(value) =>
                                    setSelectedTool({ ...selectedTool, categoryId: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choisir une catégorie" />
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
                                <label className="block text-sm font-medium mb-1">Note</label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="5"
                                  step="0.1"
                                  value={selectedTool.rating}
                                  onChange={(e) =>
                                    setSelectedTool({ ...selectedTool, rating: Number.parseFloat(e.target.value) })
                                  }
                                  className="w-full"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Prix</label>
                                <Select
                                  value={selectedTool.pricing}
                                  onValueChange={(value) => setSelectedTool({ ...selectedTool, pricing: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choisir un modèle de prix" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Gratuit">Gratuit</SelectItem>
                                    <SelectItem value="Freemium">Freemium</SelectItem>
                                    <SelectItem value="Payant">Payant</SelectItem>
                                    <SelectItem value="Essai Gratuit">Essai Gratuit</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-1">Site Web</label>
                                <Input
                                  value={selectedTool.website}
                                  onChange={(e) => setSelectedTool({ ...selectedTool, website: e.target.value })}
                                  className="w-full"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">Tags</label>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {selectedTool.tags.map((tag, index) => (
                                  <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                                    <span className="text-sm">{tag}</span>
                                    <button
                                      className="ml-2 text-gray-500 hover:text-red-500"
                                      onClick={() => {
                                        const newTags = [...selectedTool.tags]
                                        newTags.splice(index, 1)
                                        setSelectedTool({ ...selectedTool, tags: newTags })
                                      }}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Input placeholder="Ajouter un tag..." className="w-full" id="new-tag" />
                                <Button
                                  onClick={() => {
                                    const input = document.getElementById("new-tag") as HTMLInputElement
                                    if (input.value) {
                                      setSelectedTool({
                                        ...selectedTool,
                                        tags: [...selectedTool.tags, input.value],
                                      })
                                      input.value = ""
                                    }
                                  }}
                                >
                                  Ajouter
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedTool.featured}
                                onChange={() => setSelectedTool({ ...selectedTool, featured: !selectedTool.featured })}
                                id="featured"
                                className="mr-2"
                              />
                              <label htmlFor="featured" className="text-sm font-medium">
                                Mettre en avant sur la page d'accueil
                              </label>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setSelectedTool(null)}>
                                Annuler
                              </Button>
                              <Button
                                onClick={() => {
                                  const updatedTools = tools.map((t) => (t.id === selectedTool.id ? selectedTool : t))
                                  setTools(updatedTools)
                                }}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Enregistrer les Modifications
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )}

            {/* Catégories */}
            {activeSection === "categories" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Gestion des Catégories</h2>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="categories-list">
                    <AccordionTrigger>Liste des Catégories</AccordionTrigger>
                    <AccordionContent>
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nom</TableHead>
                              <TableHead>Slug</TableHead>
                              <TableHead>Nombre d'Outils</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {categories.map((category) => (
                              <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>{category.slug}</TableCell>
                                <TableCell>{tools.filter((t) => t.categoryId === category.id).length}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(category)}>
                                    Modifier
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une Nouvelle Catégorie
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="category-edit">
                    <AccordionTrigger>Modifier une Catégorie</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Sélectionner une Catégorie</label>
                          <Select
                            value={selectedCategory?.id.toString()}
                            onValueChange={(value) => {
                              const category = categories.find((c) => c.id === Number.parseInt(value))
                              setSelectedCategory(category)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir une catégorie" />
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

                        {selectedCategory && (
                          <div className="space-y-4 border p-4 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Nom de la Catégorie</label>
                                <Input
                                  value={selectedCategory.name}
                                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                                  className="w-full"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-1">Slug</label>
                                <Input
                                  value={selectedCategory.slug}
                                  onChange={(e) => setSelectedCategory({ ...selectedCategory, slug: e.target.value })}
                                  className="w-full"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">Description</label>
                              <Textarea
                                value={selectedCategory.description}
                                onChange={(e) =>
                                  setSelectedCategory({ ...selectedCategory, description: e.target.value })
                                }
                                className="w-full min-h-[150px]"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">Outils Mis en Avant</label>
                              <div className="border rounded-md overflow-hidden">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Nom</TableHead>
                                      <TableHead>Note</TableHead>
                                      <TableHead>Mis en Avant</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {tools
                                      .filter((tool) => tool.categoryId === selectedCategory.id)
                                      .map((tool) => (
                                        <TableRow key={tool.id}>
                                          <TableCell className="font-medium">{tool.name}</TableCell>
                                          <TableCell>{tool.rating}</TableCell>
                                          <TableCell>
                                            <input
                                              type="checkbox"
                                              checked={tool.featured}
                                              onChange={() => {
                                                const updatedTools = tools.map((t) =>
                                                  t.id === tool.id ? { ...t, featured: !t.featured } : t,
                                                )
                                                setTools(updatedTools)
                                              }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                                Annuler
                              </Button>
                              <Button
                                onClick={() => {
                                  const updatedCategories = categories.map((c) =>
                                    c.id === selectedCategory.id ? selectedCategory : c,
                                  )
                                  setCategories(updatedCategories)
                                }}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Enregistrer les Modifications
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

