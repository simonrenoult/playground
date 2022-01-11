import {
  CatalogueDeFormations,
  Formation,
} from "../write/domain/gateway/formation";
import { DEFAUT } from "./fixtures";

export class CatalogueDeFormationsGatewayEnMemoire
  implements CatalogueDeFormations
{
  public async chercherFormationParCode(code: string): Promise<Formation> {
    return {
      code,
      formateurs: [DEFAUT.FORMATEUR],
    };
  }
}
