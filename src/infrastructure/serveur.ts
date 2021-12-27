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
import CatalogueDeFormationsReadSide
  from '../modules/catalogue-de-formations/read/domain/projection/catalogue-de-formations'
import CatalogueDeFormationsWriteSide
  from '../modules/catalogue-de-formations/write/domain/repository/catalogue-de-formations'
import FormationsAuCatalogue
  from '../modules/catalogue-de-formations/read/domain/modele-de-lecture/formations-au-catalogue'
import { CodeDeFormation, Formation } from '../modules/catalogue-de-formations/write/domain/entite/formation'

class CatalogueDeFormationsEnMemoire implements CatalogueDeFormationsWriteSide, CatalogueDeFormationsReadSide {
  private formations: Formation[]
  lister(): FormationsAuCatalogue {
    return this.formations.map(f => f.id.valeur)
  }

  parId(id: CodeDeFormation): Formation {
    return this.formations.find(f => f.id.equals(id))
  }

  persister(a: Formation): void {
    this.formations.push(a)
  }

}

const catalogueDeFormationsEnMemoire = new CatalogueDeFormationsEnMemoire()

const fastify = Fastify({
  logger: {
    prettyPrint: true
  }
})

const busDeQuestions = new BusDeQuestion([
  new ExecuterLeGestionnaireDeQuestion([
      new GestionnaireDeQuellesSontLesFormationsAuCatalogue(catalogueDeFormationsEnMemoire
    )],
    fastify.log
  )
])

const busDeCommandes = new BusDeCommandes([
  new ExecuterLeGestionnaireDeCommande([
      new GestionnaireDeCreerUneFormation(catalogueDeFormationsEnMemoire)
    ],
    fastify.log
  )
])

const constructeurDeLiensDuCatalogueDeFormations = new Liens(
  catalogueDeFormationsBC.arborescenceDeMessages,
  catalogueDeFormationsAssociationMessageEtHttp
)


fastify.get('/formations', async (req, res) => {
  const message = new QuellesSontLesFormationsAuCatalogue()
  const data = busDeQuestions.publier(message)
  return { data, liens: constructeurDeLiensDuCatalogueDeFormations.creer(message) }
})

fastify.post<{ Body: { code: string, dureeEnHeures: number } }>('/formations', async (req, res) => {
  const message = new CreerUneFormation(req.body.code, req.body.dureeEnHeures)
  const data = busDeCommandes.publier(message)
  return { data, liens: constructeurDeLiensDuCatalogueDeFormations.creer(message) }
})

export default fastify
