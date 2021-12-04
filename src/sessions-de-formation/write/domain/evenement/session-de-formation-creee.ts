export class SessionDeFormationCreee {
  public readonly nom = 'SESSION_DE_FORMATION_PLANIFIEE'

  constructor(
    public readonly idSessionDeFormation: string,
    public readonly codeFormation: string
  ) {
  }
}
