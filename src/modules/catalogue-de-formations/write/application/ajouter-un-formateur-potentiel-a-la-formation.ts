import Commande from "../../../../building-blocks/cqrs/write/commande";

export default class AjouterUnFormateurPotentielALaFormation
  implements Commande
{
  public readonly nom = AjouterUnFormateurPotentielALaFormation.name;

  public constructor(
    public readonly emailFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {}
}
