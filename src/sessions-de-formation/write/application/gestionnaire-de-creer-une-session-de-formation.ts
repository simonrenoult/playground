import Commande from '../../../building-blocks/write/commande'
import GestionnaireDeCommande from '../../../building-blocks/write/gestionnaire-de-commande'
import { CodeDeFormation, IdSessionDeFormation, SessionDeFormation } from '../domain/entite/session-de-formation'
import { SessionDeFormationCreee } from '../domain/evenement/session-de-formation-creee'
import { SessionsDeFormation } from '../domain/repository/sessions-de-formation'

export class CreerUneSessionDeFormation implements Commande {
  public readonly nom = 'CREER_UNE_SESSION_DE_FORMATION'

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {
  }
}

export class GestionnaireDeCreerUneSessionDeFormation
  implements GestionnaireDeCommande<CreerUneSessionDeFormation, SessionDeFormationCreee> {

  constructor(
    private readonly sessionsDeFormation: SessionsDeFormation,
  ) {
  }

  public executer(sessionDeFormationAPlanifier: CreerUneSessionDeFormation): SessionDeFormationCreee {
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
