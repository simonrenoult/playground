import Email from "../../../shared-kernel/email";
import { Entity } from "../../../../building-blocks/ddd/entity";

export class Participant implements Entity<Email> {
  public constructor(public readonly id: Email) {}

  public equals(e: Entity<Email>): boolean {
    return this.id.valeur === e.id.valeur;
  }
}
