import Commande from "../../../../building-blocks/cqrs/write/commande";

export default class AjouterUnFormateurAUneSessionDeFormation
  implements Commande
{
  public readonly nom = AjouterUnFormateurAUneSessionDeFormation.name;

  public constructor(
    public readonly emailFormateur: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {}
}
