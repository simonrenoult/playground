import axios from "axios";
import { SessionsDeFormationsFutures } from "../domain/modele-de-lecture/sessions-de-formations-futures";
import { AgendaDesSessionsDeFormation } from "../domain/projection/agenda-des-sessions-de-formation";
import { Configuration } from "../../../../infrastructure/configuration";

export default class AgendaDesSessionsDeFormationHttp
  implements AgendaDesSessionsDeFormation
{
  public constructor(private readonly configuration: Configuration) {}

  public async lister(): Promise<SessionsDeFormationsFutures> {
    const sessions = await axios.get<SessionsDeFormationsFutures>(
      `${this.configuration.host}:${this.configuration.port}/sessions-de-formation`
    );

    return sessions.data;
  }
}
