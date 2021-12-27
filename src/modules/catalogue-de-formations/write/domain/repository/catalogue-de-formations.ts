import { CodeDeFormation, Formation } from '../entite/formation'
import { Repository } from '../../../../../building-blocks/ddd/repository'

export default interface CatalogueDeFormations extends Repository<CodeDeFormation, Formation> {
  persister(formation: Formation): void
}
