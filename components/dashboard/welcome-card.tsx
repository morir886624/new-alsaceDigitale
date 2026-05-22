import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface WelcomeCardProps {
  firstName?: string
}

export function WelcomeCard({ firstName = "Jean" }: WelcomeCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary to-primary/80 shadow-lg">
      {/* Decorative elements */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full bg-white/5" />
      <div className="absolute left-1/2 top-0 h-20 w-20 rounded-full bg-accent/20" />
      
      <CardContent className="relative p-6 md:p-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-primary-foreground/80">
                Bienvenue
              </span>
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              Bonjour, {firstName} 👋
            </h1>
            <p className="mt-1 text-primary-foreground/80">
              Bienvenue sur votre espace Alsace Digitale.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3 md:mt-0">
            <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-xs font-medium text-primary-foreground/70">Membre depuis</p>
              <p className="text-lg font-bold text-primary-foreground">Mars 2024</p>
            </div>
            <div className="rounded-xl bg-accent/80 px-4 py-2">
              <p className="text-xs font-medium text-accent-foreground/70">Statut</p>
              <p className="text-lg font-bold text-accent-foreground">Actif</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
