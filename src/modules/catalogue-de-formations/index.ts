import { FastifyInstance } from "fastify";
import { AwilixContainer, createContainer } from "awilix";
import BusDeQuestions from "../../building-blocks/cqrs/read/bus-de-questions";
import BusDeCommandes from "../../building-blocks/cqrs/write/bus-de-commandes";
import { Module } from "../../building-blocks/module";
import { ListeDeEndpoints } from "../../building-blocks/liste-de-endpoints";
import BusDEvenementsDuDomaine from "../../building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import CatalogueDeFormationEndpoints from "./endpoints";
import BoundedContext from "./bounded-context";
import IOCWrite, { ICradleWrite } from "./write/ioc";
import IOCRead, { ICradleRead } from "./read/ioc";

export default class CatalogueDeFormationsModule implements Module {
  public readonly boundedContext = BoundedContext;

  private readonly listeDeEndpoints: ListeDeEndpoints;
  private readonly iocRead: AwilixContainer<ICradleRead>;
  private readonly iocWrite: AwilixContainer<ICradleWrite>;

  public constructor(
    private readonly busDeQuestions: BusDeQuestions,
    private readonly busDeCommandes: BusDeCommandes
  ) {
    this.listeDeEndpoints = new CatalogueDeFormationEndpoints(
      busDeQuestions,
      busDeCommandes
    );
    const container = createContainer();
    this.iocRead = IOCRead.recuperer(container);
    this.iocWrite = IOCWrite.recuperer(container);
  }

  public enregistrerLesGestionnairesDeQuestion(bus: BusDeQuestions): void {
    bus.enregistrerGestionnaire(
      this.iocRead.cradle.gestionnaireDeQuellesSontLesFormationsAuCatalogue
    );
  }

  public enregistrerLesGestionnairesDeCommande(bus: BusDeCommandes): void {
    bus.enregistrerGestionnaire(
      this.iocWrite.cradle.gestionnaireDeCreerUneFormation
    );
    bus.enregistrerGestionnaire(
      this.iocWrite.cradle.gestionnaireDeAjouterUnFormateurPotentielALaFormation
    );
  }

  public enregistrerLesGestionnairesDEvenementDuDomaine(
    bus: BusDEvenementsDuDomaine
  ): void {
    bus.enregistrerGestionnaire(this.iocRead.cradle.ecouteurDeFormationCreee);
  }

  public enregistrerLesEndpoints(fastify: FastifyInstance): void {
    this.listeDeEndpoints.enregistrerEndpoints(fastify);
  }
}
