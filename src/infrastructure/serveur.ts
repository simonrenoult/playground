import Fastify from 'fastify'
import FastifySwagger from 'fastify-swagger'
import BusDeQuestion from '../building-blocks/cqrs/read/bus-de-question'
import ExecuterLeGestionnaireDeQuestion from '../building-blocks/cqrs/read/executer-le-gestionnaire-de-question'
import BusDeCommandes from '../building-blocks/cqrs/write/bus-de-commandes'
import ExecuterLeGestionnaireDeCommande from '../building-blocks/cqrs/write/executer-le-gestionnaire-de-commande'
import { Module } from '../building-blocks/module'
import CatalogueDeFormationsModule from '../modules/catalogue-de-formations'
import SessionsDeFormationModule from '../modules/sessions-de-formation'

const fastify = Fastify({
  logger: {
    prettyPrint: true
  }
})

fastify.register(FastifySwagger, {
  routePrefix: '/documentation',
  exposeRoute: true
})

const executerLeGestionnaireDeQuestion = new ExecuterLeGestionnaireDeQuestion(fastify.log)
const busDeQuestions = new BusDeQuestion([
  executerLeGestionnaireDeQuestion
])

const executerLeGestionnaireDeCommande = new ExecuterLeGestionnaireDeCommande(fastify.log)
const busDeCommandes = new BusDeCommandes([
  executerLeGestionnaireDeCommande
])

const modules: Module[] = [
  new CatalogueDeFormationsModule(busDeQuestions, busDeCommandes),
  new SessionsDeFormationModule(busDeQuestions, busDeCommandes)
]

modules.forEach(m => {
  m.ajouterLesEndpoints(fastify)
  m.ajouterLesGestionnairesDeQuestion(executerLeGestionnaireDeQuestion)
  m.ajouterLesGestionnairesDeCommande(executerLeGestionnaireDeCommande)
})

export default fastify
