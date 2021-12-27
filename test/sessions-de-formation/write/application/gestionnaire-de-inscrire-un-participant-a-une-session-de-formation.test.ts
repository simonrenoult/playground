import { ulid } from 'ulid'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import InscrireUnParticipantAUneSessionDeFormation from '../../../../src/modules/sessions-de-formation/write/application/inscrire-un-participant-a-une-session-de-formation'
import {
  ParticipantInscritALaSessionDeFormation
} from '../../../../src/modules/sessions-de-formation/write/domain/evenement/participant-inscrit-a-la-session-de-formation'
import { Fixtures } from '../../../fixtures'
import { SessionsDeFormationEnMemoire } from '../../sessions-de-formation-en-memoire'
import GestionnaireDeInscrireUnParticipantAUneSessionDeFormation from '../../../../src/modules/sessions-de-formation/write/application/gestionnaire/gestionnaire-de-inscrire-un-participant-a-une-session-de-formation'

describe('SInscrireAUneSessionDeFormation', () => {
  it('ajoute un participant à la session de formation', () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()
    const sInscrireAUneSessionDeFormation = new GestionnaireDeInscrireUnParticipantAUneSessionDeFormation(
      sessionsDeFormationEnMemoire
    )
    const emailParticipant = 'foo@bar.com'
    const idSessionDeSessionDeFormation = ulid()
    sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    )
    const inscriptionALaSessionDeFormation = new InscrireUnParticipantAUneSessionDeFormation(
      emailParticipant,
      idSessionDeSessionDeFormation
    )

    // When
    sInscrireAUneSessionDeFormation.executer(inscriptionALaSessionDeFormation)

    // Then
    const [sessionDeFormation] = sessionsDeFormationEnMemoire.lister()
    expect(sessionDeFormation.participants).to.have.length(1)
  })

  it('retourne un évènement d\'inscription à la session', () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()
    const sInscrireAUneSessionDeFormation = new GestionnaireDeInscrireUnParticipantAUneSessionDeFormation(
      sessionsDeFormationEnMemoire
    )
    const emailParticipant = 'foo@bar.com'
    const idSessionDeSessionDeFormation = ulid()
    sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    )
    const inscriptionALaSessionDeFormation = new InscrireUnParticipantAUneSessionDeFormation(
      emailParticipant,
      idSessionDeSessionDeFormation
    )

    // When
    const evenement = sInscrireAUneSessionDeFormation.executer(inscriptionALaSessionDeFormation)

    // Then
    expect(evenement).to.be.an.instanceOf(ParticipantInscritALaSessionDeFormation)
  })
})
