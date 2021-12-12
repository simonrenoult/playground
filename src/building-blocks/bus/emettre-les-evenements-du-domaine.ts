import Bus from './bus'
import EvenementDuDomaine from '../evenement'
import IntercepteurDeCommande from './intercepteur-de-commande'
import ResultatDeLIntercepteurDeCommande from './resultat-de-l-intercepteur-de-commande'

export default class EmettreLesEvenementsDuDomaine implements IntercepteurDeCommande {
  constructor(
    private readonly busDEvenementsDuDomaine: Bus<EvenementDuDomaine, void>,
    private readonly logger: Console
  ) {
  }

  public executer(r: ResultatDeLIntercepteurDeCommande): ResultatDeLIntercepteurDeCommande {
    this.logger.info(`${r.evenementDuDomaine.nom} (évènement) en cours d'émission`)
    this.busDEvenementsDuDomaine.publier(r.evenementDuDomaine)
    return r
  }
}
