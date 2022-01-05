import { FastifyInstance } from "fastify";
import BusDeQuestions from "./cqrs/read/bus-de-questions";
import BusDeCommandes from "./cqrs/write/bus-de-commandes";
import BusDEvenementsDuDomaine from "./cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import { IBoundedContext } from "./ddd/bounded-context";

export interface Module {
  readonly boundedContext: Readonly<IBoundedContext>;

  enregistrerLesEndpoints(fastify: FastifyInstance): void;

  enregistrerLesGestionnairesDeQuestion(busDeQuestions: BusDeQuestions): void;

  enregistrerLesGestionnairesDeCommande(busDeCommandes: BusDeCommandes): void;

  enregistrerLesGestionnairesDEvenementDuDomaine(
    busDEvenementsDuDomaine: BusDEvenementsDuDomaine
  ): void;
}
