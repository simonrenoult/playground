import Message from '../message'

export default interface Bus<M extends Message, Resultat> {
  publier(m: M): Resultat
}
