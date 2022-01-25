import { SessionDeFormation } from "../domain/session-de-formation";
import { SessionsDeFormation } from "../domain/repository/sessions-de-formation";
import { IdSessionDeFormation } from "../domain/id-session-de-formation";

export default class SessionsDeFormationEnMemoire
  implements SessionsDeFormation
{
  private readonly sessionsDeFormation: SessionDeFormation[] = [];

  public async parId(id: IdSessionDeFormation): Promise<SessionDeFormation> {
    return this.sessionsDeFormation.find((s) => s.id.equals(id));
  }

  public async persister(a: SessionDeFormation): Promise<void> {
    this.sessionsDeFormation.push(a);
  }
}
