import { ulid } from 'ulid'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  SessionDeFormationCreee
} from '../../../../src/sessions-de-formation/write/domain/evenement/session-de-formation-creee'
import { Fixtures } from '../../../fixtures'
import { SessionsDeFormationEnMemoire } from '../../sessions-de-formation-en-memoire'
import { IdSessionDeFormation } from '../../../../src/sessions-de-formation/write/domain/entite/session-de-formation'
import {
  GestionnaireDeCreerUneSessionDeFormation
} from '../../../../src/sessions-de-formation/write/application/gestionnaire/gestionnaire-de-creer-une-session-de-formation'

describe('CreerUneSessionDeFormation', () => {
  it('persiste une nouvelle session de formation', () => {
    // Given
    const sessionsDeFormation = new SessionsDeFormationEnMemoire()
    const creerUneSessionDeFormation = new GestionnaireDeCreerUneSessionDeFormation(sessionsDeFormation)
    const idSessionDeFormation = ulid()
    const sessionDeFormationAPlanifier = Fixtures.uneSessionDeFormationACreer(idSessionDeFormation)

    // When
    creerUneSessionDeFormation.executer(sessionDeFormationAPlanifier)

    // Then
    const [sessionDeFormation] = sessionsDeFormation.lister()
    expect(sessionDeFormation.id).to.deep.equal(new IdSessionDeFormation(idSessionDeFormation))
    expect(sessionDeFormation.codeFormation).to.equal('DDD01')
  })

  it('retourne un évènement de creation de la session', () => {
    // Given
    const sessionsDeFormation = new SessionsDeFormationEnMemoire()
    const planifierUneSessionDeFormation = new GestionnaireDeCreerUneSessionDeFormation(
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
