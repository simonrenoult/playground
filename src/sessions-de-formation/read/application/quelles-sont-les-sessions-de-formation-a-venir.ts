import Question from '../../../building-blocks/read/question'
import { GestionnaireDeQuestion } from '../../../building-blocks/read/gestionnaire-de-question'
import { SessionsDeFormationsFutures } from '../domain/modele-de-lecture/sessions-de-formations-futures'
import {
  QuellesSontLesFormationsAuCatalogue
} from '../../../catalogue-de-formations/read/application/quelles-sont-les-formations-au-catalogue'
import { Horloge } from '../../../shared-kernel/horloge'
import { CalendrierDesSessionsDeFormation } from '../domain/projection/calendrier-des-sessions-de-formation'

export class QuellesSontLesSessionsDeFormationAVenir implements Question {
  public readonly nom = 'QUELLES_SONT_LES_SESSIONS_DE_FORMATION_A_VENIR'
}

export class GestionnaireDeQuellesSontLesSessionsDeFormationAVenir implements GestionnaireDeQuestion<QuellesSontLesSessionsDeFormationAVenir, SessionsDeFormationsFutures> {
  constructor(
    private readonly horloge: Horloge,
    private readonly calendrierDesSessionsDeFormation: CalendrierDesSessionsDeFormation
  ) {
  }

  public executer(q: QuellesSontLesSessionsDeFormationAVenir): SessionsDeFormationsFutures {
    return this.calendrierDesSessionsDeFormation.lister(this.horloge.maintenant())
  }

  public ecoute(q: Question): boolean {
    return q instanceof QuellesSontLesFormationsAuCatalogue
  }
}
