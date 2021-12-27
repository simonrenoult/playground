import { Constructor } from 'type-fest'
import Message from '../message'

export type AssociationMessageEtHttp = {
  message: Constructor<Message>,
  method: string,
  href: string,
}
