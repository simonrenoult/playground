import Commande from '../../../building-blocks/commande'
import GestionnaireDeCommande from '../../../building-blocks/gestionnaire-de-commande'
import { Email } from '../../../shared-kernel/email'
import { Participant } from '../domain/entite/participant'
import { IdSessionDeFormation } from '../domain/entite/session-de-formation'
import {
  ParticipantInscritALaSessionDeFormation
} from '../domain/evenement/participant-inscrit-a-la-session-de-formation'
import { SessionsDeFormation } from '../domain/repository/sessions-de-formation'

export class InscriptionALaSessionDeFormation implements Commande {
  public readonly nom = 'INSCRIPTION_A_LA_SESSION_DE_FORMATION'

  constructor(
    public readonly emailParticipant: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {
  }
}

export class InscrireUnParticipantAUneSessionDeFormation
  implements GestionnaireDeCommande<InscriptionALaSessionDeFormation, ParticipantInscritALaSessionDeFormation> {

  constructor(
    private readonly sessionsDeFormation: SessionsDeFormation
  ) {
  }

  public executer(
    inscriptionALaSessionDeFormation: InscriptionALaSessionDeFormation
  ): ParticipantInscritALaSessionDeFormation {
    const sessionDeFormation = this.sessionsDeFormation.parId(
      new IdSessionDeFormation(inscriptionALaSessionDeFormation.idSessionDeSessionDeFormation)
    )
    const participant = new Participant(new Email(inscriptionALaSessionDeFormation.emailParticipant))
    sessionDeFormation.ajouterParticipant(participant)
    this.sessionsDeFormation.persister(sessionDeFormation)

    return new ParticipantInscritALaSessionDeFormation(
      sessionDeFormation.codeFormation,
      sessionDeFormation.id,
      participant.id.valeur
    )
  }

  public ecoute(c: Commande): boolean {
    return c instanceof InscriptionALaSessionDeFormation
  }
}
