import Commande from '../commande'
import EvenementDuDomaine from '../evenement'

export default interface ResultatDeLIntercepteur {
  commande: Commande
  evenementDuDomaine: EvenementDuDomaine
}
