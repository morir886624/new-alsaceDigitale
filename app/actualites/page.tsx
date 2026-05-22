"use client"

import { useState } from "react"
import { 
  Newspaper, 
  Plus, 
  Search, 
  Filter,
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
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const newsItems = [
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

export default function ActualitesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Toutes")

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

  return (
    <DashboardLayout>
      <PageHeader 
        title="Actualités" 
        description="Gérez les actualités de l'association"
        icon={Newspaper}
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle actualité
          </Button>
        }
      />

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
              <Button variant="outline" size="sm" className="ml-2">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille des actualités */}
      <div className="grid gap-6 md:grid-cols-2">
        {newsItems.map((news) => (
          <Card key={news.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {news.featured && (
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
                {getStatusBadge(news.status)}
                <Badge variant="outline" className="text-xs">{news.category}</Badge>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2 hover:text-primary">
                <a href="#">{news.title}</a>
              </h3>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{news.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {news.publishedAt && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{news.publishedAt}</span>
                    </div>
                  )}
                  {news.views > 0 && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{news.views} vues</span>
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
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Voir
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
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
