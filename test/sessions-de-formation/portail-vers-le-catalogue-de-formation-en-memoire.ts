import {
  Formation,
  CatalogueDeFormations
} from '../../src/modules/sessions-de-formation/write/domain/gateway/formation'

export class PortailVersLeCatalogueDeFormationEnMemoire implements CatalogueDeFormations {
  public chercherFormationParCode(code: string): Formation {
    return {
      code,
      formateurs: [
        { email: 'foo@example.com' }
      ]
    }
  }
}
