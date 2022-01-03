import {
  IdSessionDeFormation,
  SessionDeFormation,
} from "../../../src/modules/calendrier-des-sessions-de-formation/write/domain/entite/session-de-formation";
import { SessionsDeFormation } from "../../../src/modules/calendrier-des-sessions-de-formation/write/domain/repository/sessions-de-formation";

export class SessionsDeFormationEnMemoire implements SessionsDeFormation {
  constructor(private sessionsDeFormation: SessionDeFormation[] = []) {}

  public lister(): SessionDeFormation[] {
    return this.sessionsDeFormation;
  }

  public async persister(
    sessionDeFormation: SessionDeFormation
  ): Promise<void> {
    this.sessionsDeFormation.push(sessionDeFormation);
  }

  public async parId(
    idSessionDeSessionDeFormation: IdSessionDeFormation
  ): Promise<SessionDeFormation> {
    return this.sessionsDeFormation.find((s) =>
      s.id.equals(idSessionDeSessionDeFormation)
    );
  }
}
