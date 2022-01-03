import EvenementDuDomaine from "../../../../../building-blocks/cqrs/evenement-du-domaine/evenement";
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";
import FormationCreee from "../../../write/domain/evenement/formation-creee";
import CatalogueDeFormations from "../../domain/projection/catalogue-de-formations";

export class AjouterFormationAuCatalogueDeFormations
  implements GestionnaireDeMessage<FormationCreee, FormationCreee>
{
  constructor(private readonly catalogue: CatalogueDeFormations) {}

  public async executer(e: FormationCreee): Promise<FormationCreee> {
    this.catalogue.ajouter(e.codeFormation);
    return e;
  }

  public ecoute(e: EvenementDuDomaine): boolean {
    return e instanceof FormationCreee;
  }
}
