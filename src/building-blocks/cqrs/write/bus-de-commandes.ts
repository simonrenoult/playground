import Bus from '../bus'
import Commande from './commande'
import IntercepteurDeCommande from './intercepteur-de-commande'
import ResultatDeLIntercepteurDeCommande from './resultat-de-l-intercepteur-de-commande'
import EvenementDuDomaine from '../evenement'

export default class BusDeCommandes implements Bus<Commande, EvenementDuDomaine> {
  constructor(
    private readonly intercepteurs: IntercepteurDeCommande[]
  ) {
  }

  public publier<E extends EvenementDuDomaine>(commande: Commande): E {
    let resultatDeLIntercepteur: ResultatDeLIntercepteurDeCommande = { commande, evenementDuDomaine: undefined }
    for (const intercepteur of this.intercepteurs) {
      resultatDeLIntercepteur = intercepteur.executer(resultatDeLIntercepteur)
    }
    return resultatDeLIntercepteur.evenementDuDomaine as E
  }
}
