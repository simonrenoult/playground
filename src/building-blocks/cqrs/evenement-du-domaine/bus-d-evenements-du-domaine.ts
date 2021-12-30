import Bus from "../bus";
import EvenementDuDomaine from "./evenement";
import GestionnaireDeMessage from "../gestionnaire-de-message";
import Intercepteur from "../intercepteur";

export default class BusDEvenementsDuDomaine implements Bus<EvenementDuDomaine, EvenementDuDomaine> {

  private gestionnaires: GestionnaireDeMessage<EvenementDuDomaine, EvenementDuDomaine>[] = [];
  private intercepteurs: Intercepteur<EvenementDuDomaine>[] = [];

  constructor(
    private readonly log: any
  ) {
  }

  public enregistrerGestionnaire(g: GestionnaireDeMessage<EvenementDuDomaine, EvenementDuDomaine>): void {
    this.gestionnaires.push(g)
  }

  public enregistrerIntercepteur(i: Intercepteur<EvenementDuDomaine>): void {
    this.intercepteurs.push(i)
  }

  public publier(evenementDuDomaine: EvenementDuDomaine): EvenementDuDomaine {
    this.log.info(`${evenementDuDomaine} (evenement du domaine) est en cours d'émission`)
    this.intercepteurs.forEach(i => i.executer(evenementDuDomaine))
    const gestionnaireDeCommande = this.gestionnaires.find((g) => g.ecoute(evenementDuDomaine))
    if (!gestionnaireDeCommande) throw new Error(`Aucun gestionnaire trouvé pour l'évènement du domaine ${evenementDuDomaine.nom}`)
    gestionnaireDeCommande.executer(evenementDuDomaine);
    return evenementDuDomaine
  }
}
