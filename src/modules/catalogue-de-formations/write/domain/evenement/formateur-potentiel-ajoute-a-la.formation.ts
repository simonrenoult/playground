import EvenementDuDomaine from '../../../../../building-blocks/cqrs/evenement'

export class FormateurPotentielAjouteALaFormation implements EvenementDuDomaine {
  public readonly nom = 'FORMATEUR_POTENTIEL_AJOUTE_A_LA_FORMATION'

  constructor(
    public readonly idFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {
  }
}
