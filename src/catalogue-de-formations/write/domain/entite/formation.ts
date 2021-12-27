import Email from '../../../../shared-kernel/email'
import { Agregat } from '../../../../building-blocks/ddd/agregat'
import { Entite } from '../../../../building-blocks/ddd/entite'
import { ValueObject } from '../../../../building-blocks/ddd/value-objet'

export class Formation implements Agregat, Entite<CodeDeFormation> {
  public readonly formateursPotentiels: FormateurPotentiel[] = []

  constructor(
    private readonly _code: CodeDeFormation,
    private readonly _dureeEnHeures: DureeDeFormation,
  ) {
  }

  get id(): CodeDeFormation {
    return this._code
  }

  get dureeEnHeures(): number {
    return this._dureeEnHeures.valeur
  }

  public ajouterFormateurPotentiel(formateurPotentiel: FormateurPotentiel): void {
    this.formateursPotentiels.push(formateurPotentiel)
  }

  equals(e: Entite<CodeDeFormation>): boolean {
    return this._code.valeur === e.id.valeur;
  }
}

export class DureeDeFormation implements ValueObject {
  public readonly valeur: number

  constructor(dureeEnHeure: number) {
    if (dureeEnHeure < 0) throw new Error('La durée de la formation ne peut être négative')
    this.valeur = dureeEnHeure
  }

  equals(vo: ValueObject): boolean {
    return vo instanceof DureeDeFormation && this.valeur === vo.valeur;
  }
}

export class CodeDeFormation implements ValueObject {
  public readonly valeur: string

  constructor(code: string) {
    if (code.length < 3) throw new Error('Le code de la formation doit faire plus de 3 caractères')
    this.valeur = code
  }

  equals(vo: ValueObject): boolean {
    return vo instanceof CodeDeFormation && this.valeur === vo.valeur
  }
}

export class FormateurPotentiel implements ValueObject {
  public readonly id: string
  constructor(
    public readonly email: Email
  ) {
    this.id = email.valeur
  }

  equals(vo: ValueObject): boolean {
    return vo instanceof FormateurPotentiel && this.id === vo.id
  }
}
