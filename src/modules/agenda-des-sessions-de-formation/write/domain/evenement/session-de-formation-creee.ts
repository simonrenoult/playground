import EvenementDuDomaine from "../../../../../building-blocks/cqrs/evenement-du-domaine/evenement";

export class SessionDeFormationCreee implements EvenementDuDomaine {
  public readonly nom = SessionDeFormationCreee.name;

  public constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {}
}
