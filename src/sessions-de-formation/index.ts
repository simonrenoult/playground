import BoundedContext, { BusinessModel, Domain, Evolution, RoleDuDomaine } from '../building-blocks/bounded-context'
import QuellesSontLesSessionsDeFormationAVenir from './read/application/quelles-sont-les-sessions-de-formation-a-venir'
import CreerUneSessionDeFormation from './write/application/creer-une-session-de-formation'
import AjouterUnFormateurPotentielALaFormation
  from '../catalogue-de-formations/write/application/ajouter-un-formateur-potentiel-a-la-formation'
import InscrireUnParticipantAUneSessionDeFormation
  from './write/application/inscrire-un-participant-a-une-session-de-formation'

export default new BoundedContext(
  "Sessions de formation",
  "Création, modification, suppression et consultation des " +
  "sessions de formations planifiées à partir du catalogue.",
  {
    domain: Domain.CORE,
    businessModel: BusinessModel.COST_REDUCTION,
    evolution: Evolution.PRODUCT
  },
  [RoleDuDomaine.EXECUTION],
  [
    {
      messageInitial: QuellesSontLesSessionsDeFormationAVenir,
      messagesSuivants: [CreerUneSessionDeFormation]
    },
    {
      messageInitial: CreerUneSessionDeFormation,
      messagesSuivants: [
        AjouterUnFormateurPotentielALaFormation,
        QuellesSontLesSessionsDeFormationAVenir,
        InscrireUnParticipantAUneSessionDeFormation
      ]
    }
  ],
  __dirname
)
