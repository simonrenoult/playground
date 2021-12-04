import { ulid } from 'ulid'
import {
  CreerUneSessionDeFormation
} from '../../../../src/sessions-de-formation/write/application/creer-une-session-de-formation'
import { SessionDeFormationCreee } from '../../../../src/sessions-de-formation/write/domain/evenement/session-de-formation-creee'
import { DEFAUT, Fixtures } from '../../../fixtures'
import { HorlogeEnMemoire } from '../../../horloge-en-memoire'
import { SessionsDeFormationEnMemoire } from '../../../session-de-formation/sessions-de-formation-en-memoire'

describe('CreerUneSessionDeFormation', () => {
  it('persiste une nouvelle session de formation', () => {
    // Given
    const sessionsDeFormation = new SessionsDeFormationEnMemoire()
    const creerUneSessionDeFormation = new CreerUneSessionDeFormation(sessionsDeFormation)
    const idSessionDeFormation = ulid()
    const sessionDeFormationAPlanifier = Fixtures.uneSessionDeFormationAPlanifier(idSessionDeFormation)

    // When
    creerUneSessionDeFormation.executer(sessionDeFormationAPlanifier)

    // Then
    const [sessionDeFormation] = sessionsDeFormation.lister()
    expect(sessionDeFormation.id).toEqual(idSessionDeFormation)
    expect(sessionDeFormation.codeFormation).toEqual('DDD01')
  })

  it('retourne un évènement de creation de la session', () => {
    // Given
    const sessionsDeFormation = new SessionsDeFormationEnMemoire()
    const planifierUneSessionDeFormation = new CreerUneSessionDeFormation(
      sessionsDeFormation,
    )
    const idSessionDeFormation = ulid()
    const sessionDeFormationAPlanifier = Fixtures.uneSessionDeFormationAPlanifier(idSessionDeFormation)

    // When
    const evenement = planifierUneSessionDeFormation.executer(sessionDeFormationAPlanifier)

    // Then
    expect(evenement).toBeInstanceOf(SessionDeFormationCreee)
  })
})
