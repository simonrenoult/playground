import { DateTime } from "luxon";
import { SessionsDeFormationsFutures } from "../modele-de-lecture/sessions-de-formations-futures";

export interface AgendaDesSessionsDeFormation {
  lister(aPartirDe: DateTime): Promise<SessionsDeFormationsFutures>;
}
