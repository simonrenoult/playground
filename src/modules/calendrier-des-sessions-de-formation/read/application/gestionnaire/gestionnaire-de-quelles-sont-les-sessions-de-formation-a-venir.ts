import { SessionsDeFormationsFutures } from "../../domain/modele-de-lecture/sessions-de-formations-futures";
import { Horloge } from "../../../../shared-kernel/horloge";
import { CalendrierDesSessionsDeFormation } from "../../domain/projection/calendrier-des-sessions-de-formation";
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
    private readonly calendrierDesSessionsDeFormation: CalendrierDesSessionsDeFormation
  ) {}

  public executer(
    _q: QuellesSontLesSessionsDeFormationAVenir
  ): SessionsDeFormationsFutures {
    return this.calendrierDesSessionsDeFormation.lister(
      this.horloge.maintenant()
    );
  }

  public ecoute(q: Question): boolean {
    return q instanceof QuellesSontLesSessionsDeFormationAVenir;
  }
}
