import {FastifyInstance} from 'fastify'
import {DateTime} from 'luxon'
import BusDeQuestions from '../../building-blocks/cqrs/read/bus-de-questions'
import BusDeCommandes from '../../building-blocks/cqrs/write/bus-de-commandes'
import Liens from '../../building-blocks/hateoas/liens'
import {Module} from '../../building-blocks/module'
import {ListeDeEndpoints} from '../../building-blocks/liste-de-endpoints'
import boundedContext from './bounded-context'
import SessionsDeFormationEndpoints from './endpoints'
import associationMessageEtHttp from './configuration/association-message-et-http'
import {
  GestionnaireDeQuellesSontLesSessionsDeFormationAVenir
} from './read/application/gestionnaire/gestionnaire-de-quelles-sont-les-sessions-de-formation-a-venir'
import GestionnaireDeCreerUneSessionDeFormation
  from './write/application/gestionnaire/gestionnaire-de-creer-une-session-de-formation'
import GestionnaireDeAjouterUnFormateurAUneSessionDeFormation
  from './write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-a-une-session-de-formation'
import GestionnaireDeInscrireUnParticipantAUneSessionDeFormation
  from './write/application/gestionnaire/gestionnaire-de-inscrire-un-participant-a-une-session-de-formation'
import InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation
  from "./write/application/informer-les-formateurs-potentiels-d-une-nouvelle-session-de.formation";
import CatalogueDeFormationsGatewayEnMemoire
  from "../../../test/catalogue-de-formations/catalogue-de-formations-gateway-en-memoire";
import {NotifieurEnMemoire} from "../../../test/sessions-de-formation/notifieur-en-memoire";
import CalendrierDesSessionsDeFormationEnMemoire
  from '../../../test/sessions-de-formation/read/calendrier-des-sessions-de-formation-en-memoire'
import {SessionsDeFormationEnMemoire} from '../../../test/sessions-de-formation/write/sessions-de-formation-en-memoire'
import {HorlogeEnMemoire} from '../../../test/horloge-en-memoire'
import BusDEvenementsDuDomaine from "../../building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";

export default class SessionsDeFormationModule implements Module {
  private readonly constructeurDeLiens: Liens
  private readonly listeDeEndpoints: ListeDeEndpoints

  constructor(
    readonly busDeQuestions: BusDeQuestions,
    readonly busDeCommandes: BusDeCommandes,
  ) {
    this.constructeurDeLiens = new Liens(
      boundedContext.arborescenceDeMessages,
      associationMessageEtHttp
    )

    this.listeDeEndpoints = new SessionsDeFormationEndpoints(busDeQuestions, busDeCommandes)
  }

  public ajouterLesGestionnairesDeQuestion(bus: BusDeQuestions): void {
    const calendrierDesSessionsDeFormationFuturesEnMemoire = new CalendrierDesSessionsDeFormationEnMemoire()
    const horloge = new HorlogeEnMemoire(DateTime.now().toISODate())

    bus
      .enregistrerGestionnaire(new GestionnaireDeQuellesSontLesSessionsDeFormationAVenir(horloge, calendrierDesSessionsDeFormationFuturesEnMemoire))
  }

  public ajouterLesGestionnairesDeCommande(bus: BusDeCommandes): void {
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()

    bus
      .enregistrerGestionnaire(new GestionnaireDeCreerUneSessionDeFormation(sessionsDeFormationEnMemoire))
    bus
      .enregistrerGestionnaire(new GestionnaireDeAjouterUnFormateurAUneSessionDeFormation(sessionsDeFormationEnMemoire))
    bus
      .enregistrerGestionnaire(new GestionnaireDeInscrireUnParticipantAUneSessionDeFormation(sessionsDeFormationEnMemoire))
  }

  public ajouterLesGestionnairesDEvenementDuDomaine(bus: BusDEvenementsDuDomaine): void {
    const catalogueDeFormationsGatewayEnMemoire = new CatalogueDeFormationsGatewayEnMemoire()
    const notifieurEnMemoire = new NotifieurEnMemoire();

    bus
      .enregistrerGestionnaire(new InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation(catalogueDeFormationsGatewayEnMemoire, notifieurEnMemoire))
  }

  public ajouterLesEndpoints(fastify: FastifyInstance) {
    this.listeDeEndpoints.enregistrerEndpoints(fastify)
  }
}
