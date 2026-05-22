"use client"

import { useState } from "react"
import { 
  Tag, 
  Plus, 
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Calendar,
  GripVertical
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogTrigger,
} from "@/components/ui/dialog"

const eventTypes = [
  { id: 1, name: "Meetup", slug: "meetup", description: "Rencontres informelles et présentations", events: 45, color: "#1E88E5", icon: "Users", active: true },
  { id: 2, name: "Workshop", slug: "workshop", description: "Ateliers pratiques et formations", events: 28, color: "#7C3AED", icon: "Wrench", active: true },
  { id: 3, name: "Conférence", slug: "conference", description: "Présentations et talks de grande envergure", events: 12, color: "#00C2A8", icon: "Mic", active: true },
  { id: 4, name: "Hackathon", slug: "hackathon", description: "Compétitions de développement", events: 8, color: "#F59E0B", icon: "Code", active: true },
  { id: 5, name: "Networking", slug: "networking", description: "Événements de réseautage professionnel", events: 34, color: "#EC4899", icon: "Users", active: true },
  { id: 6, name: "Webinaire", slug: "webinar", description: "Conférences en ligne", events: 56, color: "#6366F1", icon: "Video", active: true },
  { id: 7, name: "Formation", slug: "training", description: "Sessions de formation approfondies", events: 15, color: "#10B981", icon: "GraduationCap", active: true },
  { id: 8, name: "Afterwork", slug: "afterwork", description: "Rencontres décontractées après le travail", events: 23, color: "#EF4444", icon: "Beer", active: false },
]

export default function GestionTypesEvenementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newType, setNewType] = useState({ name: "", description: "", color: "#1E88E5" })

  const filteredTypes = eventTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalEvents = eventTypes.reduce((acc, t) => acc + t.events, 0)

  return (
    <DashboardLayout>
      <PageHeader 
        title="Types d'évènements" 
        description="Gérez les catégories d'évènements disponibles"
        icon={Tag}
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un type d&apos;évènement</DialogTitle>
                <DialogDescription>
                  Ajoutez une nouvelle catégorie d&apos;évènements.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Nom du type
                  </label>
                  <input
                    type="text"
                    value={newType.name}
                    onChange={(e) => setNewType({ ...newType, name: e.target.value })}
                    placeholder="Ex: Bootcamp"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Description
                  </label>
                  <textarea
                    value={newType.description}
                    onChange={(e) => setNewType({ ...newType, description: e.target.value })}
                    placeholder="Description du type d'évènement..."
                    rows={3}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Couleur
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={newType.color}
                      onChange={(e) => setNewType({ ...newType, color: e.target.value })}
                      className="h-10 w-10 cursor-pointer rounded-lg border border-input"
                    />
                    <input
                      type="text"
                      value={newType.color}
                      onChange={(e) => setNewType({ ...newType, color: e.target.value })}
                      className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Créer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Types d&apos;évènements</p>
                <p className="text-2xl font-bold text-foreground">{eventTypes.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Tag className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Types actifs</p>
                <p className="text-2xl font-bold text-foreground">{eventTypes.filter(t => t.active).length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Tag className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Évènements créés</p>
                <p className="text-2xl font-bold text-foreground">{totalEvents}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des types */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Liste des types</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${type.color}20` }}
                  >
                    <Tag className="h-5 w-5" style={{ color: type.color }} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{type.events} évènements</span>
                  </div>
                  <Badge className={type.active ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"}>
                    {type.active ? "Actif" : "Inactif"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {type.active ? "Désactiver" : "Activer"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
