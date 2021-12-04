import { CodeDeFormation, Formation } from '../../../src/formations/write/domain/entite/formation'
import { CatalogueDeFormations } from '../../../src/formations/write/domain/repository/catalogue-de-formations'

export class CatalogueDeFormationsEnMemoire implements CatalogueDeFormations {
  constructor(
    private readonly formations: Formation[] = []
  ) {
  }

  public parCode(code: CodeDeFormation): Formation {
    return this.formations.find((f) => f.code === code.valeur)
  }

  public lister(): Formation[] {
    return this.formations
  }

  public persister(formation: Formation): void {
    this.formations.push(formation)
  }
}
