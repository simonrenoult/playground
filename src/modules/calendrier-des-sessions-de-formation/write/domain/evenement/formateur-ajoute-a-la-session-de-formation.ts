import EvenementDuDomaine from "../../../../../building-blocks/cqrs/evenement-du-domaine/evenement";

export class FormateurAjouteALaSessionDeFormation
  implements EvenementDuDomaine
{
  public readonly nom = "FORMATEUR_AJOUTE_A_LA_SESSION_DE_FORMATION";

  constructor(
    public readonly idFormateur: string,
    public readonly codeFormation: string,
    public readonly idSessionDeFormation: string
  ) {}
}
