"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  User,
  FileText,
  Newspaper,
  Calendar,
  Users,
  BookUser,
  CreditCard,
  Heart,
  Tag,
  Award,
  UserCog,
  HelpCircle,
  Plus,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", active: true },
  { icon: User, label: "Profil", active: false },
  { icon: FileText, label: "Blog", active: false },
  { icon: Newspaper, label: "Actualités", active: false },
  { icon: Calendar, label: "Évènements", active: false },
  { icon: Users, label: "Communautés", active: false },
  { icon: BookUser, label: "Annuaire", active: false },
]

const administrationItems = [
  { icon: CreditCard, label: "Gestion cotisations", active: false },
  { icon: Heart, label: "Gestion des intérêts", active: false },
  { icon: Tag, label: "Gestion des types d'évènements", active: false },
  { icon: Award, label: "Gestion des compétences", active: false },
  { icon: UserCog, label: "Liste des utilisateurs", active: false },
  { icon: HelpCircle, label: "Gestion F.A.Q", active: false },
]

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
}

function SidebarItem({ icon: Icon, label, active }: SidebarItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  )
}

export function Sidebar() {
  const [isAdminExpanded, setIsAdminExpanded] = useState(true)

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">AD</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-wide text-sidebar-foreground">
            ALSACE DIGITALE
          </span>
          <span className="text-xs text-muted-foreground">Espace membre</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        {/* Navigation principale */}
        <div className="mb-6">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigation principale
          </p>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={item.active}
              />
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div className="mb-6 border-t border-sidebar-border" />

        {/* Administration */}
        <div>
          <button
            onClick={() => setIsAdminExpanded(!isAdminExpanded)}
            className="mb-2 flex w-full items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <span>Administration</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isAdminExpanded ? "" : "-rotate-90"
              )}
            />
          </button>
          {isAdminExpanded && (
            <div className="space-y-1">
              {administrationItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                />
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* CTA Button */}
      <div className="border-t border-sidebar-border p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg">
          <Plus className="h-5 w-5" />
          <span>Publier du contenu</span>
        </button>
      </div>
    </aside>
  )
}
