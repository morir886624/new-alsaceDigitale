import { toast } from "sonner"

/**
 * Système de notification centralisé.
 * Toutes les actions (ajout, modification, suppression, activation, etc.)
 * passent par ces helpers pour garantir des messages cohérents.
 */
export const notify = {
  /** Notification de succès générique. */
  success(title: string, description?: string) {
    return toast.success(title, { description })
  },

  /** Notification d'erreur générique. */
  error(title: string, description?: string) {
    return toast.error(title, { description })
  },

  /** Notification d'information générique. */
  info(title: string, description?: string) {
    return toast(title, { description })
  },

  /** Confirme la création d'un élément. */
  created(name: string) {
    return toast.success("Ajout réussi", {
      description: `« ${name} » a été ajouté avec succès.`,
    })
  },

  /** Confirme la modification d'un élément. */
  updated(name: string) {
    return toast.success("Modification enregistrée", {
      description: `« ${name} » a été mis à jour.`,
    })
  },

  /** Confirme la suppression d'un élément. */
  deleted(name: string) {
    return toast.success("Suppression effectuée", {
      description: `« ${name} » a été supprimé.`,
    })
  },

  /** Confirme l'activation / la désactivation d'un élément. */
  toggled(name: string, active: boolean) {
    return toast.success(active ? "Élément activé" : "Élément désactivé", {
      description: `« ${name} » est désormais ${active ? "actif" : "inactif"}.`,
    })
  },

  /** Confirme la publication / dépublication d'un élément. */
  published(name: string, isPublished: boolean) {
    return toast.success(isPublished ? "Contenu publié" : "Contenu dépublié", {
      description: `« ${name} » est désormais ${isPublished ? "visible" : "masqué"}.`,
    })
  },
}
