import { SessionDeFormationCreee } from "../../domain/evenement/session-de-formation-creee";
import { SessionsDeFormation } from "../../domain/repository/sessions-de-formation";
import {
  CodeDeFormation,
  IdSessionDeFormation,
  SessionDeFormation,
} from "../../domain/entite/session-de-formation";
import Commande from "../../../../../building-blocks/cqrs/write/commande";
import CreerUneSessionDeFormation from "../creer-une-session-de-formation";
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";

export default class GestionnaireDeCreerUneSessionDeFormation
  implements
    GestionnaireDeMessage<CreerUneSessionDeFormation, SessionDeFormationCreee>
{
  constructor(private readonly sessionsDeFormation: SessionsDeFormation) {}

  public async executer(
    sessionDeFormationAPlanifier: CreerUneSessionDeFormation
  ): Promise<SessionDeFormationCreee> {
    const sessionDeFormation = new SessionDeFormation(
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
