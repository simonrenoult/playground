import { ValueObject } from "../../../../building-blocks/ddd/value-objet";
import Email from "../../../shared-kernel/email";

export class FormateurPotentiel implements ValueObject {
  public readonly id: string;

  public constructor(public readonly email: Email) {
    this.id = email.valeur;
  }

  public equals(vo: ValueObject): boolean {
    return vo instanceof FormateurPotentiel && this.id === vo.id;
  }
}
