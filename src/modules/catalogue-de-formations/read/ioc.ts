import * as Path from "path";
import { AwilixContainer, InjectionMode } from "awilix";
import GestionnaireDeQuellesSontLesFormationsAuCatalogue from "./application/gestionnaire/gestionnaire-de-quelles-sont-les-formations-au-catalogue";
import GestionnaireDeAjouterFormationAuCatalogueDeFormations from "./application/gestionnaire/gestionnaire-de-ajouter-formation-au-catalogue-de-formations";

export interface ICradleRead {
  gestionnaireDeQuellesSontLesFormationsAuCatalogue: GestionnaireDeQuellesSontLesFormationsAuCatalogue;
  gestionnaireDeAjouterFormationAuCatalogueDeFormations: GestionnaireDeAjouterFormationAuCatalogueDeFormations;
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
