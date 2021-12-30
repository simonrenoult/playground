import Fastify from 'fastify'
import FastifySwagger from 'fastify-swagger'
import BusDeQuestions from '../building-blocks/cqrs/read/bus-de-questions'
import BusDeCommandes from '../building-blocks/cqrs/write/bus-de-commandes'
import {Module} from '../building-blocks/module'
import BusDEvenementsDuDomaine from "../building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import CatalogueDeFormationsModule from "../modules/catalogue-de-formations";
import SessionsDeFormationModule from '../modules/calendrier-des-sessions-de-formation'

const fastify = Fastify({
  logger: {
    prettyPrint: true
  }
})

fastify.register(FastifySwagger, {
  routePrefix: '/documentation',
  exposeRoute: true
})

const busDeQuestions = new BusDeQuestions(fastify.log)
const busDEvenements = new BusDEvenementsDuDomaine(fastify.log)
const busDeCommandes = new BusDeCommandes(busDEvenements, fastify.log)

const modules: Module[] = [
  new CatalogueDeFormationsModule(busDeQuestions, busDeCommandes),
  new SessionsDeFormationModule(busDeQuestions, busDeCommandes)
]

modules.forEach(m => {
  m.ajouterLesEndpoints(fastify)
  m.ajouterLesGestionnairesDeQuestion(busDeQuestions)
  m.ajouterLesGestionnairesDeCommande(busDeCommandes)
  m.ajouterLesGestionnairesDEvenementDuDomaine(busDEvenements)
})

export default fastify
