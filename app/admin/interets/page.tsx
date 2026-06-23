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
import { notify } from "@/lib/notify"
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
} from "@/components/ui/dialog"

interface Interest {
  id: number
  name: string
  slug: string
  members: number
  color: string
  active: boolean
}

const initialInterests: Interest[] = [
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function GestionInteretsPage() {
  const [interests, setInterests] = useState<Interest[]>(initialInterests)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ name: "", color: "#1E88E5" })

  const filteredInterests = interests.filter(interest =>
    interest.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalMembers = interests.reduce((acc, i) => acc + i.members, 0)

  const openCreate = () => {
    setEditingId(null)
    setForm({ name: "", color: "#1E88E5" })
    setIsDialogOpen(true)
  }

  const openEdit = (interest: Interest) => {
    setEditingId(interest.id)
    setForm({ name: interest.name, color: interest.color })
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (!form.name.trim()) {
      notify.error("Champ requis", "Veuillez renseigner le nom de l'intérêt.")
      return
    }

    if (editingId !== null) {
      setInterests(prev =>
        prev.map(i =>
          i.id === editingId
            ? { ...i, name: form.name.trim(), slug: slugify(form.name), color: form.color }
            : i
        )
      )
      notify.updated(form.name.trim())
    } else {
      const newInterest: Interest = {
        id: Math.max(0, ...interests.map(i => i.id)) + 1,
        name: form.name.trim(),
        slug: slugify(form.name),
        members: 0,
        color: form.color,
        active: true,
      }
      setInterests(prev => [...prev, newInterest])
      notify.created(newInterest.name)
    }
    setIsDialogOpen(false)
  }

  const handleToggle = (interest: Interest) => {
    setInterests(prev =>
      prev.map(i => (i.id === interest.id ? { ...i, active: !i.active } : i))
    )
    notify.toggled(interest.name, !interest.active)
  }

  const handleDelete = (interest: Interest) => {
    setInterests(prev => prev.filter(i => i.id !== interest.id))
    notify.deleted(interest.name)
  }

  return (
    <DashboardLayout>
      <PageHeader 
        title="Gestion des intérêts" 
        description="Gérez les centres d'intérêt disponibles pour les membres"
        icon={Heart}
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel intérêt
          </Button>
        }
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "Modifier l'intérêt" : "Créer un nouvel intérêt"}
            </DialogTitle>
            <DialogDescription>
              {editingId !== null
                ? "Mettez à jour les informations de ce centre d'intérêt."
                : "Ajoutez un nouveau centre d'intérêt pour les membres."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Nom de l&apos;intérêt
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-input"
                />
                <input
                  type="text"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {editingId !== null ? "Enregistrer" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Liste des intérêts</CardTitle>
          <div className="relative w-full sm:w-64">
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
                  <GripVertical className="hidden h-5 w-5 cursor-grab text-muted-foreground sm:block" />
                  <div
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{ backgroundColor: interest.color }}
                  />
                  <div className="min-w-0">
                    <h3 className="truncate font-medium text-foreground">{interest.name}</h3>
                    <p className="text-sm text-muted-foreground">Slug: {interest.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
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
                      <DropdownMenuItem onClick={() => openEdit(interest)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggle(interest)}>
                        {interest.active ? "Désactiver" : "Activer"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(interest)}>
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
