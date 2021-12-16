import CatalogueDeFormations from '../../../src/catalogue-de-formations/read/domain/projection/catalogue-de-formations'
import FormationsAuCatalogue from '../../../src/catalogue-de-formations/read/domain/modele-de-lecture/formations-au-catalogue'

export class CatalogueDeFormationsEnMemoire implements CatalogueDeFormations {
  public lister(): FormationsAuCatalogue {
    return ['DDD01']
  }
}
