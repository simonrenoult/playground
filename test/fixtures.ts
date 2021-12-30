import {
  CodeDeFormation,
  DureeDeFormation,
  Formation
} from '../src/modules/catalogue-de-formations/write/domain/entite/formation'
import CreerUneSessionDeFormation
  from '../src/modules/calendrier-des-sessions-de-formation/write/application/creer-une-session-de-formation'
import {
  IdSessionDeFormation,
  SessionDeFormation
} from '../src/modules/calendrier-des-sessions-de-formation/write/domain/entite/session-de-formation'
import {
  SessionDeFormationCreee
} from '../src/modules/calendrier-des-sessions-de-formation/write/domain/evenement/session-de-formation-creee'
import CreerUneFormation from '../src/modules/catalogue-de-formations/write/application/creer-une-formation'

export const DEFAUT = {
  CODE_FORMATION: 'DDD01',
  DUREE_FORMATION: 14,
  DATE_SESSION: '2021-02-01',
  MAINTENANT: '2021-01-01',
  ID_SESSION_FORMATION: 'DDD01_1234',
  FORMATEUR: { email: "tom@example.com" }
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
