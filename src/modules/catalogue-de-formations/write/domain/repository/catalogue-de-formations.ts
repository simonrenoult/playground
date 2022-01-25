import { Formation } from "../formation";
import { Repository } from "../../../../../building-blocks/ddd/repository";
import { CodeDeFormation } from "../code-de-formation";

export default interface CatalogueDeFormations
  extends Repository<CodeDeFormation, Formation> {}
