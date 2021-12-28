import Fastify from 'fastify'
import Liens from '../building-blocks/hateoas/liens'
import catalogueDeFormationsBC from '../modules/catalogue-de-formations'
import catalogueDeFormationsAssociationMessageEtHttp
  from '../modules/catalogue-de-formations/configuration/association-message-et-http'
import QuellesSontLesFormationsAuCatalogue
  from '../modules/catalogue-de-formations/read/application/quelles-sont-les-formations-au-catalogue'
import BusDeQuestion from '../building-blocks/cqrs/read/bus-de-question'
import ExecuterLeGestionnaireDeQuestion from '../building-blocks/cqrs/read/executer-le-gestionnaire-de-question'
import GestionnaireDeQuellesSontLesFormationsAuCatalogue
  from '../modules/catalogue-de-formations/read/application/gestionnaire/gestionnaire-de-quelles-sont-les-formations-au-catalogue'
import CreerUneFormation from '../modules/catalogue-de-formations/write/application/creer-une-formation'
import BusDeCommandes from '../building-blocks/cqrs/write/bus-de-commandes'
import ExecuterLeGestionnaireDeCommande from '../building-blocks/cqrs/write/executer-le-gestionnaire-de-commande'
import {
  GestionnaireDeCreerUneFormation
} from '../modules/catalogue-de-formations/write/application/gestionnaire/gestionnaire-de-creer-une-formation'
import {
  GestionnaireDeAjouterUnFormateurPotentielALaFormation
} from '../modules/catalogue-de-formations/write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-potentiel-a-la-formation'
import {
  GestionnaireDeQuellesSontLesSessionsDeFormationAVenir
} from '../modules/sessions-de-formation/read/application/gestionnaire/gestionnaire-de-quelles-sont-les-sessions-de-formation-a-venir'
import { HorlogeEnMemoire } from '../../test/horloge-en-memoire'
import { DateTime } from 'luxon'
import CalendrierDesSessionsDeFormationEnMemoire
  from '../../test/sessions-de-formation/read/calendrier-des-sessions-de-formation-en-memoire'
import GestionnaireDeCreerUneSessionDeFormation
  from '../modules/sessions-de-formation/write/application/gestionnaire/gestionnaire-de-creer-une-session-de-formation'
import GestionnaireDeAjouterUnFormateurAUneSessionDeFormation
  from '../modules/sessions-de-formation/write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-a-une-session-de-formation'
import GestionnaireDeInscrireUnParticipantAUneSessionDeFormation
  from '../modules/sessions-de-formation/write/application/gestionnaire/gestionnaire-de-inscrire-un-participant-a-une-session-de-formation'
import { SessionsDeFormationEnMemoire } from '../../test/sessions-de-formation/write/sessions-de-formation-en-memoire'
import CatalogueDeFormationsDeLectureEnMemoire
  from '../../test/catalogue-de-formations/read/catalogue-de-formations-en-memoire'
import CatalogueDeFormationsDEcritureEnMemoire
  from '../../test/catalogue-de-formations/write/catalogue-de-formations-en-memoire'
import AjouterUnFormateurPotentielALaFormation
  from '../modules/catalogue-de-formations/write/application/ajouter-un-formateur-potentiel-a-la-formation'

const catalogueDeFormationsDeLectureEnMemoire = new CatalogueDeFormationsDeLectureEnMemoire()
const catalogueDeFormationsDEcritureEnMemoire = new CatalogueDeFormationsDEcritureEnMemoire()
const calendrierDesSessionsDeFormationFuturesEnMemoire = new CalendrierDesSessionsDeFormationEnMemoire()
const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()
const horloge = new HorlogeEnMemoire(DateTime.now().toISODate())

const fastify = Fastify({
  logger: {
    prettyPrint: true
  }
})

fastify.register(require('fastify-swagger'), {
  routePrefix: '/documentation',
  exposeRoute: true
})

const busDeQuestions = new BusDeQuestion([
  new ExecuterLeGestionnaireDeQuestion([
      new GestionnaireDeQuellesSontLesFormationsAuCatalogue(catalogueDeFormationsDeLectureEnMemoire),
      new GestionnaireDeQuellesSontLesSessionsDeFormationAVenir(horloge, calendrierDesSessionsDeFormationFuturesEnMemoire)
    ],
    fastify.log
  )
])

const busDeCommandes = new BusDeCommandes([
  new ExecuterLeGestionnaireDeCommande(
    [
      new GestionnaireDeCreerUneFormation(catalogueDeFormationsDEcritureEnMemoire),
      new GestionnaireDeAjouterUnFormateurPotentielALaFormation(catalogueDeFormationsDEcritureEnMemoire),
      new GestionnaireDeCreerUneSessionDeFormation(sessionsDeFormationEnMemoire),
      new GestionnaireDeAjouterUnFormateurAUneSessionDeFormation(sessionsDeFormationEnMemoire),
      new GestionnaireDeInscrireUnParticipantAUneSessionDeFormation(sessionsDeFormationEnMemoire)
    ],
    fastify.log
  )
])

const constructeurDeLiensDuCatalogueDeFormations = new Liens(
  catalogueDeFormationsBC.arborescenceDeMessages,
  catalogueDeFormationsAssociationMessageEtHttp
)

fastify.route({
  method: 'GET',
  url: '/formations',
  handler: async () => {
    const message = new QuellesSontLesFormationsAuCatalogue()
    const data = busDeQuestions.publier(message)
    return { data, liens: constructeurDeLiensDuCatalogueDeFormations.creer(message) }
  }
})

fastify.route<{ Body: { code: string, dureeEnHeures: number } }>({
  method: 'POST',
  url: '/formations',
  schema: {
    body: { code: { type: 'string' }, dureeEnHeures: { type: 'number' } }
  },
  handler: async (req) => {
    const message = new CreerUneFormation(req.body.code, req.body.dureeEnHeures)
    const data = busDeCommandes.publier(message)
    return { data, liens: constructeurDeLiensDuCatalogueDeFormations.creer(message) }
  }
})

fastify.route<{ Params: { code: string }, Body: { email: string } }>({
  method: 'POST',
  url: '/formations/:code/formateurs-potentiels',
  schema: {
    params: { code: { type: 'string' } },
    body: { email: { type: 'string' } }
  },
  handler: async (req) => {
    const message = new AjouterUnFormateurPotentielALaFormation(req.body.email, req.params.code)
    const data = busDeCommandes.publier(message)
    return { data, liens: constructeurDeLiensDuCatalogueDeFormations.creer(message) }
  }
})

export default fastify
