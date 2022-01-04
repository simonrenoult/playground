import Fastify from "fastify";
import FastifySwagger from "fastify-swagger";
import BusDeQuestions from "../building-blocks/cqrs/read/bus-de-questions";
import BusDeCommandes from "../building-blocks/cqrs/write/bus-de-commandes";
import { Module } from "../building-blocks/module";
import BusDEvenementsDuDomaine from "../building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import CatalogueDeFormationsModule from "../modules/catalogue-de-formations";
import CalendrierDesSessionsDeFormationModule from "../modules/calendrier-des-sessions-de-formation";
import AjouterLiensAuPayload from "../building-blocks/hateoas/ajouter-liens-au-payload";
import associationMessageEtHttpCatalogueDeFormations from "../modules/catalogue-de-formations/configuration/association-message-et-http";
import associationMessageEtHttpCalendierDeFormations from "../modules/calendrier-des-sessions-de-formation/configuration/association-message-et-http";

const fastify = Fastify({
  logger: {
    prettyPrint: true,
  },
});

fastify.register(FastifySwagger, {
  routePrefix: "/documentation",
  exposeRoute: true,
});

const busDeQuestions = new BusDeQuestions(fastify.log);
const busDEvenements = new BusDEvenementsDuDomaine(fastify.log);
const busDeCommandes = new BusDeCommandes(busDEvenements, fastify.log);

const catalogueDeFormationsModule = new CatalogueDeFormationsModule(
  busDeQuestions,
  busDeCommandes
);
const calendrierDesSessionsDeFormationModule =
  new CalendrierDesSessionsDeFormationModule(busDeQuestions, busDeCommandes);
const modules: Module[] = [
  catalogueDeFormationsModule,
  calendrierDesSessionsDeFormationModule,
];

modules.forEach((m) => {
  m.ajouterLesEndpoints(fastify);
  m.ajouterLesGestionnairesDeQuestion(busDeQuestions);
  m.ajouterLesGestionnairesDeCommande(busDeCommandes);
  m.ajouterLesGestionnairesDEvenementDuDomaine(busDEvenements);
});

const ajouterLiensAuPayload = new AjouterLiensAuPayload(
  fastify,
  [
    associationMessageEtHttpCatalogueDeFormations,
    associationMessageEtHttpCalendierDeFormations,
  ],
  [
    catalogueDeFormationsModule.boundedContext.arborescenceDeMessages,
    calendrierDesSessionsDeFormationModule.boundedContext
      .arborescenceDeMessages,
  ]
);

ajouterLiensAuPayload.associer();

export default fastify;
