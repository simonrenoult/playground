import { Formateur } from './formateur'
import { Participant } from './participant'
import { Agregat } from '../../../../building-blocks/ddd/agregat'
import { Entite } from '../../../../building-blocks/ddd/entite'
import { ValueObject } from '../../../../building-blocks/ddd/value-objet'

export class SessionDeFormation implements Agregat, Entite<IdSessionDeFormation> {
  public readonly participants: Participant[] = []
  public readonly formateurs: Formateur[] = []

  constructor(
    private readonly _idSessionDeFormation: IdSessionDeFormation,
    private readonly _codeFormation: CodeDeFormation,
  ) {
  }

  get id(): IdSessionDeFormation {
    return this._idSessionDeFormation
  }

  get codeFormation(): string {
    return this._codeFormation.valeur
  }

  public ajouterParticipant(participant: Participant): void {
    this.participants.push(participant)
  }

  public ajouterFormateur(formateur: Formateur): void {
    this.formateurs.push(formateur)
  }

  equals(e: Entite<IdSessionDeFormation>): boolean {
    return this.id.valeur === e.id.valeur;
  }
}

export class CodeDeFormation implements ValueObject {
  constructor(
    public readonly valeur: string
  ) {
  }
  equals(vo: ValueObject): boolean {
    return vo instanceof CodeDeFormation && this.valeur === vo.valeur;
  }
}

export class IdSessionDeFormation implements ValueObject {
  public readonly valeur: string

  constructor(
    private readonly _idSessionDeFormation: string
  ) {
    this.valeur = _idSessionDeFormation
  }

  equals(vo: ValueObject): boolean {
    return vo instanceof IdSessionDeFormation && this.valeur === vo.valeur
  }
}
