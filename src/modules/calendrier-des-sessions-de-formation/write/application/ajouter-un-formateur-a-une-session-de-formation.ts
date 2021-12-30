import Commande from "../../../../building-blocks/cqrs/write/commande";

export default class AjouterUnFormateurAUneSessionDeFormation
  implements Commande
{
  public readonly nom = "AJOUTER_UN_FORMATEUR_A_UNE_SESSION_DE_FORMATION";

  constructor(
    public readonly emailFormateur: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {}
}
