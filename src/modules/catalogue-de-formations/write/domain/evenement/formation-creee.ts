import EvenementDuDomaine from "../../../../../building-blocks/cqrs/evenement-du-domaine/evenement";

export default class FormationCreee implements EvenementDuDomaine {
  public readonly nom = FormationCreee.name;

  public constructor(
    public readonly codeFormation: string,
    public readonly dureeEnHeures: number
  ) {}
}
