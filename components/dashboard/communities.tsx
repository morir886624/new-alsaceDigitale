import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

const communities = [
  {
    name: "React Alsace",
    logo: "⚛️",
    color: "bg-[#61DAFB]/10",
    borderColor: "border-[#61DAFB]/30",
    members: 342,
    isJoined: true,
  },
  {
    name: "Python Strasbourg",
    logo: "🐍",
    color: "bg-[#3776AB]/10",
    borderColor: "border-[#3776AB]/30",
    members: 256,
    isJoined: false,
  },
  {
    name: "UX Strasbourg",
    logo: "🎨",
    color: "bg-accent/10",
    borderColor: "border-accent/30",
    members: 189,
    isJoined: true,
  },
  {
    name: "AI Alsace",
    logo: "🤖",
    color: "bg-chart-5/10",
    borderColor: "border-chart-5/30",
    members: 478,
    isJoined: false,
  },
  {
    name: "DevOps Grand Est",
    logo: "🔧",
    color: "bg-chart-4/10",
    borderColor: "border-chart-4/30",
    members: 167,
    isJoined: false,
  },
  {
    name: "Women in Tech",
    logo: "👩‍💻",
    color: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    members: 234,
    isJoined: true,
  },
]

export function Communities() {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Communautés
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community, index) => (
            <div
              key={index}
              className={`group rounded-xl border ${community.borderColor} ${community.color} p-4 transition-all duration-200 hover:shadow-md`}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card text-2xl shadow-sm">
                  {community.logo}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{community.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{community.members} membres</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant={community.isJoined ? "outline" : "default"}
                size="sm"
                className={
                  community.isJoined
                    ? "w-full border-border text-muted-foreground hover:border-primary hover:text-primary"
                    : "w-full bg-primary text-primary-foreground hover:bg-primary/90"
                }
              >
                {community.isJoined ? "Gérer" : "Rejoindre"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
