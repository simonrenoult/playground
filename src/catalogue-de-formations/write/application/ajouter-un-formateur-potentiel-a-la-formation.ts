import Commande from '../../../building-blocks/write/commande'

export default class AjouterUnFormateurPotentielALaFormation implements Commande {
  public readonly nom = 'AJOUTER_UN_FORMATEUR_POTENTIEL_A_LA_FORMATION'

  constructor(
    public readonly emailFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {
  }
}
