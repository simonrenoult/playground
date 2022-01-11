import EvenementDuDomaine from "../../../../../building-blocks/cqrs/evenement-du-domaine/evenement";

export class FormateurAjouteALaSessionDeFormation
  implements EvenementDuDomaine
{
  public readonly nom = FormateurAjouteALaSessionDeFormation.name;

  constructor(
    public readonly idFormateur: string,
    public readonly codeFormation: string,
    public readonly idSessionDeFormation: string
  ) {}
}
