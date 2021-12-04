import { FormationACreer } from '../src/formations/write/application/creer-une-formation'
import { CodeDeFormation, DureeDeFormation, Formation } from '../src/formations/write/domain/entite/formation'
import { SessionDeFormationACreer } from '../src/sessions-de-formation/write/application/creer-une-session-de-formation'
import {
  IdSessionDeFormation,
  SessionDeFormation
} from '../src/sessions-de-formation/write/domain/entite/session-de-formation'

export const DEFAUT = {
  CODE_FORMATION: 'DDD01',
  DUREE_FORMATION: 14,
  DATE_SESSION: '2021-02-01',
  MAINTENANT: '2021-01-01'
}

export namespace Fixtures {
  export function uneFormationACreer(): FormationACreer {
    return new FormationACreer(
      DEFAUT.CODE_FORMATION,
      DEFAUT.DUREE_FORMATION
    )
  }

  export function uneFormation(): Formation {
    return new Formation(
      new CodeDeFormation(DEFAUT.CODE_FORMATION),
      new DureeDeFormation(DEFAUT.DUREE_FORMATION)
    )
  }

  export function uneSessionDeFormationAPlanifier(idSessionDeFormation: string): SessionDeFormationACreer {
    return new SessionDeFormationACreer(
      idSessionDeFormation,
      DEFAUT.CODE_FORMATION
    )
  }

  export function uneSessionDeFormation(idSessionDeSessionDeFormation: string): SessionDeFormation {
    return new SessionDeFormation(
      new IdSessionDeFormation(idSessionDeSessionDeFormation),
      new CodeDeFormation(DEFAUT.CODE_FORMATION)
    )
  }
}
