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

  /** Confirme l'envoi d'une invitation. */
  invited(email: string) {
    return toast.success("Invitation envoyée", {
      description: `Une invitation a été envoyée à ${email}.`,
    })
  },

  /** Confirme l'envoi d'un message ou e-mail. */
  sent(target: string) {
    return toast.success("Message envoyé", {
      description: `Votre message à ${target} a bien été envoyé.`,
    })
  },

  /** Confirme l'adhésion à une communauté ou un groupe. */
  joined(name: string) {
    return toast.success("Adhésion confirmée", {
      description: `Vous avez rejoint « ${name} ».`,
    })
  },

  /** Confirme une inscription (évènement, etc.). */
  registered(name: string) {
    return toast.success("Inscription confirmée", {
      description: `Vous êtes inscrit à « ${name} ».`,
    })
  },

  /** Confirme un export de données. */
  exported(what: string) {
    return toast.success("Export lancé", {
      description: `L'export « ${what} » a été généré avec succès.`,
    })
  },
}
