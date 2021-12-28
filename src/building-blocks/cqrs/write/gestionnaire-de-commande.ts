import Commande from './commande'
import EvenementDuDomaine from '../evenement'

export default interface GestionnaireDeCommande<C extends Commande = Commande, E extends EvenementDuDomaine = EvenementDuDomaine> {
  executer(c: C): E

  ecoute(c: Commande): boolean
}
