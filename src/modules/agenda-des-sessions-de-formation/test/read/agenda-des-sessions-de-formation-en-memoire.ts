import FormationsAuCatalogue from "../../../catalogue-de-formations/read/domain/modele-de-lecture/formations-au-catalogue";
import { AgendaDesSessionsDeFormation } from "../../read/domain/projection/agenda-des-sessions-de-formation";
import { DateTime } from "luxon";

export default class AgendaDesSessionsDeFormationEnMemoire
  implements AgendaDesSessionsDeFormation
{
  public async lister(_aPartirDe: DateTime): Promise<FormationsAuCatalogue> {
    return ["DDD01"];
  }
}
