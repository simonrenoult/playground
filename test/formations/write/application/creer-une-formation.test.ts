import { describe, it } from 'mocha'
import { expect } from 'chai'
import { CreerUneFormation } from '../../../../src/formations/write/application/creer-une-formation'
import { Fixtures } from '../../../fixtures'
import { CatalogueDeFormationsEnMemoire } from '../catalogue-de-formations-en-memoire'

describe('CreerUneFormation', () => {
  it('persiste une formation', () => {
    // Given
    const formationACreer = Fixtures.uneFormationACreer()
    const formations = new CatalogueDeFormationsEnMemoire()
    const creerUneFormation = new CreerUneFormation(formations)

    // When
    creerUneFormation.executer(formationACreer)

    // Then
    const [formation] = formations.lister()
    expect(formation.code).to.deep.equal('DDD01')
    expect(formation.dureeEnHeures).to.deep.equal(14)
  })

  it('retourne un évènement de création de formation', () => {
    // Given
    const formationACreer = Fixtures.uneFormationACreer()
    const formations = new CatalogueDeFormationsEnMemoire()
    const creerUneFormation = new CreerUneFormation(formations)

    // When
    const evenement = creerUneFormation.executer(formationACreer)

    // Then
    expect(evenement.codeFormation).to.deep.equal('DDD01')
    expect(evenement.dureeEnHeures).to.deep.equal(14)
  })
})
