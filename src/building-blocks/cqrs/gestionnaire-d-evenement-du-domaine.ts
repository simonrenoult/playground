import EvenementDuDomaine from './evenement'

export default interface GestionnaireDEvenementDuDomaine<E extends EvenementDuDomaine> {
  execute(e: E): void

  ecoute(e: EvenementDuDomaine): boolean
}
