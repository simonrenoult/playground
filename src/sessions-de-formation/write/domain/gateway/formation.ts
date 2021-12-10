export interface Formation {
  code: string
  formateurs: Array<{ email: string }>
}

export interface PortailVersLeCatalogueDeFormations {
  chercherFormationParCode(code: string): Formation
}
