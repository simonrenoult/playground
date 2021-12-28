import { FastifyInstance } from 'fastify'
import { EnregistreurDeGestionnaire } from './cqrs/enregistreur-de-gestionnaire'
import GestionnaireDeQuestion from './cqrs/read/gestionnaire-de-question'
import GestionnaireDeCommande from './cqrs/write/gestionnaire-de-commande'

export interface Module {
  ajouterLesEndpoints(fastify: FastifyInstance): void

  ajouterLesGestionnairesDeQuestion(enregistreur: EnregistreurDeGestionnaire<GestionnaireDeQuestion>): void

  ajouterLesGestionnairesDeCommande(enregistreur: EnregistreurDeGestionnaire<GestionnaireDeCommande>): void
}
