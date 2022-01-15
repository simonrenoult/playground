import Email from "../../../../shared-kernel/email";
import { Entite } from "../../../../../building-blocks/ddd/entite";

export class Formateur implements Entite<Email> {
  public constructor(public readonly id: Email) {}

  public equals(e: Entite<Email>): boolean {
    return this.id.valeur === e.id.valeur;
  }
}
