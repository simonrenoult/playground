import { ulid } from 'ulid'
import {
  InscriptionALaSessionDeFormation,
  InscrireUnParticipantAUneSessionDeFormation
} from '../../../../src/sessions-de-formation/write/application/inscrire-un-participant-a-une-session-de-formation'
import {
  ParticipantInscritALaSessionDeFormation
} from '../../../../src/sessions-de-formation/write/domain/evenement/participant-inscrit-a-la-session-de-formation'
import { Fixtures } from '../../../fixtures'
import { SessionsDeFormationEnMemoire } from '../../../session-de-formation/sessions-de-formation-en-memoire'

describe('SInscrireAUneSessionDeFormation', () => {
  it('ajoute un participant à la session de formation', () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()
    const sInscrireAUneSessionDeFormation = new InscrireUnParticipantAUneSessionDeFormation(
      sessionsDeFormationEnMemoire
    )
    const emailParticipant = 'foo@bar.com'
    const idSessionDeSessionDeFormation = ulid()
    sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    )
    const inscriptionALaSessionDeFormation = new InscriptionALaSessionDeFormation(
      emailParticipant,
      idSessionDeSessionDeFormation
    )

    // When
    sInscrireAUneSessionDeFormation.executer(inscriptionALaSessionDeFormation)

    // Then
    const [sessionDeFormation] = sessionsDeFormationEnMemoire.lister()
    expect(sessionDeFormation.participants).toHaveLength(1)
  })

  it('retourne un évènement d\'inscription à la session', () => {
    // Given
    const sessionsDeFormationEnMemoire = new SessionsDeFormationEnMemoire()
    const sInscrireAUneSessionDeFormation = new InscrireUnParticipantAUneSessionDeFormation(
      sessionsDeFormationEnMemoire
    )
    const emailParticipant = 'foo@bar.com'
    const idSessionDeSessionDeFormation = ulid()
    sessionsDeFormationEnMemoire.persister(
      Fixtures.uneSessionDeFormation(idSessionDeSessionDeFormation)
    )
    const inscriptionALaSessionDeFormation = new InscriptionALaSessionDeFormation(
      emailParticipant,
      idSessionDeSessionDeFormation
    )

    // When
    const evenement = sInscrireAUneSessionDeFormation.executer(inscriptionALaSessionDeFormation)

    // Then
    expect(evenement).toBeInstanceOf(ParticipantInscritALaSessionDeFormation)
  })
})
