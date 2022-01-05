import CatalogueDeFormations from "../../../src/modules/catalogue-de-formations/read/domain/projection/catalogue-de-formations";
import FormationsAuCatalogue from "../../../src/modules/catalogue-de-formations/read/domain/modele-de-lecture/formations-au-catalogue";

export default class CatalogueDeFormationsEnMemoire
  implements CatalogueDeFormations
{
  constructor(private readonly formations: FormationsAuCatalogue = []) {}

  ajouter(code: string) {
    this.formations.push(code);
  }

  public async lister(): Promise<FormationsAuCatalogue> {
    return this.formations;
  }
}
