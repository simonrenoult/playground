import {
  InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation
} from '../../../../src/sessions-de-formation/write/application/informer-les-formateurs-potentiels-d-une-nouvelle-session-de.formation'
import { Fixtures } from '../../../fixtures'
import { NotifieurEnMemoire } from '../../notifieur-en-memoire'
import { PortailVersLeCatalogueDeFormationEnMemoire } from '../../portail-vers-le-catalogue-de-formation-en-memoire'

describe('GestionnaireDeInformerLesFormateursPotentielsDUneNouvelleSessionDeFormation', () => {
  it('fait le boulot', () => {
    // Given
    const notifieurEnMemoire = new NotifieurEnMemoire()
    const portailVersLeCatalogueDeFormationEnMemoire = new PortailVersLeCatalogueDeFormationEnMemoire()
    const informerLesFormateursPotentielsDUneNouvelleSessionDeFormation = new InformerLesFormateursPotentielsDUneNouvelleSessionDeFormation(
      portailVersLeCatalogueDeFormationEnMemoire,
      notifieurEnMemoire
    )

    // When
    informerLesFormateursPotentielsDUneNouvelleSessionDeFormation.execute(Fixtures.uneSessionDeFormationCreee())

    // Then
    expect(notifieurEnMemoire.emailsNotifies).toEqual(['foo@example.com'])
  })
})
