import GestionnaireDeCommande from '../../../../building-blocks/write/gestionnaire-de-commande'
import { FormateurAjouteALaSessionDeFormation } from '../../domain/evenement/formateur-ajoute-a-la-session-de-formation'
import { SessionsDeFormation } from '../../domain/repository/sessions-de-formation'
import { IdSessionDeFormation } from '../../domain/entite/session-de-formation'
import { Formateur } from '../../domain/entite/formateur'
import Email from '../../../../shared-kernel/email'
import Commande from '../../../../building-blocks/write/commande'
import {
  AjouterUnFormateurAUneSessionDeFormation
} from '../ajouter-un-formateur-a-une-session-de-formation'

export class GestionnaireDeAjouterUnFormateurAUneSessionDeFormation
  implements GestionnaireDeCommande<AjouterUnFormateurAUneSessionDeFormation, FormateurAjouteALaSessionDeFormation> {

  constructor(
    private readonly sessionsDeFormation: SessionsDeFormation
  ) {
  }

  public executer(
    sessionDeFormationAStaffer: AjouterUnFormateurAUneSessionDeFormation
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
      sessionDeFormation.id.valeur
    )
  }

  public ecoute(c: Commande): boolean {
    return c instanceof AjouterUnFormateurAUneSessionDeFormation
  }
}
