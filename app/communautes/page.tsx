"use client"

import { useState } from "react"
import { 
  Users, 
  Plus, 
  Search,
  MoreHorizontal,
  Settings,
  UserPlus,
  ExternalLink,
  Edit2,
  Trash2,
  Globe,
  Lock,
  MessageSquare
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
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

const communities = [
  {
    id: 1,
    name: "Tech Strasbourg",
    description: "La communauté des passionnés de tech à Strasbourg. Meetups, partage de connaissances et networking.",
    members: 1250,
    posts: 456,
    isPublic: true,
    isMember: true,
    isAdmin: true,
    category: "Général",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    admins: [
      { name: "Jean Dupont", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
      { name: "Marie Martin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    ],
  },
  {
    id: 2,
    name: "AI Alsace",
    description: "Exploration et discussion autour de l'intelligence artificielle, du machine learning et du deep learning.",
    members: 890,
    posts: 234,
    isPublic: true,
    isMember: true,
    isAdmin: false,
    category: "Intelligence Artificielle",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    admins: [
      { name: "Sophie Laurent", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    ],
  },
  {
    id: 3,
    name: "DevOps Club",
    description: "Partage de bonnes pratiques DevOps, CI/CD, containerisation et infrastructure as code.",
    members: 567,
    posts: 189,
    isPublic: false,
    isMember: true,
    isAdmin: false,
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
    admins: [
      { name: "Pierre Dubois", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    ],
  },
  {
    id: 4,
    name: "Startup Founders Alsace",
    description: "Réseau d'entrepreneurs et fondateurs de startups en Alsace. Échanges, conseils et opportunités.",
    members: 345,
    posts: 98,
    isPublic: true,
    isMember: false,
    isAdmin: false,
    category: "Startups",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    admins: [
      { name: "Marie Martin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    ],
  },
  {
    id: 5,
    name: "GreenTech Alsace",
    description: "Technologies vertes et développement durable. Innovations écologiques et impact environnemental.",
    members: 234,
    posts: 67,
    isPublic: true,
    isMember: false,
    isAdmin: false,
    category: "Environnement",
    image: "https://images.unsplash.com/photo-1518173946687-a4c036bc1ae3?w=600&h=400&fit=crop",
    admins: [
      { name: "Sophie Laurent", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    ],
  },
  {
    id: 6,
    name: "Web3 & Blockchain",
    description: "Découverte et discussion autour des technologies blockchain, crypto et Web3.",
    members: 178,
    posts: 45,
    isPublic: false,
    isMember: false,
    isAdmin: false,
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    admins: [
      { name: "Pierre Dubois", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    ],
  },
]

const categories = ["Toutes", "Général", "Intelligence Artificielle", "DevOps", "Startups", "Environnement", "Blockchain"]

export default function CommunautesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Toutes")
  const [filter, setFilter] = useState<"all" | "member" | "admin">("all")

  const filteredCommunities = communities.filter((community) => {
    if (filter === "member" && !community.isMember) return false
    if (filter === "admin" && !community.isAdmin) return false
    if (selectedCategory !== "Toutes" && community.category !== selectedCategory) return false
    if (searchQuery && !community.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <DashboardLayout>
      <PageHeader 
        title="Communautés" 
        description="Rejoignez et gérez vos communautés"
        icon={Users}
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Créer une communauté
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
                placeholder="Rechercher une communauté..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "all" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setFilter("member")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "member" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Mes communautés
                </button>
                <button
                  onClick={() => setFilter("admin")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "admin" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grille des communautés */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCommunities.map((community) => (
          <Card key={community.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={community.image}
                alt={community.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute right-3 top-3">
                {community.isPublic ? (
                  <Badge className="bg-green-500/90 text-white">
                    <Globe className="mr-1 h-3 w-3" />
                    Public
                  </Badge>
                ) : (
                  <Badge className="bg-gray-500/90 text-white">
                    <Lock className="mr-1 h-3 w-3" />
                    Privée
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                    <a href="#">{community.name}</a>
                  </h3>
                  <Badge variant="outline" className="mt-1 text-xs">{community.category}</Badge>
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
                    {community.isAdmin && (
                      <>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Paramètres
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{community.description}</p>
              
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{community.members} membres</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{community.posts} posts</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {community.admins.map((admin, index) => (
                    <Avatar key={index} className="h-7 w-7 border-2 border-background">
                      <AvatarImage src={admin.avatar} alt={admin.name} />
                      <AvatarFallback>{admin.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {community.isMember ? (
                  community.isAdmin ? (
                    <Button variant="secondary" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Gérer
                    </Button>
                  ) : (
                    <Badge className="bg-primary/10 text-primary">Membre</Badge>
                  )
                ) : (
                  <Button size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Rejoindre
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
