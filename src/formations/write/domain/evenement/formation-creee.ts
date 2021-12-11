import EvenementDuDomaine from '../../../../building-blocks/evenement'

export class FormationCreee implements EvenementDuDomaine {
  public readonly nom = 'FORMATION_CREEE'

  constructor(
    public readonly codeFormation: string,
    public readonly dureeEnHeures: number
  ) {
  }
}
