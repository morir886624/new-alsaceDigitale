"use client"

import { useState } from "react"
import { 
  CreditCard, 
  Plus, 
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Check,
  X,
  TrendingUp,
  Users,
  DollarSign,
  Calendar
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const subscriptionPlans = [
  {
    id: 1,
    name: "Gratuit",
    price: 0,
    period: "an",
    features: ["Accès communautés publiques", "Newsletter mensuelle", "Annuaire basique"],
    subscribers: 450,
    active: true,
    color: "bg-gray-500",
  },
  {
    id: 2,
    name: "Membre",
    price: 50,
    period: "an",
    features: ["Accès toutes communautés", "Évènements gratuits", "Annuaire complet", "Badge membre"],
    subscribers: 280,
    active: true,
    color: "bg-primary",
  },
  {
    id: 3,
    name: "Premium",
    price: 150,
    period: "an",
    features: ["Tous avantages Membre", "Workshops exclusifs", "Mentorat", "Networking VIP"],
    subscribers: 85,
    active: true,
    color: "bg-accent",
  },
  {
    id: 4,
    name: "Entreprise",
    price: 500,
    period: "an",
    features: ["5 comptes membres", "Visibilité entreprise", "Recrutement", "Sponsoring évènements"],
    subscribers: 24,
    active: true,
    color: "bg-amber-500",
  },
]

const recentPayments = [
  { id: 1, user: "Jean Dupont", plan: "Premium", amount: 150, date: "21 Mai 2024", status: "completed" },
  { id: 2, user: "Marie Martin", plan: "Membre", amount: 50, date: "20 Mai 2024", status: "completed" },
  { id: 3, user: "Tech Solutions SAS", plan: "Entreprise", amount: 500, date: "19 Mai 2024", status: "completed" },
  { id: 4, user: "Pierre Dubois", plan: "Membre", amount: 50, date: "18 Mai 2024", status: "pending" },
  { id: 5, user: "Sophie Laurent", plan: "Premium", amount: 150, date: "17 Mai 2024", status: "completed" },
]

const stats = [
  { label: "Revenus mensuels", value: "4 850 EUR", icon: DollarSign, trend: "+12%" },
  { label: "Membres actifs", value: "839", icon: Users, trend: "+8%" },
  { label: "Taux de renouvellement", value: "87%", icon: TrendingUp, trend: "+3%" },
  { label: "Nouvelles inscriptions", value: "45", icon: Calendar, trend: "+15%" },
]

export default function GestionCotisationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <DashboardLayout>
      <PageHeader 
        title="Gestion des cotisations" 
        description="Gérez les plans d'abonnement et suivez les paiements"
        icon={CreditCard}
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau plan
          </Button>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-accent">
                <TrendingUp className="mr-1 h-4 w-4" />
                {stat.trend} ce mois
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plans de cotisation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Plans de cotisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className="relative rounded-xl border border-border p-4 transition-shadow hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`h-2 w-2 rounded-full ${plan.color}`} />
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
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">{plan.price} EUR</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">{plan.subscribers} abonnés</span>
                  <Badge className={plan.active ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                    {plan.active ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Paiements récents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Paiements récents</CardTitle>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.plan}</Badge>
                  </TableCell>
                  <TableCell>{payment.amount} EUR</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    {payment.status === "completed" ? (
                      <Badge className="bg-green-500/10 text-green-600">
                        <Check className="mr-1 h-3 w-3" />
                        Complété
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/10 text-amber-600">En attente</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir détails</DropdownMenuItem>
                        <DropdownMenuItem>Envoyer reçu</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Rembourser</DropdownMenuItem>
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
