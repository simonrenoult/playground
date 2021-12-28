import { FastifyInstance } from 'fastify'
import BusDeQuestion from '../../building-blocks/cqrs/read/bus-de-question'
import BusDeCommandes from '../../building-blocks/cqrs/write/bus-de-commandes'
import Liens from '../../building-blocks/hateoas/liens'
import { Module } from '../../building-blocks/module'
import GestionnaireDeQuestion from '../../building-blocks/cqrs/read/gestionnaire-de-question'
import { EnregistreurDeGestionnaire } from '../../building-blocks/cqrs/enregistreur-de-gestionnaire'
import GestionnaireDeCommande from '../../building-blocks/cqrs/write/gestionnaire-de-commande'
import associationMessageEtHttp from './configuration/association-message-et-http'
import boundedContext from './bounded-context'
import GestionnaireDeQuellesSontLesFormationsAuCatalogue
  from './read/application/gestionnaire/gestionnaire-de-quelles-sont-les-formations-au-catalogue'
import CatalogueDeFormationsDeLectureEnMemoire
  from '../../../test/catalogue-de-formations/read/catalogue-de-formations-en-memoire'
import CatalogueDeFormationsDEcritureEnMemoire
  from '../../../test/catalogue-de-formations/write/catalogue-de-formations-en-memoire'
import { GestionnaireDeCreerUneFormation } from './write/application/gestionnaire/gestionnaire-de-creer-une-formation'
import {
  GestionnaireDeAjouterUnFormateurPotentielALaFormation
} from './write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-potentiel-a-la-formation'
import CatalogueDeFormationEndpoints from './endpoints'
import { ListeDeEndpoints } from '../../building-blocks/liste-de-endpoints'

export default class CatalogueDeFormationsModule implements Module {
  private readonly constructeurDeLiens: Liens
  private readonly listeDeEndpoints: ListeDeEndpoints

  constructor(
    private readonly busDeQuestions: BusDeQuestion,
    private readonly busDeCommandes: BusDeCommandes,
  ) {
    this.constructeurDeLiens = new Liens(
      boundedContext.arborescenceDeMessages,
      associationMessageEtHttp
    )
    this.listeDeEndpoints = new CatalogueDeFormationEndpoints(busDeQuestions, busDeCommandes)
  }

  public ajouterLesGestionnairesDeQuestion(enregistreur: EnregistreurDeGestionnaire<GestionnaireDeQuestion>) {
    const catalogueDeFormationsDeLectureEnMemoire = new CatalogueDeFormationsDeLectureEnMemoire()

    enregistreur
      .enregister(new GestionnaireDeQuellesSontLesFormationsAuCatalogue(catalogueDeFormationsDeLectureEnMemoire))
  }

  public ajouterLesGestionnairesDeCommande(enregistreur: EnregistreurDeGestionnaire<GestionnaireDeCommande>) {
    const catalogueDeFormationsDEcritureEnMemoire = new CatalogueDeFormationsDEcritureEnMemoire()

    enregistreur
      .enregister(new GestionnaireDeCreerUneFormation(catalogueDeFormationsDEcritureEnMemoire))
      .enregister(new GestionnaireDeAjouterUnFormateurPotentielALaFormation(catalogueDeFormationsDEcritureEnMemoire))
  }

  public ajouterLesEndpoints(fastify: FastifyInstance) {
    this.listeDeEndpoints.enregistrerEndpoints(fastify)
  }
}
