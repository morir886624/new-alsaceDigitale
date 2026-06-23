"use client"

import { useState } from "react"
import { 
  Heart, 
  Plus, 
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Users,
  GripVertical
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { formatNumber } from "@/lib/utils"
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

const interests = [
  { id: 1, name: "Intelligence Artificielle", slug: "ia", members: 456, color: "#1E88E5", active: true },
  { id: 2, name: "DevOps & Cloud", slug: "devops", members: 389, color: "#00C2A8", active: true },
  { id: 3, name: "Développement Web", slug: "web", members: 567, color: "#7C3AED", active: true },
  { id: 4, name: "Mobile & IoT", slug: "mobile", members: 234, color: "#F59E0B", active: true },
  { id: 5, name: "Data Science", slug: "data", members: 312, color: "#EF4444", active: true },
  { id: 6, name: "Cybersécurité", slug: "security", members: 198, color: "#10B981", active: true },
  { id: 7, name: "Blockchain & Web3", slug: "blockchain", members: 145, color: "#6366F1", active: true },
  { id: 8, name: "Design & UX", slug: "design", members: 278, color: "#EC4899", active: true },
  { id: 9, name: "Startups & Entrepreneuriat", slug: "startup", members: 423, color: "#F97316", active: true },
  { id: 10, name: "Green Tech", slug: "green", members: 167, color: "#22C55E", active: false },
]

export default function GestionInteretsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newInterest, setNewInterest] = useState({ name: "", color: "#1E88E5" })

  const filteredInterests = interests.filter(interest =>
    interest.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalMembers = interests.reduce((acc, i) => acc + i.members, 0)

  return (
    <DashboardLayout>
      <PageHeader 
        title="Gestion des intérêts" 
        description="Gérez les centres d'intérêt disponibles pour les membres"
        icon={Heart}
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvel intérêt
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un nouvel intérêt</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau centre d&apos;intérêt pour les membres.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Nom de l&apos;intérêt
                  </label>
                  <input
                    type="text"
                    value={newInterest.name}
                    onChange={(e) => setNewInterest({ ...newInterest, name: e.target.value })}
                    placeholder="Ex: Réalité Virtuelle"
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
                      value={newInterest.color}
                      onChange={(e) => setNewInterest({ ...newInterest, color: e.target.value })}
                      className="h-10 w-10 cursor-pointer rounded-lg border border-input"
                    />
                    <input
                      type="text"
                      value={newInterest.color}
                      onChange={(e) => setNewInterest({ ...newInterest, color: e.target.value })}
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
                <p className="text-sm text-muted-foreground">Total intérêts</p>
                <p className="text-2xl font-bold text-foreground">{interests.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Intérêts actifs</p>
                <p className="text-2xl font-bold text-foreground">{interests.filter(i => i.active).length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Heart className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sélections totales</p>
                <p className="text-2xl font-bold text-foreground">{formatNumber(totalMembers)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des intérêts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Liste des intérêts</CardTitle>
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
            {filteredInterests.map((interest) => (
              <div
                key={interest.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: interest.color }}
                  />
                  <div>
                    <h3 className="font-medium text-foreground">{interest.name}</h3>
                    <p className="text-sm text-muted-foreground">Slug: {interest.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{interest.members} membres</span>
                  </div>
                  <Badge className={interest.active ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"}>
                    {interest.active ? "Actif" : "Inactif"}
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
                        {interest.active ? "Désactiver" : "Activer"}
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
