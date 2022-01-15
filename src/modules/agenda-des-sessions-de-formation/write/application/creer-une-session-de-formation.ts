import Commande from "../../../../building-blocks/cqrs/write/commande";

export default class CreerUneSessionDeFormation implements Commande {
  public readonly nom = CreerUneSessionDeFormation.name;

  public constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {}
}
