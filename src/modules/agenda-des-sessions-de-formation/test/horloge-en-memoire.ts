import { DateTime } from "luxon";
import { Horloge } from "../../shared-kernel/horloge";

export class HorlogeEnMemoire implements Horloge {
  constructor(private readonly _maintenant: string) {}

  public maintenant(): DateTime {
    return DateTime.fromISO(this._maintenant);
  }
}
