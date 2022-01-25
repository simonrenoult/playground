import { ValueObject } from "../../../../building-blocks/ddd/value-objet";

export class CodeDeFormation implements ValueObject {
  public constructor(public readonly valeur: string) {}

  public equals(vo: ValueObject): boolean {
    return vo instanceof CodeDeFormation && this.valeur === vo.valeur;
  }
}
