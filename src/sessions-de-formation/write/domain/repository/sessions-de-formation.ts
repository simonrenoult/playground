import { IdSessionDeFormation, SessionDeFormation } from '../entite/session-de-formation'
import { Repository } from '../../../../building-blocks/write/repository'

export interface SessionsDeFormation extends Repository {
  parId(id: IdSessionDeFormation): SessionDeFormation
  persister(s: SessionDeFormation): void
}
