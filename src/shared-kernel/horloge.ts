import { DateTime } from 'luxon'

export interface Horloge {
  maintenant(): DateTime
}
