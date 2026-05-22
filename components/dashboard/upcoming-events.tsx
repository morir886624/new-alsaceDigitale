import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

const events = [
  {
    title: "Meetup React Strasbourg #42",
    date: "28 Mai 2026",
    time: "19:00",
    community: "React Alsace",
    communityColor: "bg-primary",
    location: "La Plage Digitale",
    participants: 45,
    maxParticipants: 60,
  },
  {
    title: "Workshop Design System",
    date: "2 Juin 2026",
    time: "14:00",
    community: "UX Strasbourg",
    communityColor: "bg-accent",
    location: "Shadok",
    participants: 28,
    maxParticipants: 30,
  },
  {
    title: "Conférence IA & Éthique",
    date: "10 Juin 2026",
    time: "18:30",
    community: "AI Alsace",
    communityColor: "bg-chart-5",
    location: "EPITECH Strasbourg",
    participants: 120,
    maxParticipants: 150,
  },
  {
    title: "Hackathon Green Tech",
    date: "15-16 Juin 2026",
    time: "09:00",
    community: "Alsace Digitale",
    communityColor: "bg-chart-4",
    location: "Université de Strasbourg",
    participants: 78,
    maxParticipants: 100,
  },
]

export function UpcomingEvents() {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Évènements à venir
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-background p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className={`rounded-lg px-2.5 py-1 text-xs font-medium text-card ${event.communityColor}`}>
                  {event.community}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.participants}/{event.maxParticipants}</span>
                </div>
              </div>
              
              <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">
                {event.title}
              </h3>
              
              <div className="mb-4 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date} · {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                  />
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Voir
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
