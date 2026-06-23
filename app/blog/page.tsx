"use client"

import { useState } from "react"
import { 
  FileText, 
  Plus, 
  Search, 
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  Clock,
  Tag
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { notify } from "@/lib/notify"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: { name: string; avatar: string }
  category: string
  status: string
  publishedAt: string | null
  readTime: string
  views: number
}

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "Comment l'IA transforme l'écosystème tech alsacien",
    excerpt: "Découvrez comment les entreprises locales adoptent l'intelligence artificielle pour innover et se démarquer...",
    author: { name: "Marie Martin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    category: "Intelligence Artificielle",
    status: "published",
    publishedAt: "20 Mai 2024",
    readTime: "5 min",
    views: 1234,
  },
  {
    id: 2,
    title: "Les meilleures pratiques DevOps en 2024",
    excerpt: "Un guide complet des outils et méthodologies DevOps qui font la différence dans vos projets...",
    author: { name: "Pierre Dubois", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    category: "DevOps",
    status: "published",
    publishedAt: "18 Mai 2024",
    readTime: "8 min",
    views: 892,
  },
  {
    id: 3,
    title: "Retour sur le meetup Cloud Native Strasbourg",
    excerpt: "Plus de 100 participants pour cette édition exceptionnelle dédiée à Kubernetes et aux architectures cloud...",
    author: { name: "Jean Dupont", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    category: "Évènements",
    status: "draft",
    publishedAt: null,
    readTime: "4 min",
    views: 0,
  },
  {
    id: 4,
    title: "Introduction au Web3 et à la blockchain",
    excerpt: "Comprendre les fondamentaux de la blockchain et ses applications potentielles dans le monde professionnel...",
    author: { name: "Sophie Laurent", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    category: "Blockchain",
    status: "review",
    publishedAt: null,
    readTime: "6 min",
    views: 0,
  },
]

const categories = ["Tous", "Intelligence Artificielle", "DevOps", "Blockchain", "Évènements", "Startups"]
const categoryOptions = categories.filter((c) => c !== "Tous")

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: "", excerpt: "", category: "Intelligence Artificielle" })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Publié</Badge>
      case "draft":
        return <Badge variant="secondary">Brouillon</Badge>
      case "review":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">En révision</Badge>
      default:
        return null
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory !== "Tous" && post.category !== selectedCategory) return false
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const openCreate = () => {
    setEditingId(null)
    setForm({ title: "", excerpt: "", category: "Intelligence Artificielle" })
    setIsDialogOpen(true)
  }

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id)
    setForm({ title: post.title, excerpt: post.excerpt, category: post.category })
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (!form.title.trim()) {
      notify.error("Champ requis", "Veuillez renseigner le titre de l'article.")
      return
    }
    if (editingId !== null) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, title: form.title.trim(), excerpt: form.excerpt.trim(), category: form.category } : p
        )
      )
      notify.updated(form.title.trim())
    } else {
      const newPost: BlogPost = {
        id: Math.max(0, ...posts.map((p) => p.id)) + 1,
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        author: { name: "Jean Dupont", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
        category: form.category,
        status: "draft",
        publishedAt: null,
        readTime: "3 min",
        views: 0,
      }
      setPosts((prev) => [newPost, ...prev])
      notify.created(newPost.title)
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (post: BlogPost) => {
    setPosts((prev) => prev.filter((p) => p.id !== post.id))
    notify.deleted(post.title)
  }

  return (
    <DashboardLayout>
      <PageHeader 
        title="Blog" 
        description="Gérez et publiez vos articles de blog"
        icon={FileText}
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Button>
        }
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "Modifier l'article" : "Nouvel article"}
            </DialogTitle>
            <DialogDescription>
              {editingId !== null
                ? "Mettez à jour le contenu de l'article."
                : "Rédigez un nouvel article. Il sera enregistré en brouillon."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Titre</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre de l'article"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Extrait</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Court résumé de l'article..."
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
                placeholder="Rechercher un article..."
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

      {/* Liste des articles */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="transition-shadow hover:shadow-md">
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(post.status)}
                    <Badge variant="outline" className="text-xs">
                      <Tag className="mr-1 h-3 w-3" />
                      {post.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                    <button type="button" onClick={() => notify.info(post.title, "Ouverture de l'article.")}>{post.title}</button>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{post.author.name}</span>
                    </div>
                    {post.publishedAt && (
                      <>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.publishedAt}</span>
                        </div>
                        <span>{post.readTime} de lecture</span>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views} vues</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => notify.info(post.title, "Ouverture de l'article.")}>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEdit(post)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(post)}>
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
