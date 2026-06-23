"use client"

import { useState } from "react"
import { 
  Newspaper, 
  Plus, 
  Search, 
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  Clock,
  TrendingUp,
  ExternalLink
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { notify } from "@/lib/notify"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  category: string
  status: string
  publishedAt: string | null
  featured: boolean
  views: number
  image: string
}

const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "Alsace Digitale lève 2M d'euros pour son programme d'incubation",
    excerpt: "Notre association a obtenu un financement important pour développer son programme d'accompagnement des startups tech en Alsace.",
    category: "Association",
    status: "published",
    publishedAt: "21 Mai 2024",
    featured: true,
    views: 3456,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Nouveau partenariat avec l'Université de Strasbourg",
    excerpt: "Un accord de collaboration a été signé pour renforcer les liens entre le monde académique et l'écosystème tech local.",
    category: "Partenariats",
    status: "published",
    publishedAt: "19 Mai 2024",
    featured: false,
    views: 1892,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Lancement de la communauté GreenTech Alsace",
    excerpt: "Une nouvelle communauté dédiée aux technologies vertes et au développement durable voit le jour au sein de notre association.",
    category: "Communautés",
    status: "published",
    publishedAt: "17 Mai 2024",
    featured: false,
    views: 1245,
    image: "https://images.unsplash.com/photo-1518173946687-a4c036bc1ae3?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Hackathon Climate Tech : inscriptions ouvertes",
    excerpt: "Rejoignez-nous pour 48h d'innovation dédiées aux solutions technologiques face au changement climatique.",
    category: "Évènements",
    status: "draft",
    publishedAt: null,
    featured: false,
    views: 0,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
  },
]

const categories = ["Toutes", "Association", "Partenariats", "Communautés", "Évènements"]
const categoryOptions = categories.filter((c) => c !== "Toutes")

export default function ActualitesPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Toutes")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: "", excerpt: "", category: "Association", featured: false })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Publié</Badge>
      case "draft":
        return <Badge variant="secondary">Brouillon</Badge>
      default:
        return null
    }
  }

  const filteredNews = news.filter((item) => {
    if (selectedCategory !== "Toutes" && item.category !== selectedCategory) return false
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const openCreate = () => {
    setEditingId(null)
    setForm({ title: "", excerpt: "", category: "Association", featured: false })
    setIsDialogOpen(true)
  }

  const openEdit = (item: NewsItem) => {
    setEditingId(item.id)
    setForm({ title: item.title, excerpt: item.excerpt, category: item.category, featured: item.featured })
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (!form.title.trim()) {
      notify.error("Champ requis", "Veuillez renseigner le titre de l'actualité.")
      return
    }
    if (editingId !== null) {
      setNews((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? { ...n, title: form.title.trim(), excerpt: form.excerpt.trim(), category: form.category, featured: form.featured }
            : n
        )
      )
      notify.updated(form.title.trim())
    } else {
      const newItem: NewsItem = {
        id: Math.max(0, ...news.map((n) => n.id)) + 1,
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        category: form.category,
        status: "draft",
        publishedAt: null,
        featured: form.featured,
        views: 0,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
      }
      setNews((prev) => [newItem, ...prev])
      notify.created(newItem.title)
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (item: NewsItem) => {
    setNews((prev) => prev.filter((n) => n.id !== item.id))
    notify.deleted(item.title)
  }

  return (
    <DashboardLayout>
      <PageHeader 
        title="Actualités" 
        description="Gérez les actualités de l'association"
        icon={Newspaper}
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle actualité
          </Button>
        }
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "Modifier l'actualité" : "Nouvelle actualité"}
            </DialogTitle>
            <DialogDescription>
              {editingId !== null
                ? "Mettez à jour cette actualité."
                : "Rédigez une nouvelle actualité. Elle sera enregistrée en brouillon."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Titre</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre de l'actualité"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Extrait</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Court résumé de l'actualité..."
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 rounded border-input"
              />
              Mettre à la une
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSubmit}>{editingId !== null ? "Enregistrer" : "Créer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une actualité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille des actualités */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredNews.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {item.featured && (
                <div className="absolute left-3 top-3">
                  <Badge className="bg-primary text-primary-foreground">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    À la une
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                {getStatusBadge(item.status)}
                <Badge variant="outline" className="text-xs">{item.category}</Badge>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2 hover:text-primary">
                <button type="button" onClick={() => notify.info(item.title, "Ouverture de l'actualité.")}>{item.title}</button>
              </h3>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {item.publishedAt && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.publishedAt}</span>
                    </div>
                  )}
                  {item.views > 0 && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views} vues</span>
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => notify.info(item.title, "Ouverture de l'actualité.")}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Voir
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEdit(item)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(item)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
