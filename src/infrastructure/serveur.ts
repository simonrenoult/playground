import Fastify, { FastifyInstance } from "fastify";
import FastifySwagger from "fastify-swagger";
import BusDeQuestions from "../building-blocks/cqrs/read/bus-de-questions";
import BusDeCommandes from "../building-blocks/cqrs/write/bus-de-commandes";
import { Module } from "../building-blocks/module";
import BusDEvenementsDuDomaine from "../building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import CatalogueDeFormationsModule from "../modules/catalogue-de-formations";
import AgendaDesSessionsDeFormationModule from "../modules/agenda-des-sessions-de-formation";
import AjouterLiensAuPayload from "../building-blocks/hateoas/ajouter-liens-au-payload";
import associationMessageEtHttpCatalogueDeFormations from "../modules/catalogue-de-formations/configuration/association-message-et-http";
import associationMessageEtHttpAgendaDeFormations from "../modules/agenda-des-sessions-de-formation/configuration/association-message-et-http";
import configuration from "./configuration";

function nouveauServeur(): FastifyInstance {
  const fastify = Fastify({
    logger: {
      prettyPrint: true,
      level: process.env.LOG_LEVEL,
    },
  });

  fastify.decorate("configuration", configuration);

  fastify.register(FastifySwagger, {
    routePrefix: "/documentation",
    exposeRoute: true,
  });

  fastify.get("/", (request, reply) => {
    reply.send("hello world 👋");
  });

  const busDeQuestions = new BusDeQuestions(fastify.log);
  const busDEvenements = new BusDEvenementsDuDomaine(fastify.log);
  const busDeCommandes = new BusDeCommandes(busDEvenements, fastify.log);

  const catalogueDeFormationsModule = new CatalogueDeFormationsModule(
    busDeQuestions,
    busDeCommandes
  );
  const agendaDesSessionsDeFormationModule =
    new AgendaDesSessionsDeFormationModule(
      configuration,
      busDeQuestions,
      busDeCommandes
    );
  const modules: Module[] = [
    catalogueDeFormationsModule,
    agendaDesSessionsDeFormationModule,
  ];

  modules.forEach((m) => {
    m.enregistrerLesEndpoints(fastify);
    m.enregistrerLesGestionnairesDeQuestion(busDeQuestions);
    m.enregistrerLesGestionnairesDeCommande(busDeCommandes);
    m.enregistrerLesGestionnairesDEvenementDuDomaine(busDEvenements);
  });

  const ajouterLiensAuPayload = new AjouterLiensAuPayload(
    fastify,
    [
      associationMessageEtHttpCatalogueDeFormations,
      associationMessageEtHttpAgendaDeFormations,
    ],
    [
      catalogueDeFormationsModule.boundedContext.arborescenceDeMessages,
      agendaDesSessionsDeFormationModule.boundedContext.arborescenceDeMessages,
    ]
  );

  ajouterLiensAuPayload.associer();

  return fastify;
}

export default nouveauServeur;
