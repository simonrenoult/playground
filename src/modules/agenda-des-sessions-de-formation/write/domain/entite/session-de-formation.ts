import { Agregat } from "../../../../../building-blocks/ddd/agregat";
import { Entite } from "../../../../../building-blocks/ddd/entite";
import { ValueObject } from "../../../../../building-blocks/ddd/value-objet";
import {
  Deserializable,
  Serializable,
} from "../../../../../building-blocks/patterns/memento";
import { StaticImplements } from "../../../../../building-blocks/utils/static-implements";
import { Formateur } from "./formateur";
import { Participant } from "./participant";
import Email from "../../../../shared-kernel/email";

export interface SessionDeFormationState {
  readonly id: string;
  readonly codeFormation: string;
  readonly participants: string[];
  readonly formateurs: string[];
}

@StaticImplements<Serializable<SessionDeFormationState, SessionDeFormation>>()
export class SessionDeFormation
  implements
    Agregat,
    Entite<IdSessionDeFormation>,
    Deserializable<SessionDeFormationState>
{
  private readonly participants: Participant[] = [];
  private readonly formateurs: Formateur[] = [];

  private constructor(
    private readonly _idSessionDeFormation: IdSessionDeFormation,
    private readonly _codeFormation: CodeDeFormation
  ) {}

  public static vide(
    id: IdSessionDeFormation,
    codeDeFormation: CodeDeFormation
  ): SessionDeFormation {
    return new SessionDeFormation(id, codeDeFormation);
  }

  public static fromState(state: SessionDeFormationState): SessionDeFormation {
    const sessionDeFormation = new SessionDeFormation(
      new IdSessionDeFormation(state.id),
      new CodeDeFormation(state.codeFormation)
    );
    sessionDeFormation.formateurs.push(
      ...state.formateurs.map((f) => new Formateur(new Email(f)))
    );

    sessionDeFormation.participants.push(
      ...state.participants.map((p) => new Formateur(new Email(p)))
    );
    return sessionDeFormation;
  }

  public toState(): SessionDeFormationState {
    return {
      id: this._idSessionDeFormation.valeur,
      codeFormation: this._codeFormation.valeur,
      participants: this.participants.map((p) => p.id.valeur),
      formateurs: this.formateurs.map((f) => f.id.valeur),
    };
  }

  public ajouterParticipant(participant: Participant): void {
    this.participants.push(participant);
  }

  public ajouterFormateur(formateur: Formateur): void {
    this.formateurs.push(formateur);
  }

  public get id(): IdSessionDeFormation {
    return this._idSessionDeFormation;
  }

  public equals(e: Entite<IdSessionDeFormation>): boolean {
    return this.id.valeur === e.id.valeur;
  }
}

export class CodeDeFormation implements ValueObject {
  public constructor(public readonly valeur: string) {}

  public equals(vo: ValueObject): boolean {
    return vo instanceof CodeDeFormation && this.valeur === vo.valeur;
  }
}

export class IdSessionDeFormation implements ValueObject {
  public readonly valeur: string;

  public constructor(private readonly _idSessionDeFormation: string) {
    this.valeur = _idSessionDeFormation;
  }

  public equals(vo: ValueObject): boolean {
    return vo instanceof IdSessionDeFormation && this.valeur === vo.valeur;
  }
}
