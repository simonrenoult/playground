import FormationsAuCatalogue from "../../domain/modele-de-lecture/formations-au-catalogue";
import CatalogueDeFormations from "../../domain/projection/catalogue-de-formations";
import injectable from "../../../../../building-blocks/ioc/injectable";

@injectable("catalogueDeFormations")
export default class CatalogueDeFormationsEnMemoire
  implements CatalogueDeFormations
{
  private readonly formationsAuCatalogue: FormationsAuCatalogue = [];

  public async lister(): Promise<FormationsAuCatalogue> {
    return this.formationsAuCatalogue;
  }

  public ajouter(code: string): void {
    this.formationsAuCatalogue.push(code);
  }
}
