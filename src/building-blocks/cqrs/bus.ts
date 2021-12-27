import Message from '../ddd/message'

export default interface Bus<M extends Message, Resultat> {
  publier(m: M): Resultat
}
