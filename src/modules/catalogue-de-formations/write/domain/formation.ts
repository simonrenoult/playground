import { AggregateRoot } from "../../../../building-blocks/ddd/aggregate-root";
import { Entity } from "../../../../building-blocks/ddd/entity";
import { DureeDeFormation } from "./duree-de-formation";
import { CodeDeFormation } from "./code-de-formation";
import { FormateurPotentiel } from "./formateur-potentiel";

export interface FormationState {
  code: string;
  dureeEnHeures: number;
}

export class Formation implements AggregateRoot, Entity<CodeDeFormation> {
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

  public equals(e: Entity<CodeDeFormation>): boolean {
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
