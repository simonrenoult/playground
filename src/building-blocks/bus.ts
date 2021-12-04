import Message from './message'

export default interface Bus {
  publier(m: Message): void
}
