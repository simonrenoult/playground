import Commande from '../../../building-blocks/write/commande'
import GestionnaireDeCommande from '../../../building-blocks/write/gestionnaire-de-commande'
import { CodeDeFormation, IdSessionDeFormation, SessionDeFormation } from '../domain/entite/session-de-formation'
import { SessionDeFormationCreee } from '../domain/evenement/session-de-formation-creee'
import { SessionsDeFormation } from '../domain/repository/sessions-de-formation'

export class SessionDeFormationACreer implements Commande {
  public readonly nom = 'SESSION_DE_FORMATION_A_PLANIFIER'

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {
  }
}

export class CreerUneSessionDeFormation
  implements GestionnaireDeCommande<SessionDeFormationACreer, SessionDeFormationCreee> {

  constructor(
    private readonly sessionsDeFormation: SessionsDeFormation,
  ) {
  }

  public executer(sessionDeFormationAPlanifier: SessionDeFormationACreer): SessionDeFormationCreee {
    const sessionDeFormation = new SessionDeFormation(
      new IdSessionDeFormation(sessionDeFormationAPlanifier.idSessionDeFormation),
      new CodeDeFormation(sessionDeFormationAPlanifier.codeFormation),
    )
    this.sessionsDeFormation.persister(sessionDeFormation)

    return new SessionDeFormationCreee(
      sessionDeFormation.id.valeur,
      sessionDeFormation.codeFormation
    )
  }

  public ecoute(c: Commande): boolean {
    return c instanceof SessionDeFormationCreee
  }
}
