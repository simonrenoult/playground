import * as Path from "path";
import { AwilixContainer, InjectionMode } from "awilix";
import GestionnaireDeQuellesSontLesFormationsAuCatalogue from "./application/gestionnaire/gestionnaire-de-quelles-sont-les-formations-au-catalogue";
import EcouteurDeFormationCreee from "./infrastructure/listener/ecouteur-de-formation-creee";

export interface ICradleRead {
  gestionnaireDeQuellesSontLesFormationsAuCatalogue: GestionnaireDeQuellesSontLesFormationsAuCatalogue;
  ecouteurDeFormationCreee: EcouteurDeFormationCreee;
}

export default class IOCRead {
  public static recuperer(conteneurParent: AwilixContainer): AwilixContainer {
    return conteneurParent
      .createScope<ICradleRead>()
      .loadModules(
        [
          Path.resolve(__dirname, "./application/**/*.ts"),
          Path.resolve(__dirname, "./application/**/*.js"),
          Path.resolve(__dirname, "./infrastructure/**/*.ts"),
          Path.resolve(__dirname, "./infrastructure/**/*.js"),
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
