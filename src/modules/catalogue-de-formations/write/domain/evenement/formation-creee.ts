import EvenementDuDomaine from '../../../../../building-blocks/cqrs/evenement-du-domaine/evenement'

export default class FormationCreee implements EvenementDuDomaine {
  public readonly nom = 'FORMATION_CREEE'

  constructor(
    public readonly codeFormation: string,
    public readonly dureeEnHeures: number
  ) {
  }
}
