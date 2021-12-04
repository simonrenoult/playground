import Commande from '../../../building-blocks/commande'
import GestionnaireDeCommande from '../../../building-blocks/gestionnaire-de-commande'
import { Email } from '../../../shared-kernel/email'
import { Formateur } from '../domain/entite/formateur'
import { IdSessionDeFormation } from '../domain/entite/session-de-formation'
import { FormateurAjouteALaSessionDeFormation } from '../domain/evenement/formateur-ajoute-a-la-session-de-formation'
import { SessionsDeFormation } from '../domain/repository/sessions-de-formation'

export class FormateurAAjouterAUneSessionDeFormation implements Commande {
  public readonly nom = 'FORMATEUR_A_AJOUTER_A_UNE_SESSION_DE_FORMATION'

  constructor(
    public readonly emailFormateur: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {
  }
}

export class AjouterUnFormateurAUneSessionDeFormation
  implements GestionnaireDeCommande<FormateurAAjouterAUneSessionDeFormation, FormateurAjouteALaSessionDeFormation> {

  constructor(
    private readonly sessionsDeFormation: SessionsDeFormation
  ) {
  }

  public executer(
    sessionDeFormationAStaffer: FormateurAAjouterAUneSessionDeFormation
  ): FormateurAjouteALaSessionDeFormation {
    const sessionDeFormation = this.sessionsDeFormation.parId(
      new IdSessionDeFormation(sessionDeFormationAStaffer.idSessionDeSessionDeFormation)
    )
    const formateur = new Formateur(new Email(sessionDeFormationAStaffer.emailFormateur))
    sessionDeFormation.ajouterFormateur(formateur)
    this.sessionsDeFormation.persister(sessionDeFormation)

    return new FormateurAjouteALaSessionDeFormation(
      formateur.id.valeur,
      sessionDeFormation.codeFormation,
      sessionDeFormation.id
    )
  }

  public ecoute(c: Commande): boolean {
    return c instanceof FormateurAAjouterAUneSessionDeFormation
  }
}
