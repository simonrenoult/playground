import { Formateur } from './formateur'
import { Participant } from './participant'
import { Agregat } from '../../../../building-blocks/write/agregat'
import { Entite } from '../../../../building-blocks/write/entite'

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
}

export class CodeDeFormation {
  constructor(
    public readonly valeur: string
  ) {
  }
}

export class IdSessionDeFormation {
  public readonly valeur: string

  constructor(
    private readonly _idSessionDeFormation: string
  ) {
    this.valeur = _idSessionDeFormation
  }
}
