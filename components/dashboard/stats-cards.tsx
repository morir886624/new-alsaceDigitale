import { Calendar, Newspaper, Users, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    icon: Calendar,
    label: "Évènements à venir",
    value: "12",
    change: "+3 ce mois",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Newspaper,
    label: "Dernières actualités",
    value: "8",
    change: "+2 cette semaine",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Users,
    label: "Membres actifs",
    value: "1,247",
    change: "+48 ce mois",
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
  },
  {
    icon: CreditCard,
    label: "Cotisations en attente",
    value: "23",
    change: "À traiter",
    iconBg: "bg-chart-5/10",
    iconColor: "text-chart-5",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
