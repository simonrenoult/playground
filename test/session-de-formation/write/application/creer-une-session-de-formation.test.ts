import { ulid } from 'ulid'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  CreerUneSessionDeFormation
} from '../../../../src/sessions-de-formation/write/application/creer-une-session-de-formation'
import {
  SessionDeFormationCreee
} from '../../../../src/sessions-de-formation/write/domain/evenement/session-de-formation-creee'
import { Fixtures } from '../../../fixtures'
import { SessionsDeFormationEnMemoire } from '../../sessions-de-formation-en-memoire'

describe('CreerUneSessionDeFormation', () => {
  it('persiste une nouvelle session de formation', () => {
    // Given
    const sessionsDeFormation = new SessionsDeFormationEnMemoire()
    const creerUneSessionDeFormation = new CreerUneSessionDeFormation(sessionsDeFormation)
    const idSessionDeFormation = ulid()
    const sessionDeFormationAPlanifier = Fixtures.uneSessionDeFormationACreer(idSessionDeFormation)

    // When
    creerUneSessionDeFormation.executer(sessionDeFormationAPlanifier)

    // Then
    const [sessionDeFormation] = sessionsDeFormation.lister()
    expect(sessionDeFormation.id).to.equal(idSessionDeFormation)
    expect(sessionDeFormation.codeFormation).to.equal('DDD01')
  })

  it('retourne un évènement de creation de la session', () => {
    // Given
    const sessionsDeFormation = new SessionsDeFormationEnMemoire()
    const planifierUneSessionDeFormation = new CreerUneSessionDeFormation(
      sessionsDeFormation,
    )
    const idSessionDeFormation = ulid()
    const sessionDeFormationAPlanifier = Fixtures.uneSessionDeFormationACreer(idSessionDeFormation)

    // When
    const evenement = planifierUneSessionDeFormation.executer(sessionDeFormationAPlanifier)

    // Then
    expect(evenement).to.be.an.instanceOf(SessionDeFormationCreee)
  })
})
