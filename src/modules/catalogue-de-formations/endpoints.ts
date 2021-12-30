import {FastifyInstance} from 'fastify'
import Liens from '../../building-blocks/hateoas/liens'
import associationMessageEtHttp from './configuration/association-message-et-http'
import QuellesSontLesFormationsAuCatalogue from './read/application/quelles-sont-les-formations-au-catalogue'
import CreerUneFormation from './write/application/creer-une-formation'
import AjouterUnFormateurPotentielALaFormation from './write/application/ajouter-un-formateur-potentiel-a-la-formation'
import boundedContext from './bounded-context'
import BusDeQuestions from '../../building-blocks/cqrs/read/bus-de-questions'
import BusDeCommandes from '../../building-blocks/cqrs/write/bus-de-commandes'
import {ListeDeEndpoints} from '../../building-blocks/liste-de-endpoints'

export default class CatalogueDeFormationEndpoints implements ListeDeEndpoints {

  private readonly constructeurDeLiens: Liens

  constructor(
    private readonly busDeQuestions: BusDeQuestions,
    private readonly busDeCommandes: BusDeCommandes,
  ) {
    this.constructeurDeLiens = new Liens(
      boundedContext.arborescenceDeMessages,
      associationMessageEtHttp
    )
  }

  enregistrerEndpoints(fastify: FastifyInstance): void {
    fastify.route({
      method: 'GET',
      url: '/formations',
      schema: {
        // @ts-ignore
        tags: [boundedContext.nom]
      },
      handler: async () => {
        const message = new QuellesSontLesFormationsAuCatalogue()
        const data = this.busDeQuestions.publier(message)
        return { data, liens: this.constructeurDeLiens.creer(message) }
      }
    })

    fastify.route<{ Body: { code: string, dureeEnHeures: number } }>({
      method: 'POST',
      url: '/formations',
      schema: {
        body: { code: { type: 'string' }, dureeEnHeures: { type: 'number' } },
        // @ts-ignore
        tags: [boundedContext.nom]
      },
      handler: async (req) => {
        const message = new CreerUneFormation(req.body.code, req.body.dureeEnHeures)
        const data = this.busDeCommandes.publier(message)
        return { data, liens: this.constructeurDeLiens.creer(message) }
      }
    })

    fastify.route<{ Params: { code: string }, Body: { email: string } }>({
      method: 'POST',
      url: '/formations/:code/formateurs-potentiels',
      schema: {
        params: { code: { type: 'string' } },
        body: { email: { type: 'string' } },
        // @ts-ignore
        tags: [boundedContext.nom]
      },
      handler: async (req) => {
        const message = new AjouterUnFormateurPotentielALaFormation(req.body.email, req.params.code)
        const data = this.busDeCommandes.publier(message)
        return { data, liens: this.constructeurDeLiens.creer(message) }
      }
    })

  }
}
