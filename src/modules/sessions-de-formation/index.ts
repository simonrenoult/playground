import { FastifyInstance } from 'fastify'
import BusDeQuestion from '../../building-blocks/cqrs/read/bus-de-question'
import BusDeCommandes from '../../building-blocks/cqrs/write/bus-de-commandes'
import Liens from '../../building-blocks/hateoas/liens'
import { Module } from '../../building-blocks/module'
import boundedContext from './bounded-context'
import associationMessageEtHttp from './configuration/association-message-et-http'
import GestionnaireDeQuestion from '../../building-blocks/cqrs/read/gestionnaire-de-question'
import { EnregistreurDeGestionnaire } from '../../building-blocks/cqrs/enregistreur-de-gestionnaire'
import {
  GestionnaireDeQuellesSontLesSessionsDeFormationAVenir
} from './read/application/gestionnaire/gestionnaire-de-quelles-sont-les-sessions-de-formation-a-venir'
import CalendrierDesSessionsDeFormationEnMemoire
  from '../../../test/sessions-de-formation/read/calendrier-des-sessions-de-formation-en-memoire'
import {
  SessionsDeFormationEnMemoire
} from '../../../test/sessions-de-formation/write/sessions-de-formation-en-memoire'
import { HorlogeEnMemoire } from '../../../test/horloge-en-memoire'
import { DateTime } from 'luxon'
import GestionnaireDeCommande from '../../building-blocks/cqrs/write/gestionnaire-de-commande'
import GestionnaireDeCreerUneSessionDeFormation
  from './write/application/gestionnaire/gestionnaire-de-creer-une-session-de-formation'
import GestionnaireDeAjouterUnFormateurAUneSessionDeFormation
  from './write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-a-une-session-de-formation'
import GestionnaireDeInscrireUnParticipantAUneSessionDeFormation
  from './write/application/gestionnaire/gestionnaire-de-inscrire-un-participant-a-une-session-de-formation'
import SessionsDeFormationEndpoints from './endpoints'
import { ListeDeEndpoints } from '../../building-blocks/liste-de-endpoints'

export default class SessionsDeFormationModule implements Module {
  private readonly constructeurDeLiens: Liens
  private readonly listeDeEndpoints: ListeDeEndpoints

  constructor(
    readonly busDeQuestions: BusDeQuestion,
    readonly busDeCommandes: BusDeCommandes,
  ) {
    this.constructeurDeLiens = new Liens(
      boundedContext.arborescenceDeMessages,
      associationMessageEtHttp
    )

    this.listeDeEndpoints = new SessionsDeFormationEndpoints(busDeQuestions, busDeCommandes)
  }

  public ajouterLesGestionnairesDeQuestion(enregistreur: EnregistreurDeGestionnaire<GestionnaireDeQuestion>) {
    const calendrierDesSessionsDeFormationFuturesEnMemoire = new CalendrierDesSessionsDeFormationEnMemoire()
    const horloge = new HorlogeEnMemoire(DateTime.now().toISODate())

    enregistreur
      .enregister(new GestionnaireDeQuellesSontLesSessionsDeFormationAVenir(horloge, calendrierDesSessionsDeFormationFuturesEnMemoire))
  }

  public ajouterLesGestionnairesDeCommande(enregistreur: EnregistreurDeGestionnaire<GestionnaireDeCommande>) {
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()

    enregistreur
      .enregister(new GestionnaireDeCreerUneSessionDeFormation(sessionsDeFormationEnMemoire))
      .enregister(new GestionnaireDeAjouterUnFormateurAUneSessionDeFormation(sessionsDeFormationEnMemoire))
      .enregister(new GestionnaireDeInscrireUnParticipantAUneSessionDeFormation(sessionsDeFormationEnMemoire))
  }

  public ajouterLesEndpoints(fastify: FastifyInstance) {
    this.listeDeEndpoints.enregistrerEndpoints(fastify)
  }
}
