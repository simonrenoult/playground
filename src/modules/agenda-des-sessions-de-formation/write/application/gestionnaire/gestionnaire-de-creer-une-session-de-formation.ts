import { SessionDeFormationCreee } from "../../domain/evenement/session-de-formation-creee";
import { SessionsDeFormation } from "../../domain/repository/sessions-de-formation";
import { SessionDeFormation } from "../../domain/session-de-formation";
import Commande from "../../../../../building-blocks/cqrs/write/commande";
import CreerUneSessionDeFormation from "../creer-une-session-de-formation";
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";
import { CodeDeFormation } from "../../domain/code-de-formation";
import { IdSessionDeFormation } from "../../domain/id-session-de-formation";

export default class GestionnaireDeCreerUneSessionDeFormation
  implements
    GestionnaireDeMessage<CreerUneSessionDeFormation, SessionDeFormationCreee>
{
  public constructor(
    private readonly sessionsDeFormation: SessionsDeFormation
  ) {}

  public async executer(
    sessionDeFormationAPlanifier: CreerUneSessionDeFormation
  ): Promise<SessionDeFormationCreee> {
    const sessionDeFormation = SessionDeFormation.vide(
      new IdSessionDeFormation(
        sessionDeFormationAPlanifier.idSessionDeFormation
      ),
      new CodeDeFormation(sessionDeFormationAPlanifier.codeFormation)
    );
    await this.sessionsDeFormation.persister(sessionDeFormation);

    return new SessionDeFormationCreee(
      sessionDeFormation.id.valeur,
      sessionDeFormation.toState().codeFormation
    );
  }

  public ecoute(c: Commande): boolean {
    return c instanceof SessionDeFormationCreee;
  }
}
