import injectable from "../../../../../building-blocks/ioc/injectable";
import { CodeDeFormation, Formation } from "../../domain/entite/formation";
import CatalogueDeFormations from "../../domain/repository/catalogue-de-formations";

@injectable("catalogueDeFormations")
export default class CatalogueDeFormationsEnMemoire
  implements CatalogueDeFormations
{
  private readonly formations: Formation[] = [];

  constructor() {}

  public async parId(code: CodeDeFormation): Promise<Formation> {
    return this.formations.find((f) => f.id.equals(code));
  }

  public lister(): Formation[] {
    return this.formations;
  }

  public async persister(formation: Formation): Promise<void> {
    this.formations.push(formation);
  }
}
