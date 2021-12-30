import {CatalogueDeFormations, Formation} from "../../src/modules/calendrier-des-sessions-de-formation/write/domain/gateway/formation";
import {DEFAUT} from "../fixtures";

export default class CatalogueDeFormationsGatewayEnMemoire implements CatalogueDeFormations {
  chercherFormationParCode(_code: string): Formation {
    return {code: DEFAUT.CODE_FORMATION, formateurs: [DEFAUT.FORMATEUR]}
  }
}
