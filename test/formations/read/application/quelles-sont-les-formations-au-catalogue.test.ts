import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  GestionnaireDeQuellesSontLesFormationsAuCatalogue,
  QuellesSontLesFormationsAuCatalogue
} from '../../../../src/formations/read/application/quelles-sont-les-formations-au-catalogue'
import { CatalogueDeFormationsEnMemoire } from '../catalogue-de-formations-en-memoire'

describe('QuellesSontLesFormationsAuCatalogue', () => {
  it('liste les formations au catalogue', () => {
    // Given
    const quellesSontLesFormationsAuCatalogue = new QuellesSontLesFormationsAuCatalogue()
    const catalogueEnMemoire = new CatalogueDeFormationsEnMemoire()
    const gestionnaire = new GestionnaireDeQuellesSontLesFormationsAuCatalogue(catalogueEnMemoire)

    // When
    const formations = gestionnaire.executer(quellesSontLesFormationsAuCatalogue)

    // Then
    expect(formations).to.have.length(1)
  })
})
