import { FastifyInstance } from "fastify";
import boundedContext from "./bounded-context";
import BusDeQuestions from "../../building-blocks/cqrs/read/bus-de-questions";
import BusDeCommandes from "../../building-blocks/cqrs/write/bus-de-commandes";
import QuellesSontLesSessionsDeFormationAVenir from "./read/application/quelles-sont-les-sessions-de-formation-a-venir";
import CreerUneSessionDeFormation from "./write/application/creer-une-session-de-formation";
import { ulid } from "ulid";
import AjouterUnFormateurAUneSessionDeFormation from "./write/application/ajouter-un-formateur-a-une-session-de-formation";
import { Static, Type } from "@sinclair/typebox";
import InscrireUnParticipantAUneSessionDeFormation from "./write/application/inscrire-un-participant-a-une-session-de-formation";
import { ListeDeEndpoints } from "../../building-blocks/liste-de-endpoints";

export default class SessionsDeFormationEndpoints implements ListeDeEndpoints {
  constructor(
    private readonly busDeQuestions: BusDeQuestions,
    private readonly busDeCommandes: BusDeCommandes
  ) {}

  enregistrerEndpoints(fastify: FastifyInstance): void {
    fastify.route({
      method: "GET",
      url: "/sessions-de-formation",
      schema: {
        // @ts-ignore
        tags: [boundedContext.nom],
      },
      handler: async () => {
        const message = new QuellesSontLesSessionsDeFormationAVenir();
        const data = await this.busDeQuestions.publier(message);
        return { data, message };
      },
    });

    fastify.route<{ Body: { code: string } }>({
      method: "POST",
      url: "/sessions-de-formation",
      schema: {
        body: { code: { type: "string" } },
        // @ts-ignore
        tags: [boundedContext.nom],
      },
      handler: async (req) => {
        const message = new CreerUneSessionDeFormation(ulid(), req.body.code);
        const data = await this.busDeCommandes.publier(message);
        return { data, message };
      },
    });

    fastify.route<{
      Params: { idSession: string };
      Body: { emailFormateur: string };
    }>({
      method: "POST",
      url: "/sessions-de-formation/:idSession/formateurs",
      schema: {
        params: { idSession: { type: "string" } },
        body: { emailFormateur: { type: "string" } },
        // @ts-ignore
        tags: [boundedContext.nom],
      },
      handler: async (req) => {
        const message = new AjouterUnFormateurAUneSessionDeFormation(
          req.body.emailFormateur,
          req.params.idSession
        );
        const data = await this.busDeCommandes.publier(message);
        return { data, message };
      },
    });

    const IdSessionWrapper = Type.Object({
      idSession: Type.String(),
    });

    const EmailParticipantWrapper = Type.Object({
      emailParticipant: Type.String(),
    });

    fastify.route<{
      Params: Static<typeof IdSessionWrapper>;
      Body: Static<typeof EmailParticipantWrapper>;
    }>({
      method: "POST",
      url: "/sessions-de-formation/:idSession/participants",
      schema: {
        params: IdSessionWrapper,
        body: EmailParticipantWrapper,
        // @ts-ignore
        tags: [boundedContext.nom],
      },
      handler: async (req) => {
        const message = new InscrireUnParticipantAUneSessionDeFormation(
          req.body.emailParticipant,
          req.params.idSession
        );
        const data = await this.busDeCommandes.publier(message);
        return { data, message };
      },
    });
  }
}
