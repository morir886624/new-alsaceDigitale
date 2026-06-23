"use client"

import { useState } from "react"
import { 
  Calendar, 
  Plus, 
  Search, 
  MoreHorizontal,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  Edit2,
  Trash2,
  CalendarDays,
  Grid3X3,
  List
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

interface AppEvent {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  status: string
  attendees: number
  maxAttendees: number
  organizer: { name: string; avatar: string }
  image: string
}

const initialEvents: AppEvent[] = [
  {
    id: 1,
    title: "Meetup IA & Machine Learning",
    description: "Découvrez les dernières avancées en IA avec des présentations et des démos live de projets locaux.",
    date: "28 Mai 2024",
    time: "18:30 - 21:00",
    location: "La Plage Digitale, Strasbourg",
    type: "Meetup",
    status: "upcoming",
    attendees: 85,
    maxAttendees: 100,
    organizer: { name: "Marie Martin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Workshop React & Next.js",
    description: "Formation pratique sur React 19 et Next.js 15 avec des exercices hands-on.",
    date: "2 Juin 2024",
    time: "09:00 - 17:00",
    location: "Campus Universitaire, Illkirch",
    type: "Workshop",
    status: "upcoming",
    attendees: 25,
    maxAttendees: 30,
    organizer: { name: "Jean Dupont", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Hackathon Green Tech",
    description: "48h pour imaginer et prototyper des solutions tech face aux défis environnementaux.",
    date: "15-16 Juin 2024",
    time: "Tout le week-end",
    location: "Hôtel de Région, Strasbourg",
    type: "Hackathon",
    status: "registration",
    attendees: 120,
    maxAttendees: 200,
    organizer: { name: "Sophie Laurent", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Conférence Cybersécurité",
    description: "Les experts partagent leurs insights sur les menaces actuelles et les bonnes pratiques.",
    date: "10 Mai 2024",
    time: "14:00 - 18:00",
    location: "CCI Alsace Eurométropole",
    type: "Conférence",
    status: "completed",
    attendees: 150,
    maxAttendees: 150,
    organizer: { name: "Pierre Dubois", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
  },
]

const eventTypeOptions = ["Meetup", "Workshop", "Hackathon", "Conférence", "Networking", "Webinaire"]
const eventTypes = ["Tous", "Meetup", "Workshop", "Hackathon", "Conférence"]

export default function EvenementsPage() {
  const [events, setEvents] = useState<AppEvent[]>(initialEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("Tous")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", location: "", type: "Meetup", maxAttendees: "" })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">À venir</Badge>
      case "registration":
        return <Badge className="bg-accent/10 text-accent hover:bg-accent/20">Inscriptions ouvertes</Badge>
      case "completed":
        return <Badge variant="secondary">Terminé</Badge>
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      Meetup: "bg-blue-500/10 text-blue-600",
      Workshop: "bg-purple-500/10 text-purple-600",
      Hackathon: "bg-orange-500/10 text-orange-600",
      Conférence: "bg-green-500/10 text-green-600",
    }
    return <Badge className={colors[type] || "bg-muted"}>{type}</Badge>
  }

  const filteredEvents = events.filter((event) => {
    if (selectedType !== "Tous" && event.type !== selectedType) return false
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const openCreate = () => {
    setEditingId(null)
    setForm({ title: "", description: "", date: "", time: "", location: "", type: "Meetup", maxAttendees: "" })
    setIsDialogOpen(true)
  }

  const openEdit = (event: AppEvent) => {
    setEditingId(event.id)
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      maxAttendees: String(event.maxAttendees),
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (!form.title.trim()) {
      notify.error("Champ requis", "Veuillez renseigner le titre de l'évènement.")
      return
    }
    const maxAttendees = Number(form.maxAttendees) || 50

    if (editingId !== null) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? {
                ...e,
                title: form.title.trim(),
                description: form.description.trim(),
                date: form.date.trim() || e.date,
                time: form.time.trim() || e.time,
                location: form.location.trim() || e.location,
                type: form.type,
                maxAttendees,
              }
            : e
        )
      )
      notify.updated(form.title.trim())
    } else {
      const newEvent: AppEvent = {
        id: Math.max(0, ...events.map((e) => e.id)) + 1,
        title: form.title.trim(),
        description: form.description.trim(),
        date: form.date.trim() || "À définir",
        time: form.time.trim() || "À définir",
        location: form.location.trim() || "À définir",
        type: form.type,
        status: "upcoming",
        attendees: 0,
        maxAttendees,
        organizer: { name: "Jean Dupont", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      }
      setEvents((prev) => [newEvent, ...prev])
      notify.created(newEvent.title)
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (event: AppEvent) => {
    setEvents((prev) => prev.filter((e) => e.id !== event.id))
    notify.deleted(event.title)
  }

  const handleRegister = (event: AppEvent) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id && e.attendees < e.maxAttendees ? { ...e, attendees: e.attendees + 1 } : e
      )
    )
    notify.registered(event.title)
  }

  return (
    <DashboardLayout>
      <PageHeader 
        title="Évènements" 
        description="Gérez et participez aux évènements de la communauté"
        icon={Calendar}
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Créer un évènement
          </Button>
        }
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "Modifier l'évènement" : "Créer un évènement"}
            </DialogTitle>
            <DialogDescription>
              {editingId !== null
                ? "Mettez à jour les informations de l'évènement."
                : "Renseignez les informations du nouvel évènement."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Titre</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ex: Meetup DevOps"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Décrivez l'évènement..."
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Date</label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="Ex: 12 Juin 2024"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Horaire</label>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="Ex: 18:00 - 21:00"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Lieu</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Ex: La Plage Digitale, Strasbourg"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  {eventTypeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Capacité</label>
                <input
                  type="number"
                  min={1}
                  value={form.maxAttendees}
                  onChange={(e) => setForm({ ...form, maxAttendees: e.target.value })}
                  placeholder="Ex: 100"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSubmit}>{editingId !== null ? "Enregistrer" : "Créer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un évènement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 border-l border-border pl-2">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille des évènements */}
      <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <div className={`flex ${viewMode === "list" ? "flex-row" : "flex-col"}`}>
              <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 shrink-0" : "aspect-video"}`}>
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex flex-col gap-1">
                  {getTypeBadge(event.type)}
                </div>
              </div>
              <CardContent className={`flex-1 ${viewMode === "list" ? "p-4" : "p-4"}`}>
                <div className="mb-2 flex items-center gap-2">
                  {getStatusBadge(event.status)}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-1 hover:text-primary">
                  <button type="button" onClick={() => notify.info(event.title, "Ouverture de la fiche évènement.")}>{event.title}</button>
                </h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                    <span className="text-muted-foreground/50">|</span>
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} alt={event.organizer.name} />
                        <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{event.organizer.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}/{event.maxAttendees}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {event.status !== "completed" && (
                      <Button size="sm" variant="secondary" onClick={() => handleRegister(event)}>
                        S&apos;inscrire
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => notify.info(event.title, "Ouverture de la fiche évènement.")}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(event)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(event)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="mt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
