import {
  IdSessionDeFormation,
  SessionDeFormation,
} from "../entite/session-de-formation";
import { Repository } from "../../../../../building-blocks/ddd/repository";

export interface SessionsDeFormation
  extends Repository<IdSessionDeFormation, SessionDeFormation> {}
