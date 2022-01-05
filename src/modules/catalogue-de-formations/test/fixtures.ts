import {
  CodeDeFormation,
  DureeDeFormation,
  Formation,
} from "../write/domain/entite/formation";
import CreerUneFormation from "../write/application/creer-une-formation";

export const DEFAUT = {
  CODE_FORMATION: "DDD01",
  DUREE_FORMATION: 14,
  DATE_SESSION: "2021-02-01",
  MAINTENANT: "2021-01-01",
  ID_SESSION_FORMATION: "DDD01_1234",
  FORMATEUR: { email: "tom@example.com" },
};

export class Fixtures {
  public static uneFormationACreer(): CreerUneFormation {
    return new CreerUneFormation(DEFAUT.CODE_FORMATION, DEFAUT.DUREE_FORMATION);
  }

  public static uneFormation(): Formation {
    return new Formation(
      new CodeDeFormation(DEFAUT.CODE_FORMATION),
      new DureeDeFormation(DEFAUT.DUREE_FORMATION)
    );
  }
}
