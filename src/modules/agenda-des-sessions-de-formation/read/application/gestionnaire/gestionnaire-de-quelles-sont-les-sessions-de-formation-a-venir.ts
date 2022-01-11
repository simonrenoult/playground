import { SessionsDeFormationsFutures } from "../../domain/modele-de-lecture/sessions-de-formations-futures";
import { Horloge } from "../../../../shared-kernel/horloge";
import { AgendaDesSessionsDeFormation } from "../../domain/projection/agenda-des-sessions-de-formation";
import Question from "../../../../../building-blocks/cqrs/read/question";
import QuellesSontLesSessionsDeFormationAVenir from "../quelles-sont-les-sessions-de-formation-a-venir";
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";

export class GestionnaireDeQuellesSontLesSessionsDeFormationAVenir
  implements
    GestionnaireDeMessage<
      QuellesSontLesSessionsDeFormationAVenir,
      SessionsDeFormationsFutures
    >
{
  constructor(
    private readonly horloge: Horloge,
    private readonly agendaDesSessionsDeFormation: AgendaDesSessionsDeFormation
  ) {}

  public async executer(
    _q: QuellesSontLesSessionsDeFormationAVenir
  ): Promise<SessionsDeFormationsFutures> {
    return this.agendaDesSessionsDeFormation.lister(this.horloge.maintenant());
  }

  public ecoute(q: Question): boolean {
    return q instanceof QuellesSontLesSessionsDeFormationAVenir;
  }
}
