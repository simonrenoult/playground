import { SessionDeFormation } from "../write/domain/session-de-formation";
import CreerUneSessionDeFormation from "../write/application/creer-une-session-de-formation";
import { SessionDeFormationCreee } from "../write/domain/evenement/session-de-formation-creee";
import { CodeDeFormation } from "../write/domain/code-de-formation";
import { IdSessionDeFormation } from "../write/domain/id-session-de-formation";

export const DEFAUT = {
  CODE_FORMATION: "DDD01",
  DUREE_FORMATION: 14,
  DATE_SESSION: "2021-02-01",
  MAINTENANT: "2021-01-01",
  ID_SESSION_FORMATION: "DDD01_1234",
  FORMATEUR: { email: "tom@example.com" },
};

export class Fixtures {
  public static uneSessionDeFormationACreer(
    idSessionDeFormation: string
  ): CreerUneSessionDeFormation {
    return new CreerUneSessionDeFormation(
      idSessionDeFormation,
      DEFAUT.CODE_FORMATION
    );
  }

  public static uneSessionDeFormation(
    idSessionDeSessionDeFormation: string
  ): SessionDeFormation {
    return SessionDeFormation.vide(
      new IdSessionDeFormation(idSessionDeSessionDeFormation),
      new CodeDeFormation(DEFAUT.CODE_FORMATION)
    );
  }

  public static uneSessionDeFormationCreee(): SessionDeFormationCreee {
    return new SessionDeFormationCreee(
      DEFAUT.ID_SESSION_FORMATION,
      DEFAUT.CODE_FORMATION
    );
  }
}
