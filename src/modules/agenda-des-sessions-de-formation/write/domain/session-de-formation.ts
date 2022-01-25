import { AggregateRoot } from "../../../../building-blocks/ddd/aggregate-root";
import { Entity } from "../../../../building-blocks/ddd/entity";
import {
  Deserializable,
  Serializable,
} from "../../../../building-blocks/patterns/memento";
import { StaticImplements } from "../../../../building-blocks/utils/static-implements";
import { Formateur } from "./formateur";
import { Participant } from "./participant";
import Email from "../../../shared-kernel/email";
import { CodeDeFormation } from "./code-de-formation";
import { IdSessionDeFormation } from "./id-session-de-formation";

export interface SessionDeFormationState {
  readonly id: string;
  readonly codeFormation: string;
  readonly participants: string[];
  readonly formateurs: string[];
}

@StaticImplements<Serializable<SessionDeFormationState, SessionDeFormation>>()
export class SessionDeFormation
  implements
    AggregateRoot,
    Entity<IdSessionDeFormation>,
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

  public equals(e: Entity<IdSessionDeFormation>): boolean {
    return this.id.valeur === e.id.valeur;
  }
}
