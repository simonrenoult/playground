import { AssociationMessageEtHttp } from '../../building-blocks/hateoas/association-message-et-http'
import QuellesSontLesSessionsDeFormationAVenir from '../read/application/quelles-sont-les-sessions-de-formation-a-venir'
import AjouterUnFormateurAUneSessionDeFormation
  from '../write/application/ajouter-un-formateur-a-une-session-de-formation'
import CreerUneSessionDeFormation from '../write/application/creer-une-session-de-formation'
import InscrireUnParticipantAUneSessionDeFormation
  from '../write/application/inscrire-un-participant-a-une-session-de-formation'

const associationMessageEtHttp: AssociationMessageEtHttp[] = [
  {
    message: QuellesSontLesSessionsDeFormationAVenir,
    method: 'GET',
    href: '/sessions-de-formation',
  },
  {
    message: CreerUneSessionDeFormation,
    method: 'POST',
    href: '/sessions-de-formation',
  },
  {
    message: AjouterUnFormateurAUneSessionDeFormation,
    method: 'POST',
    href: '/sessions-de-formation/:id/formateurs',
  },
  {
    message: InscrireUnParticipantAUneSessionDeFormation,
    method: 'POST',
    href: '/sessions-de-formation/:id/participants',
  }
]

export default associationMessageEtHttp
