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
    expect(formation.code).toEqual('DDD01')
    expect(formation.dureeEnHeures).toEqual(14)
  })

  it('retourne un évènement de création de formation', () => {
    // Given
    const formationACreer = Fixtures.uneFormationACreer()
    const formations = new CatalogueDeFormationsEnMemoire()
    const creerUneFormation = new CreerUneFormation(formations)

    // When
    const evenement = creerUneFormation.executer(formationACreer)

    // Then
    expect(evenement.codeFormation).toEqual('DDD01')
    expect(evenement.dureeEnHeures).toEqual(14)
  })
})
