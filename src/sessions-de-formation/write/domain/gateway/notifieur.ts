import { Email } from '../../../../shared-kernel/email'

export interface Notifieur {
  notifier(e: Email): void
}
