import Message from '../message'

export default interface Bus<M extends Message> {
  publier(m: M): void
}
