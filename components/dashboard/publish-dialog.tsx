"use client"

import { useState } from "react"
import { FileText, Newspaper, Calendar, Users } from "lucide-react"
import { notify } from "@/lib/notify"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const contentTypes = [
  { id: "blog", label: "Article de blog", icon: FileText },
  { id: "actualite", label: "Actualité", icon: Newspaper },
  { id: "evenement", label: "Évènement", icon: Calendar },
  { id: "communaute", label: "Communauté", icon: Users },
] as const

type ContentType = (typeof contentTypes)[number]["id"]

interface PublishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PublishDialog({ open, onOpenChange }: PublishDialogProps) {
  const [selectedType, setSelectedType] = useState<ContentType>("blog")
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setSelectedType("blog")
    setTitle("")
    setCategory("")
    setContent("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      notify.error("Champ requis", "Le titre est requis.")
      return
    }
    setIsSubmitting(true)

    // Simulate a save request
    await new Promise((resolve) => setTimeout(resolve, 900))

    const typeLabel = contentTypes.find((t) => t.id === selectedType)?.label
    setIsSubmitting(false)
    onOpenChange(false)
    resetForm()
    notify.published(`${typeLabel} — ${title}`, true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Publier du contenu</DialogTitle>
          <DialogDescription>
            Choisissez un type de contenu et remplissez les informations ci-dessous.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type selection */}
          <div className="space-y-2">
            <Label>Type de contenu</Label>
            <div className="grid grid-cols-2 gap-2">
              {contentTypes.map((type) => {
                const Icon = type.icon
                const isActive = selectedType === type.id
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border p-3 text-left text-sm font-medium transition-all",
                      isActive
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="publish-title">Titre</Label>
            <Input
              id="publish-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Saisissez un titre accrocheur..."
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="publish-category">Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="publish-category">
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developpement">Développement</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="entrepreneuriat">Entrepreneuriat</SelectItem>
                <SelectItem value="innovation">Innovation</SelectItem>
                <SelectItem value="communaute">Vie de l'association</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="publish-content">Contenu</Label>
            <Textarea
              id="publish-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Rédigez votre contenu ici..."
              rows={5}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {isSubmitting ? "Publication..." : "Publier"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
