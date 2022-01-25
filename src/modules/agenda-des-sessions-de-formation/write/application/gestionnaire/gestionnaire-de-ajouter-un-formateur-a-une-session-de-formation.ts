import { FormateurAjouteALaSessionDeFormation } from "../../domain/evenement/formateur-ajoute-a-la-session-de-formation";
import { SessionsDeFormation } from "../../domain/repository/sessions-de-formation";
import { SessionDeFormation } from "../../domain/session-de-formation";
import { Formateur } from "../../domain/formateur";
import Email from "../../../../shared-kernel/email";
import Commande from "../../../../../building-blocks/cqrs/write/commande";
import AjouterUnFormateurAUneSessionDeFormation from "../ajouter-un-formateur-a-une-session-de-formation";
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";
import { IdSessionDeFormation } from "../../domain/id-session-de-formation";

export default class GestionnaireDeAjouterUnFormateurAUneSessionDeFormation
  implements
    GestionnaireDeMessage<
      AjouterUnFormateurAUneSessionDeFormation,
      FormateurAjouteALaSessionDeFormation
    >
{
  public constructor(
    private readonly sessionsDeFormation: SessionsDeFormation
  ) {}

  public async executer(
    sessionDeFormationAStaffer: AjouterUnFormateurAUneSessionDeFormation
  ): Promise<FormateurAjouteALaSessionDeFormation> {
    const sessionDeFormation: SessionDeFormation =
      await this.sessionsDeFormation.parId(
        new IdSessionDeFormation(
          sessionDeFormationAStaffer.idSessionDeSessionDeFormation
        )
      );
    const formateur = new Formateur(
      new Email(sessionDeFormationAStaffer.emailFormateur)
    );
    sessionDeFormation.ajouterFormateur(formateur);
    await this.sessionsDeFormation.persister(sessionDeFormation);

    return new FormateurAjouteALaSessionDeFormation(
      formateur.id.valeur,
      sessionDeFormation.toState().codeFormation,
      sessionDeFormation.id.valeur
    );
  }

  public ecoute(c: Commande): boolean {
    return c instanceof AjouterUnFormateurAUneSessionDeFormation;
  }
}
