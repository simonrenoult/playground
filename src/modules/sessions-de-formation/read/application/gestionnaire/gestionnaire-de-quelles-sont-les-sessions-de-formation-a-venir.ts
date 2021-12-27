import GestionnaireDeQuestion from '../../../../../building-blocks/cqrs/read/gestionnaire-de-question'
import { SessionsDeFormationsFutures } from '../../domain/modele-de-lecture/sessions-de-formations-futures'
import { Horloge } from '../../../../shared-kernel/horloge'
import { CalendrierDesSessionsDeFormation } from '../../domain/projection/calendrier-des-sessions-de-formation'
import Question from '../../../../../building-blocks/cqrs/read/question'
import QuellesSontLesFormationsAuCatalogue from '../../../../catalogue-de-formations/read/application/quelles-sont-les-formations-au-catalogue'
import QuellesSontLesSessionsDeFormationAVenir from '../quelles-sont-les-sessions-de-formation-a-venir'

export class GestionnaireDeQuellesSontLesSessionsDeFormationAVenir implements GestionnaireDeQuestion<QuellesSontLesSessionsDeFormationAVenir, SessionsDeFormationsFutures> {
  constructor(
    private readonly horloge: Horloge,
    private readonly calendrierDesSessionsDeFormation: CalendrierDesSessionsDeFormation
  ) {
  }

  public executer(_q: QuellesSontLesSessionsDeFormationAVenir): SessionsDeFormationsFutures {
    return this.calendrierDesSessionsDeFormation.lister(this.horloge.maintenant())
  }

  public ecoute(q: Question): boolean {
    return q instanceof QuellesSontLesFormationsAuCatalogue
  }
}
