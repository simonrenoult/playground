import Commande from '../commande'
import EvenementDuDomaine from '../evenement'
import GestionnaireDeCommande from '../gestionnaire-de-commande'
import IntercepteurDeCommande from './intercepteur-de-commande'
import ResultatDeLIntercepteurDeCommande from './resultat-de-l-intercepteur-de-commande'

export default class ExecuterLeGestionnaireDeCommande implements IntercepteurDeCommande {
  constructor(
    private readonly gestionnairesDeCommande: Array<GestionnaireDeCommande<Commande, EvenementDuDomaine>> = [],
    private readonly logger: Console
  ) {
  }

  public executer(r: ResultatDeLIntercepteurDeCommande): ResultatDeLIntercepteurDeCommande {
    this.logger.info(`${r.commande.nom} (commande) est en cours d'émission`)
    const gestionnaireDeCommande = this.gestionnairesDeCommande.find((ch) => ch.ecoute(r.commande))
    if (!gestionnaireDeCommande) throw new Error(`Aucun command handler trouvé pour la commande ${r.commande.nom}`)
    const evenementDuDomaine = gestionnaireDeCommande.executer(r.commande)
    return { ...r, evenementDuDomaine }
  }
}
