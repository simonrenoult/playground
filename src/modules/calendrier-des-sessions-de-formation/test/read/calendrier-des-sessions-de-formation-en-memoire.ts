import FormationsAuCatalogue from "../../../catalogue-de-formations/read/domain/modele-de-lecture/formations-au-catalogue";
import { CalendrierDesSessionsDeFormation } from "../../read/domain/projection/calendrier-des-sessions-de-formation";
import { DateTime } from "luxon";

export default class CalendrierDesSessionsDeFormationEnMemoire
  implements CalendrierDesSessionsDeFormation
{
  public async lister(_aPartirDe: DateTime): Promise<FormationsAuCatalogue> {
    return ["DDD01"];
  }
}
