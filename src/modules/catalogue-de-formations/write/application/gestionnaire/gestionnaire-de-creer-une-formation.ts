import Commande from "../../../../../building-blocks/cqrs/write/commande";
import {
  CodeDeFormation,
  DureeDeFormation,
  Formation,
} from "../../domain/entite/formation";
import FormationCreee from "../../domain/evenement/formation-creee";
import CatalogueDeFormations from "../../domain/repository/catalogue-de-formations";
import CreerUneFormation from "../creer-une-formation";
import GestionnaireDeMessage from "../../../../../building-blocks/cqrs/gestionnaire-de-message";

export default class GestionnaireDeCreerUneFormation
  implements GestionnaireDeMessage<CreerUneFormation, FormationCreee>
{
  constructor(private readonly catalogueDeFormations: CatalogueDeFormations) {}

  public async executer(
    formationACreer: CreerUneFormation
  ): Promise<FormationCreee> {
    const formation = new Formation(
      new CodeDeFormation(formationACreer.code),
      new DureeDeFormation(formationACreer.dureeEnHeures)
    );
    await this.catalogueDeFormations.persister(formation);
    return new FormationCreee(formation.id.valeur, formation.dureeEnHeures);
  }

  public ecoute(c: Commande): boolean {
    return c instanceof CreerUneFormation;
  }
}
