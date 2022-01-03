import { DateTime } from "luxon";
import { SessionsDeFormationsFutures } from "../modele-de-lecture/sessions-de-formations-futures";

export interface CalendrierDesSessionsDeFormation {
  lister(aPartirDe: DateTime): Promise<SessionsDeFormationsFutures>;
}
