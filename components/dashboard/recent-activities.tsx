import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Calendar, Newspaper, Users } from "lucide-react"

const activities = [
  {
    type: "Blog",
    icon: FileText,
    title: "Introduction au Machine Learning",
    author: "Marie Martin",
    date: "22 mai 2026",
    status: "Publié",
    statusColor: "bg-accent text-accent-foreground",
  },
  {
    type: "Évènement",
    icon: Calendar,
    title: "Meetup React Strasbourg #42",
    author: "Jean Dupont",
    date: "20 mai 2026",
    status: "À venir",
    statusColor: "bg-primary text-primary-foreground",
  },
  {
    type: "Actualité",
    icon: Newspaper,
    title: "Nouvelle partnership avec Tech Corp",
    author: "Sophie Leroy",
    date: "19 mai 2026",
    status: "Publié",
    statusColor: "bg-accent text-accent-foreground",
  },
  {
    type: "Blog",
    icon: FileText,
    title: "Les bases de TypeScript",
    author: "Pierre Dubois",
    date: "18 mai 2026",
    status: "Brouillon",
    statusColor: "bg-muted text-muted-foreground",
  },
  {
    type: "Communauté",
    icon: Users,
    title: "Lancement de la communauté DevOps",
    author: "Lucas Bernard",
    date: "17 mai 2026",
    status: "Actif",
    statusColor: "bg-chart-4 text-card",
  },
]

export function RecentActivities() {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Activités récentes
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Auteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {activities.map((activity, index) => (
                <tr 
                  key={index} 
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <activity.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {activity.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">
                      {activity.title}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {activity.author}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {activity.date}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge className={`${activity.statusColor} border-0`}>
                      {activity.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
