import CatalogueDeFormations from "../../read/domain/projection/catalogue-de-formations";
import FormationsAuCatalogue from "../../read/domain/modele-de-lecture/formations-au-catalogue";

export default class CatalogueDeFormationsEnMemoire
  implements CatalogueDeFormations
{
  public constructor(private readonly formations: FormationsAuCatalogue = []) {}

  public ajouter(code: string): void {
    this.formations.push(code);
  }

  public async lister(): Promise<FormationsAuCatalogue> {
    return this.formations;
  }
}
