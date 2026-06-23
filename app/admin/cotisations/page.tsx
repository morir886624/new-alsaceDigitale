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
  TrendingUp,
  Users,
  DollarSign,
  Calendar
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface SubscriptionPlan {
  id: number
  name: string
  price: number
  period: string
  features: string[]
  subscribers: number
  active: boolean
  color: string
}

const initialPlans: SubscriptionPlan[] = [
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
  const [plans, setPlans] = useState<SubscriptionPlan[]>(initialPlans)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ name: "", price: "", features: "" })

  const openCreate = () => {
    setEditingId(null)
    setForm({ name: "", price: "", features: "" })
    setIsDialogOpen(true)
  }

  const openEdit = (plan: SubscriptionPlan) => {
    setEditingId(plan.id)
    setForm({ name: plan.name, price: String(plan.price), features: plan.features.join("\n") })
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (!form.name.trim()) {
      notify.error("Champ requis", "Veuillez renseigner le nom du plan.")
      return
    }
    const price = Number(form.price)
    if (Number.isNaN(price) || price < 0) {
      notify.error("Prix invalide", "Veuillez renseigner un prix valide.")
      return
    }
    const features = form.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)

    if (editingId !== null) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, name: form.name.trim(), price, features } : p
        )
      )
      notify.updated(form.name.trim())
    } else {
      const newPlan: SubscriptionPlan = {
        id: Math.max(0, ...plans.map((p) => p.id)) + 1,
        name: form.name.trim(),
        price,
        period: "an",
        features,
        subscribers: 0,
        active: true,
        color: "bg-primary",
      }
      setPlans((prev) => [...prev, newPlan])
      notify.created(newPlan.name)
    }
    setIsDialogOpen(false)
  }

  const handleToggle = (plan: SubscriptionPlan) => {
    setPlans((prev) => prev.map((p) => (p.id === plan.id ? { ...p, active: !p.active } : p)))
    notify.toggled(plan.name, !plan.active)
  }

  const handleDelete = (plan: SubscriptionPlan) => {
    setPlans((prev) => prev.filter((p) => p.id !== plan.id))
    notify.deleted(plan.name)
  }

  const filteredPayments = recentPayments.filter(
    (p) =>
      !searchQuery ||
      p.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.plan.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <PageHeader 
        title="Gestion des cotisations" 
        description="Gérez les plans d'abonnement et suivez les paiements"
        icon={CreditCard}
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau plan
          </Button>
        }
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "Modifier le plan" : "Créer un plan de cotisation"}
            </DialogTitle>
            <DialogDescription>
              {editingId !== null
                ? "Mettez à jour les informations de ce plan d'abonnement."
                : "Ajoutez un nouveau plan d'abonnement pour les membres."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Nom du plan
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Étudiant"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Prix annuel (EUR)
              </label>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Ex: 25"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Avantages (un par ligne)
              </label>
              <textarea
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder={"Accès communautés\nNewsletter\n..."}
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
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
            {plans.map((plan) => (
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
                      <DropdownMenuItem onClick={() => openEdit(plan)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggle(plan)}>
                        {plan.active ? "Désactiver" : "Activer"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(plan)}>
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
              {filteredPayments.map((payment) => (
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
                        <DropdownMenuItem onClick={() => notify.info("Détails du paiement", `Paiement de ${payment.user} — ${payment.amount} EUR.`)}>
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => notify.sent(payment.user)}>
                          Envoyer reçu
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => notify.success("Remboursement initié", `Le remboursement de ${payment.amount} EUR à ${payment.user} a été lancé.`)}>
                          Rembourser
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
