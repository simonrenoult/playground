import Commande from "../../../../../building-blocks/cqrs/write/commande";
import Email from "../../../../shared-kernel/email";
import { Formation } from "../../domain/formation";
import { FormateurPotentielAjouteALaFormation } from "../../domain/evenement/formateur-potentiel-ajoute-a-la.formation";
import CatalogueDeFormations from "../../domain/repository/catalogue-de-formations";
import AjouterUnFormateurPotentielALaFormation from "../ajouter-un-formateur-potentiel-a-la-formation";
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";
import { CodeDeFormation } from "../../domain/code-de-formation";
import { FormateurPotentiel } from "../../domain/formateur-potentiel";

export default class GestionnaireDeAjouterUnFormateurPotentielALaFormation
  implements
    GestionnaireDeMessage<
      AjouterUnFormateurPotentielALaFormation,
      FormateurPotentielAjouteALaFormation
    >
{
  public constructor(
    private readonly catalogueDeFormations: CatalogueDeFormations
  ) {}

  public async executer(
    c: AjouterUnFormateurPotentielALaFormation
  ): Promise<FormateurPotentielAjouteALaFormation> {
    const formation: Formation = await this.catalogueDeFormations.parId(
      new CodeDeFormation(c.codeFormation)
    );
    const formateurPotentiel = new FormateurPotentiel(
      new Email(c.emailFormateurPotentiel)
    );
    formation.ajouterFormateurPotentiel(formateurPotentiel);
    await this.catalogueDeFormations.persister(formation);
    return new FormateurPotentielAjouteALaFormation(
      formateurPotentiel.id,
      formation.id.valeur
    );
  }

  public ecoute(c: Commande): boolean {
    return c instanceof AjouterUnFormateurPotentielALaFormation;
  }
}
