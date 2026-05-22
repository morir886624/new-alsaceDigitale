"use client"

import { useState } from "react"
import { 
  UserCog, 
  Plus, 
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const users = [
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
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

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

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    )
  }

  const toggleAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(u => u.id))
    }
  }

  return (
    <DashboardLayout>
      <PageHeader 
        title="Liste des utilisateurs" 
        description="Gérez les utilisateurs et leurs permissions"
        icon={UserCog}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Inviter
            </Button>
          </div>
        }
      />

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
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Plus de filtres
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
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer un email
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="mr-2 h-4 w-4" />
                  Changer le rôle
                </Button>
                <Button variant="destructive" size="sm">
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
                    checked={selectedUsers.length === users.length}
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
              {users.map((user) => (
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
                        <AvatarImage src={user.avatar} alt={user.name} />
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Envoyer un email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Promouvoir admin
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-amber-600">
                          <ShieldOff className="mr-2 h-4 w-4" />
                          Suspendre
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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
