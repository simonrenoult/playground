import GestionnaireDeCommande from '../../../../building-blocks/write/gestionnaire-de-commande'
import {
  ParticipantInscritALaSessionDeFormation
} from '../../domain/evenement/participant-inscrit-a-la-session-de-formation'
import { SessionsDeFormation } from '../../domain/repository/sessions-de-formation'
import { IdSessionDeFormation } from '../../domain/entite/session-de-formation'
import { Participant } from '../../domain/entite/participant'
import Email from '../../../../shared-kernel/email'
import Commande from '../../../../building-blocks/write/commande'
import InscrireUnParticipantAUneSessionDeFormation from '../inscrire-un-participant-a-une-session-de-formation'

export default class GestionnaireDeInscrireUnParticipantAUneSessionDeFormation
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
