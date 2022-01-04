import {
  CatalogueDeFormations,
  Formation,
} from "../../src/modules/calendrier-des-sessions-de-formation/write/domain/gateway/formation";

export class PortailVersLeCatalogueDeFormationEnMemoire
  implements CatalogueDeFormations
{
  public async chercherFormationParCode(code: string): Promise<Formation> {
    return {
      code,
      formateurs: [{ email: "foo@example.com" }],
    };
  }
}
