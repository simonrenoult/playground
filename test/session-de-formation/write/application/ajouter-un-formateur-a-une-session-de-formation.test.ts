import { ulid } from 'ulid'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  AjouterUnFormateurAUneSessionDeFormation,
  FormateurAAjouterAUneSessionDeFormation
} from '../../../../src/sessions-de-formation/write/application/ajouter-un-formateur-a-une-session-de-formation'
import {
  FormateurAjouteALaSessionDeFormation
} from '../../../../src/sessions-de-formation/write/domain/evenement/formateur-ajoute-a-la-session-de-formation'
import { Fixtures } from '../../../fixtures'
import { SessionsDeFormationEnMemoire } from '../../sessions-de-formation-en-memoire'

describe('AjouterUnFormateurAUneSessionDeFormation', () => {
  it('ajoute un formateur à la session de formation', () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()
    const stafferUneSessionDeFormation = new AjouterUnFormateurAUneSessionDeFormation(
      sessionsDeFormationEnMemoire
    )
    const emailFormateur = 'qux@example.com'
    const idSessionDeSessionDeFormation = ulid()
    sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    )
    const sessionDeFormationAStaffer = new FormateurAAjouterAUneSessionDeFormation(
      emailFormateur,
      idSessionDeSessionDeFormation
    )

    // When
    stafferUneSessionDeFormation.executer(sessionDeFormationAStaffer)

    // Then
    const [sessionDeFormation] = sessionsDeFormationEnMemoire.lister()
    expect(sessionDeFormation.formateurs).to.have.length(1)
  })

  it('retourne un évènement de staffing d\'un formateur à la session de formation', () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()
    const stafferUneSessionDeFormation = new AjouterUnFormateurAUneSessionDeFormation(
      sessionsDeFormationEnMemoire
    )
    const emailFormateur = 'qux@example.com'
    const idSessionDeSessionDeFormation = ulid()
    sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    )
    const sessionDeFormationAStaffer = new FormateurAAjouterAUneSessionDeFormation(
      emailFormateur,
      idSessionDeSessionDeFormation
    )

    // When
    const evenement = stafferUneSessionDeFormation.executer(sessionDeFormationAStaffer)

    // Then
    expect(evenement).to.be.an.instanceOf(FormateurAjouteALaSessionDeFormation)
  })
})
