import Commande from '../../../building-blocks/write/commande'

export default class CreerUneSessionDeFormation implements Commande {
  public readonly nom = 'CREER_UNE_SESSION_DE_FORMATION'

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {
  }
}
