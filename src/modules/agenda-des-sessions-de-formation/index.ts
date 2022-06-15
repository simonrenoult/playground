import { FastifyInstance } from "fastify";
import { DateTime } from "luxon";
import BusDeQuestions from "../../building-blocks/cqrs/read/bus-de-questions";
import BusDeCommandes from "../../building-blocks/cqrs/write/bus-de-commandes";
import { Module } from "../../building-blocks/module";
import { ListeDeEndpoints } from "../../building-blocks/liste-de-endpoints";
import SessionsDeFormationEndpoints from "./endpoints";
import { GestionnaireDeQuellesSontLesSessionsDeFormationAVenir } from "./read/application/gestionnaire/gestionnaire-de-quelles-sont-les-sessions-de-formation-a-venir";
import GestionnaireDeCreerUneSessionDeFormation from "./write/application/gestionnaire/gestionnaire-de-creer-une-session-de-formation";
import GestionnaireDeAjouterUnFormateurAUneSessionDeFormation from "./write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-a-une-session-de-formation";
import GestionnaireDeInscrireUnParticipantAUneSessionDeFormation from "./write/application/gestionnaire/gestionnaire-de-inscrire-un-participant-a-une-session-de-formation";
import InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation from "./write/application/informer-les-formateurs-potentiels-d-une-nouvelle-session-de-formation";
import BusDEvenementsDuDomaine from "../../building-blocks/cqrs/evenement-du-domaine/bus-d-evenements-du-domaine";
import SessionsDeFormationEnMemoire from "./write/infrastructure/sessions-de-formation-en-memoire";
import AgendaDesSessionsDeFormationHttp from "./read/infrastructure/agenda-des-sessions-de-formation-http";
import BoundedContext from "./bounded-context";
import { HorlogeEnMemoire } from "./test/horloge-en-memoire";
import { CatalogueDeFormationsGatewayEnMemoire } from "./test/catalogue-de-formations-gateway-en-memoire";
import { NotifieurEnMemoire } from "./test/notifieur-en-memoire";
import { Configuration } from "../../infrastructure/configuration";

export default class AgendaDesSessionsDeFormationModule implements Module {
  private readonly listeDeEndpoints: ListeDeEndpoints;
  public readonly boundedContext = BoundedContext;

  public constructor(
    private readonly configuration: Configuration,
    private readonly busDeQuestions: BusDeQuestions,
    private readonly busDeCommandes: BusDeCommandes
  ) {
    this.listeDeEndpoints = new SessionsDeFormationEndpoints(
      busDeQuestions,
      busDeCommandes
    );
  }

  public enregistrerLesGestionnairesDeQuestion(bus: BusDeQuestions): void {
    const agendaDesSessionsDeFormationFuturesEnMemoire =
      new AgendaDesSessionsDeFormationHttp(this.configuration);
    const horloge = new HorlogeEnMemoire(DateTime.now().toISODate());

    bus.enregistrerGestionnaire(
      new GestionnaireDeQuellesSontLesSessionsDeFormationAVenir(
        horloge,
        agendaDesSessionsDeFormationFuturesEnMemoire
      )
    );
  }

  public enregistrerLesGestionnairesDeCommande(bus: BusDeCommandes): void {
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire();

    bus.enregistrerGestionnaire(
      new GestionnaireDeCreerUneSessionDeFormation(sessionsDeFormationEnMemoire)
    );
    bus.enregistrerGestionnaire(
      new GestionnaireDeAjouterUnFormateurAUneSessionDeFormation(
        sessionsDeFormationEnMemoire
      )
    );
    bus.enregistrerGestionnaire(
      new GestionnaireDeInscrireUnParticipantAUneSessionDeFormation(
        sessionsDeFormationEnMemoire
      )
    );
  }

  public enregistrerLesGestionnairesDEvenementDuDomaine(
    bus: BusDEvenementsDuDomaine
  ): void {
    const catalogueDeFormationsGatewayEnMemoire =
      new CatalogueDeFormationsGatewayEnMemoire();
    const notifieurEnMemoire = new NotifieurEnMemoire();

    bus.enregistrerGestionnaire(
      new InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation(
        catalogueDeFormationsGatewayEnMemoire,
        notifieurEnMemoire
      )
    );
  }

  public enregistrerLesEndpoints(fastify: FastifyInstance): void {
    this.listeDeEndpoints.enregistrerEndpoints(fastify);
  }
}
