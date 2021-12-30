import Email from "../../src/modules/shared-kernel/email";
import { Notifieur } from "../../src/modules/calendrier-des-sessions-de-formation/write/domain/gateway/notifieur";

export class NotifieurEnMemoire implements Notifieur {
  constructor(public readonly emailsNotifies: string[] = []) {}

  public notifier(e: Email): void {
    this.emailsNotifies.push(e.valeur);
  }
}
