import Commande from '../../../../../building-blocks/cqrs/write/commande'
import GestionnaireDeCommande from '../../../../../building-blocks/cqrs/write/gestionnaire-de-commande'
import Email from '../../../../shared-kernel/email'
import { CodeDeFormation, FormateurPotentiel } from '../../domain/entite/formation'
import { FormateurPotentielAjouteALaFormation } from '../../domain/evenement/formateur-potentiel-ajoute-a-la.formation'
import CatalogueDeFormations from '../../domain/repository/catalogue-de-formations'
import AjouterUnFormateurPotentielALaFormation from '../ajouter-un-formateur-potentiel-a-la-formation'

export class GestionnaireDeAjouterUnFormateurPotentielALaFormation
  implements GestionnaireDeCommande<AjouterUnFormateurPotentielALaFormation, FormateurPotentielAjouteALaFormation> {

  constructor(private readonly catalogueDeFormations: CatalogueDeFormations) {
  }

  public executer(c: AjouterUnFormateurPotentielALaFormation): FormateurPotentielAjouteALaFormation {
    const formation = this.catalogueDeFormations.parId(new CodeDeFormation(c.codeFormation))
    const formateurPotentiel = new FormateurPotentiel(new Email(c.emailFormateurPotentiel))
    formation.ajouterFormateurPotentiel(formateurPotentiel)
    this.catalogueDeFormations.persister(formation)
    return new FormateurPotentielAjouteALaFormation(formateurPotentiel.id, formation.id.valeur)
  }

  public ecoute(c: Commande): boolean {
    return c instanceof AjouterUnFormateurPotentielALaFormation
  }
}
