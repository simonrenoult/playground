import Commande from '../commande'
import EvenementDuDomaine from '../evenement'
import GestionnaireDeCommande from '../gestionnaire-de-commande'
import Intercepteur from './intercepteur'
import ResultatDeLIntercepteur from './resultat-de-l-intercepteur'

export default class ExecuterLeGestionnaireDeCommande implements Intercepteur {
  constructor(
    private readonly commandHandlers: Array<GestionnaireDeCommande<Commande, EvenementDuDomaine>> = [],
    private readonly logger: Console
  ) {
  }

  public executer(r: ResultatDeLIntercepteur): ResultatDeLIntercepteur {
    this.logger.info(`${r.commande.nom} (commande) est en cours d'émission`)
    const commandHandler = this.commandHandlers.find((ch) => ch.ecoute(r.commande))
    if (!commandHandler) throw new Error(`Aucun command handler trouvé pour la commande ${r.commande.nom}`)
    const evenementDuDomaine = commandHandler.executer(r.commande)
    return { ...r, evenementDuDomaine }
  }
}
