import { CodeDeFormation, Formation } from '../entite/formation'
import { Repository } from '../../../../building-blocks/write/repository'

export interface CatalogueDeFormations extends Repository {
  parCode(code: CodeDeFormation): Formation
  persister(formation: Formation): void
}
