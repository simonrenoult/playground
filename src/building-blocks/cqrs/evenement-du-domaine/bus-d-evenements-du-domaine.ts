import Bus from "../bus";
import EvenementDuDomaine from "./evenement";
import GestionnaireDeMessage from "../gestionnaire-de-message";
import Intercepteur from "../intercepteur";

export default class BusDEvenementsDuDomaine
  implements Bus<EvenementDuDomaine, EvenementDuDomaine>
{
  private gestionnaires: GestionnaireDeMessage<
    EvenementDuDomaine,
    EvenementDuDomaine
  >[] = [];
  private intercepteurs: Intercepteur<EvenementDuDomaine>[] = [];

  constructor(private readonly log: any) {}

  public enregistrerGestionnaire(
    g: GestionnaireDeMessage<EvenementDuDomaine, EvenementDuDomaine>
  ): void {
    this.gestionnaires.push(g);
  }

  public enregistrerIntercepteur(i: Intercepteur<EvenementDuDomaine>): void {
    this.intercepteurs.push(i);
  }

  public async publier(
    evenementDuDomaine: EvenementDuDomaine
  ): Promise<EvenementDuDomaine | null> {
    this.log.info(
      `${evenementDuDomaine.nom} (evenement du domaine) est en cours d'émission`
    );
    this.intercepteurs.forEach((i) => i.executer(evenementDuDomaine));
    const gestionnaireDeCommande = this.gestionnaires.find((g) =>
      g.ecoute(evenementDuDomaine)
    );
    if (gestionnaireDeCommande) {
      gestionnaireDeCommande.executer(evenementDuDomaine);
      return evenementDuDomaine;
    }
    this.log.warn(
      `Aucun gestionnaire trouvé pour l'évènement du domaine ${evenementDuDomaine.nom}`
    );
    return null;
  }
}
