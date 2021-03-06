import Bus from "../bus";
import Commande from "./commande";
import Intercepteur from "../intercepteur";
import EvenementDuDomaine from "../evenement-du-domaine/evenement";
import GestionnaireDeMessage from "../gestionnaire-de-message";
import Logger from "../../logger/logger";

export default class BusDeCommandes
  implements Bus<Commande, EvenementDuDomaine>
{
  private readonly intercepteurs: Intercepteur<Commande>[] = [];
  private readonly gestionnaires: GestionnaireDeMessage<
    Commande,
    EvenementDuDomaine
  >[] = [];

  public constructor(
    private readonly busDEvenementsDuDomaine: Bus<
      EvenementDuDomaine,
      EvenementDuDomaine
    >,
    private readonly logger: Logger
  ) {}

  public enregistrerGestionnaire(
    g: GestionnaireDeMessage<Commande, EvenementDuDomaine>
  ): void {
    this.gestionnaires.push(g);
  }

  public enregistrerIntercepteur(i: Intercepteur<Commande>): void {
    this.intercepteurs.push(i);
  }

  public async publier<E extends EvenementDuDomaine>(
    commande: Commande
  ): Promise<E> {
    this.intercepteurs.forEach((i) => i.executer(commande));
    const evenementDuDomaine = await this.executerLeGestionnaireDeCommande(
      commande
    );
    return evenementDuDomaine as E;
  }

  private async executerLeGestionnaireDeCommande(
    commande: Commande
  ): Promise<EvenementDuDomaine> {
    this.logger.info(`${commande.nom} (commande) est en cours d'émission`);
    const gestionnaireDeCommande = this.gestionnaires.find((ch) =>
      ch.ecoute(commande)
    );
    if (!gestionnaireDeCommande)
      throw new Error(
        `Aucun gestionnaire de commande trouvé pour la commande ${commande.nom}`
      );
    const evenementDuDomaine = await gestionnaireDeCommande.executer(commande);
    this.busDEvenementsDuDomaine.publier(evenementDuDomaine);
    return evenementDuDomaine;
  }
}
