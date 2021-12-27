import { Constructor } from 'type-fest'
import Message from '../ddd/message'

export type AssociationMessageEtHttp = {
  message: Constructor<Message>,
  method: string,
  href: string,
}
