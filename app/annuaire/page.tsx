"use client"

import { useState } from "react"
import { 
  BookUser, 
  Search,
  Filter,
  MapPin,
  Briefcase,
  Mail,
  ExternalLink,
  Grid3X3,
  List,
  Linkedin
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const members = [
  {
    id: 1,
    name: "Jean Dupont",
    role: "Directeur Technique",
    company: "Tech Solutions SAS",
    location: "Strasbourg",
    skills: ["JavaScript", "Python", "AWS"],
    interests: ["IA", "DevOps"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Marie Martin",
    role: "Data Scientist",
    company: "DataLab Alsace",
    location: "Strasbourg",
    skills: ["Python", "TensorFlow", "SQL"],
    interests: ["Machine Learning", "Big Data"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Pierre Dubois",
    role: "DevOps Engineer",
    company: "CloudFirst",
    location: "Mulhouse",
    skills: ["Docker", "Kubernetes", "Terraform"],
    interests: ["Cloud", "Automatisation"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    isAdmin: false,
  },
  {
    id: 4,
    name: "Sophie Laurent",
    role: "UX Designer",
    company: "DesignStudio",
    location: "Colmar",
    skills: ["Figma", "UI/UX", "Prototyping"],
    interests: ["Design System", "Accessibilité"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    isAdmin: false,
  },
  {
    id: 5,
    name: "Lucas Weber",
    role: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Strasbourg",
    skills: ["React", "Node.js", "PostgreSQL"],
    interests: ["Startups", "Open Source"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    isAdmin: false,
  },
  {
    id: 6,
    name: "Emma Schmidt",
    role: "Product Manager",
    company: "InnoTech",
    location: "Strasbourg",
    skills: ["Agile", "Scrum", "Analytics"],
    interests: ["Product", "Growth"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    isAdmin: false,
  },
  {
    id: 7,
    name: "Thomas Muller",
    role: "Security Engineer",
    company: "CyberSecure",
    location: "Mulhouse",
    skills: ["Pentesting", "SIEM", "Compliance"],
    interests: ["Cybersécurité", "Audit"],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    isAdmin: false,
  },
  {
    id: 8,
    name: "Julie Bernard",
    role: "Frontend Developer",
    company: "WebAgency",
    location: "Colmar",
    skills: ["Vue.js", "TypeScript", "CSS"],
    interests: ["Animation", "Performance"],
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
    isAdmin: false,
  },
]

const locations = ["Toutes", "Strasbourg", "Mulhouse", "Colmar"]
const skillFilters = ["Toutes", "JavaScript", "Python", "React", "DevOps", "IA"]

export default function AnnuairePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("Toutes")
  const [selectedSkill, setSelectedSkill] = useState("Toutes")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredMembers = members.filter((member) => {
    if (selectedLocation !== "Toutes" && member.location !== selectedLocation) return false
    if (selectedSkill !== "Toutes" && !member.skills.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()))) return false
    if (searchQuery && !member.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !member.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !member.role.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <DashboardLayout>
      <PageHeader 
        title="Annuaire" 
        description="Trouvez et connectez-vous avec les membres de la communauté"
        icon={BookUser}
      />

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par nom, entreprise ou poste..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
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
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ville:</span>
              <div className="flex items-center gap-1">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      selectedLocation === location
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Compétence:</span>
              <div className="flex items-center gap-1 overflow-x-auto">
                {skillFilters.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      selectedSkill === skill
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className="mb-4 text-sm text-muted-foreground">
        {filteredMembers.length} membre{filteredMembers.length > 1 ? "s" : ""} trouvé{filteredMembers.length > 1 ? "s" : ""}
      </div>

      {/* Liste des membres */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-4 h-20 w-20">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-primary text-xl text-primary-foreground">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  {member.isAdmin && (
                    <Badge className="mt-1 bg-primary/10 text-primary">Admin</Badge>
                  )}
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Briefcase className="h-3 w-3" />
                    <span>{member.company}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{member.location}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-1">
                    {member.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="transition-shadow hover:shadow-md">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      {member.isAdmin && (
                        <Badge className="bg-primary/10 text-primary text-xs">Admin</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.role} chez {member.company}</p>
                    <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{member.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Voir profil
                    </Button>
                    <Button size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
