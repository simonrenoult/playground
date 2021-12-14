import { DateTime } from 'luxon'
import { Gateway } from '../building-blocks/gateway'

export interface Horloge extends Gateway {
  maintenant(): DateTime
}
