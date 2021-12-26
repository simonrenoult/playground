import Commande from '../../../building-blocks/write/commande'

export class CreerUneFormation implements Commande {
  public readonly nom: string = 'CREER_UNE_FORMATION'

  constructor(
    public readonly code: string,
    public readonly dureeEnHeures: number
  ) {
  }
}
