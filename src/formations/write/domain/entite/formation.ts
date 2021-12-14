import Email from '../../../../shared-kernel/email'

export class Formation {
  public readonly formateursPotentiels: FormateurPotentiel[] = []

  constructor(
    private readonly _code: CodeDeFormation,
    private readonly _dureeEnHeures: DureeDeFormation,
  ) {
  }

  get code(): string {
    return this._code.valeur
  }

  get dureeEnHeures(): number {
    return this._dureeEnHeures.valeur
  }

  public ajouterFormateurPotentiel(formateurPotentiel: FormateurPotentiel): void {
    this.formateursPotentiels.push(formateurPotentiel)
  }
}

export class DureeDeFormation {
  public readonly valeur: number

  constructor(dureeEnHeure: number) {
    if (dureeEnHeure < 0) throw new Error('La durée de la formation ne peut être négative')
    this.valeur = dureeEnHeure
  }
}

export class CodeDeFormation {
  public readonly valeur: string

  constructor(code: string) {
    if (code.length < 3) throw new Error('Le code de la formation doit faire plus de 3 caractères')
    this.valeur = code
  }
}

export class FormateurPotentiel {
  public readonly id: string
  constructor(
    public readonly email: Email
  ) {
    this.id = email.valeur
  }
}
