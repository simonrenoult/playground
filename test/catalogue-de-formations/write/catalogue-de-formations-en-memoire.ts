import { CodeDeFormation, Formation } from '../../../src/catalogue-de-formations/write/domain/entite/formation'
import {
  CatalogueDeFormations
} from '../../../src/catalogue-de-formations/write/domain/repository/catalogue-de-formations'

export class CatalogueDeFormationsEnMemoire implements CatalogueDeFormations {
  constructor(
    private readonly formations: Formation[] = []
  ) {
  }

  public parId(code: CodeDeFormation): Formation {
    return this.formations.find((f) => f.id.equals(code))
  }

  public lister(): Formation[] {
    return this.formations
  }

  public persister(formation: Formation): void {
    this.formations.push(formation)
  }
}
