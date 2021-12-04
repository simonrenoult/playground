import { ulid } from 'ulid'
import {
  AjouterUnFormateurAUneSessionDeFormation, FormateurAAjouterAUneSessionDeFormation
} from '../../../../src/sessions-de-formation/write/application/ajouter-un-formateur-a-une-session-de-formation'
import {
  FormateurAjouteALaSessionDeFormation
} from '../../../../src/sessions-de-formation/write/domain/evenement/formateur-ajoute-a-la-session-de-formation'
import { Fixtures } from '../../../fixtures'
import { SessionsDeFormationEnMemoire } from '../../../session-de-formation/sessions-de-formation-en-memoire'

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
    expect(sessionDeFormation.formateurs).toHaveLength(1)
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
    expect(evenement).toBeInstanceOf(FormateurAjouteALaSessionDeFormation)
  })
})
