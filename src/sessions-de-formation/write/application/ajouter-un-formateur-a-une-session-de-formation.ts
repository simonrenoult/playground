import Commande from '../../../building-blocks/write/commande'

export class AjouterUnFormateurAUneSessionDeFormation implements Commande {
  public readonly nom = 'AJOUTER_UN_FORMATEUR_A_UNE_SESSION_DE_FORMATION'

  constructor(
    public readonly emailFormateur: string,
    public readonly idSessionDeSessionDeFormation: string
  ) {
  }
}
