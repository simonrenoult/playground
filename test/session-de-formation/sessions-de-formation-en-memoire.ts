import {
  IdSessionDeFormation,
  SessionDeFormation
} from '../../src/sessions-de-formation/write/domain/entite/session-de-formation'
import { SessionsDeFormation } from '../../src/sessions-de-formation/write/domain/repository/sessions-de-formation'

export class SessionsDeFormationEnMemoire implements SessionsDeFormation {
  constructor(
    private sessionsDeFormation: SessionDeFormation[] = []
  ) {
  }

  public lister(): SessionDeFormation[] {
    return this.sessionsDeFormation
  }

  public persister(sessionDeFormation: SessionDeFormation): void {
    this.sessionsDeFormation.push(sessionDeFormation)
  }

  public parId(idSessionDeSessionDeFormation: IdSessionDeFormation): SessionDeFormation {
    return this.sessionsDeFormation.find((s) => s.id === idSessionDeSessionDeFormation)
  }
}
