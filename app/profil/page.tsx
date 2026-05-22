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
  Twitter
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const userProfile = {
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
  socialLinks: {
    linkedin: "linkedin.com/in/jeandupont",
    github: "github.com/jeandupont",
    twitter: "twitter.com/jeandupont",
    website: "jeandupont.dev"
  }
}

const activityStats = [
  { label: "Évènements participés", value: "45" },
  { label: "Articles publiés", value: "12" },
  { label: "Communautés", value: "3" },
  { label: "Connexions", value: "156" },
]

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <DashboardLayout>
      <PageHeader 
        title="Mon Profil" 
        description="Gérez vos informations personnelles et vos préférences"
        icon={User}
        actions={
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Edit2 className="mr-2 h-4 w-4" />
            {isEditing ? "Annuler" : "Modifier le profil"}
          </Button>
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
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback className="bg-primary text-2xl text-primary-foreground">JD</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-bold text-foreground">{userProfile.name}</h2>
                <p className="text-sm text-muted-foreground">{userProfile.position}</p>
                <Badge className="mt-2 bg-primary/10 text-primary hover:bg-primary/20">
                  {userProfile.role}
                </Badge>
                <p className="mt-4 text-sm text-muted-foreground">{userProfile.bio}</p>
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{userProfile.company}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Membre depuis {userProfile.memberSince}</span>
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
                {userProfile.interests.map((interest) => (
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
                {userProfile.skills.map((skill) => (
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
                {userProfile.communities.map((community) => (
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
                <button className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Confidentialité</p>
                    <p className="text-xs text-muted-foreground">Gérer la visibilité</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Notifications</p>
                    <p className="text-xs text-muted-foreground">Préférences email</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted">
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
