import { FastifyInstance } from "fastify";
import { ArborescenceDeMessages } from "../ddd/bounded-context";
import { AssociationMessageEtHttp } from "./association-message-et-http";
import CreateurDeLiens from "./createur-de-liens";
import Message from "../cqrs/message";

export default class AjouterLiensAuPayload {
  private createurDeLiens: CreateurDeLiens;

  public constructor(
    private readonly fastify: FastifyInstance,
    mappingHttpDesMessages: AssociationMessageEtHttp[][],
    arborescencesDeMessages: ArborescenceDeMessages[][]
  ) {
    this.createurDeLiens = new CreateurDeLiens(
      arborescencesDeMessages.flat(),
      mappingHttpDesMessages.flat()
    );
  }

  public associer(): void {
    this.fastify.addHook(
      "preSerialization",
      async (request, reply, payload: { data: unknown; message: Message }) => {
        if (request.url.startsWith("/documentation")) return payload;
        return {
          data: payload.data,
          liens: this.createurDeLiens.creer(payload.message),
        };
      }
    );
  }
}
