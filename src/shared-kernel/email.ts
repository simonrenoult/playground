export default class Email {
  public readonly valeur: string

  constructor(
    private readonly _valeur: string
  ) {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!EMAIL_REGEX.test(_valeur.toLowerCase())) throw new Error('L\'email du participant n\'est pas valide')
    this.valeur = _valeur
  }
}
