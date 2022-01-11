import ModeleDeLecture from "../../../../../building-blocks/cqrs/read/modele-de-lecture";

export interface SessionsDeFormationsFutures
  extends ModeleDeLecture,
    Array<string> {}
