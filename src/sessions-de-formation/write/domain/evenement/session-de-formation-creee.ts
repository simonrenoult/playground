import EvenementDuDomaine from '../../../../building-blocks/evenement'

export class SessionDeFormationCreee implements EvenementDuDomaine {
  public readonly nom = 'SESSION_DE_FORMATION_PLANIFIEE'

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {
  }
}
