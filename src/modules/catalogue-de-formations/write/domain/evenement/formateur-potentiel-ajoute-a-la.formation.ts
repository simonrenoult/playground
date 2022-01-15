import EvenementDuDomaine from "../../../../../building-blocks/cqrs/evenement-du-domaine/evenement";

export class FormateurPotentielAjouteALaFormation
  implements EvenementDuDomaine
{
  public readonly nom = FormateurPotentielAjouteALaFormation.name;

  public constructor(
    public readonly idFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {}
}
