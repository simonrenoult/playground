import Commande from '../../../building-blocks/write/commande'
import GestionnaireDeCommande from '../../../building-blocks/write/gestionnaire-de-commande'
import Email from '../../../shared-kernel/email'
import { Participant } from '../domain/entite/participant'
import { IdSessionDeFormation } from '../domain/entite/session-de-formation'
import {
  ParticipantInscritALaSessionDeFormation
} from '../domain/evenement/participant-inscrit-a-la-session-de-formation'
import { SessionsDeFormation } from '../domain/repository/sessions-de-formation'

export class InscrireUnParticipantAUneSessionDeFormation implements Commande {
  public readonly nom = 'INSCRIRE_UN_PARTICIPANT_A_UNE_SESSION_DE_FORMATION'

  constructor(
    public readonly emailParticipant: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {
  }
}

export class GestionnaireDeInscrireUnParticipantAUneSessionDeFormation
  implements GestionnaireDeCommande<InscrireUnParticipantAUneSessionDeFormation, ParticipantInscritALaSessionDeFormation> {

  constructor(
    private readonly sessionsDeFormation: SessionsDeFormation
  ) {
  }

  public executer(
    inscriptionALaSessionDeFormation: InscrireUnParticipantAUneSessionDeFormation
  ): ParticipantInscritALaSessionDeFormation {
    const sessionDeFormation = this.sessionsDeFormation.parId(
      new IdSessionDeFormation(inscriptionALaSessionDeFormation.idSessionDeSessionDeFormation)
    )
    const participant = new Participant(new Email(inscriptionALaSessionDeFormation.emailParticipant))
    sessionDeFormation.ajouterParticipant(participant)
    this.sessionsDeFormation.persister(sessionDeFormation)

    return new ParticipantInscritALaSessionDeFormation(
      sessionDeFormation.codeFormation,
      sessionDeFormation.id.valeur,
      participant.id.valeur
    )
  }

  public ecoute(c: Commande): boolean {
    return c instanceof InscrireUnParticipantAUneSessionDeFormation
  }
}
