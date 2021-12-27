import Message from '../ddd/message'
import { ArborescenceDeMessages } from '../ddd/bounded-context'
import { Constructor } from 'type-fest'
import { AssociationMessageEtHttp } from './association-message-et-http'

export type Rel = 'self' | string
export type Lien = { rel: Rel, method: string, href: string }

export default class Liens {
  constructor(
    private readonly arborescencesDeMessages: ArborescenceDeMessages[],
    private readonly mappingHttpDesMessages: AssociationMessageEtHttp[]
  ) {
  }

  public creer(messageInitial: Message): Lien[] {
    const mappingHttpDuMessageInitial = this.mappingHttpDesMessages.find(m => m.message.name === messageInitial.constructor.name)
    const self: Lien = Liens.versLien(mappingHttpDuMessageInitial, 'self')

    const liensSuivants = this.arborescencesDeMessages
      .find((arborescenceDeMessages: ArborescenceDeMessages) => arborescenceDeMessages.messageInitial.name === messageInitial.constructor.name)
      .messagesSuivants
      .map((message: Constructor<Message>) => {
        const mappingHttpDuMessage = this.mappingHttpDesMessages.find(mappingHttpDUnMessage => mappingHttpDUnMessage.message.name === message.constructor.name)
        return Liens.versLien(mappingHttpDuMessage)
      })

    return [self, ...liensSuivants]
  }

  private static versLien(mappingHttpDuMessage: AssociationMessageEtHttp, rel?: Rel): Lien {
    return {
      rel: rel ?? mappingHttpDuMessage.message.name,
      method: mappingHttpDuMessage.method,
      href: mappingHttpDuMessage.href
    }
  }
}
