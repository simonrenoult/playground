import { SessionDeFormation } from "../session-de-formation";
import { Repository } from "../../../../../building-blocks/ddd/repository";
import { IdSessionDeFormation } from "../id-session-de-formation";

export interface SessionsDeFormation
  extends Repository<IdSessionDeFormation, SessionDeFormation> {}
