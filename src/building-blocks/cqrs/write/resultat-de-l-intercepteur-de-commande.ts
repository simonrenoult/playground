import Commande from './commande'
import EvenementDuDomaine from '../evenement'

export default interface ResultatDeLIntercepteurDeCommande {
  commande: Commande
  evenementDuDomaine: EvenementDuDomaine
}
