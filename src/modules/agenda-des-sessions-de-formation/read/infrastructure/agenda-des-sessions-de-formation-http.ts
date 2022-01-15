import { SessionsDeFormationsFutures } from "../domain/modele-de-lecture/sessions-de-formations-futures";
import { AgendaDesSessionsDeFormation } from "../domain/projection/agenda-des-sessions-de-formation";
import axios from "axios";

export default class AgendaDesSessionsDeFormationHttp
  implements AgendaDesSessionsDeFormation
{
  public async lister(): Promise<SessionsDeFormationsFutures> {
    const sessions = await axios.get<SessionsDeFormationsFutures>(
      "http://localhost:3000/sessions-de-formation"
    );

    return sessions.data;
  }
}
