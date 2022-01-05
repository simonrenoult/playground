import * as Path from "path";
import { AwilixContainer, InjectionMode } from "awilix";
import GestionnaireDeQuellesSontLesFormationsAuCatalogue from "./application/gestionnaire/gestionnaire-de-quelles-sont-les-formations-au-catalogue";

export interface ICradleRead {
  gestionnaireDeQuellesSontLesFormationsAuCatalogue: GestionnaireDeQuellesSontLesFormationsAuCatalogue;
}

export default class IOCRead {
  public static recupererLeConteneurDInjectionDeDependance(
    conteneurParent: AwilixContainer
  ): AwilixContainer {
    return conteneurParent
      .createScope<ICradleRead>()
      .loadModules(
        [
          Path.resolve(__dirname, "./application/**/*.ts"),
          Path.resolve(__dirname, "./infrastructure/**/*.ts"),
        ],
        {
          resolverOptions: {
            injectionMode: InjectionMode.CLASSIC,
            lifetime: "SCOPED",
          },
          formatName: "camelCase",
        }
      );
  }
}
