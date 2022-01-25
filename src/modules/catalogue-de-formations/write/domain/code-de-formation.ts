import { ValueObject } from "../../../../building-blocks/ddd/value-objet";

export class CodeDeFormation implements ValueObject {
  public readonly valeur: string;

  public constructor(code: string) {
    if (code.length < 3)
      throw new Error(
        "Le code de la formation doit faire plus de 3 caractères"
      );
    this.valeur = code;
  }

  public equals(vo: ValueObject): boolean {
    return vo instanceof CodeDeFormation && this.valeur === vo.valeur;
  }
}
