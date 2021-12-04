import Bus from './bus'
import Commande from './commande'
import EvenementDuDomaine from './evenement'
import GestionnaireDeCommande from './gestionnaire-de-commande'

export default class BusDeCommandes implements Bus {
  constructor(
    private readonly commandHandlers: Array<GestionnaireDeCommande<Commande, EvenementDuDomaine>> = [],
    private readonly busDEvenementsDuDomaine: Bus
  ) {
  }

  public publier(c: Commande): void {
    const commandHandler = this.commandHandlers.find((ch) => ch.ecoute(c))
    if (!commandHandler) {
      console.warn(`Aucun command handler trouvé pour la commande ${c.nom}`)
      return
    }
    const evenementDuDomaine = commandHandler.executer(c)
    this.busDEvenementsDuDomaine.publier(evenementDuDomaine)
  }
}
