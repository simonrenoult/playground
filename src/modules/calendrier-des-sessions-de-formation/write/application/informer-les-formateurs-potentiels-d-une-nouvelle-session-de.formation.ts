import EvenementDuDomaine from "../../../../building-blocks/cqrs/evenement-du-domaine/evenement";
import GestionnaireDeMessage from "../../../../building-blocks/cqrs/gestionnaire-de-message";
import Email from "../../../shared-kernel/email";
import { SessionDeFormationCreee } from "../domain/evenement/session-de-formation-creee";
import { CatalogueDeFormations } from "../domain/gateway/formation";
import { Notifieur } from "../domain/gateway/notifieur";

export default class InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation
  implements
    GestionnaireDeMessage<SessionDeFormationCreee, SessionDeFormationCreee>
{
  constructor(
    private readonly portailVersLeCatalogueDeFormations: CatalogueDeFormations,
    private readonly notifieur: Notifieur
  ) {}

  public executer(e: SessionDeFormationCreee): SessionDeFormationCreee {
    const formation =
      this.portailVersLeCatalogueDeFormations.chercherFormationParCode(
        e.codeFormation
      );
    formation.formateurs.forEach((f) => {
      this.notifieur.notifier(new Email(f.email));
    });
    return e;
  }

  public ecoute(e: EvenementDuDomaine): boolean {
    return e instanceof SessionDeFormationCreee;
  }
}
