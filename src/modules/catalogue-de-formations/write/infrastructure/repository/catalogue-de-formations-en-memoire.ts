import injectable from "../../../../../building-blocks/ioc/injectable";
import { Formation } from "../../domain/formation";
import CatalogueDeFormations from "../../domain/repository/catalogue-de-formations";
import { CodeDeFormation } from "../../domain/code-de-formation";

@injectable("catalogueDeFormations")
export default class CatalogueDeFormationsEnMemoire
  implements CatalogueDeFormations
{
  private readonly formations: Formation[] = [];

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
