import {
  AjouterUnFormateurPotentielALaFormation,
  FormateurPotentielAAjouterALaFormation
} from '../../../../src/formations/write/application/ajouter-un-formateur-potentiel-a-la-formation'
import { FormateurPotentiel } from '../../../../src/formations/write/domain/entite/formation'
import {
  FormateurPotentielAjouteALaFormation
} from '../../../../src/formations/write/domain/evenement/formateur-potentiel-ajoute-a-la.formation'
import { Email } from '../../../../src/shared-kernel/email'
import { Fixtures } from '../../../fixtures'
import { CatalogueDeFormationsEnMemoire } from '../catalogue-de-formations-en-memoire'

describe('AjouterUnFormateurPotentielALaFormation', () => {
  it('persiste la formation avec le formateur potentiel', () => {
    // Given
    const formations = new CatalogueDeFormationsEnMemoire()
    formations.persister(Fixtures.uneFormation())
    const ajouterUnFormateurPotentielALaFormation = new AjouterUnFormateurPotentielALaFormation(formations)
    const commande = new FormateurPotentielAAjouterALaFormation('foo@example.com', 'DDD01')

    // When
    ajouterUnFormateurPotentielALaFormation.executer(commande)

    // Then
    const [formation] = formations.lister()
    expect(formation.formateursPotentiels).toEqual([new FormateurPotentiel(new Email('foo@example.com'))])
  })

  it('retourne un évènement d\'ajout d\'un formateur principal', () => {
    // Given
    const formations = new CatalogueDeFormationsEnMemoire()
    formations.persister(Fixtures.uneFormation())
    const ajouterUnFormateurPotentielALaFormation = new AjouterUnFormateurPotentielALaFormation(formations)
    const commande = new FormateurPotentielAAjouterALaFormation('foo@example.com', 'DDD01')

    // When
    const evenement = ajouterUnFormateurPotentielALaFormation.executer(commande)

    // Then
    expect(evenement).toEqual(new FormateurPotentielAjouteALaFormation('foo@example.com', 'DDD01'))
  })
})
