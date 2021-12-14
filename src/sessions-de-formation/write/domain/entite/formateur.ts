import Email from '../../../../shared-kernel/email'
import { Entite } from '../../../../building-blocks/write/entite'

export class Formateur implements Entite<Email> {
  constructor(
    public readonly id: Email
  ) {
  }
}
