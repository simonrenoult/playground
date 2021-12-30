import Email from '../../../../shared-kernel/email'
import { Gateway } from '../../../../../building-blocks/gateway'

export interface Notifieur extends Gateway {
  notifier(e: Email): void
}
