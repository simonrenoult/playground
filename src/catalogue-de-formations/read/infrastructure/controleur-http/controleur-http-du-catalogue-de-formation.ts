import { IncomingMessage, Server, ServerResponse } from 'http'
import BusDeCommandes from '../../../../building-blocks/write/bus-de-commandes'
import QuellesSontLesFormationsAuCatalogue from '../../application/quelles-sont-les-formations-au-catalogue'
import Message from '../../../../building-blocks/message'
import BusDeQuestions from '../../../../building-blocks/read/bus-de-question'
import Liens from '../../../../building-blocks/hateoas/liens'

export default class ControleurHttpDuCatalogueDeFormation {
  constructor(
    private readonly liens: Liens,
    private readonly busDeCommandes: BusDeCommandes,
    private readonly busDeQuestions: BusDeQuestions,
    private readonly serveur: Server,
  ) {
    this.serveur.on('request', (req: IncomingMessage, res: ServerResponse) => {
      let data: any
      let message: Message

      if (req.method === 'GET' && req.url === '/formations') {
        message = new QuellesSontLesFormationsAuCatalogue()
        data = this.busDeQuestions.publier(message)
      }

      return {
        data,
        links: this.liens.creer(message)
      }
    })
  }
}
