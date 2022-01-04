import Message from "../cqrs/message";
import { ArborescenceDeMessages } from "../ddd/bounded-context";
import { Constructor } from "type-fest";
import { AssociationMessageEtHttp } from "./association-message-et-http";

export type Rel = "self" | string;
export type Lien = { rel: Rel; method: string; href: string };

const AUCUN_LIEN: Lien[] = [];

export default class CreateurDeLiens {
  constructor(
    private readonly arborescencesDeMessages: ArborescenceDeMessages[],
    private readonly mappingHttpDesMessages: AssociationMessageEtHttp[]
  ) {}

  public creer(messageInitial: Message): Lien[] {
    const mapping = this.mappingHttpDuMessage(messageInitial);
    if (!mapping) return AUCUN_LIEN;

    const self: Lien = CreateurDeLiens.versLien(mapping, "self");

    const arborescence = this.arborescenceDe(messageInitial);
    if (!arborescence) return [self];

    const liensSuivants = arborescence.messagesSuivants
      .map(this.versLien())
      .filter((lien) => lien !== null);

    return [self, ...liensSuivants];
  }

  private versLien() {
    return (message: Constructor<Message>) => {
      const mappingHttpDuMessage = this.mappingHttpDuTypeDeMessage(message);
      return mappingHttpDuMessage
        ? CreateurDeLiens.versLien(mappingHttpDuMessage)
        : null;
    };
  }

  private mappingHttpDuTypeDeMessage(message: Constructor<Message>) {
    return this.mappingHttpDesMessages.find(
      (mappingHttpDUnMessage) =>
        mappingHttpDUnMessage.message.name === message.name
    );
  }

  private arborescenceDe(messageInitial: Message) {
    return this.arborescencesDeMessages.find(
      (arborescenceDeMessages: ArborescenceDeMessages) =>
        arborescenceDeMessages.messageInitial.name === messageInitial.nom
    );
  }

  private mappingHttpDuMessage(messageInitial: Message) {
    return this.mappingHttpDesMessages.find(
      (mappingHttpDUnMessage: AssociationMessageEtHttp) =>
        mappingHttpDUnMessage.message.name === messageInitial.nom
    );
  }

  private static versLien(
    mappingHttpDuMessage: AssociationMessageEtHttp,
    rel?: Rel
  ): Lien {
    return {
      rel: rel ?? mappingHttpDuMessage.message.name,
      method: mappingHttpDuMessage.method,
      href: mappingHttpDuMessage.href,
    };
  }
}
