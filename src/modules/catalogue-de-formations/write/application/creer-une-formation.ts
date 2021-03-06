import Commande from "../../../../building-blocks/cqrs/write/commande";

export default class CreerUneFormation implements Commande {
  public readonly nom: string = CreerUneFormation.name;

  public constructor(
    public readonly code: string,
    public readonly dureeEnHeures: number
  ) {}
}
