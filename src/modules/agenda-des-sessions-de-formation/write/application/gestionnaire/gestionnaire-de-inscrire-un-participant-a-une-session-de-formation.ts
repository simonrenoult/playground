import { ParticipantInscritALaSessionDeFormation } from "../../domain/evenement/participant-inscrit-a-la-session-de-formation";
import { SessionsDeFormation } from "../../domain/repository/sessions-de-formation";
import { SessionDeFormation } from "../../domain/session-de-formation";
import { Participant } from "../../domain/participant";
import Email from "../../../../shared-kernel/email";
import Commande from "../../../../../building-blocks/cqrs/write/commande";
import InscrireUnParticipantAUneSessionDeFormation from "../inscrire-un-participant-a-une-session-de-formation";
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";
import { IdSessionDeFormation } from "../../domain/id-session-de-formation";

export default class GestionnaireDeInscrireUnParticipantAUneSessionDeFormation
  implements
    GestionnaireDeMessage<
      InscrireUnParticipantAUneSessionDeFormation,
      ParticipantInscritALaSessionDeFormation
    >
{
  public constructor(
    private readonly sessionsDeFormation: SessionsDeFormation
  ) {}

  public async executer(
    inscriptionALaSessionDeFormation: InscrireUnParticipantAUneSessionDeFormation
  ): Promise<ParticipantInscritALaSessionDeFormation> {
    const sessionDeFormation: SessionDeFormation =
      await this.sessionsDeFormation.parId(
        new IdSessionDeFormation(
          inscriptionALaSessionDeFormation.idSessionDeSessionDeFormation
        )
      );
    const participant = new Participant(
      new Email(inscriptionALaSessionDeFormation.emailParticipant)
    );
    sessionDeFormation.ajouterParticipant(participant);
    await this.sessionsDeFormation.persister(sessionDeFormation);

    return new ParticipantInscritALaSessionDeFormation(
      sessionDeFormation.toState().codeFormation,
      sessionDeFormation.id.valeur,
      participant.id.valeur
    );
  }

  public ecoute(c: Commande): boolean {
    return c instanceof InscrireUnParticipantAUneSessionDeFormation;
  }
}
