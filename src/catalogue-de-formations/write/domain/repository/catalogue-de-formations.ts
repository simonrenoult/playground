import { CodeDeFormation, Formation } from '../entite/formation'
import { Repository } from '../../../../building-blocks/write/repository'

export default interface CatalogueDeFormations extends Repository<CodeDeFormation, Formation> {
  persister(formation: Formation): void
}
