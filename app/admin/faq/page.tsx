"use client"

import { useState } from "react"
import { 
  HelpCircle, 
  Plus, 
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  GripVertical,
  MessageSquare
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { formatNumber } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const faqCategories = [
  {
    id: 1,
    name: "Adhésion & Cotisations",
    icon: "CreditCard",
    questions: [
      {
        id: 1,
        question: "Comment devenir membre d'Alsace Digitale ?",
        answer: "Pour devenir membre, il vous suffit de créer un compte sur notre plateforme et de choisir votre type d'adhésion. Vous pouvez opter pour l'adhésion gratuite ou l'une de nos formules payantes qui offrent des avantages supplémentaires.",
        views: 1234,
        helpful: 89,
        published: true,
      },
      {
        id: 2,
        question: "Quels sont les différents types de cotisations ?",
        answer: "Nous proposons plusieurs formules : Gratuit (accès de base), Membre (50EUR/an avec accès aux évènements), Premium (150EUR/an avec workshops et mentorat), et Entreprise (500EUR/an pour les organisations).",
        views: 892,
        helpful: 76,
        published: true,
      },
      {
        id: 3,
        question: "Comment résilier mon abonnement ?",
        answer: "Vous pouvez résilier votre abonnement à tout moment depuis votre espace membre, section 'Mon abonnement'. La résiliation prend effet à la fin de la période en cours.",
        views: 456,
        helpful: 45,
        published: true,
      },
    ],
  },
  {
    id: 2,
    name: "Évènements",
    icon: "Calendar",
    questions: [
      {
        id: 4,
        question: "Comment m'inscrire à un évènement ?",
        answer: "Rendez-vous sur la page Évènements, sélectionnez l'évènement qui vous intéresse et cliquez sur 'S'inscrire'. Certains évènements sont réservés aux membres ou nécessitent une cotisation spécifique.",
        views: 2345,
        helpful: 156,
        published: true,
      },
      {
        id: 5,
        question: "Puis-je annuler mon inscription à un évènement ?",
        answer: "Oui, vous pouvez annuler votre inscription jusqu'à 48h avant l'évènement depuis votre espace membre. Au-delà de ce délai, veuillez nous contacter directement.",
        views: 678,
        helpful: 52,
        published: true,
      },
      {
        id: 6,
        question: "Comment proposer un évènement ?",
        answer: "Les membres peuvent proposer des évènements via le bouton 'Publier du contenu' dans la sidebar. Votre proposition sera examinée par notre équipe de modération.",
        views: 345,
        helpful: 34,
        published: false,
      },
    ],
  },
  {
    id: 3,
    name: "Communautés",
    icon: "Users",
    questions: [
      {
        id: 7,
        question: "Comment rejoindre une communauté ?",
        answer: "Explorez les communautés disponibles depuis la page dédiée et cliquez sur 'Rejoindre'. Certaines communautés sont ouvertes à tous, d'autres nécessitent une approbation du modérateur.",
        views: 987,
        helpful: 78,
        published: true,
      },
      {
        id: 8,
        question: "Comment créer ma propre communauté ?",
        answer: "Les membres Premium peuvent créer leur propre communauté. Rendez-vous sur la page Communautés et cliquez sur 'Créer une communauté'. Décrivez votre projet et attendez la validation de notre équipe.",
        views: 567,
        helpful: 45,
        published: true,
      },
    ],
  },
  {
    id: 4,
    name: "Profil & Compte",
    icon: "User",
    questions: [
      {
        id: 9,
        question: "Comment modifier mon profil ?",
        answer: "Accédez à votre profil via le menu en haut à droite ou la sidebar. Cliquez sur 'Modifier le profil' pour mettre à jour vos informations personnelles, compétences et centres d'intérêt.",
        views: 1567,
        helpful: 134,
        published: true,
      },
      {
        id: 10,
        question: "Comment changer mon mot de passe ?",
        answer: "Dans votre profil, section 'Sécurité', vous pouvez modifier votre mot de passe. Vous recevrez un email de confirmation après le changement.",
        views: 789,
        helpful: 67,
        published: true,
      },
      {
        id: 11,
        question: "Mes données sont-elles sécurisées ?",
        answer: "Oui, nous utilisons les dernières technologies de sécurité pour protéger vos données. Consultez notre politique de confidentialité pour plus de détails sur la gestion de vos données personnelles.",
        views: 234,
        helpful: 23,
        published: true,
      },
    ],
  },
]

export default function GestionFAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1, 2])
  const [newQuestion, setNewQuestion] = useState({ question: "", answer: "", category: "" })

  const toggleCategory = (id: number) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const totalQuestions = faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0)
  const publishedQuestions = faqCategories.reduce((acc, cat) => 
    acc + cat.questions.filter(q => q.published).length, 0
  )
  const totalViews = faqCategories.reduce((acc, cat) => 
    acc + cat.questions.reduce((a, q) => a + q.views, 0), 0
  )

  return (
    <DashboardLayout>
      <PageHeader 
        title="Gestion F.A.Q" 
        description="Gérez les questions fréquemment posées"
        icon={HelpCircle}
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter une question FAQ</DialogTitle>
                <DialogDescription>
                  Créez une nouvelle question pour la FAQ.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Catégorie
                  </label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {faqCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    placeholder="Ex: Comment puis-je...?"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Réponse
                  </label>
                  <textarea
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                    placeholder="Rédigez la réponse complète..."
                    rows={5}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Publier
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total questions</p>
                <p className="text-2xl font-bold text-foreground">{totalQuestions}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Publiées</p>
                <p className="text-2xl font-bold text-foreground">{publishedQuestions}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Catégories</p>
                <p className="text-2xl font-bold text-foreground">{faqCategories.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total vues</p>
                <p className="text-2xl font-bold text-foreground">{formatNumber(totalViews)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des catégories et questions */}
      <div className="space-y-4">
        {faqCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base">{category.name}</CardTitle>
                  <Badge variant="secondary">{category.questions.length} questions</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <ChevronDown 
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedCategories.includes(category.id) ? "rotate-180" : ""
                    }`} 
                  />
                </div>
              </div>
            </CardHeader>
            {expandedCategories.includes(category.id) && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {category.questions
                    .filter(q => 
                      !searchQuery || 
                      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((question) => (
                      <div
                        key={question.id}
                        className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              {question.published ? (
                                <Badge className="bg-green-500/10 text-green-600">Publié</Badge>
                              ) : (
                                <Badge className="bg-gray-500/10 text-gray-600">Brouillon</Badge>
                              )}
                            </div>
                            <h3 className="font-medium text-foreground">{question.question}</h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {question.answer}
                            </p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{question.views} vues</span>
                              <span>{question.helpful} votes utiles</span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit2 className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {question.published ? (
                                  <>
                                    <EyeOff className="mr-2 h-4 w-4" />
                                    Dépublier
                                  </>
                                ) : (
                                  <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Publier
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
