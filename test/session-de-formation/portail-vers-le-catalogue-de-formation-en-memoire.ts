import {
  Formation,
  PortailVersLeCatalogueDeFormations
} from '../../src/sessions-de-formation/write/domain/gateway/formation'

export class PortailVersLeCatalogueDeFormationEnMemoire implements PortailVersLeCatalogueDeFormations {
  public chercherFormationParCode(code: string): Formation {
    return {
      code,
      formateurs: [
        { email: 'foo@example.com' }
      ]
    }
  }
}
