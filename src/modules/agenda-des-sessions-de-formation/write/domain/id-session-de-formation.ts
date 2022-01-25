import { ValueObject } from "../../../../building-blocks/ddd/value-objet";

export class IdSessionDeFormation implements ValueObject {
  public readonly valeur: string;

  public constructor(private readonly _idSessionDeFormation: string) {
    this.valeur = _idSessionDeFormation;
  }

  public equals(vo: ValueObject): boolean {
    return vo instanceof IdSessionDeFormation && this.valeur === vo.valeur;
  }
}
