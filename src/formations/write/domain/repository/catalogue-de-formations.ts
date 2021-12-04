import { CodeDeFormation, Formation } from '../entite/formation'

export interface CatalogueDeFormations {
  parCode(code: CodeDeFormation): Formation
  persister(formation: Formation): void
}
