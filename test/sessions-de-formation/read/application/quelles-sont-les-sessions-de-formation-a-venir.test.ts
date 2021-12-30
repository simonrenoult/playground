import { describe, it } from 'mocha'
import { expect } from 'chai'
import CalendrierDesSessionsDeFormationEnMemoire from '../calendrier-des-sessions-de-formation-en-memoire'
import QuellesSontLesSessionsDeFormationAVenir
  from '../../../../src/modules/calendrier-des-sessions-de-formation/read/application/quelles-sont-les-sessions-de-formation-a-venir'
import {
  GestionnaireDeQuellesSontLesSessionsDeFormationAVenir
} from '../../../../src/modules/calendrier-des-sessions-de-formation/read/application/gestionnaire/gestionnaire-de-quelles-sont-les-sessions-de-formation-a-venir'
import { HorlogeEnMemoire } from '../../../horloge-en-memoire'

describe('QuellesSontLesSessionsDeFormationAVenir', () => {
  it('liste les sessions de formation futures', () => {
    // Given
    const quellesSontLesSessionsDeFormationAVenir = new QuellesSontLesSessionsDeFormationAVenir()
    const horloge = new HorlogeEnMemoire('01-01-2020')
    const calendrier = new CalendrierDesSessionsDeFormationEnMemoire()
    const gestionnaire = new GestionnaireDeQuellesSontLesSessionsDeFormationAVenir(horloge, calendrier)

    // When
    const formations = gestionnaire.executer(quellesSontLesSessionsDeFormationAVenir)

    // Then
    expect(formations).to.have.length(1)
  })
})
