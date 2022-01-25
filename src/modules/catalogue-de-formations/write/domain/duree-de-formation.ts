import { ValueObject } from "../../../../building-blocks/ddd/value-objet";

export class DureeDeFormation implements ValueObject {
  public readonly valeur: number;

  public constructor(dureeEnHeure: number) {
    if (dureeEnHeure < 0)
      throw new Error("La durée de la formation ne peut être négative");
    this.valeur = dureeEnHeure;
  }

  public equals(vo: ValueObject): boolean {
    return vo instanceof DureeDeFormation && this.valeur === vo.valeur;
  }
}
