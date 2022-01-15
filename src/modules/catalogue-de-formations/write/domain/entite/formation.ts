import Email from "../../../../shared-kernel/email";
import { Agregat } from "../../../../../building-blocks/ddd/agregat";
import { Entite } from "../../../../../building-blocks/ddd/entite";
import { ValueObject } from "../../../../../building-blocks/ddd/value-objet";

export interface FormationState {
  code: string;
  dureeEnHeures: number;
}

export class Formation implements Agregat, Entite<CodeDeFormation> {
  public readonly formateursPotentiels: FormateurPotentiel[] = [];

  public constructor(
    private readonly _code: CodeDeFormation,
    private readonly _dureeEnHeures: DureeDeFormation
  ) {}

  public get id(): CodeDeFormation {
    return this._code;
  }

  public get dureeEnHeures(): number {
    return this._dureeEnHeures.valeur;
  }

  public ajouterFormateurPotentiel(
    formateurPotentiel: FormateurPotentiel
  ): void {
    this.formateursPotentiels.push(formateurPotentiel);
  }

  public equals(e: Entite<CodeDeFormation>): boolean {
    return this._code.valeur === e.id.valeur;
  }

  public toState(): FormationState {
    return {
      code: this._code.valeur,
      dureeEnHeures: this._dureeEnHeures.valeur,
    };
  }

  public static fromState(state: FormationState): Formation {
    return new Formation(
      new CodeDeFormation(state.code),
      new DureeDeFormation(state.dureeEnHeures)
    );
  }
}

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

export class FormateurPotentiel implements ValueObject {
  public readonly id: string;

  public constructor(public readonly email: Email) {
    this.id = email.valeur;
  }

  public equals(vo: ValueObject): boolean {
    return vo instanceof FormateurPotentiel && this.id === vo.id;
  }
}
