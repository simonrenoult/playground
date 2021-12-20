import { CreerUneFormation } from '../src/catalogue-de-formations/write/application/gestionnaire-de-creer-une-formation'
import { CodeDeFormation, DureeDeFormation, Formation } from '../src/catalogue-de-formations/write/domain/entite/formation'
import { CreerUneSessionDeFormation } from '../src/sessions-de-formation/write/application/gestionnaire-de-creer-une-session-de-formation'
import {
  IdSessionDeFormation,
  SessionDeFormation
} from '../src/sessions-de-formation/write/domain/entite/session-de-formation'
import { SessionDeFormationCreee } from '../src/sessions-de-formation/write/domain/evenement/session-de-formation-creee'

export const DEFAUT = {
  CODE_FORMATION: 'DDD01',
  DUREE_FORMATION: 14,
  DATE_SESSION: '2021-02-01',
  MAINTENANT: '2021-01-01',
  ID_SESSION_FORMATION: 'DDD01_1234'
}

export class Fixtures {
  public static uneFormationACreer(): CreerUneFormation {
    return new CreerUneFormation(
      DEFAUT.CODE_FORMATION,
      DEFAUT.DUREE_FORMATION
    )
  }

  public static uneFormation(): Formation {
    return new Formation(
      new CodeDeFormation(DEFAUT.CODE_FORMATION),
      new DureeDeFormation(DEFAUT.DUREE_FORMATION)
    )
  }

  public static uneSessionDeFormationACreer(idSessionDeFormation: string): CreerUneSessionDeFormation {
    return new CreerUneSessionDeFormation(
      idSessionDeFormation,
      DEFAUT.CODE_FORMATION
    )
  }

  public static uneSessionDeFormation(idSessionDeSessionDeFormation: string): SessionDeFormation {
    return new SessionDeFormation(
      new IdSessionDeFormation(idSessionDeSessionDeFormation),
      new CodeDeFormation(DEFAUT.CODE_FORMATION)
    )
  }

  public static uneSessionDeFormationCreee(): SessionDeFormationCreee {
    return new SessionDeFormationCreee(
      DEFAUT.ID_SESSION_FORMATION,
      DEFAUT.CODE_FORMATION
    )
  }
}
