import Commande from '../../../building-blocks/write/commande'
import GestionnaireDeCommande from '../../../building-blocks/write/gestionnaire-de-commande'
import Email from '../../../shared-kernel/email'
import { CodeDeFormation, FormateurPotentiel } from '../domain/entite/formation'
import { FormateurPotentielAjouteALaFormation } from '../domain/evenement/formateur-potentiel-ajoute-a-la.formation'
import { CatalogueDeFormations } from '../domain/repository/catalogue-de-formations'

export class AjouterUnFormateurPotentielALaFormation implements Commande {
  public readonly nom = 'AJOUTER_UN_FORMATEUR_POTENTIEL_A_LA_FORMATION'

  constructor(
    public readonly emailFormateurPotentiel: string,
    public readonly codeFormation: string
  ) {
  }
}

export class GestionnaireDeAjouterUnFormateurPotentielALaFormation
  implements GestionnaireDeCommande<AjouterUnFormateurPotentielALaFormation, FormateurPotentielAjouteALaFormation> {

  constructor(private readonly formations: CatalogueDeFormations) {
  }

  public executer(c: AjouterUnFormateurPotentielALaFormation): FormateurPotentielAjouteALaFormation {
    const formation = this.formations.parId(new CodeDeFormation(c.codeFormation))
    const formateurPotentiel = new FormateurPotentiel(new Email(c.emailFormateurPotentiel))
    formation.ajouterFormateurPotentiel(formateurPotentiel)
    this.formations.persister(formation)
    return new FormateurPotentielAjouteALaFormation(formateurPotentiel.id, formation.id.valeur)
  }

  public ecoute(c: Commande): boolean {
    return c instanceof AjouterUnFormateurPotentielALaFormation
  }
}
