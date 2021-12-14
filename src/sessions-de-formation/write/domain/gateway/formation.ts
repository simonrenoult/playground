import { Gateway } from '../../../../building-blocks/gateway'

export interface Formation {
  code: string
  formateurs: Array<{ email: string }>
}

export interface PortailVersLeCatalogueDeFormations extends Gateway {
  chercherFormationParCode(code: string): Formation
}
