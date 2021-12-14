import { CodeDeFormation, Formation } from '../entite/formation'
import { Repository } from '../../../../building-blocks/write/repository'

export interface CatalogueDeFormations extends Repository<CodeDeFormation, Formation> {
  persister(formation: Formation): void
}
