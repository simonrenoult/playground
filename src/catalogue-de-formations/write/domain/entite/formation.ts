import Email from '../../../../shared-kernel/email'
import { Agregat } from '../../../../building-blocks/write/agregat'
import { Entite } from '../../../../building-blocks/write/entite'
import { ValueObject } from '../../../../building-blocks/value-objet'

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
}

export class DureeDeFormation implements ValueObject {
  public readonly valeur: number

  constructor(dureeEnHeure: number) {
    if (dureeEnHeure < 0) throw new Error('La durée de la formation ne peut être négative')
    this.valeur = dureeEnHeure
  }
}

export class CodeDeFormation implements ValueObject {
  public readonly valeur: string

  constructor(code: string) {
    if (code.length < 3) throw new Error('Le code de la formation doit faire plus de 3 caractères')
    this.valeur = code
  }
}

export class FormateurPotentiel implements ValueObject {
  public readonly id: string
  constructor(
    public readonly email: Email
  ) {
    this.id = email.valeur
  }
}
