import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  GestionnaireDeAjouterUnFormateurPotentielALaFormation
} from '../../../../src/catalogue-de-formations/write/application/gestionnaire/gestionnaire-de-ajouter-un-formateur-potentiel-a-la-formation'
import { FormateurPotentiel } from '../../../../src/catalogue-de-formations/write/domain/entite/formation'
import {
  FormateurPotentielAjouteALaFormation
} from '../../../../src/catalogue-de-formations/write/domain/evenement/formateur-potentiel-ajoute-a-la.formation'
import Email from '../../../../src/shared-kernel/email'
import { Fixtures } from '../../../fixtures'
import CatalogueDeFormationsEnMemoire from '../catalogue-de-formations-en-memoire'
import AjouterUnFormateurPotentielALaFormation from '../../../../src/catalogue-de-formations/write/application/ajouter-un-formateur-potentiel-a-la-formation'

describe('AjouterUnFormateurPotentielALaFormation', () => {
  it('persiste la formation avec le formateur potentiel', () => {
    // Given
    const formations = new CatalogueDeFormationsEnMemoire()
    formations.persister(Fixtures.uneFormation())
    const ajouterUnFormateurPotentielALaFormation = new GestionnaireDeAjouterUnFormateurPotentielALaFormation(formations)
    const commande = new AjouterUnFormateurPotentielALaFormation('foo@example.com', 'DDD01')

    // When
    ajouterUnFormateurPotentielALaFormation.executer(commande)

    // Then
    const [formation] = formations.lister()
    expect(formation.formateursPotentiels).to.deep.equal([new FormateurPotentiel(new Email('foo@example.com'))])
  })

  it('retourne un évènement d\'ajout d\'un formateur principal', () => {
    // Given
    const formations = new CatalogueDeFormationsEnMemoire()
    formations.persister(Fixtures.uneFormation())
    const ajouterUnFormateurPotentielALaFormation = new GestionnaireDeAjouterUnFormateurPotentielALaFormation(formations)
    const commande = new AjouterUnFormateurPotentielALaFormation('foo@example.com', 'DDD01')

    // When
    const evenement = ajouterUnFormateurPotentielALaFormation.executer(commande)

    // Then
    expect(evenement).to.deep.equal(new FormateurPotentielAjouteALaFormation('foo@example.com', 'DDD01'))
  })
})
