import {FastifyInstance} from 'fastify'
import BusDeQuestions from "./cqrs/read/bus-de-questions";
import BusDeCommandes from "./cqrs/write/bus-de-commandes";
import BusDEvenementsDuDomaine from "./cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";

export interface Module {
  ajouterLesEndpoints(fastify: FastifyInstance): void
  ajouterLesGestionnairesDeQuestion(busDeQuestions: BusDeQuestions): void
  ajouterLesGestionnairesDeCommande(busDeCommandes: BusDeCommandes): void
  ajouterLesGestionnairesDEvenementDuDomaine(busDEvenementsDuDomaine: BusDEvenementsDuDomaine): void;
}
