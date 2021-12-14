import Commande from './commande'
import EvenementDuDomaine from '../evenement'

export default interface GestionnaireDeCommande<C extends Commande, E extends EvenementDuDomaine> {
  executer(c: C): E
  ecoute(c: Commande): boolean
}
