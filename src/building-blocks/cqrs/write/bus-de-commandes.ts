import Bus from '../bus'
import Commande from './commande'
import Intercepteur from '../intercepteur'
import EvenementDuDomaine from '../evenement-du-domaine/evenement'
import GestionnaireDeMessage from "../gestionnaire-de-message";

export default class BusDeCommandes implements Bus<Commande, EvenementDuDomaine> {

  private readonly intercepteurs: Intercepteur<Commande>[];
  private readonly gestionnaires: GestionnaireDeMessage<Commande, EvenementDuDomaine>[] = [];

  constructor(
    private readonly busDEvenementsDuDomaine: Bus<EvenementDuDomaine, void>,
    private readonly logger: any
  ) {
  }

  public enregistrerGestionnaire(g: GestionnaireDeMessage<Commande, EvenementDuDomaine>) {
    this.gestionnaires.push(g)
  }

  public enregistrerIntercepteur(i: Intercepteur<Commande>) {
    this.intercepteurs.push(i)
  }

  public publier<E extends EvenementDuDomaine>(commande: Commande): E {
    this.intercepteurs.forEach(i => i.executer(commande))
    const evenementDuDomaine = this.executerLeGestionnaireDeCommande(commande)
    return evenementDuDomaine as E
  }

  private executerLeGestionnaireDeCommande(commande: Commande): EvenementDuDomaine {
    this.logger.info(`${commande.nom} (commande) est en cours d'émission`)
    const gestionnaireDeCommande = this.gestionnaires.find((ch) => ch.ecoute(commande))
    if (!gestionnaireDeCommande) throw new Error(`Aucun gestionnaire trouvé pour la commande ${commande.nom}`)
    const evenementDuDomaine = gestionnaireDeCommande.executer(commande);
    this.busDEvenementsDuDomaine.publier(evenementDuDomaine)
    return evenementDuDomaine
  }
}
