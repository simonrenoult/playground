import { FormationsAuCatalogue } from '../../../src/formations/read/domain/modele-de-lecture/formations-au-catalogue'
import { CatalogueDeFormations } from '../../../src/formations/read/domain/repository/catalogue-de-formations'

export class CatalogueDeFormationsEnMemoire implements CatalogueDeFormations {
  public lister(): FormationsAuCatalogue {
    return ['DDD01']
  }
}
