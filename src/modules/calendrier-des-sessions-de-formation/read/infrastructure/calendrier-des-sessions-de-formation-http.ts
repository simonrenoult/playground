import { SessionsDeFormationsFutures } from "../domain/modele-de-lecture/sessions-de-formations-futures";
import { CalendrierDesSessionsDeFormation } from "../domain/projection/calendrier-des-sessions-de-formation";
import axios from "axios";

export default class CalendrierDesSessionsDeFormationHttp
  implements CalendrierDesSessionsDeFormation
{
  constructor() {}

  public async lister(): Promise<SessionsDeFormationsFutures> {
    const sessions = await axios.get<SessionsDeFormationsFutures>(
      "http://localhost:3000/sessions-de-formation"
    );

    return sessions.data;
  }
}
