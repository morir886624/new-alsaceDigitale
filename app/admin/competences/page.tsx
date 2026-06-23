"use client"

import { useState } from "react"
import { 
  Award, 
  Plus, 
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Users,
  GripVertical,
  TrendingUp
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

const skillCategories = [
  {
    id: 1,
    name: "Langages de programmation",
    skills: [
      { id: 1, name: "JavaScript", members: 456 },
      { id: 2, name: "Python", members: 389 },
      { id: 3, name: "TypeScript", members: 312 },
      { id: 4, name: "Java", members: 234 },
      { id: 5, name: "Go", members: 145 },
      { id: 6, name: "Rust", members: 89 },
    ],
    active: true,
  },
  {
    id: 2,
    name: "Frameworks & Libraries",
    skills: [
      { id: 7, name: "React", members: 398 },
      { id: 8, name: "Vue.js", members: 234 },
      { id: 9, name: "Next.js", members: 267 },
      { id: 10, name: "Node.js", members: 345 },
      { id: 11, name: "Django", members: 178 },
      { id: 12, name: "Spring", members: 123 },
    ],
    active: true,
  },
  {
    id: 3,
    name: "Cloud & DevOps",
    skills: [
      { id: 13, name: "AWS", members: 289 },
      { id: 14, name: "Docker", members: 356 },
      { id: 15, name: "Kubernetes", members: 198 },
      { id: 16, name: "Terraform", members: 145 },
      { id: 17, name: "CI/CD", members: 267 },
      { id: 18, name: "Azure", members: 178 },
    ],
    active: true,
  },
  {
    id: 4,
    name: "Data & IA",
    skills: [
      { id: 19, name: "Machine Learning", members: 234 },
      { id: 20, name: "TensorFlow", members: 156 },
      { id: 21, name: "SQL", members: 456 },
      { id: 22, name: "PyTorch", members: 123 },
      { id: 23, name: "Data Analysis", members: 289 },
    ],
    active: true,
  },
  {
    id: 5,
    name: "Design & UX",
    skills: [
      { id: 24, name: "Figma", members: 198 },
      { id: 25, name: "UI/UX Design", members: 234 },
      { id: 26, name: "Prototyping", members: 145 },
    ],
    active: true,
  },
]

export default function GestionCompetencesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", category: "" })
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1, 2, 3])

  const toggleCategory = (id: number) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
  const totalMembers = skillCategories.reduce((acc, cat) => 
    acc + cat.skills.reduce((a, s) => a + s.members, 0), 0
  )

  return (
    <DashboardLayout>
      <PageHeader 
        title="Gestion des compétences" 
        description="Gérez les compétences disponibles pour les profils membres"
        icon={Award}
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle compétence
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une compétence</DialogTitle>
                <DialogDescription>
                  Ajoutez une nouvelle compétence à une catégorie existante.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Nom de la compétence
                  </label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="Ex: GraphQL"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Catégorie
                  </label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {skillCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Ajouter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Catégories</p>
                <p className="text-2xl font-bold text-foreground">{skillCategories.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compétences</p>
                <p className="text-2xl font-bold text-foreground">{totalSkills}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Award className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sélections</p>
                <p className="text-2xl font-bold text-foreground">{formatNumber(totalMembers)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top compétence</p>
                <p className="text-2xl font-bold text-foreground">JavaScript</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une compétence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des catégories et compétences */}
      <div className="space-y-4">
        {skillCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="cursor-pointer" onClick={() => toggleCategory(category.id)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base">{category.name}</CardTitle>
                  <Badge variant="secondary">{category.skills.length} compétences</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={category.active ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"}>
                    {category.active ? "Active" : "Inactive"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter une compétence
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            {expandedCategories.includes(category.id) && (
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {category.skills
                    .filter(skill => 
                      !searchQuery || skill.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((skill) => (
                      <div
                        key={skill.id}
                        className="group flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 transition-colors hover:bg-muted"
                      >
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">({skill.members})</span>
                        <button className="ml-1 hidden text-muted-foreground hover:text-destructive group-hover:inline">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  <button className="flex items-center gap-1 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    <Plus className="h-4 w-4" />
                    Ajouter
                  </button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
