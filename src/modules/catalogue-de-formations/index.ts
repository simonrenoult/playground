import { FastifyInstance } from "fastify";
import BusDeQuestions from "../../building-blocks/cqrs/read/bus-de-questions";
import BusDeCommandes from "../../building-blocks/cqrs/write/bus-de-commandes";
import Liens from "../../building-blocks/hateoas/liens";
import { Module } from "../../building-blocks/module";
import { ListeDeEndpoints } from "../../building-blocks/liste-de-endpoints";
import associationMessageEtHttp from "./configuration/association-message-et-http";
import boundedContext from "./bounded-context";
import CatalogueDeFormationEndpoints from "./endpoints";
import GestionnaireDeQuellesSontLesFormationsAuCatalogue from "./read/application/gestionnaire/gestionnaire-de-quelles-sont-les-formations-au-catalogue";
import { GestionnaireDeCreerUneFormation } from "./write/application/gestionnaire/gestionnaire-de-creer-une-formation";
import { GestionnaireDeAjouterUnFormateurPotentielALaFormation } from "./write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-potentiel-a-la-formation";
import BusDEvenementsDuDomaine from "../../building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import CatalogueDeFormationsEnLectureEnMemoire from "./read/infrastructure/projection/catalogue-de-formations";
import CatalogueDeFormationsEnEcritureEnMemoire from "./write/infrastructure/catalogue-de-formations-en-memoire";

export default class CatalogueDeFormationsModule implements Module {
  private readonly constructeurDeLiens: Liens;
  private readonly listeDeEndpoints: ListeDeEndpoints;

  constructor(
    private readonly busDeQuestions: BusDeQuestions,
    private readonly busDeCommandes: BusDeCommandes
  ) {
    this.constructeurDeLiens = new Liens(
      boundedContext.arborescenceDeMessages,
      associationMessageEtHttp
    );
    this.listeDeEndpoints = new CatalogueDeFormationEndpoints(
      busDeQuestions,
      busDeCommandes
    );
  }

  public ajouterLesGestionnairesDeQuestion(bus: BusDeQuestions) {
    const catalogue = new CatalogueDeFormationsEnLectureEnMemoire();
    bus.enregistrerGestionnaire(
      new GestionnaireDeQuellesSontLesFormationsAuCatalogue(catalogue)
    );
  }

  public ajouterLesGestionnairesDeCommande(bus: BusDeCommandes) {
    const catalogueDeFormationsDEcritureEnMemoire =
      new CatalogueDeFormationsEnEcritureEnMemoire();

    bus.enregistrerGestionnaire(
      new GestionnaireDeCreerUneFormation(
        catalogueDeFormationsDEcritureEnMemoire
      )
    );
    bus.enregistrerGestionnaire(
      new GestionnaireDeAjouterUnFormateurPotentielALaFormation(
        catalogueDeFormationsDEcritureEnMemoire
      )
    );
  }

  public ajouterLesGestionnairesDEvenementDuDomaine(
    _bus: BusDEvenementsDuDomaine
  ) {}

  public ajouterLesEndpoints(fastify: FastifyInstance) {
    this.listeDeEndpoints.enregistrerEndpoints(fastify);
  }
}
