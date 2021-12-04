import { IdSessionDeFormation, SessionDeFormation } from '../entite/session-de-formation'

export interface SessionsDeFormation {
  parId(id: IdSessionDeFormation): SessionDeFormation
  persister(s: SessionDeFormation): void
}
