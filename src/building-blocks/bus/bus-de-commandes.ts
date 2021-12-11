import Bus from './bus'
import Commande from '../commande'
import Intercepteur from './intercepteur'
import ResultatDeLIntercepteur from './resultat-de-l-intercepteur'

export default class BusDeCommandes implements Bus<Commande> {
  constructor(
    private readonly intercepteurs: Intercepteur[]
  ) {
  }

  public publier(commande: Commande): void {
    let resultatDeLIntercepteur: ResultatDeLIntercepteur = { commande, evenementDuDomaine: undefined }
    for (const intercepteur of this.intercepteurs) {
      resultatDeLIntercepteur = intercepteur.executer(resultatDeLIntercepteur)
    }
  }
}
