"use client"

import { useState } from "react"
import { 
  UserCog, 
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash2,
  Mail,
  Shield,
  ShieldOff,
  Eye,
  Download,
  UserPlus
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
  DropdownMenuSeparator,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

interface AppUser {
  id: number
  name: string
  email: string
  role: string
  plan: string
  status: string
  joinedAt: string
  lastLogin: string
  avatar: string
}

const initialUsers: AppUser[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    role: "admin",
    plan: "Premium",
    status: "active",
    joinedAt: "15 Mars 2020",
    lastLogin: "21 Mai 2024",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@email.com",
    role: "member",
    plan: "Membre",
    status: "active",
    joinedAt: "22 Juin 2021",
    lastLogin: "20 Mai 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Pierre Dubois",
    email: "pierre.dubois@email.com",
    role: "member",
    plan: "Gratuit",
    status: "active",
    joinedAt: "10 Jan 2022",
    lastLogin: "19 Mai 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    role: "moderator",
    plan: "Premium",
    status: "active",
    joinedAt: "5 Sep 2021",
    lastLogin: "18 Mai 2024",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Lucas Weber",
    email: "lucas.weber@email.com",
    role: "member",
    plan: "Membre",
    status: "inactive",
    joinedAt: "12 Avr 2023",
    lastLogin: "10 Avr 2024",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Emma Schmidt",
    email: "emma.schmidt@email.com",
    role: "member",
    plan: "Gratuit",
    status: "pending",
    joinedAt: "20 Mai 2024",
    lastLogin: "-",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Thomas Muller",
    email: "thomas.muller@email.com",
    role: "member",
    plan: "Membre",
    status: "active",
    joinedAt: "8 Nov 2022",
    lastLogin: "17 Mai 2024",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Julie Bernard",
    email: "julie.bernard@email.com",
    role: "member",
    plan: "Premium",
    status: "suspended",
    joinedAt: "14 Fév 2021",
    lastLogin: "1 Mai 2024",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
]

const stats = [
  { label: "Total utilisateurs", value: "839", change: "+12 ce mois" },
  { label: "Utilisateurs actifs", value: "756", change: "90% du total" },
  { label: "Nouveaux ce mois", value: "45", change: "+15% vs mois dernier" },
  { label: "Admins", value: "5", change: "3 modérateurs" },
]

export default function ListeUtilisateursPage() {
  const [users, setUsers] = useState<AppUser[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "member" })
  const [editingUser, setEditingUser] = useState<AppUser | null>(null)
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "member", plan: "Gratuit" })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500/10 text-red-600">Admin</Badge>
      case "moderator":
        return <Badge className="bg-amber-500/10 text-amber-600">Modérateur</Badge>
      default:
        return <Badge variant="secondary">Membre</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600">Actif</Badge>
      case "inactive":
        return <Badge className="bg-gray-500/10 text-gray-600">Inactif</Badge>
      case "pending":
        return <Badge className="bg-blue-500/10 text-blue-600">En attente</Badge>
      case "suspended":
        return <Badge className="bg-red-500/10 text-red-600">Suspendu</Badge>
      default:
        return null
    }
  }

  const filteredUsers = users.filter((user) => {
    if (roleFilter !== "all" && user.role !== roleFilter) return false
    if (statusFilter !== "all" && user.status !== statusFilter) return false
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    )
  }

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id))
    }
  }

  const handleInvite = () => {
    if (!inviteForm.name.trim()) {
      notify.error("Champ requis", "Veuillez renseigner le nom.")
      return
    }
    if (!inviteForm.email.trim() || !inviteForm.email.includes("@")) {
      notify.error("Email invalide", "Veuillez renseigner un email valide.")
      return
    }
    const newUser: AppUser = {
      id: Math.max(0, ...users.map(u => u.id)) + 1,
      name: inviteForm.name.trim(),
      email: inviteForm.email.trim(),
      role: inviteForm.role,
      plan: "Gratuit",
      status: "pending",
      joinedAt: "À l'instant",
      lastLogin: "-",
      avatar: "",
    }
    setUsers(prev => [newUser, ...prev])
    notify.invited(newUser.email)
    setInviteForm({ name: "", email: "", role: "member" })
    setIsInviteOpen(false)
  }

  const openEdit = (user: AppUser) => {
    setEditingUser(user)
    setEditForm({ name: user.name, email: user.email, role: user.role, plan: user.plan })
  }

  const handleEditSubmit = () => {
    if (!editingUser) return
    if (!editForm.name.trim()) {
      notify.error("Champ requis", "Veuillez renseigner le nom.")
      return
    }
    setUsers(prev =>
      prev.map(u =>
        u.id === editingUser.id
          ? { ...u, name: editForm.name.trim(), email: editForm.email.trim(), role: editForm.role, plan: editForm.plan }
          : u
      )
    )
    notify.updated(editForm.name.trim())
    setEditingUser(null)
  }

  const handlePromote = (user: AppUser) => {
    setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, role: "admin" } : u)))
    notify.success("Rôle mis à jour", `${user.name} est désormais administrateur.`)
  }

  const handleSuspend = (user: AppUser) => {
    const nextStatus = user.status === "suspended" ? "active" : "suspended"
    setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, status: nextStatus } : u)))
    if (nextStatus === "suspended") {
      notify.success("Utilisateur suspendu", `${user.name} a été suspendu.`)
    } else {
      notify.success("Suspension levée", `${user.name} est de nouveau actif.`)
    }
  }

  const handleDelete = (user: AppUser) => {
    setUsers(prev => prev.filter(u => u.id !== user.id))
    setSelectedUsers(prev => prev.filter(id => id !== user.id))
    notify.deleted(user.name)
  }

  const handleBulkEmail = () => {
    notify.sent(`${selectedUsers.length} utilisateur(s)`)
  }

  const handleBulkRole = () => {
    setUsers(prev =>
      prev.map(u => (selectedUsers.includes(u.id) ? { ...u, role: "moderator" } : u))
    )
    notify.success("Rôles mis à jour", `${selectedUsers.length} utilisateur(s) sont désormais modérateurs.`)
    setSelectedUsers([])
  }

  const handleBulkSuspend = () => {
    setUsers(prev =>
      prev.map(u => (selectedUsers.includes(u.id) ? { ...u, status: "suspended" } : u))
    )
    notify.success("Utilisateurs suspendus", `${selectedUsers.length} utilisateur(s) ont été suspendus.`)
    setSelectedUsers([])
  }

  return (
    <DashboardLayout>
      <PageHeader 
        title="Liste des utilisateurs" 
        description="Gérez les utilisateurs et leurs permissions"
        icon={UserCog}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => notify.exported("Liste des utilisateurs")}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button onClick={() => setIsInviteOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Inviter
            </Button>
          </div>
        }
      />

      {/* Dialog invitation */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inviter un utilisateur</DialogTitle>
            <DialogDescription>
              Envoyez une invitation par email à un nouveau membre.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Nom complet</label>
              <input
                type="text"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                placeholder="Ex: Camille Durand"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                placeholder="email@exemple.com"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Rôle</label>
              <select
                value={inviteForm.role}
                onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="member">Membre</option>
                <option value="moderator">Modérateur</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Annuler</Button>
            <Button onClick={handleInvite}>Envoyer l&apos;invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog édition */}
      <Dialog open={editingUser !== null} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l&apos;utilisateur</DialogTitle>
            <DialogDescription>
              Mettez à jour les informations et permissions de l&apos;utilisateur.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Nom complet</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Rôle</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="member">Membre</option>
                  <option value="moderator">Modérateur</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Plan</label>
                <select
                  value={editForm.plan}
                  onChange={(e) => setEditForm({ ...editForm, plan: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="Gratuit">Gratuit</option>
                  <option value="Membre">Membre</option>
                  <option value="Premium">Premium</option>
                  <option value="Entreprise">Entreprise</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>Annuler</Button>
            <Button onClick={handleEditSubmit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtres */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="all">Tous les rôles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Modérateur</option>
                <option value="member">Membre</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="pending">En attente</option>
                <option value="suspended">Suspendu</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setRoleFilter("all"); setStatusFilter("all"); setSearchQuery(""); notify.info("Filtres réinitialisés") }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions groupées */}
      {selectedUsers.length > 0 && (
        <Card className="mb-4">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedUsers.length} utilisateur{selectedUsers.length > 1 ? "s" : ""} sélectionné{selectedUsers.length > 1 ? "s" : ""}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer un email
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkRole}>
                  <Shield className="mr-2 h-4 w-4" />
                  Changer le rôle
                </Button>
                <Button variant="destructive" size="sm" onClick={handleBulkSuspend}>
                  <ShieldOff className="mr-2 h-4 w-4" />
                  Suspendre
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table des utilisateurs */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                    onCheckedChange={toggleAllUsers}
                  />
                </TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Inscription</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.plan}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{user.joinedAt}</TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => notify.info("Profil", `Affichage du profil de ${user.name}.`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(user)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => notify.sent(user.name)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Envoyer un email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handlePromote(user)}>
                          <Shield className="mr-2 h-4 w-4" />
                          Promouvoir admin
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-amber-600" onClick={() => handleSuspend(user)}>
                          <ShieldOff className="mr-2 h-4 w-4" />
                          {user.status === "suspended" ? "Lever la suspension" : "Suspendre"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
