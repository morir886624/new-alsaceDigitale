"use client"

import { useState } from "react"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Edit2,
  Camera,
  Shield,
  Bell,
  Key,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Save
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { notify } from "@/lib/notify"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const initialProfile = {
  name: "Jean Dupont",
  email: "jean.dupont@email.com",
  phone: "+33 6 12 34 56 78",
  location: "Strasbourg, France",
  role: "Administrateur",
  company: "Tech Solutions SAS",
  position: "Directeur Technique",
  memberSince: "15 Mars 2020",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  bio: "Passionné par le numérique et l'innovation, je participe activement à l'écosystème tech alsacien depuis plus de 10 ans. Je suis convaincu que le partage de connaissances est la clé pour faire grandir notre communauté.",
  interests: ["Intelligence Artificielle", "DevOps", "Cloud Computing", "Startups"],
  skills: ["JavaScript", "Python", "AWS", "Docker", "Kubernetes"],
  communities: ["Tech Strasbourg", "AI Alsace", "DevOps Club"],
}

const activityStats = [
  { label: "Évènements participés", value: "45" },
  { label: "Articles publiés", value: "12" },
  { label: "Communautés", value: "3" },
  { label: "Connexions", value: "156" },
]

type EditableFields = Pick<typeof initialProfile, "name" | "position" | "company" | "email" | "phone" | "location" | "bio">

export default function ProfilPage() {
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState<EditableFields>({
    name: initialProfile.name,
    position: initialProfile.position,
    company: initialProfile.company,
    email: initialProfile.email,
    phone: initialProfile.phone,
    location: initialProfile.location,
    bio: initialProfile.bio,
  })

  const startEditing = () => {
    setForm({
      name: profile.name,
      position: profile.position,
      company: profile.company,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!form.name.trim()) {
      notify.error("Champ requis", "Le nom ne peut pas être vide.")
      return
    }
    setProfile((prev) => ({ ...prev, ...form, name: form.name.trim() }))
    setIsEditing(false)
    notify.updated("Votre profil")
  }

  const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

  return (
    <DashboardLayout>
      <PageHeader 
        title="Mon Profil" 
        description="Gérez vos informations personnelles et vos préférences"
        icon={User}
        actions={
          isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </div>
          ) : (
            <Button onClick={startEditing}>
              <Edit2 className="mr-2 h-4 w-4" />
              Modifier le profil
            </Button>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Colonne gauche - Profil principal */}
        <div className="space-y-6 lg:col-span-1">
          {/* Carte profil */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="bg-primary text-2xl text-primary-foreground">JD</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button
                      onClick={() => notify.info("Photo de profil", "La sélection d'une nouvelle photo sera bientôt disponible.")}
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                      aria-label="Changer la photo de profil"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <div className="w-full space-y-2">
                    <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom" />
                    <input className={inputClass} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Poste" />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                    <p className="text-sm text-muted-foreground">{profile.position}</p>
                  </>
                )}
                <Badge className="mt-2 bg-primary/10 text-primary hover:bg-primary/20">
                  {profile.role}
                </Badge>
                {isEditing ? (
                  <textarea
                    className={`mt-4 ${inputClass}`}
                    rows={4}
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Bio"
                  />
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">{profile.bio}</p>
                )}
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {isEditing ? (
                    <input className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  ) : (
                    <span className="text-foreground">{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {isEditing ? (
                    <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  ) : (
                    <span className="text-foreground">{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {isEditing ? (
                    <input className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  ) : (
                    <span className="text-foreground">{profile.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {isEditing ? (
                    <input className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  ) : (
                    <span className="text-foreground">{profile.company}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">Membre depuis {profile.memberSince}</span>
                </div>
              </div>

              {/* Liens sociaux */}
              <div className="mt-6 flex justify-center gap-3 border-t border-border pt-6">
                <a href="#" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {activityStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite - Détails */}
        <div className="space-y-6 lg:col-span-2">
          {/* Intérêts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Centres d&apos;intérêt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="bg-muted">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compétences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Compétences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} className="bg-accent/10 text-accent hover:bg-accent/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communautés */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mes Communautés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.communities.map((community) => (
                  <div key={community} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{community}</span>
                    </div>
                    <Badge variant="outline">Membre</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Paramètres rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Paramètres rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <button
                  onClick={() => notify.info("Confidentialité", "Gestion de la visibilité de votre profil.")}
                  className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted"
                >
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Confidentialité</p>
                    <p className="text-xs text-muted-foreground">Gérer la visibilité</p>
                  </div>
                </button>
                <button
                  onClick={() => notify.info("Notifications", "Préférences d'emails et d'alertes.")}
                  className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted"
                >
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Notifications</p>
                    <p className="text-xs text-muted-foreground">Préférences email</p>
                  </div>
                </button>
                <button
                  onClick={() => notify.info("Sécurité", "Gestion du mot de passe et de la 2FA.")}
                  className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted"
                >
                  <Key className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Sécurité</p>
                    <p className="text-xs text-muted-foreground">Mot de passe & 2FA</p>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
